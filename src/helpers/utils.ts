import dayjs from 'dayjs';
import { Review } from '../types/review';

// Изменение формата даты

const humanizeHeaderDueDate = (dueDate: string) => dueDate ? dayjs(dueDate).format('DD MMMM') : '';

const getRussifiedDate = (date: string, monthsDictionary: { [char: string]: string }) => {
  const space = ' ';
  const splittedDate = humanizeHeaderDueDate(date).split(space);
  const russifiedDate = `${splittedDate[0]} ${monthsDictionary[splittedDate[1]]}`;

  return russifiedDate;
};

// Сортировка отзывов по дате (от новых к старым)

const sortReviewsDayDown = (reviewA: Review, reviewB: Review) => dayjs(reviewB.createAt).diff(dayjs(reviewA.createAt));

// Функция проверки нажатия клавиши Escape

const isEscapeKeyPressed = (evt: KeyboardEvent) => evt.key === 'Escape';

export {
  humanizeHeaderDueDate,
  getRussifiedDate,
  sortReviewsDayDown,
  isEscapeKeyPressed
};

