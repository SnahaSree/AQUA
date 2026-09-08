import { useMemo, useState } from "react";
import { riverRiskData } from "../data/riskData";

export function useRiskData() {
  const [selectedRiver, setSelectedRiver] = useState("All Rivers");

  const filteredData = useMemo(() => {
    if (selectedRiver === "All Rivers") {
      return riverRiskData;
    }

    return riverRiskData.filter(
      (point) => point.river === selectedRiver,
    );
  }, [selectedRiver]);

  const averageRisk = useMemo(() => {
    if (!filteredData.length) return 0;

    return Math.round(
      filteredData.reduce(
        (sum, point) => sum + point.riskScore,
        0,
      ) / filteredData.length,
    );
  }, [filteredData]);

  return {
    selectedRiver,
    setSelectedRiver,
    filteredData,
    averageRisk,
  };
}