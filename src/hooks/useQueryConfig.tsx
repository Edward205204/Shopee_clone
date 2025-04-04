import { QueryConfig } from '../Pages/ProductList/ProductList';
import { isUndefined, omitBy } from 'lodash';
import { useSearchParam } from './useQueryParams';

export function useQueryConfig() {
  const searchParam = useSearchParam();
  const queryConfig: QueryConfig = omitBy(
    {
      page: searchParam.page || '1',
      limit: searchParam.limit,
      order: searchParam.order,
      sort_by: searchParam.sort_by,
      category: searchParam.category,
      exclude: searchParam.exclude,
      rating_filter: searchParam.rating_filter,
      price_max: searchParam.price_max,
      price_min: searchParam.price_min,
      name: searchParam.name
    },
    isUndefined
  );
  return queryConfig;
}
