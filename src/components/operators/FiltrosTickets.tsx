import { motion } from "framer-motion";
import { Input } from "../ui/input";

export function FiltrosTickets({
  filtroCategoria,
  setFiltroCategoria,
  filtroClassificacao,
  setFiltroClassificacao,
  filtroAssunto,
  setFiltroAssunto,
  categoriasUnicas,
  classificacoesUnicas,
}: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-gray-50 dark:bg-gray-950/20 border border-gray-200 dark:border-gray-800 p-4 rounded-xl"
    >
      <div className="flex flex-col sm:flex-row gap-2">
        <select
          value={filtroCategoria}
          onChange={(e) => setFiltroCategoria(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="">Todas Categorias</option>
          {categoriasUnicas.map((c: string) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select
          value={filtroClassificacao}
          onChange={(e) => setFiltroClassificacao(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="">Todas Classificações</option>
          {classificacoesUnicas.map((c: string) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <Input
          placeholder="Filtrar por assunto"
          value={filtroAssunto}
          onChange={(e) => setFiltroAssunto(e.target.value)}
          className="border p-2 rounded w-full sm:w-1/3"
        />
      </div>
    </motion.div>
  );
}
