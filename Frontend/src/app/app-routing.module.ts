import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  // {
  //   path: 'English', loadChildren: './navigation/navigation.module#NavigationModule',
  // },
  {
    path: ':language', loadChildren: './navigation/navigation.module#NavigationModule',
  },
  {
    path: '**', redirectTo: 'English', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
