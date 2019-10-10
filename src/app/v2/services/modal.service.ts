import { Injectable } from '@angular/core';
import { DetailsData } from '../interfaces/details-data.interface';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  displayDetailsModal = false;
  displayDetailsPromise: Promise<DetailsData>;
  promiseResolver: (data: DetailsData) => {};

  constructor() { }

  openDetailsModal(): Promise<DetailsData> {

    this.displayDetailsModal = true;

    let promise = new Promise<DetailsData>((resolve: any) => {
      this.promiseResolver = resolve;
    });

    return promise;
  }

  validateDetailModal(data: DetailsData) {
    this.displayDetailsModal = false;
    this.promiseResolver(data);
  }
}
