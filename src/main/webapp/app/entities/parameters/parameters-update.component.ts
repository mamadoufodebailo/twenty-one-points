import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IParameters, Parameters } from 'app/shared/model/parameters.model';
import { ParametersService } from './parameters.service';
import { IUser, UserService } from 'app/core';

@Component({
  selector: 'jhi-parameters-update',
  templateUrl: './parameters-update.component.html'
})
export class ParametersUpdateComponent implements OnInit {
  isSaving: boolean;

  users: IUser[];

  editForm = this.fb.group({
    id: [],
    weeklyGoal: [],
    weight: [],
    parameter: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected parametersService: ParametersService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ parameters }) => {
      this.updateForm(parameters);
    });
    this.userService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IUser[]>) => mayBeOk.ok),
        map((response: HttpResponse<IUser[]>) => response.body)
      )
      .subscribe((res: IUser[]) => (this.users = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(parameters: IParameters) {
    this.editForm.patchValue({
      id: parameters.id,
      weeklyGoal: parameters.weeklyGoal,
      weight: parameters.weight,
      parameter: parameters.parameter
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const parameters = this.createFromForm();
    if (parameters.id !== undefined) {
      this.subscribeToSaveResponse(this.parametersService.update(parameters));
    } else {
      this.subscribeToSaveResponse(this.parametersService.create(parameters));
    }
  }

  private createFromForm(): IParameters {
    return {
      ...new Parameters(),
      id: this.editForm.get(['id']).value,
      weeklyGoal: this.editForm.get(['weeklyGoal']).value,
      weight: this.editForm.get(['weight']).value,
      parameter: this.editForm.get(['parameter']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IParameters>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackUserById(index: number, item: IUser) {
    return item.id;
  }
}
