import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRoute from '../history-route/history-route';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import ReviewModal from './review-modal';
import userEvent from '@testing-library/user-event';

const history = createMemoryHistory();
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const store = mockStore(
  {
    USER: {
      isFormBlocked: false, isErrorSendingReview: false,
    }
  }
);
describe('Component: ReviewModal', () => {
  it('should render correctly', async () => {

    render(
      <Provider
        store={store}
      >
        <HistoryRoute history={history}>
          <ReviewModal/>
        </HistoryRoute>
      </Provider>,
    );

    expect(screen.getByText(/Оставить отзыв/i)).toBeInTheDocument();
    expect(screen.getByText(/Ваше имя/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Основные преимущества товара/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Недостатки/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Комментарий/i)).toBeInTheDocument();
    expect(screen.getByTestId('submit-review')).toBeInTheDocument();

    await userEvent.type(screen.getByTestId('name'), 'Тестовое Имя');
    await userEvent.type(screen.getByTestId('advantage'), 'Тестовые преимущества товара');
    await userEvent.type(screen.getByTestId('disadvantage'), 'Тестовые Недостатки');
    await userEvent.type(screen.getByTestId('comment'), 'Тестовый комментарий пользователя');

    expect(screen.getByDisplayValue(/Тестовое Имя/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/Тестовые преимущества товара/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/Тестовые Недостатки/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/Тестовый комментарий пользователя/i)).toBeInTheDocument();

  });

});
