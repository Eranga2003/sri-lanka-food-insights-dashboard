import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-disease-loss',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './disease-loss.component.html',
  styleUrl: './disease-loss.component.css',
})
export class DiseaseLossComponent {}
