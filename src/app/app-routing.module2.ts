import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  /*{// path: '', redirectTo: 'admin', pathMatch: 'full' },*/
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminPageModule) },
  {
    path: 'make',
    loadChildren: () => import('./make/make.module').then(m => m.MakePageModule)
  },
  {
    path: 'edit/:id',
    loadChildren: () => import('./edit/edit.module').then(m => m.EditPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
