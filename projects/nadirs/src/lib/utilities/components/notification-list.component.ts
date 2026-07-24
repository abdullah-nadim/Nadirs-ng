import { Component, OnInit, inject, OnDestroy } from '@angular/core';
import { NgEventBus } from 'ng-event-bus';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { Notification } from '../../services/notification.service';

@Component({
  selector: 'app-notification-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngFor="let notification of notifications; trackBy: trackById" 
         class="notification" 
         [class]="'notification-' + (notification.type || 'info')">
      <div>
        {{ notification.message }} ({{ notification.timestamp | date:'shortTime' }})
        <button (click)="dismiss(notification.id)">×</button>
      </div>
    </div>
    <p *ngIf="notifications.length === 0"></p>
  `,
  styles: [`
    .notification {
      margin: 8px 0;
      padding: 8px;
      border-radius: 4px;
      display: flex;
      justify-content: space-between;
    }
    .notification-info {
      border: 1px solid #ccc;
      background: #f0f8ff;
    }
    .notification-success {
      border: 1px solid #4CAF50;
      background: #e8f5e9;
    }
    .notification-warning {
      border: 1px solid #FFC107;
      background: #fff8e1;
    }
    .notification-error {
      border: 1px solid #F44336;
      background: #ffebee;
    }
    .notification button {
      background: none;
      border: none;
      cursor: pointer;
      font-size: 1.2em;
    }
  `]
})
export class NotificationListComponent implements OnInit, OnDestroy {
  private readonly eventBus = inject(NgEventBus);
  private subscriptions: Subscription[] = [];
  
  notifications: Notification[] = [];

  ngOnInit() {
    // Subscribe to new notifications with proper typing
    this.subscriptions.push(
      this.eventBus.on<Notification>('notification').subscribe((event) => {
        if (event?.data) {
          // Ensure the timestamp is a Date object
          const notification = {
            ...event.data,
            timestamp: new Date(event.data.timestamp)
          };
          this.notifications = [...this.notifications, notification];
        }
      })
    );
    
    // Subscribe to dismiss events
    this.subscriptions.push(
      this.eventBus.on<number>('notification:dismiss').subscribe((event) => {
        if (event?.data) {
          this.notifications = this.notifications.filter(n => n.id !== event.data);
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  dismiss(id: number): void {
    this.eventBus.cast('notification:dismiss', id);
  }

  trackById(index: number, notification: Notification): number {
    return notification.id;
  }
}
