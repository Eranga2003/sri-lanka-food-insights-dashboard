import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-pest-loss',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './pest-loss.component.html',
  styleUrl: './pest-loss.component.css',
})
export class PestLossComponent {}
