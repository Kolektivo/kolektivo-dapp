/* eslint-disable @typescript-eslint/naming-convention */
export interface BigNumberOverTimeData {
  createdAt: number;
  value: string;
}

export interface NumberOverTimeData {
  createdAt: number;
  value: number;
}

export interface ValueChartData {
  createdAt: Date;
  value: number;
}

export interface LeverageChartData {
  createdAt: Date;
  currentLeverageRatio: number;
  maxLeverageRatio: number;
}
