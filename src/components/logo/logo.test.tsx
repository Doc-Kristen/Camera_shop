import {render, screen} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRoute from '../history-route/history-route';
import Logo from './logo';

const history = createMemoryHistory();

describe('Component: Logo', () => {
  it('should render correctly', () => {

    render(
      <HistoryRoute history={history}>
        <Logo />
      </HistoryRoute>,
    );

    expect(screen.findAllByLabelText(/Переход на главную/i));
  });
});
