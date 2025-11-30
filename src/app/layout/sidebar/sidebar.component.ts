import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

type NavItem = { label: string; path: string; icon: string };

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  readonly projectName = 'Smart Dashboard';
  readonly navItems: NavItem[] = [
    { label: 'Food Manufacturing', path: '/food-manufacturing', icon: 'factory' },
    { label: 'Human Capital / Children Nutrition', path: '/human-capital', icon: 'users' },
    { label: 'Weather-Related Food Loss', path: '/food-loss/weather', icon: 'cloud' },
    { label: 'Pest / Insect Damage', path: '/food-loss/pests', icon: 'bug' },
    { label: 'Disease / Fungal Attack', path: '/food-loss/diseases', icon: 'virus' },
    { label: 'Storage & Supply Chain Loss', path: '/food-loss/storage', icon: 'truck' },
    { label: 'Alerts', path: '/alerts', icon: 'alert' },
    { label: 'Province Settings', path: '/settings/provinces', icon: 'map' },
  ];
}
