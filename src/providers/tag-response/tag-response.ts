import { Injectable } from '@angular/core';

import { TagResponseModel } from '../../models/tag-response';
import { Api } from '../api/api';

@Injectable()
export class TagResponse {
  constructor(public api: Api) { }

  getNext(projectId, taggerId): any {
    return this.api.get('CorpusTagResponse', { projectId: projectId, taggerId: taggerId, originId: 0, iteration: 0 });
  }

  submitResponse(tagResponseModel: TagResponseModel): any {
    return this.api.put('CorpusTagResponse', tagResponseModel);
  }

  getIteration(projectId, taggerId, startId, iteration): any {
    return this.api.get('CorpusTagResponse', { projectId: projectId, taggerId: taggerId, originId: startId, iteration: iteration });
  }
}
