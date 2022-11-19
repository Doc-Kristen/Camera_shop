import { NameSpace } from '../../helpers/const';
import { CurrentCatalogPathType } from '../../types/query-parameters';
import { State } from '../../types/state';

export const getCurrentCatalogPath = (state: State) : CurrentCatalogPathType => state[NameSpace.Path].currentCatalogPath;
