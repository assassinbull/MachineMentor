import { Injectable } from '@angular/core';

import { Item } from '../../models/item';
import { Api } from '../api/api';

@Injectable()
export class Items {
  defaultItem: any = {
    "name": "Burt Bear",
    "profilePic": "assets/img/speakers/bear.jpg",
    "about": "Burt is a Bear.",
  };

  constructor(public api: Api) { }

  query(params?: any): any {
    return this.api.get('CorpusProject', params);
  }

  add(item: Item) {
  }

  delete(item: Item) {
  }
}
