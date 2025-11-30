import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-provinces',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './provinces.component.html',
  styleUrl: './provinces.component.css',
})
export class ProvincesComponent {}
