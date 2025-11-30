import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  template: `
    <section class="page">
      <div class="page-header">
        <div>
          <p class="eyebrow">National overview</p>
          <h1>Food & Nutrition Dashboard</h1>
          <p class="lede">
            Live snapshot across production, weather loss, human capital risk, and latest alerts.
          </p>
        </div>
        <div class="header-actions">
          <button mat-raised-button color="primary">Add widget</button>
          <button mat-stroked-button color="primary">Export</button>
        </div>
      </div>

      <div class="kpi-grid">
        <mat-card class="kpi-card">
          <p class="kpi-label">Total national food production (this month)</p>
          <div class="kpi-value-row">
            <span class="kpi-value">{{ totalProductionThisMonth | number }} t</span>
          </div>
          <p class="kpi-hint">All provinces aggregated</p>
        </mat-card>
        <mat-card class="kpi-card">
          <p class="kpi-label">Total % weather-related loss (this month)</p>
          <div class="kpi-value-row">
            <span class="kpi-value">{{ weatherLossPercent | number : '1.0-1' }}%</span>
          </div>
          <p class="kpi-hint">Loss vs expected production</p>
        </mat-card>
        <mat-card class="kpi-card">
          <p class="kpi-label">Number of red provinces (production)</p>
          <div class="kpi-value-row">
            <span class="kpi-value">{{ redProvinceCount }}</span>
          </div>
          <p class="kpi-hint">Flagged as LOW production</p>
        </mat-card>
        <mat-card class="kpi-card">
          <p class="kpi-label">Number of age groups at risk (nutrition)</p>
          <div class="kpi-value-row">
            <span class="kpi-value">{{ ageGroupsAtRisk }}</span>
          </div>
          <p class="kpi-hint">Based on latest nutrition scores</p>
        </mat-card>
      </div>

      <div class="grid two-col">
        <mat-card class="chart-card">
          <div class="card-header">
            <div>
              <p class="eyebrow">Mini Food Production Chart</p>
              <h3>Total food production last 12 months</h3>
            </div>
          </div>
          <div class="bar-chart small">
            <div class="bar-row" *ngFor="let item of productionTimeline">
              <div class="label">{{ item.month }}</div>
              <div class="bar-track">
                <div
                  class="bar"
                  [style.width]="(item.total / maxProductionForSpark) * 100 + '%'"
                >
                  <span class="value">{{ item.total | number }} t</span>
                </div>
              </div>
            </div>
          </div>
        </mat-card>

        <mat-card class="chart-card">
          <div class="card-header">
            <div>
              <p class="eyebrow">Mini Human Capital Chart</p>
              <h3>Nutrition score by age group</h3>
            </div>
          </div>
          <div class="stacked-bars">
            <div class="stacked-row" *ngFor="let item of humanCapitalScores">
              <span class="label">{{ item.group }}</span>
              <div class="stack-track">
                <div
                  class="stack-fill"
                  [style.width]="item.score + '%'"
                  [class.low]="item.score < 50"
                  [class.medium]="item.score >= 50 && item.score < 75"
                  [class.high]="item.score >= 75"
                >
                  <span class="value">{{ item.score | number : '1.0-1' }}%</span>
                </div>
              </div>
            </div>
          </div>
        </mat-card>
      </div>

      <div class="grid two-col">
        <mat-card class="alerts-card">
          <div class="card-header">
            <div>
              <p class="eyebrow">Mini Alerts Panel</p>
              <h3>Latest alerts</h3>
            </div>
          </div>
          <ul class="alerts-list">
            <li *ngFor="let alert of alerts">{{ alert }}</li>
          </ul>
        </mat-card>

        <mat-card class="links-card">
          <div class="card-header">
            <div>
              <p class="eyebrow">Quick Links</p>
              <h3>Jump to views</h3>
            </div>
          </div>
          <div class="link-buttons">
            <button mat-raised-button color="primary">Food Manufacturing View</button>
            <button mat-raised-button color="primary">Human Capital View</button>
            <button mat-raised-button color="primary">Alerts View</button>
            <button mat-raised-button color="primary">Food Loss View</button>
          </div>
        </mat-card>
      </div>
    </section>
  `,
  styles: [
    `
      .page {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }

      .header-actions {
        display: flex;
        gap: 8px;
      }

      .page-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 16px;
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
      }

      :host-context(.dark) .page .lede {
        color: #cbd5e1;
      }

      .kpi-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        gap: 12px;
      }

      .kpi-card {
        padding: 14px 16px;
      }

      .kpi-label {
        margin: 0 0 6px;
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: #0b8f61;
      }

      .kpi-value-row {
        display: flex;
        align-items: baseline;
        gap: 8px;
      }

      .kpi-value {
        font-size: 26px;
        font-weight: 800;
        color: #0f172a;
      }

      .kpi-hint {
        margin: 6px 0 0;
        color: #475569;
        font-size: 12px;
      }

      :host-context(.dark) .kpi-value {
        color: #f8fafc;
      }

      :host-context(.dark) .kpi-hint {
        color: #cbd5e1;
      }

      .grid.two-col {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 12px;
      }

      .chart-card,
      .alerts-card,
      .links-card {
        padding: 14px 16px;
      }

      .card-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 10px;
      }

      .card-header h3 {
        margin: 4px 0 0;
      }

      .bar-chart.small {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .bar-row {
        display: grid;
        grid-template-columns: 70px 1fr;
        align-items: center;
        gap: 8px;
      }

      .bar-track {
        position: relative;
        background: rgba(15, 23, 42, 0.06);
        border-radius: 999px;
        overflow: hidden;
      }

      :host-context(.dark) .bar-track {
        background: rgba(255, 255, 255, 0.08);
      }

      .bar {
        background: linear-gradient(135deg, #22c55e, #16a34a);
        color: #fff;
        padding: 6px 10px;
        border-radius: 999px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        min-width: 12%;
        transition: width 0.2s ease;
      }

      .bar .value {
        font-weight: 700;
      }

      .stacked-bars {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }

      .stacked-row {
        display: grid;
        grid-template-columns: 140px 1fr;
        gap: 8px;
        align-items: center;
      }

      .stack-track {
        background: rgba(15, 23, 42, 0.06);
        border-radius: 999px;
        overflow: hidden;
      }

      :host-context(.dark) .stack-track {
        background: rgba(255, 255, 255, 0.08);
      }

      .stack-fill {
        display: flex;
        justify-content: flex-end;
        padding: 6px 10px;
        color: #fff;
        font-weight: 700;
        border-radius: 999px;
        background: #16a34a;
      }

      .stack-fill.low {
        background: #ef4444;
      }

      .stack-fill.medium {
        background: #f59e0b;
      }

      .stack-fill.high {
        background: #22c55e;
      }

      .alerts-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .alerts-list li {
        padding: 10px 12px;
        border-radius: 12px;
        background: rgba(239, 68, 68, 0.08);
        color: #b91c1c;
        font-weight: 700;
      }

      :host-context(.dark) .alerts-list li {
        background: rgba(239, 68, 68, 0.2);
        color: #fecdd3;
      }

      .link-buttons {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
        gap: 10px;
      }

      .label {
        font-weight: 700;
        color: #0f172a;
      }

      :host-context(.dark) .label {
        color: #f8fafc;
      }
    `,
  ],
})
export class DashboardComponent {
  totalProductionThisMonth = 186_400;
  weatherLossPercent = 4.8;
  redProvinceCount = 3;
  ageGroupsAtRisk = 2;

  productionTimeline = [
    { month: 'Jan', total: 152300 },
    { month: 'Feb', total: 148900 },
    { month: 'Mar', total: 158400 },
    { month: 'Apr', total: 162100 },
    { month: 'May', total: 168200 },
    { month: 'Jun', total: 171500 },
    { month: 'Jul', total: 175900 },
    { month: 'Aug', total: 180200 },
    { month: 'Sep', total: 182700 },
    { month: 'Oct', total: 186400 },
    { month: 'Nov', total: 184900 },
    { month: 'Dec', total: 190100 },
  ];

  humanCapitalScores = [
    { group: 'Age 0-1', score: 68 },
    { group: 'Age 1-5', score: 54 },
    { group: 'Age 6-12', score: 72 },
    { group: 'Age 13-18', score: 77 },
  ];

  alerts = [
    'Low vegetable production in Uva',
    'High under-nutrition risk age 1-5 in Northern',
    'Milk production trending down in Northern',
    'Weather loss above threshold in Eastern',
  ];

  get maxProductionForSpark(): number {
    return Math.max(...this.productionTimeline.map((p) => p.total), 1);
  }
}
