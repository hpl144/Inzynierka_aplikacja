import { createContext, useContext, useState } from "react";

const ParamatersContext = createContext();

export const ParametersProvider = ({ children }) => {
  const [heatExchanger, setHeatExchanger] = useState({
    length: 0.6,
    height: 0.352,
    tubePitch: 0.032,
    rowPitch: 0.02771,
    rows: 4,
    controlAreas: 5,
  });

  const [tubeParameters, setTubeParameters] = useState({
    outerDiatemeter: 0.012,
    wallThickness: 0.00035,
  });

  const [finsParameters, setFinsParameters] = useState({
    finPitch: 0.003,
    finThickness: 0.0002,
  });

  const [waterParameters, setWaterParameters] = useState({
    temperature: 40.17,
    flow: 0.289,
  });

  const [airParameters, setAirParameters] = useState({
    temperature: 23.34,
    flow: 0.981,
  });

  const parameters = {
    heatExchanger,
    tubeParameters,
    finsParameters,
    waterParameters,
    airParameters,
    setHeatExchanger,
    setTubeParameters,
    setFinsParameters,
    setWaterParameters,
    setAirParameters,
  };

  return <ParamatersContext.Provider value={{ parameters }}>{children}</ParamatersContext.Provider>;
};

export const useParametersContext = () => {
  return useContext(ParamatersContext);
};
