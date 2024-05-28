import { Pipe, PipeTransform } from '@angular/core';
import { Note } from '../interface/note';

@Pipe({
  name: 'noteSearch',
})
export class NoteSearchPipe implements PipeTransform {
  transform(note: Note[], searchKey: string): Note[] {
    return note.filter((note) =>
      note.title.toLocaleLowerCase().includes(searchKey.toLocaleLowerCase())
    );
  }
}
