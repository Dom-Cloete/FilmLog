import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabStatsPage } from './tab-stats.page';

const routes: Routes = [
  {
    path: '',
    component: TabStatsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabStatsPageRoutingModule {}
