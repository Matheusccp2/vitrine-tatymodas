import { SelectOption } from '@/types';

export const CATEGORIES: SelectOption[] = [
  { value: 'blusa', label: 'Blusa' },
  { value: 'body', label: 'Body' },
  { value: 'calca', label: 'Calça' },
  { value: 'casaco', label: 'Casaco' },
  { value: 'conjunto', label: 'Conjunto' },
  { value: 'jaqueta', label: 'Jaqueta' },
  { value: 'macaquinho', label: 'Macaquinho' },
  { value: 'saia', label: 'Saia' },
  { value: 'short', label: 'Short' },
  { value: 'vestido', label: 'Vestido' },
];

export const ALL_CATEGORIES_OPTION: SelectOption = {
  value: 'all',
  label: 'Todas as categorias',
};
