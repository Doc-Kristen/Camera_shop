import { NameSpace } from '../../helpers/const';
import { State } from '../../types/state';

export const getCurrentCatalogPath = (state: State) => state[NameSpace.Path].currentCatalogPath;
