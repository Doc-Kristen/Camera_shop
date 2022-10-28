import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRoute from '../history-route/history-route';
import Footer from './footer';

const history = createMemoryHistory();

describe('Component: Footer', () => {
  it('should render correctly', () => {

    render(
      <HistoryRoute history={history}>
        <Footer />
      </HistoryRoute>,
    );

    const textElement = screen.getByText(/Интернет-магазин/i);

    expect(textElement).toBeInTheDocument();
  });
});
