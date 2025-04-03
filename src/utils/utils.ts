import axios, { AxiosError } from 'axios';
import HttpStatusCode from '../constants/httpStatusEnum';

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  return axios.isAxiosError(error);
}

export function isUnprocessableEntityError<FormError>(error: unknown): error is AxiosError<FormError> {
  return isAxiosError<FormError>(error) && error.response?.status === HttpStatusCode.UnprocessableEntity;
}

export function formatCurrently(num: number) {
  return new Intl.NumberFormat('de-DE').format(num);
}

export function formatSocialStyle(num: number) {
  return new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 })
    .format(num)
    .replace('.', ',')
    .toLowerCase();
}

export const removeSpecialCharacter = (str: string) =>
  // eslint-disable-next-line no-useless-escape
  str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, '');

export function generateNameId({ name, id }: { name: string; id: string }) {
  return removeSpecialCharacter(name).replace(/\s/g, '-') + '-i.' + `${id}`;
}

export function getIdFromNameId(nameId: string) {
  const id = nameId.split('-i.');
  const index = id.length - 1;
  return id[index];
}
