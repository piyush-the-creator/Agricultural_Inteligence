import React from "react";

export interface ProgressStep {
  id: number;
  text: string;
  source?: string;
}

export interface StepProgressProps {
  title?: string;
  subtitle?: string;
  currentStep: number;
  steps: ProgressStep[];
}

export const StepProgress: React.FC<StepProgressProps> = ({
  title = "AgriN Intelligence Pipeline",
  subtitle = "Synthesizing multi-source observation telemetry...",
  currentStep,
  steps,
}) => {
  const total = steps.length;
  const progressPercent = Math.min(100, Math.round((currentStep / total) * 100));

  return (
    <div className="max-w-[540px] w-full mx-auto bg-white border border-[#E2E0D8] rounded p-6 sm:p-8">
      <h2 className="text-sm sm:text-base font-semibold tracking-tight text-[#1B241E] uppercase font-mono mb-1">
        {title}
      </h2>
      <p className="text-xs text-[#58635A] mb-6">{subtitle}</p>

      <div className="space-y-3.5 mb-8" role="status" aria-live="polite">
        {steps.map((step) => {
          const isDone = currentStep > step.id;
          const isCurrent = currentStep === step.id;

          return (
            <div
              key={step.id}
              className="flex items-center space-x-3 text-xs font-mono transition-opacity duration-300"
            >
              <span
                className={`w-5 h-5 flex-shrink-0 flex items-center justify-center rounded text-[11px] font-bold border ${
                  isDone
                    ? "bg-[#EBF5EE] text-[#1E5E2E] border-[#BCE3C5]"
                    : isCurrent
                    ? "bg-[#FFF9EB] text-[#875A00] border-[#F5DE9C] animate-pulse"
                    : "bg-[#F4F5F2] text-[#828E84] border-[#E2E0D8]"
                }`}
                aria-hidden="true"
              >
                {isDone ? "✓" : isCurrent ? "⟳" : "○"}
              </span>
              <span
                className={
                  isDone
                    ? "text-[#1B241E]"
                    : isCurrent
                    ? "text-[#1B241E] font-medium"
                    : "text-[#828E84]"
                }
              >
                {step.text}
              </span>
            </div>
          );
        })}
      </div>

      {/* Mathematical Progress Bar */}
      <div className="w-full bg-[#F4F5F2] h-2 rounded-full overflow-hidden border border-[#E2E0D8]">
        <div
          className="bg-[#2D5A3C] h-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="flex justify-between items-center text-[11px] font-mono text-[#58635A] mt-2">
        <span>
          Processing Stage: {Math.min(currentStep, total)} of {total}
        </span>
        <span>{progressPercent}% Complete</span>
      </div>
    </div>
  );
};
