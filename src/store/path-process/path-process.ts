import {createSlice} from '@reduxjs/toolkit';
import { NameSpace } from '../../helpers/const';
import { CurrentCatalogPathType } from '../../types/query-parameters';

export type PathProcessStateType = {
  currentCatalogPath: CurrentCatalogPathType;
}

const initialState: PathProcessStateType = {
  currentCatalogPath: {} as CurrentCatalogPathType,
};

export const pathProcess = createSlice({
  name: NameSpace.Path,
  initialState,
  reducers: {
    setCurrentCatalogPath: (state, action) => {
      state.currentCatalogPath = action.payload;
    },
  }
});

export const {
  setCurrentCatalogPath,
} = pathProcess.actions;
