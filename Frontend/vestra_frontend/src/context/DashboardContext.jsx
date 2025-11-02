import React, { createContext, useContext, useState } from "react";

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [refreshFlag, setRefreshFlag] = useState(0);

  const triggerRefresh = () => {
    setRefreshFlag((prev) => prev + 1);
  };

  return (
    <DashboardContext.Provider value={{ refreshFlag, triggerRefresh }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => useContext(DashboardContext);
