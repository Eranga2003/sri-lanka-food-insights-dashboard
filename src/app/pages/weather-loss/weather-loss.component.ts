import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
  AddWeatherRecordDialogComponent,
  NewWeatherLossRecord,
  WeatherReason,
} from './add-weather-record-dialog.component';

interface MonthlyWeatherLoss {
  month: string;
  lossPercent: number;
  reason: string;
  detail: string;
}

interface ProvinceWeatherLoss {
  province: string;
  lossPercent: number;
  reason: WeatherReason;
}

@Component({
  selector: 'app-weather-loss',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, AddWeatherRecordDialogComponent],
  template: `
    <section class="page">
      <app-add-weather-record-dialog
        *ngIf="showAddDialog"
        (close)="closeAddDialog()"
        (save)="handleRecordSave($event)"
      ></app-add-weather-record-dialog>

      <div class="page-header">
        <div>
          <p class="eyebrow">Weather food loss</p>
          <h1>Why food is lost to weather</h1>
          <p class="lede">
            Track how rain, wind, drought and heat are affecting production and where losses are highest.
          </p>
        </div>
        <div class="header-actions">
          <button class="ghost-btn">Export snapshot</button>
          <button mat-raised-button color="primary" (click)="openAddDialog()">Add new record</button>
        </div>
      </div>

      <div class="card kpi-card">
        <div>
          <p class="eyebrow">This month</p>
          <h2>Weather food loss</h2>
          <div class="kpi-value-row">
            <span class="kpi-value">{{ headlineKpi.value }}</span>
            <span class="pill low">{{ headlineKpi.label }}</span>
          </div>
          <p class="kpi-hint">{{ headlineKpi.hint }}</p>
        </div>
      </div>

      <div class="grid two-col">
        <div class="card">
          <div class="card-header">
            <div>
              <p class="eyebrow">7.1 Weather impact</p>
              <h2>Country monthly weather loss</h2>
            </div>
          </div>
          <div class="monthly-chart">
            <div class="month-row" *ngFor="let item of monthlyLoss">
              <div class="row-head">
                <span class="month">{{ item.month }}</span>
                <span class="note">{{ item.reason }}</span>
              </div>
              <div class="bar-track">
                <div class="bar" [style.width]="barWidth(item.lossPercent)">
                  <span class="value">{{ item.lossPercent }}%</span>
                </div>
              </div>
              <p class="detail">{{ item.detail }}</p>
            </div>
          </div>
          <p class="summary">
            Highest loss this year: <strong>{{ summary.highest.month }}</strong> ({{ summary.highest.lossPercent }}%,
            {{ summary.highest.reason }}). Current month tracking at {{ headlineKpi.value }}.
          </p>
        </div>

        <div class="card">
          <div class="card-header">
            <div>
              <p class="eyebrow">Map view</p>
              <h2>Province weather loss ({{ selectedMonth }})</h2>
            </div>
          </div>
          <div class="province-grid">
            <div class="province-card" *ngFor="let province of provinceLoss">
              <div class="province-head">
                <span class="province-name">{{ province.province }}</span>
                <span class="pill" [ngClass]="pillClass(province.lossPercent)">{{ province.lossPercent }}%</span>
              </div>
              <p class="reason">{{ province.reason }}</p>
              <div class="mini-bar">
                <div class="fill" [style.width]="barWidth(province.lossPercent)"></div>
              </div>
            </div>
          </div>
          <p class="map-hint">
            Represents weather-driven loss for {{ selectedMonth }}. Use this to prioritize support by province.
          </p>
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
        max-width: 640px;
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

      .kpi-card .kpi-value-row {
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .kpi-value {
        font-size: 26px;
        font-weight: 800;
        color: #0f172a;
      }

      :host-context(.dark) .kpi-value {
        color: #f8fafc;
      }

      .kpi-hint {
        color: #475569;
        margin: 6px 0 0;
      }

      :host-context(.dark) .kpi-hint {
        color: #cbd5e1;
      }

      .pill {
        padding: 6px 10px;
        border-radius: 999px;
        font-weight: 700;
        font-size: 12px;
      }

      .pill.low {
        background: rgba(239, 68, 68, 0.18);
        color: #b91c1c;
      }

      .pill.medium {
        background: rgba(245, 158, 11, 0.18);
        color: #b45309;
      }

      .pill.good {
        background: rgba(22, 163, 74, 0.18);
        color: #0f9d58;
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

      .monthly-chart {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .month-row {
        border: 1px solid rgba(15, 23, 42, 0.08);
        border-radius: 12px;
        padding: 10px 12px;
      }

      :host-context(.dark) .month-row {
        border-color: rgba(255, 255, 255, 0.05);
      }

      .row-head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 6px;
      }

      .note {
        color: #475569;
      }

      :host-context(.dark) .note {
        color: #cbd5e1;
      }

      .bar-track {
        height: 16px;
        background: rgba(15, 23, 42, 0.06);
        border-radius: 10px;
        overflow: hidden;
      }

      :host-context(.dark) .bar-track {
        background: rgba(255, 255, 255, 0.08);
      }

      .bar {
        height: 100%;
        background: linear-gradient(135deg, #ef4444, #f97316);
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding-right: 8px;
        color: #fff;
        font-weight: 700;
      }

      .detail {
        margin: 6px 0 0;
        color: #475569;
        font-size: 13px;
      }

      :host-context(.dark) .detail {
        color: #cbd5e1;
      }

      .summary {
        margin-top: 10px;
        color: #475569;
      }

      :host-context(.dark) .summary {
        color: #cbd5e1;
      }

      .province-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 10px;
      }

      .province-card {
        border: 1px solid rgba(15, 23, 42, 0.08);
        border-radius: 12px;
        padding: 10px 12px;
        background: rgba(248, 250, 252, 0.7);
      }

      :host-context(.dark) .province-card {
        background: rgba(15, 23, 42, 0.6);
        border-color: rgba(255, 255, 255, 0.05);
      }

      .province-head {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .province-name {
        font-weight: 700;
      }

      .reason {
        margin: 6px 0;
        color: #475569;
        font-size: 13px;
      }

      :host-context(.dark) .reason {
        color: #cbd5e1;
      }

      .mini-bar {
        height: 12px;
        background: rgba(15, 23, 42, 0.08);
        border-radius: 8px;
        overflow: hidden;
      }

      :host-context(.dark) .mini-bar {
        background: rgba(255, 255, 255, 0.08);
      }

      .mini-bar .fill {
        height: 100%;
        background: linear-gradient(135deg, #ef4444, #f97316);
      }

      .map-hint {
        margin: 10px 0 0;
        color: #475569;
        font-size: 13px;
      }

      :host-context(.dark) .map-hint {
        color: #cbd5e1;
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
export class WeatherLossComponent {
  showAddDialog = false;
  selectedMonth = 'January';

  readonly headlineKpi = {
    value: '8.4%',
    label: 'Weather loss this month',
    hint: 'Driven by heavy rain in Western and wind in North Western',
  };

  readonly monthlyLoss: MonthlyWeatherLoss[] = [
    { month: 'January', lossPercent: 10, reason: 'Heavy rain + wind', detail: 'Flooded fields and transport delays' },
    { month: 'February', lossPercent: 8, reason: 'Wind + localized rain', detail: 'Storage roof damage in Uva' },
    { month: 'March', lossPercent: 6, reason: 'Heat pockets', detail: 'Spoilage during transit in Eastern' },
    { month: 'April', lossPercent: 5, reason: 'Rain showers', detail: 'Wet storage in Central' },
  ];

  readonly summary = {
    highest: { month: 'January', lossPercent: 10, reason: 'heavy rain + wind' },
  };

  readonly provinceLoss: ProvinceWeatherLoss[] = [
    { province: 'Western', lossPercent: 11, reason: 'HEAVY RAIN' },
    { province: 'Central', lossPercent: 6, reason: 'FLOOD' },
    { province: 'Southern', lossPercent: 5, reason: 'WIND' },
    { province: 'Northern', lossPercent: 7, reason: 'HEAT WAVE' },
    { province: 'Eastern', lossPercent: 6, reason: 'HEAVY RAIN' },
    { province: 'North Western', lossPercent: 8, reason: 'WIND' },
    { province: 'North Central', lossPercent: 5, reason: 'HEAVY RAIN' },
    { province: 'Uva', lossPercent: 6, reason: 'HEAVY RAIN' },
    { province: 'Sabaragamuwa', lossPercent: 5, reason: 'FLOOD' },
  ];

  openAddDialog(): void {
    this.showAddDialog = true;
  }

  closeAddDialog(): void {
    this.showAddDialog = false;
  }

  handleRecordSave(record: NewWeatherLossRecord): void {
    // Hook up to backend/store as needed.
    console.log('Weather loss record submitted', record);
    this.showAddDialog = false;
  }

  barWidth(lossPercent: number): string {
    const width = Math.min(100, lossPercent);
    return `${width}%`;
  }

  pillClass(lossPercent: number): string {
    if (lossPercent >= 10) return 'low';
    if (lossPercent >= 6) return 'medium';
    return 'good';
  }
}
