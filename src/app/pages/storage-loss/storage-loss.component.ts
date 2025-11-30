import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-storage-loss',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './storage-loss.component.html',
  styleUrl: './storage-loss.component.css',
})
export class StorageLossComponent {}
