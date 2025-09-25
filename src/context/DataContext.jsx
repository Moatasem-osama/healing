import React, { createContext, useState } from "react";

// نعمل الكونتكست
export const DataContext = createContext();

export default function DataContextProvider({ children }) {
  // عدد المواعيد
  const [appointmentsCount, setAppointmentsCount] = useState(0);

  // عدد التحاليل
  const [testsCount, setTestsCount] = useState(0);

  return (
    <DataContext.Provider
      value={{
        appointmentsCount,
        setAppointmentsCount,
        testsCount,
        setTestsCount,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
