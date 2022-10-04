enum AppRoute {
    Main = '/',
    Products = '/cameras',
    ProductById = '/cameras/:id',
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

export { ratingLevels, AppRoute, APIRoute, NameSpace };
