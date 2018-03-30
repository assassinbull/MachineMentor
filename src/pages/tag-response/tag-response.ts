import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController, NavParams } from 'ionic-angular';

import { CorpusTagModel } from '../../models/corpus-tag';
import { TagResponse } from '../../providers/providers';
import { CorpusTag } from '../../providers/providers';
import { CorpusDocument } from '../../providers/providers';
import { Items } from '../../providers/providers';
import { User } from '../../providers/providers';
import { Common } from '../../providers/providers';
import { MainPage } from '../pages';

@IonicPage()
@Component({
  selector: 'page-tag-response',
  templateUrl: 'tag-response.html',
})
export class TagResponsePage {
  item: any;
  tagResponseModel: any;
  corpusTagsModel: CorpusTagModel[];
  corpusDocumentModel: any;

  constructor(private menu: MenuController, public navCtrl: NavController, navParams: NavParams
    , items: Items, public user: User, public common: Common
    , public tagResponse: TagResponse, public corpusTag: CorpusTag, public corpusDocument: CorpusDocument) {
    this.item = navParams.get('item');
  }

  ionViewDidEnter() {
    this.menu.swipeEnable(false);
  }

  ionViewWillLeave() {
    this.menu.swipeEnable(true);
   }

  ionViewWillEnter() {
    this.fetchNextTagResponse();
  }

  fetchNextTagResponse() {
    this.tagResponse.getNext(this.item.Id, this.user._user.Id)
      .subscribe((resp: any) => {
        if (resp.Data) {
          this.tagResponseModel = resp.Data;

          this.loadDocumentAndTags();
        } else {
          //this.navCtrl.push(MainPage);
        }
      });
  }

  loadDocumentAndTags() {
    if (this.tagResponseModel)
      this.corpusDocument.get(this.tagResponseModel.CorpusDocumentId)
        .subscribe((resp: any) => {
          this.corpusDocumentModel = resp.Data;
        });

    this.corpusTag.get(this.item.Id)
      .subscribe((resp: any) => {
        this.corpusTagsModel = resp.Data;

        this.corpusTagsModel.forEach((tag) => {
          if (this.tagResponseModel.CorpusTagId != 0 && tag.Id != this.tagResponseModel.CorpusTagId) {
            tag.Color = 'light';
          }
        });
      });
  }

  submitTagResponse(tagId) {
    this.tagResponseModel.CorpusTagId = tagId;
    this.tagResponse.submitResponse(this.tagResponseModel).subscribe((resp: any) => {
      if (resp.Status == 'success')
        this.iterateForwardTagResponse();
      else {
        this.common.popToastErrResp(resp);
      }
    });
  }

  iterateForwardTagResponse() {
    this.tagResponse.getIteration(this.item.Id, this.user._user.Id, this.tagResponseModel.Id, 1)
      .subscribe((resp: any) => {
        if (resp.Data) {
          this.tagResponseModel = resp.Data;

          this.loadDocumentAndTags();
        } else {
          //this.navCtrl.push(MainPage);
        }
      });
  }

  iterateBackwardsTagResponse() {
    this.tagResponse.getIteration(this.item.Id, this.user._user.Id, this.tagResponseModel.Id, -1)
      .subscribe((resp: any) => {
        if (resp.Data) {
          this.tagResponseModel = resp.Data;

          this.loadDocumentAndTags();
        } else {
          //this.navCtrl.push(MainPage);
        }
      });
  }
}
