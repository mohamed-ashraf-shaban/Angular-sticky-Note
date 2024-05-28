import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  baseUrl: string = 'https://note-sigma-black.vercel.app/api/v1/notes';
  constructor(private _HttpClient: HttpClient) {}

  getUserNote(): Observable<any> {
    return this._HttpClient.get(
      'https://note-sigma-black.vercel.app/api/v1/notes'
    );
  }

  addNote(data: any): Observable<any> {
    return this._HttpClient.post(this.baseUrl, data);
  }

  deleteNote(id: any): Observable<any> {
    return this._HttpClient.delete(
      `https://note-sigma-black.vercel.app/api/v1/notes/${id}`
    );
  }

  updateNote(data: object, id: string): Observable<any> {
    return this._HttpClient.put(
      `https://note-sigma-black.vercel.app/api/v1/notes/${id}`,
      data
    );
  }
}
