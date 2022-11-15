import { NameSpace } from '../../helpers/const';
import { State } from '../../types/state';

export const getSortingType = (state: State): string => state[NameSpace.Sorting].sortingType;

export const getOrderType = (state: State): string => state[NameSpace.Sorting].orderType;
