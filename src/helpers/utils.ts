import dayjs from 'dayjs';

// Изменение формата даты

const humanizeHeaderDueDate = (dueDate: string) => dueDate ? dayjs(dueDate).format('DD MMMM') : '';

const getRussifiedDate = (date: string, monthsDictionary : { [char: string]: string }) => {
  const space = ' ';
  const splittedDate = humanizeHeaderDueDate(date).split(space);
  const russifiedDate = `${splittedDate[0]} ${monthsDictionary[splittedDate[1]]}`;

  return russifiedDate;
};

export {
  humanizeHeaderDueDate,
  getRussifiedDate
};
