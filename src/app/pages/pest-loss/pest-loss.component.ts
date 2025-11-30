import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
  AddPestRecordDialogComponent,
  NewPestLossRecord,
  PestSeverity,
  PestType,
} from './add-pest-record-dialog.component';

interface PestTableRow {
  province: string;
  pestType: PestType;
  impact: PestSeverity;
}

interface DamageBar {
  foodType: string;
  damagePercent: number;
}

interface AlertItem {
  text: string;
  severity: PestSeverity;
}

@Component({
  selector: 'app-pest-loss',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, AddPestRecordDialogComponent],
  template: `
    <section class="page">
      <app-add-pest-record-dialog
        *ngIf="showAddDialog"
        (close)="closeAddDialog()"
        (save)="handleRecordSave($event)"
      ></app-add-pest-record-dialog>

      <div class="page-header">
        <div>
          <p class="eyebrow">7.2 Insects / Pests</p>
          <h1>Why food is lost to pests</h1>
          <p class="lede">
            Track pest type, impact levels, and crop damage to target interventions.
          </p>
        </div>
        <div class="header-actions">
          <button class="ghost-btn">Export snapshot</button>
          <button mat-raised-button color="primary" (click)="openAddDialog()">Add new record</button>
        </div>
      </div>

      <div class="grid two-col">
        <div class="card">
          <div class="card-header">
            <div>
              <p class="eyebrow">Pest impact table</p>
              <h2>Province, pest type, impact</h2>
            </div>
          </div>
          <div class="table">
            <div class="table-head">
              <span>Province</span>
              <span>Pest type</span>
              <span class="right">Impact</span>
            </div>
            <div class="table-row" *ngFor="let row of pestTable">
              <span>{{ row.province }}</span>
              <span>{{ row.pestType }}</span>
              <span class="pill" [ngClass]="row.impact">{{ row.impact }}</span>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <div>
              <p class="eyebrow">Damage by food</p>
              <h2>Crop damage per food type</h2>
            </div>
          </div>
          <div class="bar-chart">
            <div class="bar-row" *ngFor="let bar of damageBars">
              <div class="label">
                <span>{{ bar.foodType }}</span>
                <span class="value">{{ bar.damagePercent }}%</span>
              </div>
              <div class="bar-track">
                <div class="bar" [style.width]="barWidth(bar.damagePercent)"></div>
              </div>
            </div>
          </div>
          <p class="hint">Higher bars mean more crop loss to pests for that food type.</p>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <div>
            <p class="eyebrow">Alerts</p>
            <h2>Recent pest alerts</h2>
          </div>
        </div>
        <div class="alert-list">
          <div class="alert" *ngFor="let alert of alerts">
            <span class="pill" [ngClass]="alert.severity">{{ alert.severity }}</span>
            <span class="text">{{ alert.text }}</span>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .page {
        display: flex;
        flex-direction: column;
        gap: 18px;
      }

      .page-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 16px;
      }

      .header-actions {
        display: flex;
        gap: 10px;
      }

      .page h1 {
        margin: 4px 0 6px;
        font-size: 26px;
      }

      .page .eyebrow {
        margin: 0;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        font-size: 11px;
        color: #0b8f61;
      }

      .page .lede {
        margin: 0;
        color: #475569;
        max-width: 620px;
      }

      :host-context(.dark) .page .lede {
        color: #cbd5e1;
      }

      .ghost-btn {
        border: 1px solid rgba(15, 167, 104, 0.35);
        background: rgba(15, 167, 104, 0.07);
        color: #0b8f61;
        padding: 10px 14px;
        border-radius: 12px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.15s ease;
      }

      .ghost-btn:hover {
        box-shadow: 0 10px 20px rgba(15, 157, 88, 0.15);
      }

      :host-context(.dark) .ghost-btn {
        background: rgba(16, 185, 129, 0.12);
        color: #befae0;
        border-color: rgba(16, 185, 129, 0.35);
      }

      .card {
        background: #ffffff;
        border-radius: 18px;
        padding: 16px 18px;
        border: 1px solid rgba(15, 23, 42, 0.08);
        box-shadow: 0 12px 32px rgba(15, 23, 42, 0.06);
      }

      :host-context(.dark) .card {
        background: #0f172a;
        border-color: rgba(255, 255, 255, 0.04);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.35);
      }

      .card-header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        margin-bottom: 10px;
      }

      .grid.two-col {
        display: grid;
        grid-template-columns: 1.2fr 1fr;
        gap: 16px;
      }

      .table {
        border: 1px solid rgba(15, 23, 42, 0.08);
        border-radius: 14px;
        overflow: hidden;
      }

      :host-context(.dark) .table {
        border-color: rgba(255, 255, 255, 0.05);
      }

      .table-head,
      .table-row {
        display: grid;
        grid-template-columns: 1.4fr 1.3fr 1fr;
        padding: 10px 12px;
        align-items: center;
        gap: 6px;
      }

      .table-head {
        font-weight: 700;
        background: rgba(15, 23, 42, 0.05);
      }

      :host-context(.dark) .table-head {
        background: rgba(255, 255, 255, 0.06);
      }

      .table-row:nth-child(odd) {
        background: rgba(15, 23, 42, 0.02);
      }

      :host-context(.dark) .table-row:nth-child(odd) {
        background: rgba(255, 255, 255, 0.02);
      }

      .pill {
        padding: 6px 10px;
        border-radius: 999px;
        font-weight: 700;
        font-size: 12px;
        text-align: center;
      }

      .pill.HIGH,
      .pill.low {
        background: rgba(239, 68, 68, 0.18);
        color: #b91c1c;
      }

      .pill.MEDIUM,
      .pill.medium {
        background: rgba(245, 158, 11, 0.18);
        color: #b45309;
      }

      .pill.LOW,
      .pill.good {
        background: rgba(22, 163, 74, 0.18);
        color: #0f9d58;
      }

      .right {
        justify-self: flex-end;
      }

      .bar-chart {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }

      .bar-row {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }

      .label {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .bar-track {
        height: 14px;
        background: rgba(15, 23, 42, 0.06);
        border-radius: 10px;
        overflow: hidden;
      }

      :host-context(.dark) .bar-track {
        background: rgba(255, 255, 255, 0.08);
      }

      .bar {
        height: 100%;
        background: linear-gradient(135deg, #f97316, #ef4444);
      }

      .hint {
        margin: 6px 0 0;
        color: #475569;
        font-size: 13px;
      }

      :host-context(.dark) .hint {
        color: #cbd5e1;
      }

      .alert-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .alert {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 10px;
        align-items: center;
        padding: 10px 12px;
        border: 1px solid rgba(15, 23, 42, 0.08);
        border-radius: 12px;
        background: rgba(248, 250, 252, 0.7);
      }

      :host-context(.dark) .alert {
        background: rgba(15, 23, 42, 0.6);
        border-color: rgba(255, 255, 255, 0.05);
      }

      .alert .text {
        color: #0f172a;
      }

      :host-context(.dark) .alert .text {
        color: #e2e8f0;
      }

      @media (max-width: 960px) {
        .page-header {
          flex-direction: column;
        }

        .grid.two-col {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
})
export class PestLossComponent {
  showAddDialog = false;

  readonly pestTable: PestTableRow[] = [
    { province: 'Northern', pestType: 'Armyworm', impact: 'HIGH' },
    { province: 'Eastern', pestType: 'Leaf Miner', impact: 'MEDIUM' },
    { province: 'Western', pestType: 'Caterpillar', impact: 'MEDIUM' },
    { province: 'Central', pestType: 'Armyworm', impact: 'LOW' },
  ];

  readonly damageBars: DamageBar[] = [
    { foodType: 'Rice', damagePercent: 12 },
    { foodType: 'Vegetables', damagePercent: 18 },
    { foodType: 'Milk', damagePercent: 4 },
    { foodType: 'Child food', damagePercent: 6 },
  ];

  readonly alerts: AlertItem[] = [
    { text: 'Pest attack on vegetables in Northern Province.', severity: 'HIGH' },
    { text: 'Armyworm spotted in Eastern paddy fields.', severity: 'MEDIUM' },
    { text: 'Leaf miner affecting Central vegetables.', severity: 'MEDIUM' },
  ];

  openAddDialog(): void {
    this.showAddDialog = true;
  }

  closeAddDialog(): void {
    this.showAddDialog = false;
  }

  handleRecordSave(record: NewPestLossRecord): void {
    // Hook into backend/state as needed.
    console.log('Pest loss record submitted', record);
    this.showAddDialog = false;
  }

  barWidth(percent: number): string {
    const width = Math.min(100, percent);
    return `${width}%`;
  }
}
