import { useState, useEffect, useRef } from "react";
import { Upload } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MultiSelect } from "@/components/ui/multi-select";
import { ProductFormData, Product } from "@/types";
import { CATEGORIES } from "@/config/categories";
import { SIZES, NUMERIC_SIZES } from "@/config/sizes";
import { COLORS } from "@/config/colors";
import { formatPriceInput } from "@/utils/formatters";

interface ProductFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: ProductFormData) => Promise<void>;
  editingProduct?: Product | null;
}

export function ProductForm({
  open,
  onOpenChange,
  onSubmit,
  editingProduct,
}: ProductFormProps) {
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    category: "",
    sizes: [],
    colors: [],
    price: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Preenche o formulário quando está editando
   */
  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name,
        category: editingProduct.category,
        sizes: editingProduct.sizes,
        colors: [],
        price: formatPriceInput(editingProduct.price.toString()),
        description: editingProduct.description || "",
      });
    } else {
      // Limpa o formulário
      setFormData({
        name: "",
        category: "",
        sizes: [],
        colors: [],
        price: "",
        description: "",
      });
    }
  }, [editingProduct, open]);

  /**
   * Manipula o upload de imagem
   */
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, imageFile: file });
    }
  };

  // No componente, adicione:
  const inputRef = useRef<HTMLInputElement>(null);
  const cursorPositionRef = useRef<number>(0);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    const cursorPosition = input.selectionStart || 0;
    const previousValue = formData.price;

    // Remove tudo exceto números
    const numericValue = e.target.value.replace(/\D/g, "");

    // Se estiver vazio, limpa o campo
    if (!numericValue) {
      setFormData({ ...formData, price: "" });
      cursorPositionRef.current = 0;
      return;
    }

    // Converte para número (centavos) e formata
    const cents = parseInt(numericValue, 10);
    const formatted = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(cents / 100);

    // Conta dígitos antes do cursor no valor anterior
    const previousDigits = previousValue
      .slice(0, cursorPosition)
      .replace(/\D/g, "");
    const currentDigits = numericValue;

    // Se deletou um dígito, ajusta a contagem
    const digitsBeforeCursor =
      previousDigits.length -
      (previousValue.replace(/\D/g, "").length - currentDigits.length);

    // Encontra a nova posição
    let newPosition = 0;
    let count = 0;

    for (let i = 0; i < formatted.length; i++) {
      if (/\d/.test(formatted[i])) {
        count++;
        if (count > digitsBeforeCursor) {
          newPosition = i;
          break;
        }
      }
    }

    cursorPositionRef.current = newPosition;
    setFormData({ ...formData, price: formatted });
  };

  // useEffect para atualizar o cursor
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.setSelectionRange(
        cursorPositionRef.current,
        cursorPositionRef.current,
      );
    }
  }, [formData.price]);

  /**
   * Submete o formulário
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await onSubmit(formData);
      onOpenChange(false);
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editingProduct ? "Editar Produto" : "Adicionar Novo Produto"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nome */}
          <div className="space-y-2">
            <Label htmlFor="name">Nome do Produto *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Ex: Vestido Floral"
              required
            />
          </div>

          {/* SKU / Código */}
          <div className="space-y-2">
            <Label htmlFor="sku">Código/SKU do Produto *</Label>
            <Input
              id="sku"
              value={formData.sku}
              onChange={(e) =>
                setFormData({ ...formData, sku: e.target.value })
              }
              placeholder="Ex: VEST-001, BLU-123"
              required
            />
            <p className="text-xs text-gray-500">
              Código único para identificar o produto (ex: VEST-001)
            </p>
          </div>

          {/* Categoria (Select único) */}
          <div className="space-y-2">
            <Label htmlFor="category">Categoria *</Label>
            <Select
              value={formData.category}
              onValueChange={(value) =>
                setFormData({ ...formData, category: value })
              }
              required
            >
              <SelectTrigger id="category">
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Tamanhos (Multi-select) */}
          <div className="space-y-2">
            <Label>Tamanhos Disponíveis *</Label>
            <MultiSelect
              options={[...SIZES, ...NUMERIC_SIZES]}
              value={formData.sizes}
              onChange={(sizes) => setFormData({ ...formData, sizes })}
            />
            {formData.sizes.length === 0 && (
              <p className="text-xs text-gray-500">
                Selecione pelo menos um tamanho
              </p>
            )}
          </div>

          {/* Cores (Multi-select) */}
          <div className="space-y-2">
            <Label>Cores Disponíveis *</Label>
            <MultiSelect
              options={COLORS}
              value={formData.colors}
              onChange={(colors) => setFormData({ ...formData, colors })}
            />
            {formData.colors.length === 0 && (
              <p className="text-xs text-gray-500">
                Selecione pelo menos uma cor
              </p>
            )}
          </div>

          {/* Preço (com formatação automática) */}
          <div className="space-y-2">
            <Label htmlFor="price">Preço (R$) *</Label>
            <Input
              id="price"
              value={formData.price}
              onChange={handlePriceChange}
              placeholder="0,00"
              required
            />
            <p className="text-xs text-gray-500">
              Digite apenas números. Ex: 100 vira 100,00 automaticamente
            </p>
          </div>

          {/* Descrição */}
          <div className="space-y-2">
            <Label htmlFor="description">Descrição (opcional)</Label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Descreva o produto..."
              className="flex w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2"
              rows={3}
            />
          </div>

          {/* Upload de Imagem */}
          <div className="space-y-2">
            <Label htmlFor="image">Imagem do Produto</Label>
            <div className="flex items-center gap-2">
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="cursor-pointer"
              />
              <Upload className="h-5 w-5 text-gray-400" />
            </div>
            {formData.imageFile && (
              <p className="text-xs text-green-600">✓ Imagem selecionada</p>
            )}
          </div>

          {/* Botões */}
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={
                isSubmitting ||
                formData.sizes.length === 0 ||
                formData.colors.length === 0
              }
            >
              {isSubmitting
                ? "Salvando..."
                : editingProduct
                  ? "Salvar Alterações"
                  : "Adicionar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
