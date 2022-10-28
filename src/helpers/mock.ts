import { Product, Products } from '../types/product';
import { Promo } from '../types/promo';
import { Review, Reviews } from '../types/review';
import { ReviewPost } from '../types/review-post';

const mockPageNumber = 1;

const mockRatingLevels = [1, 2, 3, 4, 5];

const makeFakePromo = (): Promo => ({
  id: 4,
  name: 'string',
  previewImg: 'string2',
  previewImg2x: 'string3',
  previewImgWebp: 'string4',
  previewImgWebp2x: 'string5'
} as Promo);

const makeFakeProduct = (): Product => ({
  id: 4,
  name: 'Тестовое название камеры',
  vendorCode: 'тест vendorCode',
  type: 'тест type',
  category: 'тест category',
  description: 'тест description',
  level: 'тест level',
  rating: 5,
  price: 123,
  previewImg: 'тест previewImg',
  previewImg2x: 'тест previewImg2x',
  previewImgWebp: 'тест previewImgWebp',
  previewImgWebp2x: 'тест previewImgWebp2x',
  reviewCount: 32
} as Product);

const makeFakeProducts = (): Products => Array.from({ length: 5 }, () => makeFakeProduct());

const makeFakeReview = (): Review => ({
  id: '1',
  userName: 'userName 1',
  advantage: 'advantage 1',
  disadvantage: 'disadvantage 1',
  review: 'review 1',
  rating: 'rating 1',
  createAt: '2022-10-28T12:25:36.939Z',
  cameraId: 'cameraId 1'
} as unknown as Review);

const makeFakePostedReview = (): ReviewPost => ({
  cameraId: 1,
  userName: 'userName 1',
  advantage: 'advantage 1',
  disadvantage: 'disadvantage 1',
  review: 'review 1',
  rating: 'rating 1',

} as unknown as ReviewPost);

const makeFakeReviews = (): Reviews => Array.from({ length: 5 }, () => makeFakeReview());

export {
  mockPageNumber,
  mockRatingLevels,
  makeFakePromo,
  makeFakeProduct,
  makeFakeProducts,
  makeFakeReview,
  makeFakeReviews,
  makeFakePostedReview
};
