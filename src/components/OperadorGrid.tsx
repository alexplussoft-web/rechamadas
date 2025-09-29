import { OperadorCard } from "./OperadorCard";

type Props = {
  data: Record<
    string,
    { rechamadas: number; concluidos: number; ticketsRechamada: string[] }
  >;
  onSelect: (op: string) => void;
};

export function OperadorGrid({ data, onSelect }: Props) {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 w-full max-w-5xl">
      {Object.entries(data).map(([op, val]) => (
        <OperadorCard
          key={op}
          nome={op}
          rechamadas={val.rechamadas}
          concluidos={val.concluidos}
          onClick={() => onSelect(op)}
        />
      ))}
    </section>
  );
}
