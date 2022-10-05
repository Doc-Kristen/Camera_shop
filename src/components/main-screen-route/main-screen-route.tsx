import { Navigate } from 'react-router-dom';

type PrivateLoginScreenRouteProps = {
    mainPageIsDeveloped: boolean;
    children: JSX.Element;
}

const MainScreenRoute = (props: PrivateLoginScreenRouteProps): JSX.Element => {
  const { mainPageIsDeveloped, children } = props;

  return (
    mainPageIsDeveloped
      ? children
      : <Navigate to={'/catalog/page_1'} />
  );
};

export default MainScreenRoute;
