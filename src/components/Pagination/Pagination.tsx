import { useMemo } from 'react';
import { QueryConfig } from '../../Pages/ProductList/ProductList';
import { Link, createSearchParams } from 'react-router';
import path from '../../constants/path';

interface Props {
  queryConfig: QueryConfig;
  size: number;
}

const RANGE = 2;
export default function Pagination({ queryConfig, size }: Props) {
  const targetPage = parseInt(queryConfig.page || '1');
  const defaultStyle = 'p-4 bg-white rounded-sm shadow-sm h-max border not-selectable';

  const renderEllipsis = (key: string) => {
    return (
      <span key={key} className={`${defaultStyle} cursor-not-allowed`}>
        ...
      </span>
    );
  };

  const renderPagination = useMemo(() => {
    const pages = [];
    let hasDotFront = false;
    let hasDotBack = false;

    for (let i = 1; i <= size; i++) {
      if (i <= RANGE || i > size - RANGE || (i >= targetPage - RANGE && i <= targetPage + RANGE)) {
        pages.push(
          <Link
            to={{
              pathname: path.home,
              search: createSearchParams({ ...queryConfig, page: i.toString() }).toString()
            }}
            key={i}
            className={`${defaultStyle} ${
              i === targetPage
                ? 'border-cyan-600 bg-slate-200 cursor-not-allowed hover:opacity-100'
                : 'hover:opacity-50'
            }`}
          >
            {i}
          </Link>
        );
        continue;
      } else if (i < targetPage - RANGE && !hasDotFront && i > RANGE) {
        hasDotFront = true;
        pages.push(renderEllipsis('dot-front'));
        continue;
      } else if (i > targetPage + RANGE && !hasDotBack && i <= size - RANGE) {
        hasDotBack = true;
        pages.push(renderEllipsis('dot-back'));
      }
    }
    return pages;
  }, [targetPage, queryConfig, size]);

  return (
    <div className='flex items-center h-4 my-4 mt-24 gap-x-4'>
      {targetPage === 1 ? (
        <span className={`${defaultStyle} ${targetPage === 1 ? 'cursor-not-allowed opacity-65' : 'hover:opacity-50'}`}>
          Pre
        </span>
      ) : (
        <Link
          className={`${defaultStyle} ${targetPage === 1 ? 'cursor-not-allowed opacity-65 ' : 'hover:opacity-50'}`}
          to={{
            pathname: path.home,
            search: createSearchParams({ ...queryConfig, page: (targetPage - 1).toString() }).toString()
          }}
        >
          Pre
        </Link>
      )}
      {renderPagination}
      {targetPage === size ? (
        <span
          className={`${defaultStyle} ${targetPage === size ? 'cursor-not-allowed opacity-65' : 'hover:opacity-50'}`}
        >
          Next
        </span>
      ) : (
        <Link
          to={{
            pathname: path.home,
            search: createSearchParams({ ...queryConfig, page: (targetPage + 1).toString() }).toString()
          }}
          className={`${defaultStyle} ${targetPage === size ? 'cursor-not-allowed opacity-65' : 'hover:opacity-50'}`}
        >
          Next
        </Link>
      )}
    </div>
  );
}
