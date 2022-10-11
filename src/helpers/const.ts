const COUNT_CARDS_PER_PAGE = 9;

enum AppRoute {
    Main = '/',
    Catalog = '/catalog/',
    Products = '/catalog/:pageNumber',
    ProductById = '/catalog/:pageNumber/:id',
    Basket = '/orders',
}

enum APIRoute {
    Promo = '/promo',
    Products = '/cameras',
}

enum NameSpace {
    Data = 'DATA',
}

const ratingLevels = [1, 2, 3, 4, 5];

export {
  COUNT_CARDS_PER_PAGE,
  ratingLevels,
  AppRoute,
  APIRoute,
  NameSpace
};
