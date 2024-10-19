import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, X } from "lucide-react";

export function OrderTableFilters() {
  return (
    <form className="flex items-center gap-2">
      <span className="text-sm font-semibold">Filtrar por</span>
      <Input placeholder="ID do pedido" className="h-8 w-auto" />
      <Input placeholder="Buscar por cliente" className="h-8 w-[320px]" />
      <Select defaultValue="all">
        <SelectTrigger className="h-8 w-[180px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos status</SelectItem>
          <SelectItem value="pending">Pendente</SelectItem>
          <SelectItem value="cancelled">Cancelado</SelectItem>
          <SelectItem value="processing">Em preparo</SelectItem>
          <SelectItem value="delivering">A caminho</SelectItem>
          <SelectItem value="delivered">Entregue</SelectItem>
        </SelectContent>

        <Button type="submit" variant="secondary" size="sm">
          <Search className="mr-2 h-4 w-4" />
          Filtrar resultados
        </Button>
        <Button type="button" variant="outline" size="sm">
          <X className="mr-2 h-4 w-4" />
          Remover filtros
        </Button>
      </Select>
    </form>
  );
}
