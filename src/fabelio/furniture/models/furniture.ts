
export class Furniture {
  name: string;
  description: string;
  furnitureStyle: string[];
  deliveryTime: string;
  price: number;

  getLimitedDesc(maxChar: number) {
    return this.description.length > maxChar
      ? `${this.description.substring(0, maxChar - 3)}...`
      : this.description;
  }

  hasAnyFurnitureStyles(styles: string[]) {
    return this.furnitureStyle.some(style => styles.includes(style));
  }

  hasIncludeName(name: string) {
    return this.name.toLowerCase().includes(name.toLowerCase());
  }

  hasSuitableDeliveryTime(days: number) {
    return +this.deliveryTime <= days;
  }
}
