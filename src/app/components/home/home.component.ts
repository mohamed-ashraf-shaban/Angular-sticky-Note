import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { Note } from 'src/app/core/interface/note';
import { NoteService } from 'src/app/core/services/note.service';
declare let $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private _NoteService: NoteService,
    private _toastrService: ToastrService
  ) {}
  notes: Note[] = [];
  token: any = '';
  decoded: any = '';
  isLoad: boolean = false;
  noteID: string = '';
  noteData: any;
  searchKey: string = '';
  ngOnInit(): void {
    this.getAllNotes();
  }

  noteDataForm: FormGroup = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    content: new FormControl(null, [Validators.required]),
  });

  updateDataForm: FormGroup = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    content: new FormControl(null, [Validators.required]),
  });

  getAllNotes() {
    this._NoteService.getUserNote().subscribe({
      next: (res) => {
        this.isLoad = true;
        this.notes = res.notes;
      },
      error: (err) => {},
    });
  }

  //================================================== add note=============================
  addAllNotes(data: FormGroup) {
    this._NoteService.addNote(data.value).subscribe({
      next: (res) => {
        if (res.msg == 'done') {
          $('#AddNote').modal('hide');
          this.getAllNotes();
        }
      },
      error: () => {},
      complete: () => {
        this._toastrService.success('Note Added Successfully');
      },
    });
  }

  //================================================== Delete note=============================
  getId(data: any) {
    this.noteID = data;
    console.log(this.noteID);
  }

  deleteNote() {
    this._NoteService.deleteNote(this.noteID).subscribe({
      next: (res) => {
        if (res.msg == 'done') {
          $('#DeleteNote').modal('hide');
          this.getAllNotes();
        }
      },
      error: (err) => {},
      complete: () => {
        this._toastrService.success('Note Deleted Successfully');
      },
    });
  }

  setValue() {
    const selectedNote = this.notes.find((note) => note._id === this.noteID);

    if (selectedNote) {
      this.noteDataForm.patchValue({
        title: selectedNote.title,
        content: selectedNote.content,
      });
    }
  }

  onUpdate(data: FormGroup) {
    this._NoteService.updateNote(data.value, this.noteID).subscribe({
      next: (res) => {
        this.notes = res.notes;
        this.getAllNotes();
        if (res.msg == 'done') {
          $('#EditNote').modal('hide');
        }
      },
      error: () => {},
      complete: () => {
        this._toastrService.success('Note Updated Successfully');
      },
    });
  }
}
