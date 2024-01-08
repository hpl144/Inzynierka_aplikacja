import React from "react";
import { useRowsContext } from "../context/RowsContext";
import { useParametersContext } from "../context/ParametersContext";
const GeneralResult = () => {
  const {
    parameters: { row1, row2 },
  } = useRowsContext();

  const { parameters } = useParametersContext();
  const { waterParameters, airParameters } = parameters;
  if (row1.length === 0 || row2.length === 0) {
    return null;
  }

  return (
    <div className="App" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <div style={{ display: "flex", justifyContent: "center", gap: "40px" }}>
        <h3>
          Tw_0: {waterParameters.temperature}
          [°C]
        </h3>
        <h3>
          Ta_0: {airParameters.temperature}
          [°C]
        </h3>
      </div>
      <div style={{ width: "400px", padding: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700 }} className="row-header">
          <span style={{ textAlign: "center" }}>Row 1</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }} className="row">
          <p>Tw_1: {Math.round(row1[0][0] * 100000) / 100000}</p>
          <p>Ta_1: {Math.round(row1[0][1] * 100000) / 100000}</p>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }} className="row">
          <p>Tw_2: {Math.round(row1[1][0] * 100000) / 100000}</p>
          <p>Ta_2: {Math.round(row1[1][1] * 100000) / 100000}</p>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }} className="row">
          <p>Tw_3: {Math.round(row1[2][0] * 100000) / 100000}</p>
          <p>Ta_3: {Math.round(row1[2][1] * 100000) / 100000}</p>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }} className="row">
          <p>Tw_4: {Math.round(row1[3][0] * 100000) / 100000}</p>
          <p>Ta_4: {Math.round(row1[3][1] * 100000) / 100000}</p>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }} className="row">
          <p>Tw_5: {Math.round(row1[4][0] * 100000) / 100000}</p>
          <p>Ta_5: {Math.round(row1[4][1] * 100000) / 100000}</p>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }} className="row">
          <p>AVG_Tw: {Math.round(((row1[0][0] + row1[1][0] + row1[2][0] + row1[3][0] + row1[4][0]) / 5) * 100000) / 100000}</p>
          <p>AVG_Ta: {Math.round(((row1[0][1] + row1[1][1] + row1[2][1] + row1[3][1] + row1[4][1]) / 5) * 100000) / 100000}</p>
        </div>
      </div>
    </div>
  );
};

export default GeneralResult;
