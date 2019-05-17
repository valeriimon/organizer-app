import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Observable, BehaviorSubject, OperatorFunction } from 'rxjs';
import { Note } from 'src/app/shared/models';
import { share, tap, filter } from 'rxjs/operators';
import { hexToRgbA } from 'src/utils/common-utils';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class NotesService {
  $notes: BehaviorSubject<Note[]> = new BehaviorSubject([]);
  constructor(
    private http: HttpClient
  ) { }
  
  onNotes(): Observable<Note[]> {
    return this.$notes.pipe(
      tap((notes: Note[]) => {
        return notes.map(note => {
          if(note.color) {
            note.colorRGBA = hexToRgbA(note.color, '.3');
          }
          return note
        })
      }),
      share()
      );
  }

  fetchNotes(query?: {tags: string[]}): Observable<Note[]> {
    const options = {
      params: query
    }
    return this.http.get<Note[]>('api/notes', options)
      .pipe(
        (tap((notes: Note[]) => this.$notes.next(notes)) as any)
      )
  }

  createNote(note: Note): Observable<Note> {
    return this.http.post<Note>('api/notes', note);
  }

  updateNote(note: Partial<Note>): Observable<Note> {
    return this.http.put<Note>('api/notes', note);
  }

  removeNote(noteId: string) {
    return this.http.delete<any>(`api/notes/${noteId}`)
  }
}
