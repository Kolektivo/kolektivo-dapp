/* eslint-disable @typescript-eslint/naming-convention */
export interface BigNumberOverTimeData {
  createdAt: Date;
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

export interface RiskChartData {
  createdAt: Date;
  minCollateralValue: number;
  marketCap: number;
  lowRisk: number;
  moderateRisk: number;
  highRisk: number;
}

export interface kCurPriceData {
  createdAt: Date;
  kCurPrice: number;
  kCurPriceCeiling: number;
  kCurPriceFloor: number;
}

export interface kCurSupplyData {
  createdAt: Date;
  kCurCirculatingDistribution: number;
  kCurMentoDistribution: number;
  kCurPrimaryPoolDistribution: number;
  kCurReserveDistribution: number;
}
