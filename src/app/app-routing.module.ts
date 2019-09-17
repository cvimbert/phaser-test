import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TreeViewComponent } from './tree-view/tree-view.component';
import { RobotViewComponent } from './robot-view/robot-view.component';

const routes: Routes = [
  {
    path: "robot",
    component: RobotViewComponent
  },
  {
    path: "tree",
    component: TreeViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
