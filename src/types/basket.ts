import { Product } from './product';

type BasketProduct = {
    productCard: Product;
    countProductCards: number;
}

type BasketProducts = BasketProduct[];

export type { BasketProduct, BasketProducts };
