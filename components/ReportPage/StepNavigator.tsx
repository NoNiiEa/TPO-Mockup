"use client";
import React from 'react';

interface Step {
  number: number;
  title: string;
  subtitle: string;
}

interface StepNavigatorProps {
  currentStep?: number;
  steps?: Step[];
  maxWidth?: string;
}

const StepNavigator: React.FC<StepNavigatorProps> = ({
  currentStep = 1,
  maxWidth = "1200px",
  steps = [
    { number: 1, title: 'ขั้นตอนที่ 1', subtitle: 'คัดกรองความเสียหาย' },
    { number: 2, title: 'ขั้นตอนที่ 2', subtitle: 'ข้อความยืนยอม' },
    { number: 3, title: 'ขั้นตอนที่ 3', subtitle: 'ข้อมูลผู้เสียหาย' },
    { number: 4, title: 'ขั้นตอนที่ 4', subtitle: 'เรื่องที่แจ้ง' },
    { number: 5, title: 'ขั้นตอนที่ 5', subtitle: 'ความเสียหาย' },
    { number: 6, title: 'ขั้นตอนที่ 6', subtitle: 'ข้อมูลที่ติดต่อกรุงเทพ' },
    { number: 7, title: 'ขั้นตอนที่ 7', subtitle: 'ยืนยันความถูกต้อง' }
  ]
}) => {
  const getStepStatus = (stepNumber: number) => {
    if (stepNumber < currentStep) return 'completed';
    if (stepNumber === currentStep) return 'active';
    return 'upcoming';
  };

  const getStepClasses = (stepNumber: number) => {
    const status = getStepStatus(stepNumber);
    switch (status) {
      case 'completed':
        return 'bg-blue-600 text-white';
      case 'active':
        return 'bg-blue-800 text-white';
      case 'upcoming':
        return 'bg-gray-300 text-gray-600';
      default:
        return 'bg-gray-300 text-gray-600';
    }
  };

  return (
    <div className="w-full flex justify-center mb-6">
      <div 
        className="bg-white rounded-lg shadow-sm w-full overflow-x-auto"
        style={{ maxWidth }}
      >
        <div className="flex items-center gap-4 min-w-[1200px]">
          {steps.map((step, index) => (
            <div key={step.number} className="flex-1 min-w-[220px]">
              {/* Step Item */}
              <div className={`
                flex items-center justify-center h-20 rounded-lg
                ${getStepClasses(step.number)}
                transition-all duration-300
              `}>
                <div className="flex items-center space-x-4 px-4">
                  {/* Step Number Circle */}
                  <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full bg-white bg-opacity-20 flex items-center justify-center flex-shrink-0">
                    <span className="text-lg sm:text-xl lg:text-2xl font-bold">
                      {step.number}
                    </span>
                  </div>
                  {/* Step Text */}
                  <div className="text-left min-w-0 flex-1 break-words">
                    <div className="text-sm sm:text-base lg:text-lg font-semibold">
                      {step.title}
                    </div>
                    <div className="text-xs sm:text-sm lg:text-base opacity-90">
                      {step.subtitle}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Demo component to show the step navigator in action
const StepNavigatorDemo = () => {
  const [currentStep, setCurrentStep] = React.useState(3);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-center mb-8">Step Navigator Demo</h1>
        
        {/* Controls */}
        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400"
          >
            Previous Step
          </button>
          <span className="px-4 py-2 bg-gray-200 rounded">
            Current Step: {currentStep}
          </span>
          <button
            onClick={() => setCurrentStep(Math.min(7, currentStep + 1))}
            disabled={currentStep === 7}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400"
          >
            Next Step
          </button>
        </div>

        {/* Step Navigator with default max width */}
        <StepNavigator currentStep={currentStep} />
        
        {/* Step Navigator with custom max width */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">With Custom Max Width (800px)</h2>
          <StepNavigator currentStep={currentStep} maxWidth="800px" />
        </div>
      </div>
    </div>
  );
};

export default StepNavigator;