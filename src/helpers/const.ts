const COUNT_CARDS_PER_PAGE = 9;

const MAX_REVIEWS_COUNT_PER_PAGE = 3;

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
    Review = 'REVIEW',
}

const ratingLevels = [1, 2, 3, 4, 5];

const MonthsDictionary: { [char: string]: string } = {
  'January': 'Января',
  'February': 'Февраля',
  'March': 'Марта',
  'April': 'Апреля',
  'May': 'Мая',
  'June': 'Июня',
  'July': 'Июля',
  'August': 'Августа',
  'September': 'Сентября',
  'October': 'Октября',
  'November': 'Ноября',
  'December': 'Декабря',
} as const;

export {
  COUNT_CARDS_PER_PAGE,
  MAX_REVIEWS_COUNT_PER_PAGE,
  ratingLevels,
  MonthsDictionary,
  AppRoute,
  APIRoute,
  NameSpace
};
