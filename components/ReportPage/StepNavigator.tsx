'use client';
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

const StepNavigator2 = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter();
  const currentPath = usePathname();

  const getCurrentStepFromLink = () => {
    const stepMatch = currentPath && currentPath.match(/step-(one|two|three|four|five|six|seven)/);
    if (stepMatch) {
      const stepMap: { [key: string]: number } = {
        'one': 1,
        'two': 2,
        'three': 3,
        'four': 4,
        'five': 5,
        'six': 6,
        'seven': 7
      };
      return stepMap[stepMatch[1]] || 1;
    }
    return 1;
  }

  useEffect(() => {
    const step = getCurrentStepFromLink();
    setCurrentStep(step);
  }, [currentPath]);

  const steps = [
    { number: 1, title: 'ขั้นตอนที่ 1', subtitle: 'คัดกรองความเสียหาย', link: '/report/step-one' },
    { number: 2, title: 'ขั้นตอนที่ 2', subtitle: 'ข้อความยืนยอม', link: '/report/step-two' },
    { number: 3, title: 'ขั้นตอนที่ 3', subtitle: 'ข้อมูลผู้เสียหาย', link: '/report/step-three' },
    { number: 4, title: 'ขั้นตอนที่ 4', subtitle: 'เรื่องที่แจ้ง', link: '/report/step-four' },
    { number: 5, title: 'ขั้นตอนที่ 5', subtitle: 'ความเสียหาย', link: '/report/step-five' },
    { number: 6, title: 'ขั้นตอนที่ 6', subtitle: 'ข้อมูลที่ติดต่อกรุงเทพ', link: '/report/step-six' },
    { number: 7, title: 'ขั้นตอนที่ 7', subtitle: 'ยืนยันความถูกต้อง', link: '/report/step-seven' }
  ];

  const getStepStatus = (stepNumber: number) => {
    if (stepNumber < currentStep) return 'completed';
    if (stepNumber === currentStep) return 'active';
    return 'upcoming';
  }

  const getStepClasses = (stepNumber: number) => {
    const status = getStepStatus(stepNumber);
    const baseClasses = 'cursor-pointer hover:shadow-lg hover:scale-105';
    
    switch (status) {
      case 'completed':
        return `bg-blue-600 text-white ${baseClasses}`;
      case 'active':
        return `bg-blue-800 text-white ${baseClasses}`;
      case 'upcoming':
        return `bg-gray-300 text-gray-600 ${baseClasses}`;
      default:
        return `bg-gray-300 text-gray-600 ${baseClasses}`;
    }
  }

  const handleStepClick = (link: string) => {
    router.push(link);
  }

  return (
    <div className="w-full flex justify-center mb-6">
      <div
        className="bg-white rounded-lg w-full overflow-x-auto"
        style={{ maxWidth: '1200px' }}
      >
        <div className="flex items-center gap-4 min-w-[1200px]">
          {steps.map((step, index) => (
            <div key={step.number} className="flex-1 min-w-[220px]">
              {/* Step Item */}
              <div
                className={`
                  flex items-center justify-center h-20 rounded-lg
                  ${getStepClasses(step.number)}
                  transition-all duration-300
                `}
                onClick={() => handleStepClick(step.link)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleStepClick(step.link);
                  }
                }}
              >
                <div className="flex items-center space-x-4 px-4">
                  {/* Step Number Circle */}
                  <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full bg-white bg-opacity-20 flex items-center justify-center flex-shrink-0">
                    <span className="text-lg sm:text-xl lg:text-2xl font-bold text-black">
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
}

export default StepNavigator2;