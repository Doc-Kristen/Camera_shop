import { generatePath, useNavigate } from 'react-router-dom';
import { AppRoute, DEFAULT_PAGE } from '../helpers/const';


type ResultUseResetPageParams = [
    (newSearchParams : URLSearchParams) => void,
];

export const useResetPageParams = (): ResultUseResetPageParams => {

  const navigate = useNavigate();

  const resetPageParams = (newSearchParams : URLSearchParams) => {

    navigate({
      pathname: generatePath(AppRoute.Products, {pageNumber: String(DEFAULT_PAGE)}),
      search: decodeURI(newSearchParams.toString())
    });
  };

  return [
    resetPageParams
  ];
};
