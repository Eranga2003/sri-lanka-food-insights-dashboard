import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-food-manufacturing',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './food-manufacturing.component.html',
  styleUrl: './food-manufacturing.component.css',
})
export class FoodManufacturingComponent {}
