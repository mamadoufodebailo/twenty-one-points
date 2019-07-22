import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { TwentyOnePointsSharedModule } from 'app/shared';
import {
  ParametersComponent,
  ParametersDetailComponent,
  ParametersUpdateComponent,
  ParametersDeletePopupComponent,
  ParametersDeleteDialogComponent,
  parametersRoute,
  parametersPopupRoute
} from './';

const ENTITY_STATES = [...parametersRoute, ...parametersPopupRoute];

@NgModule({
  imports: [TwentyOnePointsSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ParametersComponent,
    ParametersDetailComponent,
    ParametersUpdateComponent,
    ParametersDeleteDialogComponent,
    ParametersDeletePopupComponent
  ],
  entryComponents: [ParametersComponent, ParametersUpdateComponent, ParametersDeleteDialogComponent, ParametersDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TwentyOnePointsParametersModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
