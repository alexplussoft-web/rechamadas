import Papa from "papaparse";

export const parseCSVFile = async (file: File): Promise<string[][]> => {
  const text = await file.text();
  const parsed = Papa.parse<string[]>(text, { skipEmptyLines: true });
  return parsed.data;
};
