import { makeFakeBasketProducts, makeFakeProduct } from '../../helpers/mock';
import { BasketProducts } from '../../types/basket';
import { Product } from '../../types/product';
import { setBasketModalOpeningStatus, setBasketProducts, setBasketRemoveProductModalOpeningStatus, setBasketSuccessOpeningStatus, setCoupon, setCurrentCatalogProduct, setOrderErrorStatus, setOrderSuccesStatus, setStatusCoupon } from '../action';
import { sendCoupon, sendOrder } from '../api-actions';
import { basketProcess } from './basket-process';

const mockProduct = makeFakeProduct();
const mockBasketProducts = makeFakeBasketProducts();
const mockDiscountPercent = 15;

describe('Reducer: productData', () => {
  it('without additional parameters should return initial state', () => {
    expect(basketProcess.reducer(void 0, { type: 'UNKNOWN_ACTION' }))
      .toEqual({
        isBasketModalOpened: false,
        isBasketRemoveProductModalOpened: false,
        isBasketSuccess: false,
        isCouponPosted: false,
        isOrderSuccess: false,
        isOrderPosted: false,
        isOrderError: false,
        currentCatalogProduct: {} as Product,
        basketProducts: [] as BasketProducts,
        discountPercent: null,
        coupon: ''
      });
  });

  it('should update state when sended order', () => {
    const state = {
      isBasketModalOpened: false,
      isBasketRemoveProductModalOpened: false,
      isBasketSuccess: false,
      isCouponPosted: false,
      isOrderSuccess: false,
      isOrderPosted: false,
      isOrderError: false,
      currentCatalogProduct: {} as Product,
      basketProducts: [] as BasketProducts,
      discountPercent: null,
      coupon: ''
    };
    expect(basketProcess.reducer(state, { type: sendOrder.fulfilled.type }))
      .toEqual({
        isBasketModalOpened: false,
        isBasketRemoveProductModalOpened: false,
        isBasketSuccess: false,
        isCouponPosted: false,
        isOrderSuccess: true,
        isOrderPosted: false,
        isOrderError: false,
        currentCatalogProduct: {} as Product,
        basketProducts: [] as BasketProducts,
        discountPercent: null,
        coupon: ''
      });
  });

  it('should update isOrderSuccess, isOrderPosted, isOrderError  when sendOrder.pending', () => {
    const state = {
      isBasketModalOpened: false,
      isBasketRemoveProductModalOpened: false,
      isBasketSuccess: false,
      isCouponPosted: false,
      isOrderSuccess: false,
      isOrderPosted: false,
      isOrderError: false,
      currentCatalogProduct: {} as Product,
      basketProducts: [] as BasketProducts,
      discountPercent: null,
      coupon: ''
    };
    expect(basketProcess.reducer(state, { type: sendOrder.pending.type }))
      .toEqual({
        isBasketModalOpened: false,
        isBasketRemoveProductModalOpened: false,
        isBasketSuccess: false,
        isCouponPosted: false,
        isOrderSuccess: false,
        isOrderPosted: true,
        isOrderError: false,
        currentCatalogProduct: {} as Product,
        basketProducts: [] as BasketProducts,
        discountPercent: null,
        coupon: ''
      });
  });

  it('should update isOrderSuccess, isOrderPosted, isOrderError  when sendOrder.rejected', () => {
    const state = {
      isBasketModalOpened: false,
      isBasketRemoveProductModalOpened: false,
      isBasketSuccess: false,
      isCouponPosted: false,
      isOrderSuccess: false,
      isOrderPosted: false,
      isOrderError: false,
      currentCatalogProduct: {} as Product,
      basketProducts: [] as BasketProducts,
      discountPercent: null,
      coupon: ''
    };
    expect(basketProcess.reducer(state, { type: sendOrder.rejected.type }))
      .toEqual({
        isBasketModalOpened: false,
        isBasketRemoveProductModalOpened: false,
        isBasketSuccess: false,
        isCouponPosted: false,
        isOrderSuccess: false,
        isOrderPosted: false,
        isOrderError: true,
        currentCatalogProduct: {} as Product,
        basketProducts: [] as BasketProducts,
        discountPercent: null,
        coupon: ''
      });
  });

  it('should update isBasketModalOpened when dispatch setBasketModalOpeningStatus', () => {
    const state = {
      isBasketModalOpened: false,
      isBasketRemoveProductModalOpened: false,
      isBasketSuccess: false,
      isCouponPosted: false,
      isOrderSuccess: false,
      isOrderPosted: false,
      isOrderError: false,
      currentCatalogProduct: {} as Product,
      basketProducts: [] as BasketProducts,
      discountPercent: null,
      coupon: ''
    };
    expect(basketProcess.reducer(state, setBasketModalOpeningStatus(true)))
      .toEqual({
        isBasketModalOpened: true,
        isBasketRemoveProductModalOpened: false,
        isBasketSuccess: false,
        isCouponPosted: false,
        isOrderSuccess: false,
        isOrderPosted: false,
        isOrderError: false,
        currentCatalogProduct: {} as Product,
        basketProducts: [] as BasketProducts,
        discountPercent: null,
        coupon: ''
      });
  });

  it('should update isBasketSuccess when dispatch setBasketSuccessOpeningStatus', () => {
    const state = {
      isBasketModalOpened: false,
      isBasketRemoveProductModalOpened: false,
      isBasketSuccess: false,
      isCouponPosted: false,
      isOrderSuccess: false,
      isOrderPosted: false,
      isOrderError: false,
      currentCatalogProduct: {} as Product,
      basketProducts: [] as BasketProducts,
      discountPercent: null,
      coupon: ''
    };
    expect(basketProcess.reducer(state, setBasketSuccessOpeningStatus(true)))
      .toEqual({
        isBasketModalOpened: false,
        isBasketRemoveProductModalOpened: false,
        isBasketSuccess: true,
        isCouponPosted: false,
        isOrderSuccess: false,
        isOrderPosted: false,
        isOrderError: false,
        currentCatalogProduct: {} as Product,
        basketProducts: [] as BasketProducts,
        discountPercent: null,
        coupon: ''
      });
  });

  it('should update currentCatalogProduct when dispatch setCurrentCatalogProduct', () => {
    const state = {
      isBasketModalOpened: false,
      isBasketRemoveProductModalOpened: false,
      isBasketSuccess: false,
      isCouponPosted: false,
      isOrderSuccess: false,
      isOrderPosted: false,
      isOrderError: false,
      currentCatalogProduct: {} as Product,
      basketProducts: [] as BasketProducts,
      discountPercent: null,
      coupon: ''
    };
    expect(basketProcess.reducer(state, setCurrentCatalogProduct(mockProduct)))
      .toEqual({
        isBasketModalOpened: false,
        isBasketRemoveProductModalOpened: false,
        isBasketSuccess: false,
        isCouponPosted: false,
        isOrderSuccess: false,
        isOrderPosted: false,
        isOrderError: false,
        currentCatalogProduct: mockProduct,
        basketProducts: [] as BasketProducts,
        discountPercent: null,
        coupon: ''
      });
  });

  it('should update isBasketRemoveProductModalOpened when dispatch setBasketRemoveProductModalOpeningStatus', () => {
    const state = {
      isBasketModalOpened: false,
      isBasketRemoveProductModalOpened: false,
      isBasketSuccess: false,
      isCouponPosted: false,
      isOrderSuccess: false,
      isOrderPosted: false,
      isOrderError: false,
      currentCatalogProduct: {} as Product,
      basketProducts: [] as BasketProducts,
      discountPercent: null,
      coupon: ''
    };
    expect(basketProcess.reducer(state, setBasketRemoveProductModalOpeningStatus(true)))
      .toEqual({
        isBasketModalOpened: false,
        isBasketRemoveProductModalOpened: true,
        isBasketSuccess: false,
        isCouponPosted: false,
        isOrderSuccess: false,
        isOrderPosted: false,
        isOrderError: false,
        currentCatalogProduct: {} as Product,
        basketProducts: [] as BasketProducts,
        discountPercent: null,
        coupon: ''
      });
  });

  it('should update basketProducts when dispatch setBasketProducts', () => {
    const state = {
      isBasketModalOpened: false,
      isBasketRemoveProductModalOpened: false,
      isBasketSuccess: false,
      isCouponPosted: false,
      isOrderSuccess: false,
      isOrderPosted: false,
      isOrderError: false,
      currentCatalogProduct: {} as Product,
      basketProducts: [] as BasketProducts,
      discountPercent: null,
      coupon: ''
    };
    expect(basketProcess.reducer(state, setBasketProducts(mockBasketProducts)))
      .toEqual({
        isBasketModalOpened: false,
        isBasketRemoveProductModalOpened: false,
        isBasketSuccess: false,
        isCouponPosted: false,
        isOrderSuccess: false,
        isOrderPosted: false,
        isOrderError: false,
        currentCatalogProduct: {} as Product,
        basketProducts: mockBasketProducts,
        discountPercent: null,
        coupon: ''
      });
  });

  it('should update state when sended coupon', () => {
    const state = {
      isBasketModalOpened: false,
      isBasketRemoveProductModalOpened: false,
      isBasketSuccess: false,
      isCouponPosted: false,
      isOrderSuccess: false,
      isOrderPosted: false,
      isOrderError: false,
      currentCatalogProduct: {} as Product,
      basketProducts: [] as BasketProducts,
      discountPercent: null,
      coupon: ''
    };
    expect(basketProcess.reducer(state, { type: sendCoupon.fulfilled.type, payload: mockDiscountPercent }))
      .toEqual({
        isBasketModalOpened: false,
        isBasketRemoveProductModalOpened: false,
        isBasketSuccess: false,
        isCouponPosted: false,
        isOrderSuccess: false,
        isOrderPosted: false,
        isCouponValid: true,
        isOrderError: false,
        currentCatalogProduct: {} as Product,
        basketProducts: [] as BasketProducts,
        discountPercent: mockDiscountPercent,
        coupon: ''
      });
  });

  it('should update isCouponPosted, isOrderError  when sendCoupon.pending', () => {
    const state = {
      isBasketModalOpened: false,
      isBasketRemoveProductModalOpened: false,
      isBasketSuccess: false,
      isCouponPosted: false,
      isOrderSuccess: false,
      isOrderPosted: false,
      isOrderError: false,
      currentCatalogProduct: {} as Product,
      basketProducts: [] as BasketProducts,
      discountPercent: null,
      coupon: ''
    };
    expect(basketProcess.reducer(state, { type: sendCoupon.pending.type }))
      .toEqual({
        isBasketModalOpened: false,
        isBasketRemoveProductModalOpened: false,
        isBasketSuccess: false,
        isCouponPosted: true,
        isOrderSuccess: false,
        isOrderPosted: false,
        isOrderError: false,
        currentCatalogProduct: {} as Product,
        basketProducts: [] as BasketProducts,
        discountPercent: null,
        coupon: ''
      });
  });

  it('should update coupon, discountPercent, isCouponPosted, isCouponValid when sendCoupon.rejected', () => {
    const state = {
      isBasketModalOpened: false,
      isBasketRemoveProductModalOpened: false,
      isBasketSuccess: false,
      isCouponPosted: false,
      isOrderSuccess: false,
      isOrderPosted: false,
      isOrderError: false,
      currentCatalogProduct: {} as Product,
      basketProducts: [] as BasketProducts,
      discountPercent: null,
      coupon: ''
    };
    expect(basketProcess.reducer(state, { type: sendCoupon.rejected.type }))
      .toEqual({
        isBasketModalOpened: false,
        isBasketRemoveProductModalOpened: false,
        isBasketSuccess: false,
        isCouponPosted: false,
        isCouponValid: false,
        isOrderSuccess: false,
        isOrderPosted: false,
        isOrderError: false,
        currentCatalogProduct: {} as Product,
        basketProducts: [] as BasketProducts,
        discountPercent: null,
        coupon: ''
      });
  });

  it('should update coupon when dispatch setCoupon', () => {
    const state = {
      isBasketModalOpened: false,
      isBasketRemoveProductModalOpened: false,
      isBasketSuccess: false,
      isCouponPosted: false,
      isOrderSuccess: false,
      isOrderPosted: false,
      isOrderError: false,
      currentCatalogProduct: {} as Product,
      basketProducts: [] as BasketProducts,
      discountPercent: null,
      coupon: ''
    };
    expect(basketProcess.reducer(state, setCoupon('coupon')))
      .toEqual({
        isBasketModalOpened: false,
        isBasketRemoveProductModalOpened: false,
        isBasketSuccess: false,
        isCouponPosted: false,
        isOrderSuccess: false,
        isOrderPosted: false,
        isOrderError: false,
        currentCatalogProduct: {} as Product,
        basketProducts: [] as BasketProducts,
        discountPercent: null,
        coupon: 'coupon'
      });
  });

  it('should update isOrderSuccess when dispatch setOrderSuccesStatus', () => {
    const state = {
      isBasketModalOpened: false,
      isBasketRemoveProductModalOpened: false,
      isBasketSuccess: false,
      isCouponPosted: false,
      isOrderSuccess: false,
      isOrderPosted: false,
      isOrderError: false,
      currentCatalogProduct: {} as Product,
      basketProducts: [] as BasketProducts,
      discountPercent: null,
      coupon: ''
    };
    expect(basketProcess.reducer(state, setOrderSuccesStatus(true)))
      .toEqual({
        isBasketModalOpened: false,
        isBasketRemoveProductModalOpened: false,
        isBasketSuccess: false,
        isCouponPosted: false,
        isOrderSuccess: true,
        isOrderPosted: false,
        isOrderError: false,
        currentCatalogProduct: {} as Product,
        basketProducts: [] as BasketProducts,
        discountPercent: null,
        coupon: ''
      });
  });

  it('should update isOrderError when dispatch setOrderErrorStatus', () => {
    const state = {
      isBasketModalOpened: false,
      isBasketRemoveProductModalOpened: false,
      isBasketSuccess: false,
      isCouponPosted: false,
      isOrderSuccess: false,
      isOrderPosted: false,
      isOrderError: false,
      currentCatalogProduct: {} as Product,
      basketProducts: [] as BasketProducts,
      discountPercent: null,
      coupon: ''
    };
    expect(basketProcess.reducer(state, setOrderErrorStatus(true)))
      .toEqual({
        isBasketModalOpened: false,
        isBasketRemoveProductModalOpened: false,
        isBasketSuccess: false,
        isCouponPosted: false,
        isOrderSuccess: false,
        isOrderPosted: false,
        isOrderError: true,
        currentCatalogProduct: {} as Product,
        basketProducts: [] as BasketProducts,
        discountPercent: null,
        coupon: ''
      });
  });

  it('should update isCouponValid when dispatch setStatusCoupon', () => {
    const state = {
      isBasketModalOpened: false,
      isBasketRemoveProductModalOpened: false,
      isBasketSuccess: false,
      isCouponPosted: false,
      isOrderSuccess: false,
      isOrderPosted: false,
      isOrderError: false,
      currentCatalogProduct: {} as Product,
      basketProducts: [] as BasketProducts,
      discountPercent: null,
      coupon: ''
    };
    expect(basketProcess.reducer(state, setStatusCoupon(true)))
      .toEqual({
        isBasketModalOpened: false,
        isBasketRemoveProductModalOpened: false,
        isBasketSuccess: false,
        isCouponPosted: false,
        isOrderSuccess: false,
        isOrderPosted: false,
        isCouponValid: true,
        isOrderError: false,
        currentCatalogProduct: {} as Product,
        basketProducts: [] as BasketProducts,
        discountPercent: null,
        coupon: ''
      });
  });
});
