import { changeFormatNumber } from '../../helpers/utils';
import { useAppDispatch } from '../../hooks';
import { setBasketModalOpeningStatus, setCurrentCatalogProduct } from '../../store/action';
import { Product } from '../../types/product';
import Rating from '../rating/rating';
import TabProduct from '../tab-product/tab-product';

type ProductDetailedProps = {
  productDetailed: Product;
}

const ProductDetailed = ({ productDetailed }: ProductDetailedProps): JSX.Element => {
  const dispatch = useAppDispatch();

  const {
    name,
    previewImg,
    previewImg2x,
    previewImgWebp,
    previewImgWebp2x,
    price,
  } = productDetailed;

  return (
    <section className="product">
      <div className="container">
        <div className="product__img">
          <picture>
            <source type="image/webp" srcSet={`/${previewImg}, /${previewImgWebp}, /${previewImgWebp2x} 2x`} />
            <img src={`/${previewImg}`} srcSet={`/${previewImg2x}`} width="560" height="480" alt={name} />
          </picture>
        </div>
        <div className="product__content">
          <h1 className="title title--h3">{name}</h1>
          <Rating
            productCard={productDetailed}
          />
          <p className="product__price"><span className="visually-hidden">Цена:</span>{changeFormatNumber(price)} ₽</p>
          <button
            className="btn btn--purple"
            type="button"
            onClick={() => {
              dispatch(setCurrentCatalogProduct(productDetailed));
              dispatch(setBasketModalOpeningStatus(true));
            }}
          >
            <svg width="24" height="16" aria-hidden="true">
              <use xlinkHref="#icon-add-basket"></use>
            </svg>Добавить в корзину
          </button>
          <TabProduct
            productDetailed={productDetailed}
          />
        </div>
      </div>
    </section>
  );
};

export default ProductDetailed;
