import { Injectable } from '@angular/core';
import { DetailsData } from '../interfaces/details-data.interface';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DetailsInputComponent } from '../components/details-input/details-input.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  displayDetailsModal = false;
  displayDetailsPromise: Promise<DetailsData>;
  promiseResolver: (data: DetailsData) => {};

  detailsData: DetailsData;

  constructor(
    private dialog: MatDialog
  ) { }

  openDetailsModal(data?: DetailsData): MatDialogRef<DetailsInputComponent> {

    return this.dialog.open(DetailsInputComponent, {
      data: data || {
        name: "",
        description: ""
      }
    });

    /* this.detailsData = data || {
      name: "",
      description: ""
    }; */
    
    /* this.displayDetailsModal = true;

    let promise = new Promise<DetailsData>((resolve: any) => {
      this.promiseResolver = resolve;
    });

    return promise; */
  }

  /* validateDetailModal(data: DetailsData) {
    this.displayDetailsModal = false;
    this.promiseResolver(this.detailsData);
  }

  closeDetailsModal() {
    this.displayDetailsModal = false;
    this.promiseResolver(null);
  } */
}
