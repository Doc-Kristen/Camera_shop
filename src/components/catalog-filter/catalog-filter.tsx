import { productFilterByCategoryType } from '../../helpers/const';


const CatalogFilter = (): JSX.Element => (
  <div className="catalog-filter">
    <form action="#">
      <h2 className="visually-hidden">Фильтр</h2>
      <fieldset className="catalog-filter__block">
        <legend className="title title--h5">Цена, ₽</legend>
        <div className="catalog-filter__price-range">
          <div className="custom-input">
            <label>
              <input type="number" name="price" placeholder="от" />
            </label>
          </div>
          <div className="custom-input">
            <label>
              <input type="number" name="priceUp" placeholder="до" />
            </label>
          </div>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="title title--h5">Категория</legend>
        {
          productFilterByCategoryType.productFilterByCategory.map((item) =>
            (
              <div
                key={item.Name}
                className="custom-checkbox catalog-filter__item"
              >
                <label>
                  <input type="checkbox" name={item.Name} defaultChecked /><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">{item.Label}</span>
                </label>
              </div>
            ))
        }

      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="title title--h5">Тип камеры</legend>
        {
          productFilterByCategoryType.productFilterByType.map((item) =>
            (
              <div
                key={item.Name}
                className="custom-checkbox catalog-filter__item"
              >
                <label>
                  <input type="checkbox" name={item.Name} defaultChecked /><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">{item.Label}</span>
                </label>
              </div>
            ))
        }
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="title title--h5">Уровень</legend>
        {
          productFilterByCategoryType.productFilterByLevel.map((item) =>
            (
              <div
                key={item.Name}
                className="custom-checkbox catalog-filter__item"
              >
                <label>
                  <input type="checkbox" name={item.Name} defaultChecked /><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">{item.Label}</span>
                </label>
              </div>
            ))
        }
      </fieldset>
      <button className="btn catalog-filter__reset-btn" type="reset">Сбросить фильтры
      </button>
    </form>
  </div>
);

export default CatalogFilter;
