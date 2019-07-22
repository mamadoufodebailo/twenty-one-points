import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IParameters } from 'app/shared/model/parameters.model';
import { ParametersService } from './parameters.service';

@Component({
  selector: 'jhi-parameters-delete-dialog',
  templateUrl: './parameters-delete-dialog.component.html'
})
export class ParametersDeleteDialogComponent {
  parameters: IParameters;

  constructor(
    protected parametersService: ParametersService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.parametersService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'parametersListModification',
        content: 'Deleted an parameters'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-parameters-delete-popup',
  template: ''
})
export class ParametersDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ parameters }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ParametersDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.parameters = parameters;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/parameters', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/parameters', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
