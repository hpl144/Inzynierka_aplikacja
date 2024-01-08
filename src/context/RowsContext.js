import { createContext, useContext, useState } from "react";

const RowsContext = createContext();

export const RowsProvider = ({ children }) => {
  const [row1, setRow1] = useState([]);
  const [row2, setRow2] = useState([]);

  const parameters = {
    row1,
    row2,
    setRow1,
    setRow2,
  };

  return <RowsContext.Provider value={{ parameters }}>{children}</RowsContext.Provider>;
};

export const useRowsContext = () => {
  return useContext(RowsContext);
};
