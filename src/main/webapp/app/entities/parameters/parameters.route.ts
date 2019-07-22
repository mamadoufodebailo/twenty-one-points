import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Parameters } from 'app/shared/model/parameters.model';
import { ParametersService } from './parameters.service';
import { ParametersComponent } from './parameters.component';
import { ParametersDetailComponent } from './parameters-detail.component';
import { ParametersUpdateComponent } from './parameters-update.component';
import { ParametersDeletePopupComponent } from './parameters-delete-dialog.component';
import { IParameters } from 'app/shared/model/parameters.model';

@Injectable({ providedIn: 'root' })
export class ParametersResolve implements Resolve<IParameters> {
  constructor(private service: ParametersService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IParameters> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Parameters>) => response.ok),
        map((parameters: HttpResponse<Parameters>) => parameters.body)
      );
    }
    return of(new Parameters());
  }
}

export const parametersRoute: Routes = [
  {
    path: '',
    component: ParametersComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'twentyOnePointsApp.parameters.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ParametersDetailComponent,
    resolve: {
      parameters: ParametersResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'twentyOnePointsApp.parameters.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ParametersUpdateComponent,
    resolve: {
      parameters: ParametersResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'twentyOnePointsApp.parameters.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ParametersUpdateComponent,
    resolve: {
      parameters: ParametersResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'twentyOnePointsApp.parameters.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const parametersPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ParametersDeletePopupComponent,
    resolve: {
      parameters: ParametersResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'twentyOnePointsApp.parameters.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
