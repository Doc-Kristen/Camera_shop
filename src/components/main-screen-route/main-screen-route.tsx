import { generatePath, Navigate } from 'react-router-dom';
import { AppRoute, DEFAULT_PAGE } from '../../helpers/const';
import { useAppSelector } from '../../hooks';
import { getCurrentCatalogPath } from '../../store/path-process/selectors';

type PrivateLoginScreenRouteProps = {
  mainPageIsDeveloped: boolean;
  children: JSX.Element;
}

const MainScreenRoute = (props: PrivateLoginScreenRouteProps): JSX.Element => {
  const { mainPageIsDeveloped, children } = props;
  const { currentPage, search } = useAppSelector(getCurrentCatalogPath);

  return (
    mainPageIsDeveloped
      ? children
      :
      <Navigate to={{
        pathname: generatePath(AppRoute.Products, { pageNumber: String(currentPage ? currentPage : DEFAULT_PAGE) }),
        search
      }}
      />
  );
};

export default MainScreenRoute;
