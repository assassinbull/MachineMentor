import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { TagResponsePage } from './tag-response';

@NgModule({
  declarations: [
    TagResponsePage,
  ],
  imports: [
    IonicPageModule.forChild(TagResponsePage),
    TranslateModule.forChild()
  ],
  exports: [
    TagResponsePage
  ]
})
export class TagResponsePageModule {}
