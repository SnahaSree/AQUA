export type RiskLevel = "low" | "moderate" | "high" | "critical";

export interface RiverRiskPoint {
  id: string;
  river: string;
  location: string;
  lat: number;
  lng: number;
  riskScore: number;
  riskLevel: RiskLevel;
  waterLevel: number;
  dangerLevel: number;
  rainfall: number;
  flowRate: number;
  trend: "rising" | "stable" | "falling";
  sensorStatus: "online" | "warning" | "offline";
  updatedMinutesAgo: number;
}

export const riverRiskData: RiverRiskPoint[] = [
  {
    id: "jamuna-bahadurabad",
    river: "Jamuna",
    location: "Bahadurabad",
    lat: 25.17,
    lng: 89.68,
    riskScore: 78,
    riskLevel: "high",
    waterLevel: 19.42,
    dangerLevel: 19.50,
    rainfall: 42,
    flowRate: 18500,
    trend: "rising",
    sensorStatus: "online",
    updatedMinutesAgo: 2,
  },
  {
    id: "padma-goaland",
    river: "Padma",
    location: "Goalanda",
    lat: 23.96,
    lng: 89.76,
    riskScore: 61,
    riskLevel: "moderate",
    waterLevel: 8.31,
    dangerLevel: 8.65,
    rainfall: 27,
    flowRate: 14200,
    trend: "rising",
    sensorStatus: "online",
    updatedMinutesAgo: 4,
  },
  {
    id: "meghna-bhairab",
    river: "Meghna",
    location: "Bhairab",
    lat: 24.05,
    lng: 90.98,
    riskScore: 43,
    riskLevel: "moderate",
    waterLevel: 5.87,
    dangerLevel: 6.40,
    rainfall: 18,
    flowRate: 9800,
    trend: "stable",
    sensorStatus: "online",
    updatedMinutesAgo: 3,
  },
  {
    id: "teesta-kaunia",
    river: "Teesta",
    location: "Kaunia",
    lat: 25.76,
    lng: 89.43,
    riskScore: 87,
    riskLevel: "critical",
    waterLevel: 29.18,
    dangerLevel: 28.75,
    rainfall: 67,
    flowRate: 21100,
    trend: "rising",
    sensorStatus: "warning",
    updatedMinutesAgo: 1,
  },
  {
    id: "surma-sylhet",
    river: "Surma",
    location: "Sylhet",
    lat: 24.89,
    lng: 91.87,
    riskScore: 32,
    riskLevel: "low",
    waterLevel: 9.21,
    dangerLevel: 10.00,
    rainfall: 12,
    flowRate: 6200,
    trend: "falling",
    sensorStatus: "online",
    updatedMinutesAgo: 5,
  },
  {
    id: "karatoya-panchagarh",
    river: "Karatoya",
    location: "Panchagarh",
    lat: 26.33,
    lng: 88.56,
    riskScore: 24,
    riskLevel: "low",
    waterLevel: 3.14,
    dangerLevel: 4.10,
    rainfall: 8,
    flowRate: 3900,
    trend: "stable",
    sensorStatus: "online",
    updatedMinutesAgo: 6,
  },
];

export const rivers = [
  "All Rivers",
  ...Array.from(new Set(riverRiskData.map((point) => point.river))),
];