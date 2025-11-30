import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css',
})
export class TopbarComponent {
  @Input() isDarkMode = false;
  @Output() themeToggle = new EventEmitter<void>();
  @Output() search = new EventEmitter<string>();

  onThemeToggle(): void {
    this.themeToggle.emit();
  }

  emitSearch(term: string): void {
    this.search.emit(term.trim());
  }

  quickSearch(term: string): void {
    this.emitSearch(term);
  }
}
