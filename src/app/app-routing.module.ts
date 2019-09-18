import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TreeViewComponent } from './tree-view/tree-view.component';
import { RobotViewComponent } from './robot-view/robot-view.component';
import { CloudViewComponent } from './cloud-view/cloud-view.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "robot",
    pathMatch: "full"
  },
  {
    path: "robot",
    component: RobotViewComponent
  },
  {
    path: "tree",
    component: TreeViewComponent
  },
  {
    path: "cloud",
    component: CloudViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
