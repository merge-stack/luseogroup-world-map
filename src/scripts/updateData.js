import * as fs from "fs";
import XLSX from "xlsx";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define file paths
const XLSX_FILE = path.join(__dirname, "../assets/data/projects.xlsx");
const DATA_FILE = path.join(__dirname, "../data/index.ts");

// Read and convert XLSX to JSON
const loadXLSXData = () => {
  if (!fs.existsSync(XLSX_FILE)) {
    console.error("❌ XLSX file not found:", XLSX_FILE);
    process.exit(1);
  }

  const workbook = XLSX.readFile(XLSX_FILE);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const jsonData = XLSX.utils.sheet_to_json(sheet);

  return jsonData.map((row, index) => {
    const [latitude, longitude] = row["GÉOLOCALISATION"]
      .split(", ")
      .map(Number);
    return {
      id: index + 1,
      name: row["NOM PROJET"] || "",
      coordinates: [longitude, latitude],
      description: row["DESCRIPTIF DE LA MISSION"] || "",
      city: row["VILLE"] || "",
      region: row["PAYS"] || "",
      area: row["SUPERFICIE"] || "",
      architect: row["ARCHITECTE"] || "",
      category: row["DOMAINE"] || "",
      photos: row["PHOTOS"] ? row["PHOTOS"].split(",") : [], // Convert string to array
    };
  });
};

// Save JSON data to `data/index.ts`
const saveToFile = (data) => {
  const content = `export const projects = ${JSON.stringify(data, null, 2)};`;
  fs.writeFileSync(DATA_FILE, content);
  console.log("✅ Data updated in:", DATA_FILE);
};

// Run the script
const projects = loadXLSXData();
saveToFile(projects);
