export interface CausalChain {
  atmosphericSignal: string;
  satelliteCanopySignal: string;
  soilNutrientSignal: string;
  deduction: string;
}

export interface AgroAdvisory {
  primaryAction: string;
  priority: "High" | "Medium" | "Routine";
  timeframe: string;
  shortRationale: string;
  causalChain: CausalChain;
  secondaryAction?: string;
  provenance?: string;
  timestamp?: string;
}

export interface RegenerativeStage {
  stage: string;
  timeframe: string;
  action: string;
  rationale: string;
  inputsConsidered: string;
}

export interface RegenerativePlan {
  parcel: string;
  objective: string;
  stages: RegenerativeStage[];
  governanceReference: string;
}
