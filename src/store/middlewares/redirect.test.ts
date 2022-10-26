import {configureMockStore} from '@jedmao/redux-mock-store';
import {AnyAction} from 'redux';
import {redirect} from './redirect';
import {redirectToRoute} from '../action';
import {State} from '../../types/state';

const fakeHistory = {
  location: {pathname: ''},
  push(path: string) {
    this.location.pathname = path;
  },
};

jest.mock('../../browser-history', () => fakeHistory);

const middlewares = [redirect];
const mockStore = configureMockStore<State, AnyAction>(middlewares);
const store = mockStore();

describe('Middleware: redirect', () => {
  beforeEach(() => {
    fakeHistory.push('');
  });

  it('should be redirect to /catalog/pages/1/1', () => {
    store.dispatch(redirectToRoute('catalog/pages/1/1'));
    expect(fakeHistory.location.pathname).toBe('/catalog/pages/1/1');
    expect(store.getActions()).toEqual([
      redirectToRoute('catalog/pages/1/1'),
    ]);
  });

  it('should not to be redirect /catalog/pages/1/1', () => {
    store.dispatch({type: 'UNKNOWN_ACTION', payload: 'catalog/pages/1/1'});
    expect(fakeHistory.location.pathname).not.toBe('/catalog/pages/1/1');
  });
});
