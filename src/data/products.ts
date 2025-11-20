import { Product } from "@/components/ProductCard";
import powerMeasurementImg from "@/assets/power-measurement.jpg";
import smartFarmingImg from "@/assets/smart-farming.jpg";

export const products: Product[] = [
  {
    id: "power-measurement",
    name: "Power Measurement Monitoring Panel",
    description:
      "Advanced power monitoring system with real-time data acquisition, energy consumption tracking, and comprehensive analytics. Features high-precision sensors and IoT connectivity for complete power management.",
    price: 2499,
    image: powerMeasurementImg,
    category: "Power Management",
  },
  {
    id: "smart-farming",
    name: "Greenhouse Smart Farming Panel",
    description:
      "Complete environmental monitoring solution for smart agriculture. Track soil conditions, humidity, temperature, pH levels, and light intensity with an intuitive touchscreen interface and automated control systems.",
    price: 1899,
    image: smartFarmingImg,
    category: "Smart Agriculture",
  },
];
