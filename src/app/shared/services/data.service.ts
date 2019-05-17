import { Injectable } from '@angular/core';
import uuid from 'uuid';
import { InMemoryWebApiModule, RequestInfo } from 'angular-in-memory-web-api';
import { Note, Tag, Category } from '../models';

@Injectable()
export class DataService implements InMemoryWebApiModule {
  createDb() {
    const notes: Note[] = [];
    const tags: Tag[] = [{
      id: uuid(),
      name: 'Favorite',
      icon: 'favorite'
    }, {
      id: uuid(),
      name: 'Important',
      icon: 'label_important'
    }];
    const categories: Category[] = [];

    return {notes, tags, categories};
  }

  genId<T>(data: T, collection: string): string {
    return uuid();
  }

  get(request: RequestInfo) {
    if(request.collectionName === 'notes' && request.query.get('tags')) {
      return request.utils.createResponse$(() => ({
        status: 200,
        body: this.aggregateNotes(request.collection, request.query.get('tags'))
      })) 
    }
    if(request.collectionName === 'tags' && request.query.get('keyword')) {
      return request.utils.createResponse$(() => ({
        status: 200,
        body: this.aggregateTags(request.collection, request.query.get('keyword')[0])
      })) 
    }
  }

  aggregateNotes(data: Note[], tags: string[]) {
    return data.filter(item => (item.tags || []).findIndex(t => tags.includes(t.name)) >= 0);
  }

  aggregateTags(data: Tag[], keyword: string): Tag[] {
    return data.filter(item => item.name.search(keyword) >= 0);
  }
}
