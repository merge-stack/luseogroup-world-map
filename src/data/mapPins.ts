import React from "react";
import boraBoraImage from "../assets/bora-bora.jpg";
import canadaImage from "../assets/canada.jpg";
import polandImage from "../assets/poland.jpg";

export const mapPins = [
  {
    id: 1,
    name: "ST. REGIS BORA BORA, FRENCH POLYNESIA",
    coordinates: [-151.697307, -16.485678],
    scope: "HVAC and plumbing Design and Works Follow-Up",
    image: boraBoraImage,
    projectDetails: {
      architect: "Tropical Architecture",
      size: "83 Bungalows",
      category: "Hospitality",
      region: "ASIA/PACIFIC",
    },
  },
  {
    id: 2,
    name: "IQUALIT INTERNATIONAL AIRPORT NUNAVUT, CANADA",
    coordinates: [-68.54499097314769, 63.757102826015384],
    scope: "Low Voltage and Extra Low Voltage",
    image: canadaImage,
    projectDetails: {
      architect: "Stantec",
      size: "226,000 SF",
      category: "Transportation",
      region: "AMERICAS",
    },
  },
  {
    id: 3,
    name: "FRANCE TELECOM HEAD OFFICE WARSAW, POLAND",
    coordinates: [20.94595578081058, 52.208692468227596],
    scope: "HVAC, Plumbing, Low and Extra Low Voltage, Fire Protection",
    image: polandImage,
    projectDetails: {
      architect: "Bouygues",
      size: "430,000 SF",
      category: "Commercial",
      region: "EUROPE",
    },
  },
];
