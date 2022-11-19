import {createSlice} from '@reduxjs/toolkit';
import { NameSpace } from '../../helpers/const';
import { CurrentCatalogPathType } from '../../types/query-parameters';
import { setCurrentCatalogPath } from '../action';

export type PathProcessStateType = {
  currentCatalogPath: CurrentCatalogPathType;
}

const initialState: PathProcessStateType = {
  currentCatalogPath: {} as CurrentCatalogPathType,
};

export const pathProcess = createSlice({
  name: NameSpace.Path,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(setCurrentCatalogPath, (state, action) => {
        state.currentCatalogPath = action.payload;
      });
  }
});
