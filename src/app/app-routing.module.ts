import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TreeViewComponent } from './tree-view/tree-view.component';
import { RobotViewComponent } from './robot-view/robot-view.component';
import { CloudViewComponent } from './cloud-view/cloud-view.component';
import { GraphViewComponent } from './graph-view/graph-view.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "cloud",
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
  },
  {
    path: "graph",
    component: GraphViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
