import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SportsCardComponent } from './sports-card/sports-card.component';



@NgModule({
  declarations: [SportsCardComponent],
  imports: [
    CommonModule
  ],
  exports: [SportsCardComponent],
})
export class SharedModule { }
