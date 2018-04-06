import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';

import { Item } from '../../models/item';
import { Items } from '../../providers/providers';
import { User } from '../../providers/providers';
import { Common } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html'
})
export class ListMasterPage {
  currentItems: Item[];

  constructor(public navCtrl: NavController, public modalCtrl: ModalController
    , public user: User, public items: Items, private common: Common) {
  }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
    this.loadProjectsForTagger();
  }

  loadProjectsForTagger() {
    var loading = this.common.presentLoading();
    if (this.user._user)
      this.items.getProjects({ taggerId: this.user._user.Id }).subscribe((resp: any) => {
        this.currentItems = resp.Data;
        loading.dismiss();
      }, (err) => {
      });
  }

  refreshPage(refresher) {
    this.loadProjectsForTagger();
    refresher.complete();
  }

  /**
   * Prompt the user to add a new item. This shows our ItemCreatePage in a
   * modal and then adds the new item to our data source if the user created one.
   */
  addItem() {
    let addModal = this.modalCtrl.create('ItemCreatePage');
    addModal.onDidDismiss(item => {
      if (item) {
        this.items.add(item);
      }
    })
    addModal.present();
  }

  /**
   * Delete an item from the list of items.
   */
  deleteItem(item) {
    this.items.delete(item);
  }

  /**
   * Navigate to the detail page for this item.
   */
  openItem(item: Item) {
    this.navCtrl.push('ItemDetailPage', {
      item: item
    });
  }

  startTagging(item) {
    this.navCtrl.push('TagResponsePage', {
      item: item
    });
  }

  subscribeProject(item) {
    var loading = this.common.presentLoading();
    this.items.subscribeProject({ corpusProjectId: item.Id, corpusTaggerId: this.user._user.Id }).subscribe((resp: any) => {
      this.common.popToast("Subscription completed.");
      this.loadProjectsForTagger();
      loading.dismiss();
    }, (err) => {
      // Unable to subscribe
      this.common.popToast("Subscription failed!");
      loading.dismiss();
    });
  }
}
