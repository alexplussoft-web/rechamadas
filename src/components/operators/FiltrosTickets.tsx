import { motion } from "framer-motion";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export function FiltrosTickets({
  filtroCategoria,
  setFiltroCategoria,
  filtroClassificacao,
  setFiltroClassificacao,
  filtroAssunto,
  setFiltroAssunto,
  categoriasUnicas,
  classificacoesUnicas,
  filtroNivel,
  setFiltroNivel,
}: any) {
  const classificacoesValidas = classificacoesUnicas.filter(
    (c: string) => typeof c === "string" && c.trim() !== ""
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-gray-50 dark:bg-gray-950/20 border border-gray-200 dark:border-gray-800 p-4 rounded-xl space-y-3"
    >
      {/* Linha com os Selects */}
      <div className="flex flex-col sm:flex-row gap-2">
        <Select value={filtroCategoria} onValueChange={setFiltroCategoria}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Todas Categorias" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas Categorias</SelectItem>
            {categoriasUnicas
              .filter((c: string) => c?.trim() !== "")
              .map((c: string) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>

        <Select
          value={filtroClassificacao}
          onValueChange={setFiltroClassificacao}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Todas Classificações" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas Classificações</SelectItem>
            {classificacoesValidas.map((c: string) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filtroNivel} onValueChange={setFiltroNivel}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Todos os Níveis" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os Níveis</SelectItem>
            <SelectItem value="1">Nível 1</SelectItem>
            <SelectItem value="2">Nível 2</SelectItem>
            <SelectItem value="3">Nível 3</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Input ocupando a linha inteira abaixo */}
      <Input
        placeholder="Filtrar por assunto"
        value={filtroAssunto}
        onChange={(e) => setFiltroAssunto(e.target.value)}
        className="border p-2 rounded w-full"
      />
    </motion.div>
  );
}
