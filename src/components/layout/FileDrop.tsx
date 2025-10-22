import { BadgeCheckIcon } from "lucide-react";
import {
  useState,
  useRef,
  useCallback,
  type ChangeEvent,
  type ReactNode,
} from "react";

type Props = {
  onFile?: (file: File) => void;
  title: string;
  icon: ReactNode;
};

export function FileDrop({ onFile, title, icon }: Props) {
  const [hover, setHover] = useState(false);
  const [fileLoaded, setFileLoaded] = useState(false); // ✅ Estado para arquivo carregado
  const [fileName, setFileName] = useState<string | null>(null); // ✅ Nome do arquivo
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onFiles = useCallback(
    (file: File | null) => {
      if (!file) return;
      onFile?.(file);
      setFileLoaded(true);
      setFileName(file.name); // ✅ Salva o nome
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
        } flex items-center gap-4
        ${fileLoaded && "border-green-500"}
        `}
        role="button"
        aria-label="Arraste e solte o CSV ou clique para selecionar"
      >
        {icon}

        <div>
          <div className="text-xl text-slate-800 font-bold">{title}</div>
          <>
            <div className="text-sm text-slate-800 font-semibold">
              Arraste e solte seu CSV
            </div>
            <div className="text-xs text-slate-500">
              Ou clique para escolher o arquivo — suporta campos entre aspas
            </div>
            {fileLoaded && (
              <div className="flex items-center gap-3 text-xs font-semibold text-muted-foreground">
                {fileName} <BadgeCheckIcon className="text-green-400" />
              </div>
            )}
          </>
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
