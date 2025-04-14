import { useForm } from 'react-hook-form';
import { baseSchema } from '../utils/zod';
import { zodResolver } from '@hookform/resolvers/zod';

const searchFormSchema = baseSchema.pick({
  search: true
});

export default function useInputSearch() {
  const { register, handleSubmit } = useForm<{ search: string }>({
    resolver: zodResolver(searchFormSchema)
  });
  return { register, handleSubmit };
}
