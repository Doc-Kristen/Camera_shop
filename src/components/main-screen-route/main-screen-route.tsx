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
      : <Navigate to={'/catalog/pages/1'} />
  );
};

export default MainScreenRoute;
