import { OrderItemVariation } from './order-item-variation';

export class OrderItem {
  id: number;
  menuItemId: number;
  menuItemName: string;
  quantity: number;
  basePrice: number;
  variationPrice: number;
  subTotal: number;
  vat: number;
  total: number;
  orderItemVariations: OrderItemVariation[];

  constructor() {
    this.id = this.menuItemId = this.quantity = this.basePrice = this.variationPrice = 0;
    this.subTotal = this.vat = this.total = 0;
    this.menuItemName = "";
    this.orderItemVariations = [];
  }
}
