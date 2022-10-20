const COUNT_CARDS_PER_PAGE = 9;

const MAX_REVIEWS_COUNT_PER_PAGE = 3;

const COUNT_SIMILAR_CARDS_PER_PAGE = 3;

const MIN_COMMENT_LENGTH = 5;

const ERROR_MESSAGE_TIME = 2000;

const DEFAULT_PRODUCT_DETAILS_SHOWN = 'description';

enum AppRoute {
    Main = '/',
    Catalog = '/catalog/',
    Products = '/catalog/pages/:pageNumber',
    DescriptionProductById = '/catalog/pages/:pageNumber/:id/description',
    SpecificationProductById = '/catalog/pages/:pageNumber/:id/specification',
    Basket = '/basket',
    NotFound = '*',
}

enum APIRoute {
    Promo = '/promo',
    Products = '/cameras',
    Reviews = '/reviews'
}

enum NameSpace {
    Data = 'DATA',
    Review = 'REVIEW',
    User = 'USER'
}

enum ProductDetailsType {
  Description = 'description',
  Specification = 'specification',
}

const ratingLevels = [1, 2, 3, 4, 5];

const RatingValues =
  [
    {
      Title: 'Отлично',
      Value: 5
    },
    {
      Title: 'Хорошо',
      Value: 4
    },
    {
      Title: 'Нормально',
      Value: 3
    },
    {
      Title: 'Плохо',
      Value: 2
    },
    {
      Title: 'Ужасно',
      Value: 1
    }
  ];

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
  MIN_COMMENT_LENGTH,
  COUNT_SIMILAR_CARDS_PER_PAGE,
  ERROR_MESSAGE_TIME,
  DEFAULT_PRODUCT_DETAILS_SHOWN,
  ratingLevels,
  MonthsDictionary,
  RatingValues,
  AppRoute,
  APIRoute,
  NameSpace,
  ProductDetailsType,
};
