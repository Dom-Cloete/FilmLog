import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabStatsPageRoutingModule } from './tab-stats-routing.module';

import { TabStatsPage } from './tab-stats.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabStatsPageRoutingModule
  ],
  declarations: [TabStatsPage]
})
export class TabStatsPageModule {}
