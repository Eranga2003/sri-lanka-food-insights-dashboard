import { Routes } from '@angular/router';
import { ShellComponent } from './layout/shell/shell.component';

export const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      { path: '', redirectTo: 'food-manufacturing', pathMatch: 'full' },
      {
        path: 'food-manufacturing',
        loadComponent: () =>
          import('./pages/food-manufacturing/food-manufacturing.component').then(
            (m) => m.FoodManufacturingComponent,
          ),
      },
      {
        path: 'human-capital',
        loadComponent: () =>
          import('./pages/human-capital/human-capital.component').then(
            (m) => m.HumanCapitalComponent,
          ),
      },
      {
        path: 'food-loss/weather',
        loadComponent: () =>
          import('./pages/weather-loss/weather-loss.component').then(
            (m) => m.WeatherLossComponent,
          ),
      },
      {
        path: 'food-loss/pests',
        loadComponent: () =>
          import('./pages/pest-loss/pest-loss.component').then((m) => m.PestLossComponent),
      },
      {
        path: 'food-loss/diseases',
        loadComponent: () =>
          import('./pages/disease-loss/disease-loss.component').then(
            (m) => m.DiseaseLossComponent,
          ),
      },
      {
        path: 'food-loss/storage',
        loadComponent: () =>
          import('./pages/storage-loss/storage-loss.component').then(
            (m) => m.StorageLossComponent,
          ),
      },
      {
        path: 'alerts',
        loadComponent: () => import('./pages/alerts/alerts.component').then((m) => m.AlertsComponent),
      },
      {
        path: 'settings/provinces',
        loadComponent: () =>
          import('./pages/provinces/provinces.component').then((m) => m.ProvincesComponent),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
