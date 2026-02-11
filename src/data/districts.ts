export interface District {
  id: string;
  name: string;
  region: string;
  province: number;
  crops: string[];
  population: number;
  area: number;
}

export const districts: District[] = [
  { id: "kathmandu", name: "Kathmandu", region: "Bagmati", province: 3, crops: ["rice", "wheat", "vegetables"], population: 1744240, area: 395 },
  { id: "chitwan", name: "Chitwan", region: "Bagmati", province: 3, crops: ["rice", "maize", "mustard", "vegetables"], population: 579984, area: 2218 },
  { id: "kaski", name: "Kaski", region: "Gandaki", province: 4, crops: ["rice", "millet", "potato", "cardamom"], population: 492098, area: 2017 },
  { id: "morang", name: "Morang", region: "Koshi", province: 1, crops: ["rice", "jute", "sugarcane", "tea"], population: 965370, area: 1855 },
  { id: "rupandehi", name: "Rupandehi", region: "Lumbini", province: 5, crops: ["rice", "wheat", "sugarcane", "lentils"], population: 880196, area: 1360 },
  { id: "jhapa", name: "Jhapa", region: "Koshi", province: 1, crops: ["rice", "tea", "jute", "cardamom"], population: 812650, area: 1606 },
  { id: "sunsari", name: "Sunsari", region: "Koshi", province: 1, crops: ["rice", "jute", "sugarcane", "wheat"], population: 763487, area: 1257 },
  { id: "kailali", name: "Kailali", region: "Sudurpashchim", province: 7, crops: ["rice", "wheat", "lentils", "mustard"], population: 775709, area: 3235 },
  { id: "lalitpur", name: "Lalitpur", region: "Bagmati", province: 3, crops: ["rice", "wheat", "potato", "vegetables"], population: 468132, area: 385 },
  { id: "bara", name: "Bara", region: "Madhesh", province: 2, crops: ["rice", "wheat", "sugarcane", "maize"], population: 687708, area: 1190 },
  { id: "parsa", name: "Parsa", region: "Madhesh", province: 2, crops: ["rice", "wheat", "sugarcane", "lentils"], population: 601017, area: 1353 },
  { id: "dhanusha", name: "Dhanusha", region: "Madhesh", province: 2, crops: ["rice", "wheat", "lentils", "mango"], population: 754777, area: 1180 },
  { id: "banke", name: "Banke", region: "Lumbini", province: 5, crops: ["rice", "wheat", "mustard", "lentils"], population: 491313, area: 2337 },
  { id: "dang", name: "Dang", region: "Lumbini", province: 5, crops: ["rice", "maize", "mustard", "lentils"], population: 552583, area: 2955 },
  { id: "surkhet", name: "Surkhet", region: "Karnali", province: 6, crops: ["rice", "maize", "millet", "wheat"], population: 350804, area: 2451 },
  { id: "ilam", name: "Ilam", region: "Koshi", province: 1, crops: ["tea", "cardamom", "ginger", "rice"], population: 290254, area: 1703 },
  { id: "gorkha", name: "Gorkha", region: "Gandaki", province: 4, crops: ["rice", "maize", "millet", "potato"], population: 271061, area: 3610 },
  { id: "palpa", name: "Palpa", region: "Lumbini", province: 5, crops: ["rice", "maize", "millet", "citrus"], population: 261543, area: 1373 },
  { id: "makwanpur", name: "Makwanpur", region: "Bagmati", province: 3, crops: ["rice", "maize", "potato", "vegetables"], population: 420477, area: 2426 },
  { id: "nawalparasi-east", name: "Nawalparasi East", region: "Gandaki", province: 4, crops: ["rice", "wheat", "sugarcane", "banana"], population: 328764, area: 1043 },
];

export const getDistrictById = (id: string): District | undefined =>
  districts.find((d) => d.id === id);

export const provinces = [
  { id: 1, name: "Koshi", color: "hsl(142, 72%, 29%)" },
  { id: 2, name: "Madhesh", color: "hsl(30, 40%, 45%)" },
  { id: 3, name: "Bagmati", color: "hsl(142, 60%, 35%)" },
  { id: 4, name: "Gandaki", color: "hsl(200, 80%, 55%)" },
  { id: 5, name: "Lumbini", color: "hsl(45, 90%, 50%)" },
  { id: 6, name: "Karnali", color: "hsl(160, 60%, 35%)" },
  { id: 7, name: "Sudurpashchim", color: "hsl(20, 25%, 30%)" },
];
