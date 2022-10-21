import {render, screen} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRoute from '../history-route/history-route';
import Header from './header';


const history = createMemoryHistory();

describe('Component: Header', () => {
  it('should render correctly', () => {

    render(
      <HistoryRoute history={history}>
        <Header />
      </HistoryRoute>,
    );

    expect(screen.getByPlaceholderText(/Поиск по сайту/i)).toBeInTheDocument();
  });
});
