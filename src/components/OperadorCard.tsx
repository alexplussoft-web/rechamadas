import { motion } from "framer-motion";

type Props = {
  nome: string;
  rechamadas: number;
  concluidos: number;
  onClick: () => void;
};

export function OperadorCard({ nome, rechamadas, concluidos, onClick }: Props) {
  return (
    <motion.div
      layout
      whileHover={{ scale: 1.03 }}
      className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm border border-slate-100 p-5 cursor-pointer hover:shadow-md transition"
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-3">
        <h2 className="text-lg font-semibold text-slate-800">{nome}</h2>
        <span className="text-xs text-slate-500 uppercase tracking-wide">
          Operador
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <span className="text-slate-600 text-sm">Rechamadas</span>
          <span
            className={`text-xl font-bold ${
              rechamadas > 0 ? "text-amber-600" : "text-slate-400"
            }`}
          >
            {rechamadas}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-slate-600 text-sm">Concluídos</span>
          <span className="text-xl font-bold text-emerald-600">
            {concluidos}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
