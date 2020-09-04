const score_table = {
  age: {
    scores: {
      "18-49": 0,
      "50-59": 2,
      "60-69": 4,
      "70-79": 6,
      "⩾80": 7,
    },
    name: "Age (years)",
  },
  sex: {
    scores: {
      Female: 0,
      Male: 1,
    },
    name: "Sex at birth",
  },
  comorbidities: {
    scores: {
      "0": 0,
      "1": 1,
      "⩾2": 2,
    },
    name: "Number of comorbidities",
    help:
      "Chronic cardiac disease; chronic respiratory disease (excluding asthma); chronic renal disease (estimated\n" +
      "glomerular filtration rate ≤30); mild-to-severe liver disease; dementia; chronic neurological conditions;\n" +
      "connective tissue disease; diabetes mellitus (diet, tablet or insulin-controlled); HIV/AIDS;\n" +
      "malignancy; clinician-defined obesity.",
  },
  respiratory_rate: {
    scores: {
      "<20": 0,
      "20-29": 1,
      "⩾30": 2,
    },
    name: "Respiratory rate (breaths/minutes)",
  },
  oxygen_saturation: {
    scores: {
      "<92": 2,
      "⩾92": 0,
    },
    name: "Peripheral oxygen saturation on room air (%)",
  },
  gcs: {
    scores: {
      "<15": 2,
      "15": 0,
    },
    name: "Glasgow Coma Scale",
  },
  urea: {
    scores: {
      "⩽7": 0,
      "7-14": 1,
      ">14": 3,
    },
    name: "Urea (mmol/L)",
  },
  crp: {
    scores: {
      "<50": 0,
      "50-99": 1,
      "⩾100": 2,
    },
    name: "CRP (mg/dl)",
  },
};

const categories = [
  { name: "Low", min: 0, max: 3, color: "#fee5d9", mortality: "1.2%" },
  { name: "Intermediate", min: 4, max: 8, color: "#fcae91", mortality: "9.9%" },
  { name: "High", min: 9, max: 14, color: "#fb6a4a", mortality: "31.4%" },
  { name: "Very High", min: 15, max: 21, color: "#cb181d", mortality: "61.5%" },
];

const counts = [
  160.3375527426158,
  329.11392405063265,
  485.23206751054835,
  645.5696202531644,
  759.4936708860757,
  759.4936708860757,
  919.8312236286918,
  1097.0464135021098,
  1308.0168776371306,
  1620.2531645569622,
  1864.9789029535864,
  2050.6329113924053,
  2185.654008438818,
  2118.143459915612,
  1780.5907172995778,
  1455.6962025316454,
  1109.7046413502107,
  725.7383966244723,
  455.6962025316453,
  223.62869198312228,
  101.26582278481014,
  33.755274261603375,
];

const mortality = [
  0,
  0.2976190476190476,
  0.8064516129032258,
  2.3112480739599386,
  4.805194805194805,
  7.474226804123711,
  7.783783783783784,
  11.695376246600182,
  14.448669201520913,
  19.164619164619165,
  22.899946495452113,
  26.91561590688652,
  32.90793072014585,
  40.13188883655205,
  44.57494407158837,
  51.63934426229508,
  59.10313901345292,
  66.12244897959184,
  75.80993520518359,
  77.3913043478261,
  82.88288288288288,
  87.5,
];

const allScores = Array.apply(null, Array(21 + 1)).map((_, i) => i);

let scoreColors = [];
for (let j in categories) {
  const cat = categories[j];
  for (let i = cat.min; i <= cat.max; i++) {
    scoreColors[i] = cat.color;
  }
}

export { score_table, categories, counts, mortality, allScores, scoreColors };
