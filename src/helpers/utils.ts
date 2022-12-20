import dayjs from 'dayjs';
import { Review } from '../types/review';

// Изменение формата даты

const humanizeDueDate = (dueDate: string) => dueDate ? dayjs(dueDate).format('DD MMMM') : '';

const getRussifiedDate = (date: string, monthsDictionary: { [char: string]: string }) => {
  const space = ' ';
  const splittedDate = humanizeDueDate(date).split(space);
  const russifiedDate = `${splittedDate[0]} ${monthsDictionary[splittedDate[1]]}`;

  return russifiedDate;
};

// Сортировка отзывов по дате (от новых к старым)

const sortReviewsDayDown = (reviewA: Review, reviewB: Review) => dayjs(reviewB.createAt).diff(dayjs(reviewA.createAt));

// Функция проверки нажатия клавиши

const isKeyPressed = (evt: KeyboardEvent, keyName: string) => evt.key === keyName;

// Отключение скролла при открытии модальных окон

const disableBackgroundScrolling = (modalOpeningStatus : boolean) => {
  if (modalOpeningStatus) {
    document.body.style.position = 'fixed';
  } else {
    document.body.style.position = '';
  }
};

export {
  humanizeDueDate,
  getRussifiedDate,
  sortReviewsDayDown,
  isKeyPressed,
  disableBackgroundScrolling
};

