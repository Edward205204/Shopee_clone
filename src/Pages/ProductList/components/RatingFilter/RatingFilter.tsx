import { createSearchParams, useNavigate } from 'react-router';
import path from '../../../../constants/path';
import { QueryConfig } from '../../ProductList';

interface Props {
  queryConfig: QueryConfig;
}

export default function RatingFilter({ queryConfig }: Props) {
  const navigate = useNavigate();
  const handleStarRating = (rating: number) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        rating_filter: rating.toString()
      }).toString()
    });
  };
  return (
    <ul>
      {Array(5)
        .fill(0)
        .map((_, index) => (
          <li className='flex mb-1' key={index}>
            <button
              className='flex items-center gap-2 ml-1'
              onClick={() => {
                handleStarRating(5 - index);
              }}
            >
              <ul className='flex gap-2'>
                {Array(5)
                  .fill(0)
                  .map((_, indexStar) => (
                    <li key={indexStar} className='w-4 h-4'>
                      {indexStar < 5 - index ? (
                        <svg viewBox='0 0 9.5 8' className='shopee-svg-icon rating-stars__star icon-rating-colored'>
                          <defs>
                            <linearGradient id='ratingStarGradient' x1='50%' x2='50%' y1='0%' y2='100%'>
                              <stop offset={0} stopColor='#ffca11' />
                              <stop offset={1} stopColor='#ffad27' />
                            </linearGradient>
                            <polygon
                              id='ratingStar'
                              points='14.910357 6.35294118 12.4209136 7.66171903 12.896355 4.88968305 10.8823529 2.92651626 13.6656353 2.52208166 14.910357 0 16.1550787 2.52208166 18.9383611 2.92651626 16.924359 4.88968305 17.3998004 7.66171903'
                            />
                          </defs>
                          <g fill='url(#ratingStarGradient)' fillRule='evenodd' stroke='none' strokeWidth={1}>
                            <g transform='translate(-876 -1270)'>
                              <g transform='translate(155 992)'>
                                <g transform='translate(600 29)'>
                                  <g transform='translate(10 239)'>
                                    <g transform='translate(101 10)'>
                                      <use stroke='#ffa727' strokeWidth='.5' xlinkHref='#ratingStar' />
                                    </g>
                                  </g>
                                </g>
                              </g>
                            </g>
                          </g>
                        </svg>
                      ) : (
                        <svg viewBox='0 0 9.5 8' className='shopee-svg-icon rating-stars__star icon-rating-white'>
                          <defs>
                            <polygon
                              id='ratingStar'
                              points='14.910357 6.35294118 12.4209136 7.66171903 12.896355 4.88968305 10.8823529 2.92651626 13.6656353 2.52208166 14.910357 0 16.1550787 2.52208166 18.9383611 2.92651626 16.924359 4.88968305 17.3998004 7.66171903'
                            />
                          </defs>
                          <g fill='#ffffff' fillRule='evenodd' stroke='none' strokeWidth={1}>
                            <g transform='translate(-876 -1270)'>
                              <g transform='translate(155 992)'>
                                <g transform='translate(600 29)'>
                                  <g transform='translate(10 239)'>
                                    <g transform='translate(101 10)'>
                                      <use stroke='#ffca11' strokeWidth='.5' xlinkHref='#ratingStar' />
                                    </g>
                                  </g>
                                </g>
                              </g>
                            </g>
                          </g>
                        </svg>
                      )}
                    </li>
                  ))}
              </ul>
            </button>
            <div className='ml-2 text-sm '>{index !== 0 && 'Trở lên'}</div>
          </li>
        ))}
    </ul>
  );
}
