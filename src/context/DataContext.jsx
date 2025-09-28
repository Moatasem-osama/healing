import React, { createContext, useState } from "react";

// نعمل الكونتكست
export const DataContext = createContext();

export default function DataContextProvider({ children }) {
 const [appointmentsCount, setAppointmentsCount] = useState(
  () => Number(localStorage.getItem("appointmentsCount")) || 0
);

const [testsCount, setTestsCount] = useState(
  () => Number(localStorage.getItem("testsCount")) || 0
);

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
