import { Badge } from "./badge";
import { cn } from "@/utils/formatters";
import { SelectOption } from "@/types";

interface MultiSelectProps {
  options: SelectOption[];
  value: string[];
  onChange: (value: string[]) => void;
  className?: string;
}

export function MultiSelect({
  options,
  value,
  onChange,
  className,
}: MultiSelectProps) {
  /**
   * Toggle de um item na seleção
   */
  const toggleItem = (itemValue: string) => {
    if (value.includes(itemValue)) {
      // Remove se já está selecionado
      onChange(value.filter((v) => v !== itemValue));
    } else {
      // Adiciona se não está selecionado
      onChange([...value, itemValue]);
    }
  };

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {options.map((option) => {
        const isSelected = value.includes(option.value);

        return (
          <Badge
            key={option.value}
            variant={isSelected ? "default" : "outline"}
            className={cn(
              "cursor-pointer transition-all hover:scale-105",
              isSelected && "bg-gray-900 text-white",
            )}
            onClick={() => toggleItem(option.value)}
          >
            {option.label}
          </Badge>
        );
      })}
    </div>
  );
}
