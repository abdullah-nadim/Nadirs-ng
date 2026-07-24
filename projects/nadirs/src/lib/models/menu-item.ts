/** Aligns with DineX.Contracts.MenuItem / api/menuitems. */
export class MenuItem {
  id = 0;
  restaurantId = 0;
  menuCategoryId = 0;
  name = '';
  description: string | null = null;
  /** Image URL or path (API field). */
  image: string | null = null;
  basePrice = 0;
  onlinePrice: number | null = null;
  availableOnline = false;
  isDiscountable = false;
  isActive = true;
  hasVariations = false;
  /** Display/sort hint used by POS mocks and UI lists. */
  order = 0;
  menuItemVariations: unknown[] = [];

  getImageUrl(): string {
    return this.image?.trim() ? this.image : '';
  }
}
