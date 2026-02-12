import { SelectOption } from "@/types";

export const CATEGORIES: SelectOption[] = [
  { value: "Blusa", label: "Blusa" },
  { value: "Body", label: "Body" },
  { value: "Calca", label: "Calça" },
  { value: "Casaco", label: "Casaco" },
  { value: "Conjunto", label: "Conjunto" },
  { value: "Jaqueta", label: "Jaqueta" },
  { value: "Macaquinho", label: "Macaquinho" },
  { value: "Saia", label: "Saia" },
  { value: "Short", label: "Short" },
  { value: "Vestido", label: "Vestido" },
  { value: "Chemise", label: "Chemise" },
];

export const ALL_CATEGORIES_OPTION: SelectOption = {
  value: "all",
  label: "Todas as categorias",
};
