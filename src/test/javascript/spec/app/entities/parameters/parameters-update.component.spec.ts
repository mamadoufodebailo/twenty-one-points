/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { TwentyOnePointsTestModule } from '../../../test.module';
import { ParametersUpdateComponent } from 'app/entities/parameters/parameters-update.component';
import { ParametersService } from 'app/entities/parameters/parameters.service';
import { Parameters } from 'app/shared/model/parameters.model';

describe('Component Tests', () => {
  describe('Parameters Management Update Component', () => {
    let comp: ParametersUpdateComponent;
    let fixture: ComponentFixture<ParametersUpdateComponent>;
    let service: ParametersService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TwentyOnePointsTestModule],
        declarations: [ParametersUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ParametersUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ParametersUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ParametersService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Parameters(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Parameters();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
