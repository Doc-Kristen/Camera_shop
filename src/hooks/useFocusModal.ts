import { useAppSelector } from '.';
import { getFormOpenedStatus, getReviewSuccessStatus } from '../store/user-process/selectors';

export const useFocusModal = () => {
  const isFormOpened = useAppSelector(getFormOpenedStatus);
  const isReviewSuccess = useAppSelector(getReviewSuccessStatus);

  if(isFormOpened || isReviewSuccess) {
    document.body.style.position = 'fixed';
    document.body.style.top = `-${window.scrollY}px`;
  } else {
    const scrollY = document.body.style.top;
    document.body.style.position = '';
    document.body.style.top = '';
    window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
  }
};
