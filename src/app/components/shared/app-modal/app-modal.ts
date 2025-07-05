import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-app-modal',
  imports: [],
  templateUrl: './app-modal.html',
  styleUrl: './app-modal.css',
})
export class AppModal {
  @Input() message!: string;
}
