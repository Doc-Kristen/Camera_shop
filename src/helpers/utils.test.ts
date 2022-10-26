import { MonthsDictionary } from './const';
import { makeFakeReview } from './mock';
import { getRussifiedDate, humanizeDueDate, sortReviewsDayDown } from './utils';

describe('Utils', () => {
  it('humanizeDate should return date string', () => {
    const date = '2022-10-27T12:25:36.939Z';
    expect(humanizeDueDate(date))
      .toBe('27 October');
  });
  it('getRussifiedDate should return date in russian language', () => {
    const date = '2022-10-28T12:25:36.939Z';
    expect(getRussifiedDate(date, MonthsDictionary))
      .toBe('28 Октября');
  });

  it('sortReviewsDayDown return difference of values', () => {
    const mockReview = makeFakeReview();

    expect(sortReviewsDayDown(mockReview, mockReview))
      .toBe(0);
  });

});
