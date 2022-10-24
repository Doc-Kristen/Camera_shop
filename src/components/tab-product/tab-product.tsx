import { useLocation } from 'react-router-dom';
import browserHistory from '../../browser-history';
import { ProductDetailsType } from '../../helpers/const';
import { Product } from '../../types/product';

type TabProductProps = {
  productDetailed: Product;
}

const TabProduct = ({ productDetailed }: TabProductProps): JSX.Element => {

  const location = useLocation();

  const userLocation = location.pathname
    .replace(/\/$/, '')
    .split('/');

  const selectDetails = () => {
    if (userLocation.includes('description')) {
      return 'description';
    }
    if (userLocation.includes('specification')) {
      return 'specification';
    }
    return '*';
  };

  const selectedDetails = selectDetails();

  const {
    vendorCode,
    type,
    category,
    description,
    level,
  } = productDetailed;

  const onClickButton = () => {
    if (selectedDetails === ProductDetailsType.Description) {
      browserHistory.push('specification');
    }
    if (selectedDetails === ProductDetailsType.Specification) {
      browserHistory.push('description');
    }
  };

  return (
    <div className="tabs product__tabs">
      <div className="tabs__controls product__tabs-controls">
        <button
          className={`tabs__control ${selectedDetails === 'specification' ? 'is-active' : ''}`}
          type="button"
          onClick={onClickButton}
          data-testid='specification-button'
        >Характеристики
        </button>
        <button
          className={`tabs__control ${selectedDetails === 'description' ? 'is-active' : ''}`}
          type="button"
          onClick={onClickButton}
          data-testid='description-button'
        >Описание
        </button>
      </div>
      <div className="tabs__content">
        <div className={`tabs__element ${selectedDetails === 'specification' ? 'is-active' : ''}`}>
          <ul className="product__tabs-list">
            <li className="item-list"><span className="item-list__title">Артикул:</span>
              <p className="item-list__text">{vendorCode}</p>
            </li>
            <li className="item-list"><span className="item-list__title">Категория:</span>
              <p className="item-list__text">{category}</p>
            </li>
            <li className="item-list"><span className="item-list__title">Тип камеры:</span>
              <p className="item-list__text">{type}</p>
            </li>
            <li className="item-list"><span className="item-list__title">Уровень:</span>
              <p className="item-list__text">{level}</p>
            </li>
          </ul>
        </div>
        <div className={`tabs__element ${selectedDetails === 'description' ? 'is-active' : ''}`}>
          <div className="product__tabs-text">
            <p>{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabProduct;
