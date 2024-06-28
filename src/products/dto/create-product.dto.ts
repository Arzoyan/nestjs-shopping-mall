export class CreateProductDto {
  readonly title: string;
  readonly description: string;
  readonly sku: string;
  readonly price: number;
  readonly categoryId: string;
}
