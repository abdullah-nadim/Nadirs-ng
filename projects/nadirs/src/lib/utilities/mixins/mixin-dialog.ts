import { Component, Directive, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Constructor } from './mixin-base';

@Component({
    selector: 'app-confirm-dialog',
    standalone: true,
    imports: [CommonModule],
    template: `
<div class="modal show d-block" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">{{ data.title }}</h5>
        <button type="button" class="btn-close" aria-label="Close" (click)="onCancel()"></button>
      </div>
      <div class="modal-body">
        {{ data.message }}
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" (click)="onCancel()">Cancel</button>
        <button type="button" class="btn btn-primary" (click)="onConfirm()">Confirm</button>
      </div>
    </div>
  </div>
</div>
`})
class ConfirmDialogComponent {
    @Output() confirmed = new EventEmitter<boolean>();
    @Output() cancelled = new EventEmitter<void>();
    
    data: any = {};

    onConfirm() {
        console.log('confirm clicked');
        this.confirmed.emit(true);
    }

    onCancel() {
        this.cancelled.emit();
    }
}

export function DialogMixin<TBase extends Constructor>(Base: TBase) {
    @Directive()
    class Dialog extends Base {
        showConfirmation(message: string): Promise<boolean> {
            return new Promise((resolve) => {
                // Create a temporary component instance
                const confirmComponent = new ConfirmDialogComponent();
                confirmComponent.data = {
                    title: 'Confirmation',
                    message: message,
                };

                // Listen for events
                confirmComponent.confirmed.subscribe(() => {
                    resolve(true);
                });

                confirmComponent.cancelled.subscribe(() => {
                    resolve(false);
                });

                // For now, we'll use a simple approach
                // In a real implementation, you might want to use a service or view container
                const result = window.confirm(message);
                resolve(result);
            });
        }

        // Generic method for showing modals (simplified version)
        showModal<T>(modalComponent: any, data?: any): Promise<T> {
            return new Promise((resolve, reject) => {
                // This is a simplified implementation
                // In practice, you'd want to use a modal service or view container
                console.warn('showModal method needs implementation for Bootstrap modals');
                reject(new Error('Modal not implemented'));
            });
        }
    };
    return class extends Dialog { };
}
