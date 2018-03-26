import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { TagResponse } from '../../providers/providers';
import { CorpusTag } from '../../providers/providers';
import { CorpusDocument } from '../../providers/providers';
import { Items } from '../../providers/providers';
import { User } from '../../providers/providers';
import { MainPage } from '../pages';

@IonicPage()
@Component({
  selector: 'page-tag-response',
  templateUrl: 'tag-response.html',
})
export class TagResponsePage {
  item: any;
  tagResponseModel: any;
  corpusTagsModel: any;
  corpusDocumentModel: any;

  constructor(public navCtrl: NavController, navParams: NavParams
    , items: Items, public user: User, public toastCtrl: ToastController
    , public tagResponse: TagResponse, public corpusTag: CorpusTag, public corpusDocument: CorpusDocument) {
    this.item = navParams.get('item');
  }

  ionViewWillEnter() {
    this.fetchNextTagResponse();
  }

  fetchNextTagResponse() {
    this.tagResponse.getNext(this.item.Id, this.user._user.Id)
      .subscribe((resp: any) => {
        if (resp.Data) {
          this.tagResponseModel = resp.Data;

          if (this.tagResponseModel)
            this.corpusDocument.get(this.tagResponseModel.CorpusDocumentId)
              .subscribe((resp: any) => {
                this.corpusDocumentModel = resp.Data;
              });

          this.corpusTag.get(this.item.Id)
            .subscribe((resp: any) => {
              this.corpusTagsModel = resp.Data;
            });
        } else {
          this.navCtrl.push(MainPage);
        }
      });
  }

  submitTagResponse(tagId) {
    this.tagResponseModel.CorpusTagId = tagId;
    this.tagResponse.submitResponse(this.tagResponseModel).subscribe((resp: any) => {
      if (resp.Status == 'success')
        this.fetchNextTagResponse();
      else {
        let toast = this.toastCtrl.create({
          message: resp.Messages[0].Value,
          duration: 3000,
          position: 'top'
        });
        toast.present();
      }
    });
  }
}
