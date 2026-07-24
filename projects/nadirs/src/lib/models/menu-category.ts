export class MenuCategory {
  id = 0;
  restaurantId = 0;
  name = '';
  description: string | null = null;
  isActive = true;
  /** Client-only sort/display (POS mocks); not required by Admin API. */
  order = 0;
}
