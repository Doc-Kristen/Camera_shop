import { useState } from 'react';
import { Product } from '../../types/product';

type TabProductProps = {
    productDetailed: Product;
}

const TabProduct = ({ productDetailed }: TabProductProps): JSX.Element => {
  const {
    vendorCode,
    type,
    category,
    description,
    level,
  } = productDetailed;

  const [specificationProduct, setSpecificationProduct] = useState(false);
  const [descriptionProduct, setDescriptionProduct] = useState(true);

  const onClickButton = () => {
    if (descriptionProduct) {
      setDescriptionProduct(false);
      setSpecificationProduct(true);
    }
    if (specificationProduct) {
      setSpecificationProduct(false);
      setDescriptionProduct(true);
    }
  };

  return (
    <div className="tabs product__tabs">
      <div className="tabs__controls product__tabs-controls">
        <button
          className={`tabs__control ${specificationProduct ? 'is-active' : ''}`}
          type="button"
          onClick={onClickButton}
        >Характеристики
        </button>
        <button
          className={`tabs__control ${descriptionProduct ? 'is-active' : ''}`}
          type="button"
          onClick={onClickButton}
        >Описание
        </button>
      </div>
      <div className="tabs__content">
        <div className={`tabs__element ${specificationProduct ? 'is-active' : ''}`}>
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
        <div className={`tabs__element ${descriptionProduct ? 'is-active' : ''}`}>
          <div className="product__tabs-text">
            <p>{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabProduct;
