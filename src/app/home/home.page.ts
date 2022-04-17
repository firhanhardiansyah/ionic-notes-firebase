import { Component } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { DataService } from '../@core/services/data.service';
import { NoteDetailPage } from '../modals/note-detail/note-detail.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  loading?: boolean = true;
  notes = [];

  constructor(
    private dataService: DataService,
    private alertController: AlertController,
    private modalController: ModalController
  ) {
    this.getNotes();
  }

  getNotes() {
    this.dataService.getNotes().subscribe((res) => {
      this.loading = false;
      this.notes = res;
    });
  }

  async openNote(note) {
    const modal = await this.modalController.create({
      component: NoteDetailPage,
      componentProps: { id: note.id },
      breakpoints: [0, 0.5, 0.8],
      initialBreakpoint: 0.5,
    });
    modal.present();
  }

  async addNote() {
    const alert = this.alertController.create({
      header: 'Add Note',
      inputs: [
        {
          name: 'title',
          placeholder: 'Title cuy',
          type: 'text',
        },
        {
          name: 'description',
          placeholder: 'Lorem ipsum dolor sit amet cuy',
          type: 'textarea',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Add',
          handler: (res) => {
            this.dataService.addNote({
              title: res.title,
              description: res.description
            });
          },
        },
      ],
    });

    (await alert).present();
  }
}
