import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IParameters } from 'app/shared/model/parameters.model';

@Component({
  selector: 'jhi-parameters-detail',
  templateUrl: './parameters-detail.component.html'
})
export class ParametersDetailComponent implements OnInit {
  parameters: IParameters;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ parameters }) => {
      this.parameters = parameters;
    });
  }

  previousState() {
    window.history.back();
  }
}
