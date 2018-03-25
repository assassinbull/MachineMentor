import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api } from '../api/api';

@Injectable()
export class CorpusTag {
  constructor(public api: Api) { }

  get(projectId): any {
    return this.api.get('CorpusTag', { projectId: projectId });
  }
}
