import { Injectable } from '@angular/core';

import { TagResponseModel } from '../../models/tag-response';
import { Api } from '../api/api';

@Injectable()
export class TagResponse {
  constructor(public api: Api) { }

  getNext(projectId, taggerId): any {
    return this.api.get('CorpusTagResponse', { projectId: projectId, taggerId: taggerId });
  }

  submitResponse(tagResponseModel: TagResponseModel): any {
    return this.api.put('CorpusTagResponse', tagResponseModel);
  }
}
