import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRoute from '../history-route/history-route';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { mockSelectedProduct } from '../../helpers/mock';
import thunk from 'redux-thunk';
import TabProduct from './tab-product';

const history = createMemoryHistory();
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const store = mockStore({});

describe('Component: TabProduct', () => {
  it('should render correctly', () => {
    history.push('/catalog/pages/1/4/description');

    render(
      <Provider
        store={store}
      >
        <HistoryRoute history={history}>
          <TabProduct
            productDetailed={mockSelectedProduct}
          />
        </HistoryRoute>
      </Provider>,
    );

    expect(screen.getByText(/Характеристики/i)).toBeInTheDocument();
    expect(screen.getByText(/Описание/i)).toBeInTheDocument();
    expect(screen.getByText(/тест description/i)).toBeInTheDocument();
    expect(screen.getByText(/тест vendorCode/i)).toBeInTheDocument();
    expect(screen.getByText(/тест type/i)).toBeInTheDocument();
    expect(screen.getByText(/тест category/i)).toBeInTheDocument();
    expect(screen.getByText(/тест level/i)).toBeInTheDocument();
  });

});
