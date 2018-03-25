import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api } from '../api/api';

@Injectable()
export class CorpusDocument {
  constructor(public api: Api) { }

  get(documentId): any {
    return this.api.get('CorpusDocument', { documentId: documentId });
  }
}
