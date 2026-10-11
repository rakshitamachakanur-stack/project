
import axios from "axios";

const mlApi = axios.create({
  baseURL: "http://127.0.0.1:5001",
  timeout: 10000,
});

export interface DemandPredictionInput {
  product_name: string;
  category: string;
  selling_price_inr: number;
  competitor_price_inr: number;
  stock_available: number;
  temperature_c: number;
  rainfall_mm: number;
  is_weekend: number;
  is_festival: number;
}

export interface DemandPredictionResponse {
  predicted_units_sold: number;
  note: string;
}

export async function predictDemand(
  input: DemandPredictionInput
): Promise<DemandPredictionResponse> {
  const response = await mlApi.post<DemandPredictionResponse>(
    "/api/predict-demand",
    input
  );

  return response.data;
}

