import { SelectOption } from '@/types';

export const SIZES: SelectOption[] = [
  { value: 'PP', label: 'PP' },
  { value: 'P', label: 'P' },
  { value: 'M', label: 'M' },
  { value: 'G', label: 'G' },
  { value: 'GG', label: 'GG' },
  { value: 'XG', label: 'XG' },
  { value: 'XGG', label: 'XGG' },
  { value: 'G1', label: 'G1' },
  { value: 'G2', label: 'G2' },
  { value: 'G3', label: 'G3' },
];

export const NUMERIC_SIZES: SelectOption[] = [
  { value: '34', label: '34' },
  { value: '36', label: '36' },
  { value: '38', label: '38' },
  { value: '40', label: '40' },
  { value: '42', label: '42' },
  { value: '44', label: '44' },
  { value: '46', label: '46' },
  { value: '48', label: '48' },
  { value: '50', label: '50' },
];

export const ALL_SIZES_OPTION: SelectOption = {
  value: 'all',
  label: 'Todas os tamanhos',
};