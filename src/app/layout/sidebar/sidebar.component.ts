import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

type NavItem = { label: string; path: string; icon: string; full?: string };

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatListModule, MatButtonModule, MatIconModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  readonly projectName = 'Smart Dashboard';
  readonly navItems: NavItem[] = [
    { label: 'Dashboard', path: '/dashboard', icon: 'dashboard' },
    { label: 'Food Manufacturing', path: '/food-manufacturing', icon: 'factory' },
    { label: 'Human Capital', full: 'Human Capital / Children Nutrition', path: '/human-capital', icon: 'family_restroom' },
    { label: 'Weather Loss', full: 'Weather-Related Food Loss', path: '/food-loss/weather', icon: 'cloudy_snowing' },
    { label: 'Pest Damage', full: 'Pest / Insect Damage', path: '/food-loss/pests', icon: 'pest_control' },
    { label: 'Disease', full: 'Disease / Fungal Attack', path: '/food-loss/diseases', icon: 'coronavirus' },
    { label: 'Storage & Supply', full: 'Storage & Supply Chain Loss', path: '/food-loss/storage', icon: 'local_shipping' },
    { label: 'Alerts', path: '/alerts', icon: 'notification_important' },
    { label: 'Provinces', full: 'Province Settings', path: '/settings/provinces', icon: 'map' },
  ];
}
