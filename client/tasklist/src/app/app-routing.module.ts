import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTasksComponent } from './components/all-tasks/all-tasks.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { OverdueTasksComponent } from './components/overdue-tasks/overdue-tasks.component';

const routes: Routes = [{
  path: '',
  redirectTo: 'all',
  pathMatch: 'full'
},
{
  path: 'all',
  component: AllTasksComponent
},
{
  path: 'add',
  component: AddTaskComponent
},
{
  path: 'overdue',
  component: OverdueTasksComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
