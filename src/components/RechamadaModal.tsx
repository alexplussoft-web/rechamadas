import { X } from "lucide-react";

type Props = {
  operador: string | null;
  tickets: string[];
  onClose: () => void;
};

export function RechamadaModal({ operador, tickets, onClose }: Props) {
  if (!operador) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-[420px] p-6 relative border border-gray-100">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-500 hover:text-slate-700"
          aria-label="Fechar"
        >
          <X size={18} />
        </button>

        <h3 className="text-lg font-semibold mb-3 text-slate-800">
          Tickets de Rechamada — {operador}
        </h3>

        {tickets.length === 0 ? (
          <p className="text-sm text-slate-500">Nenhum ticket registrado.</p>
        ) : (
          <ul className="mt-2 space-y-2">
            {tickets.map((t) => (
              <li
                key={t}
                className="flex items-center justify-between bg-slate-50 rounded-md px-3 py-2 text-sm text-slate-700"
              >
                <span className="font-mono text-sm">{t}</span>
                <button
                  className="text-sm text-slate-600 hover:text-slate-800"
                  onClick={() => {
                    /* placeholder se quiser abrir o ticket em outra ação */
                  }}
                >
                  Ver
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
