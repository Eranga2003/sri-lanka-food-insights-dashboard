import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-human-capital',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './human-capital.component.html',
  styleUrl: './human-capital.component.css',
})
export class HumanCapitalComponent {}
