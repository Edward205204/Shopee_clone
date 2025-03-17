import { useSearchParams } from 'react-router';

export function useSearchParam() {
  const [searchParam] = useSearchParams();
  console.log(searchParam);
  return Object.fromEntries([...searchParam]);
}
