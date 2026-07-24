import { createContext, useContext, useState } from "react";

// 1. Context Create
export const BusinessRegistrationContext = createContext();

// 2. Provider Component (Primary Export for Fast Refresh)
export function BusinessRegistrationProvider({ children }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [businessData, setBusinessData] = useState({});

  const clearBusinessData = () => {
    setBusinessData({});
    setCurrentStep(1);
  };

  const updateBusinessData = (newData) => {
    setBusinessData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };

  return (
    <BusinessRegistrationContext.Provider
      value={{
        businessData,
        setBusinessData: updateBusinessData,
        currentStep,
        setCurrentStep,
        clearBusinessData,
      }}
    >
      {children}
    </BusinessRegistrationContext.Provider>
  );
}

// 3. Custom Hook Export
export const useBusinessRegistration = () => {
  const context = useContext(BusinessRegistrationContext);
  if (!context) {
    throw new Error(
      "useBusinessRegistration must be used within a BusinessRegistrationProvider"
    );
  }
  return context;
};