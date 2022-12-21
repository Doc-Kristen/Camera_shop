import { CurrentCatalogPathType } from '../../types/query-parameters';
import { setCurrentCatalogPath } from '../action';
import { pathProcess } from './path-process';

const mockPayload = {
  currentPage: 5,
  search: '?_sort=price'
};

describe('Reducer: pathProcess', () => {
  it('without additional parameters should return initial state', () => {
    expect(pathProcess.reducer(void 0, { type: 'UNKNOWN_ACTION' }))
      .toEqual({
        currentCatalogPath: {} as CurrentCatalogPathType,
      });
  });

  it('should set currentPage and search', () => {
    const state = {
      currentCatalogPath: {} as CurrentCatalogPathType,
    };
    expect(pathProcess.reducer(state, { type: setCurrentCatalogPath, payload: mockPayload }))
      .toEqual({
        currentCatalogPath: {
          currentPage: 5,
          search: '?_sort=price'
        },
      });
  });

});
