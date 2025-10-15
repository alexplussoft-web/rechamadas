import { useState, useRef, useCallback, type ChangeEvent } from "react";

type Props = {
  onFile?: (file: File) => void;
};

export function FileDrop({ onFile }: Props) {
  const [hover, setHover] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onFiles = useCallback(
    (file: File | null) => {
      if (!file) return;
      onFile?.(file);
    },
    [onFile]
  );

  const handleFileFromInput = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    onFiles(f);
  };

  return (
    <div>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setHover(true);
        }}
        onDragLeave={() => setHover(false)}
        onDrop={(e) => {
          e.preventDefault();
          setHover(false);
          const f = e.dataTransfer.files?.[0] ?? null;
          onFiles(f);
        }}
        onClick={() => inputRef.current?.click()}
        className={`w-full max-w-xl mx-auto transition rounded-xl p-6 cursor-pointer border-2 ${
          hover
            ? "border-slate-300 bg-slate-50"
            : "border-dashed border-gray-300 bg-white"
        } flex items-center gap-4`}
        role="button"
        aria-label="Arraste e solte o CSV ou clique para selecionar"
      >
        {/* ícone */}
        <svg
          width="44"
          height="44"
          viewBox="0 0 24 24"
          fill="none"
          className="flex-shrink-0 text-slate-600"
        >
          <path
            d="M12 3v9"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5 12l7-9 7 9"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M21 21H3"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <div>
          <div className="text-sm text-slate-800 font-semibold">
            Arraste e solte seu CSV
          </div>
          <div className="text-xs text-slate-500">
            Ou clique para escolher o arquivo — suporta campos entre aspas
          </div>
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept=".csv,text/csv"
        className="hidden"
        onChange={handleFileFromInput}
      />
    </div>
  );
}
