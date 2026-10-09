import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'search',
        loadChildren: () =>
          import('../tab-search/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'watchlist',
        loadChildren: () =>
          import('../tab-watchlist/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'watched',
        loadChildren: () =>
          import('../tab-watched/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: '',
        redirectTo: 'search',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
