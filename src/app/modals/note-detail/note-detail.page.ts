import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { DataService, Note } from 'src/app/@core/services/data.service';

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.page.html',
  styleUrls: ['./note-detail.page.scss'],
})
export class NoteDetailPage implements OnInit {
  @Input() id: string;

  loading?: boolean = true;
  note?: Note;

  constructor(
    private dataService: DataService,
    private modalController: ModalController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.getNotes();
  }

  getNotes() {
    this.dataService.getNoteById(this.id).subscribe((res) => {
      this.note = res;
      this.loading = false;
    });
  }

  async updateNote() {
    this.dataService.updateNote(this.note);
    const toast = await this.toastController.create({
      message: 'Note updated!',
      duration: 1000,
    });
    toast.present();
  }

  async deleteNote() {
    await this.dataService.softDeleteNote(this.note);
    this.modalController.dismiss();
  }
}
