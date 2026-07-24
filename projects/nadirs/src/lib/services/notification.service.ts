import { Injectable, inject } from '@angular/core';
import { NgEventBus } from 'ng-event-bus';

export interface Notification {
  id: number;
  message: string;
  timestamp: Date;
  type: 'info' | 'success' | 'warning' | 'error';
  duration?: number;
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private readonly eventBus = inject(NgEventBus);
  private lastId = 0;

  sendNotification(config: {
    message: string;
    type?: 'info' | 'success' | 'warning' | 'error';
    duration?: number;
  }): void {
    const notification: Notification = {
      id: ++this.lastId,
      message: config.message,
      timestamp: new Date(),
      type: config.type || 'info',
      duration: config.duration
    };
    
    this.eventBus.cast('notification', notification);
    
    if (notification.duration) {
      setTimeout(() => {
        this.dismissNotification(notification.id);
      }, notification.duration);
    }
  }

  dismissNotification(id: number): void {
    this.eventBus.cast('notification:dismiss', id);
  }
}
