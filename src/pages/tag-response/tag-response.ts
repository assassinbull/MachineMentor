import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { TagResponse } from '../../providers/providers';
import { CorpusTag } from '../../providers/providers';
import { CorpusDocument } from '../../providers/providers';
import { Items } from '../../providers/providers';
import { User } from '../../providers/providers';

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
    , items: Items, public user: User//, public toastCtrl: ToastController    
    , public tagResponse: TagResponse, public corpusTag: CorpusTag, public corpusDocument: CorpusDocument) {
    this.item = navParams.get('item');
  }

  ionViewWillEnter() {
    this.fetchNextTagResponse();
  }

  fetchNextTagResponse() {
    this.tagResponse.getNext(this.item.Id, this.user._user.Id)
      .subscribe((resp: any) => {
        this.tagResponseModel = resp.Data;
        console.log(this.tagResponseModel);

        if (this.tagResponseModel)
          this.corpusDocument.get(this.tagResponseModel.CorpusDocumentId)
            .subscribe((resp: any) => {
              this.corpusDocumentModel = resp.Data;
            });
      });

    this.corpusTag.get(this.item.Id)
      .subscribe((resp: any) => {
        this.corpusTagsModel = resp.Data;
      });
  }

  submitTagResponse(tagId) {
    this.tagResponseModel.CorpusTagId = tagId;
    this.tagResponse.submitResponse(this.tagResponseModel).subscribe((resp: any) => {
      this.fetchNextTagResponse();
    });
  }
}
