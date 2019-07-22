import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IBloodPressure, BloodPressure } from 'app/shared/model/blood-pressure.model';
import { BloodPressureService } from './blood-pressure.service';
import { IUser, UserService } from 'app/core';

@Component({
  selector: 'jhi-blood-pressure-update',
  templateUrl: './blood-pressure-update.component.html'
})
export class BloodPressureUpdateComponent implements OnInit {
  isSaving: boolean;

  users: IUser[];

  editForm = this.fb.group({
    id: [],
    date: [],
    systolic: [],
    diastolic: [],
    user: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected bloodPressureService: BloodPressureService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ bloodPressure }) => {
      this.updateForm(bloodPressure);
    });
    this.userService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IUser[]>) => mayBeOk.ok),
        map((response: HttpResponse<IUser[]>) => response.body)
      )
      .subscribe((res: IUser[]) => (this.users = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(bloodPressure: IBloodPressure) {
    this.editForm.patchValue({
      id: bloodPressure.id,
      date: bloodPressure.date != null ? bloodPressure.date.format(DATE_TIME_FORMAT) : null,
      systolic: bloodPressure.systolic,
      diastolic: bloodPressure.diastolic,
      user: bloodPressure.user
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const bloodPressure = this.createFromForm();
    if (bloodPressure.id !== undefined) {
      this.subscribeToSaveResponse(this.bloodPressureService.update(bloodPressure));
    } else {
      this.subscribeToSaveResponse(this.bloodPressureService.create(bloodPressure));
    }
  }

  private createFromForm(): IBloodPressure {
    return {
      ...new BloodPressure(),
      id: this.editForm.get(['id']).value,
      date: this.editForm.get(['date']).value != null ? moment(this.editForm.get(['date']).value, DATE_TIME_FORMAT) : undefined,
      systolic: this.editForm.get(['systolic']).value,
      diastolic: this.editForm.get(['diastolic']).value,
      user: this.editForm.get(['user']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBloodPressure>>) {
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
