const MIN_COMMENT_LENGTH = 5;

const DEFAULT_PAGE = 1;

const ERROR_MESSAGE_TIME = 2000;

const DEFAULT_PRODUCTS_COUNT_PER_PAGE = 9;

const DEFAULT_STEP_PAGINATION = 1;

const DEFAULT_PRODUCT_DETAILS_SHOWN = 'description';

const enum Pagination {
  CountCards = 9,
  CountSimilarCards = 3,
  CountReviews = 3
}

enum AppRoute {
  Main = '/',
  Catalog = '/catalog/',
  Products = '/catalog/page_:pageNumber',
  DescriptionProductById = '/catalog/:id/description',
  SpecificationProductById = '/catalog/:id/specification',
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
  User = 'USER',
  Search = 'SEARCH',
  Path = 'PATH'
}

enum ProductDetailsType {
  Description = 'description',
  Specification = 'specification',
}

enum QueryParameterType {
  Sort = '_sort',
  Order = '_order',
  Page = '_page',
  Limit = '_limit',
  Type = 'type',
  Category = 'category',
  Level = 'level'
}

enum SortingType {
  Price = 'price',
  Rating = 'rating'
}

enum OrderType {
  Desc = 'desc',
  Asc = 'asc'
}

const productFilterType = {
  'category': [
    {
      Name: 'photocamera',
      Label: 'Фотоаппарат'
    },
    {
      Name: 'videocamera',
      Label: 'Видеокамера'
    }
  ],
  'type':
    [
      {
        Name: 'digital',
        Label: 'Цифровая'
      },
      {
        Name: 'film',
        Label: 'Плёночная'
      },
      {
        Name: 'snapshot',
        Label: 'Моментальная'
      },
      {
        Name: 'collection',
        Label: 'Коллекционная'
      }
    ],
  'level':
    [
      {
        Name: 'zero',
        Label: 'Нулевой'
      },
      {
        Name: 'non-professional',
        Label: 'Любительский'
      },
      {
        Name: 'professional',
        Label: 'Профессиональный'
      }
    ],

} as const;

const ratingLevels = [1, 2, 3, 4, 5];

const ratingValues =
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
  MIN_COMMENT_LENGTH,
  ERROR_MESSAGE_TIME,
  DEFAULT_PRODUCT_DETAILS_SHOWN,
  DEFAULT_PAGE,
  ratingLevels,
  MonthsDictionary,
  ratingValues,
  DEFAULT_PRODUCTS_COUNT_PER_PAGE,
  DEFAULT_STEP_PAGINATION,
  productFilterType,
  AppRoute,
  APIRoute,
  NameSpace,
  ProductDetailsType,
  QueryParameterType,
  Pagination,
  SortingType,
  OrderType,
};
