import { Component } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { SongService } from '../services/song.service';  // Your service to call backend
import { Songs } from '../../dataType';

@Component({
  selector: 'app-add-song',
  templateUrl: './add-song.component.html',
})
export class AddSongComponent {

  songForm: FormGroup;
  constructor(private fb: FormBuilder, private songService: SongService) {
  this.songForm = this.fb.group({
    id: ['', Validators.required],
    name: ['', Validators.required],
    song: ['', Validators.required],
  });
      console.log(this.songForm);
  }

  onSubmit() {
  if (this.songForm.valid) {
    console.log("it is okk");
    const formValue = this.songForm.value;

    // Convert id to number
    const newSong: Songs = {
      id: Number(formValue.id),
      name: formValue.name || '',
      song: formValue.song || ''
    };

    this.songService.addSong(newSong).subscribe({
      next: () => {
        alert('Song added successfully!');
        this.songForm.reset();
      },
      error: (err) => {
        alert('Error adding song');
        console.error(err);
      }
    });
  }else {
    console.log("not okk");
  }
}

}
