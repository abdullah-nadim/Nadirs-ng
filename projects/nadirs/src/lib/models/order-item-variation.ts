export class OrderItemVariation {
  variationTypeId: number;
  variationType: string;
  variationValueId: number;
  variationValue: string;
  addedPrice: number;

  constructor() {
    this.variationTypeId = this.variationValueId = this.addedPrice = 0;
    this.variationType = this.variationValue = "";
  }
}
