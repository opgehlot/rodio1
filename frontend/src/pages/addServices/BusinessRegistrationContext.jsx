import { createContext, useContext, useState } from "react";

const BusinessRegistrationContext = createContext();

export const BusinessRegistrationProvider = ({ children }) => {
  const [businessData, setBusinessData] = useState(null);

  const clearBusinessData = () => {
    setBusinessData(null);
  };

  return (
    <BusinessRegistrationContext.Provider
      value={{
        businessData,
        setBusinessData,
        clearBusinessData,
      }}
    >
      {children}
    </BusinessRegistrationContext.Provider>
  );
};

export const useBusinessRegistration = () =>
  useContext(BusinessRegistrationContext);