import { APP_URL } from '../constants';
import { PaginatorInfo } from '../dto/paginator-info.dto';

export function paginate(
  totalItems: number,
  currentPage = 1,
  pageSize = 10,
  count = 0,
  // maxPages = 10,
  url = '',
): PaginatorInfo {
  // calculate total pages
  const totalPages = Math.ceil(totalItems / pageSize);

  // ensure current page isn't out of range
  if (currentPage < 1) {
    currentPage = 1;
  } else if (currentPage > totalPages) {
    currentPage = totalPages;
  }

  // calculate start and end item indexes
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

  // return object with all pager properties required by the view
  return {
    total: totalItems,
    currentPage: +currentPage,
    count,
    lastPage: totalPages,
    firstItem: startIndex,
    lastItem: endIndex,
    perPage: pageSize,
    first_page_url: `${APP_URL}${url}&page=1`,
    last_page_url: `${APP_URL}${url}&page=${totalPages}`,
    next_page_url:
      totalPages > currentPage
        ? `${APP_URL}${url}&page=${Number(currentPage) + 1}`
        : null,
    prev_page_url:
      totalPages > currentPage ? `${APP_URL}${url}&page=${currentPage}` : null,
  };
}
