import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CATEGORIES, ALL_CATEGORIES_OPTION } from "@/config/categories";
import { SIZES, NUMERIC_SIZES, ALL_SIZES_OPTION } from "@/config/sizes";
import { ProductFilters } from "@/types";

interface FilterBarProps {
  filters: ProductFilters;
  onFiltersChange: (filters: ProductFilters) => void;
}

export function FilterBar({ filters, onFiltersChange }: FilterBarProps) {
  /**
   * Atualiza o filtro de categoria
   */
  const handleCategoryChange = (category: string) => {
    onFiltersChange({ ...filters, category });
  };

  const handleSizeChange = (size: string) => {
    onFiltersChange({ ...filters, size });
  };

  const allSizes = [...SIZES, ...NUMERIC_SIZES];

  /**
   * Atualiza o termo de busca
   */
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFiltersChange({ ...filters, searchTerm: e.target.value });
  };

  return (
    <div className="mb-8 space-y-2">
      <div className="grid gap-4 sm:grid-cols-4">
        {/* Filtro de Categoria */}
        <div className="space-y-3">
          <Label htmlFor="category-filter">Categoria</Label>
          <Select value={filters.category} onValueChange={handleCategoryChange}>
            <SelectTrigger id="category-filter">
              <SelectValue placeholder="Selecione uma categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL_CATEGORIES_OPTION.value}>
                {ALL_CATEGORIES_OPTION.label}
              </SelectItem>
              {CATEGORIES.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="size-filter">Tamanho</Label>
          <Select value={filters.size} onValueChange={handleSizeChange}>
            <SelectTrigger id="size-filter">
              <SelectValue placeholder="Selecione um tamanho" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL_SIZES_OPTION.value}>
                {ALL_SIZES_OPTION.label}
              </SelectItem>
              {allSizes.map((size) => (
                <SelectItem key={size.value} value={size.value}>
                  {size.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Busca por Nome */}
        <div className="space-y-2 col-span-2">
          <Label htmlFor="search-filter">Buscar</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              id="search-filter"
              type="text"
              placeholder="Buscar por nome..."
              value={filters.searchTerm}
              onChange={handleSearchChange}
              className="pl-9"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
