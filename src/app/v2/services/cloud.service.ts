import { Injectable } from '@angular/core';
import { CloudViewComponent } from 'src/app/cloud-view/cloud-view.component';

@Injectable({
  providedIn: 'root'
})
export class CloudService {

  cloudView: CloudViewComponent

  constructor() { }
}
