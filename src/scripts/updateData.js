import * as fs from "fs";
import XLSX from "xlsx";

import path from "path";
import { fileURLToPath } from "url";
import { Certificate } from "crypto";

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

  const isDMSFormat = (coord) => /[°'"]/g.test(coord); // Checks for DMS symbols

  const data = jsonData
    .map((row, index) => {
      const location = row["LOCALISATION"];

      // Skip if DMS format is detected
      if (!location || isDMSFormat(location)) return null;

      const [latitude, longitude] = location.split(", ").map(Number);
      return {
        id: index + 1,
        name: row["NOM PROJET"] || "",
        coordinates: [longitude, latitude],
        mission: row["MISSION"] || "",
        city: row["VILLES"] || "",
        region: row["PAYS"] || "",
        area: row["SURFACE"] || "",
        architect: row["ARCHITECTE"] || "",
        category: row["TYPE DE PROJET"] || "",
        bim: row["BIM"] || "",
        certification: row["CERTIFICATION"] || "",
        selection_bw: row["SELECTION BW"] || "",
        businessName: row["NOM D'AFFAIRE"] || "",
        photos: row["PHOTOS"] ? row["PHOTOS"].split(",") : [], // Convert string to array
      };
    })
    .filter(Boolean); // Remove null entries
  return data;
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
