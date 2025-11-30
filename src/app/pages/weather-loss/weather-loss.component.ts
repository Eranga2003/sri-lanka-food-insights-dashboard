import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-weather-loss',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './weather-loss.component.html',
  styleUrl: './weather-loss.component.css',
})
export class WeatherLossComponent {}
