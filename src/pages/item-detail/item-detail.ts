import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { CorpusTagModel } from '../../models/corpus-tag';
import { Items } from '../../providers/providers';
import { CorpusTag } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html'
})
export class ItemDetailPage {
  item: any;
  activeProjectSubscriptions: any[];
  corpusTagsModel: CorpusTagModel[];

  constructor(public navCtrl: NavController, navParams: NavParams, public items: Items
    , public corpusTag: CorpusTag) {
    this.item = navParams.get('item') || items.defaultItem;
  }

  ionViewDidLoad() {
    this.items.getProjectSubscriptions({ projectId: this.item.Id }).subscribe((resp: any) => {
      this.activeProjectSubscriptions = resp.Data;
    });

    this.corpusTag.get(this.item.Id)
      .subscribe((resp: any) => {
        this.corpusTagsModel = resp.Data;
      });
  }

}
