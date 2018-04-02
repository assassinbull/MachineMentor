import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { ListUserPage } from './list-user';

@NgModule({
  declarations: [
    ListUserPage,
  ],
  imports: [
    IonicPageModule.forChild(ListUserPage),
    TranslateModule.forChild()
  ],
  exports: [
    ListUserPage
  ]
})
export class ListUserPageModule {}
