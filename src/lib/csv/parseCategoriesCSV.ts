import Papa from "papaparse";

interface TicketCategoria {
  ticketId: string;
  assunto: string;
  empresa: string;
  operador: string;
  aberto: string;
  fechado: string;
  setor: string;
  categoria: string;
  classificacao: string;
}

export function parseCategoriasCSV(
  csvText: string
): Promise<TicketCategoria[]> {
  return new Promise((resolve) => {
    Papa.parse<string[]>(csvText, {
      delimiter: ",",
      skipEmptyLines: true,
      complete: (resultado) => {
        const linhas = resultado.data;
        const tickets: TicketCategoria[] = [];

        let setor = "";
        let categoria = "";
        let classificacao = "";

        for (const row of linhas) {
          const linha = row.join(",").trim();

          // Detecta bloco de cabeçalho
          if (linha.startsWith("Setor:")) {
            row.forEach((item) => {
              if (item.includes("Setor:"))
                setor = item.replace("Setor:", "").trim();
              if (item.includes("Categoria:"))
                categoria = item.replace("Categoria:", "").trim();
              if (item.includes("Classificação:"))
                classificacao = item.replace("Classificação:", "").trim();
            });
          }
          // Detecta ticket (primeira coluna é número)
          else if (/^\d+$/.test(row[0])) {
            tickets.push({
              ticketId: row[0] || "",
              assunto: row[1] || "",
              aberto: row[3] || "",
              fechado: row[4] || "",
              empresa: row[5] || "",
              operador: row[9] || "",
              setor,
              categoria,
              classificacao: classificacao || "",
            });
          }
        }
        resolve(tickets);
      },
    });
  });
}
