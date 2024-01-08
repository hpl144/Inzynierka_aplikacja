import React from "react";
import { useParametersContext } from "../context/ParametersContext";
import { Link } from "react-router-dom";
import { inputTitlesAirParameters, inputTitlesWaterParameters, inputTitlesFinParameters, inputTitlesHeat, inputTitlesTubeParameters } from "./constants";
import "./paramaters.css";
import { calculate } from "../calculate";
import { useRowsContext } from "../context/RowsContext";

const Parameters = () => {
  const { parameters } = useParametersContext();
  const {
    parameters: { setRow1, setRow2 },
  } = useRowsContext();

  const {
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
  } = parameters;

  const handleSubmit = () => {
    let row1, row2;
    let fullRow1 = [];
    let fullRow2 = [];
    let waterParametersTemp = waterParameters.temperature;
    let waterParametersTempRow2 = waterParameters.temperature;
    let airParametersTemp = airParameters.temperature;
    for (let i = 0; i < 5; i++) {
      row1 = calculate(
        heatExchanger,
        tubeParameters,
        finsParameters,
        { ...waterParameters, temperature: waterParametersTemp },
        { ...airParameters, temperature: airParametersTemp }
      );
      waterParametersTemp = row1.Tw_1 - 273.15;
      row2 = calculate(
        heatExchanger,
        tubeParameters,
        finsParameters,
        { ...waterParameters, temperature: waterParametersTempRow2 },
        { ...airParameters, temperature: row1.Ta_1 - 273.15 }
      );
      waterParametersTempRow2 = row2.Tw_1 - 273.15;
      fullRow1.push([row1.Tw_1 - 273.15, row1.Ta_1 - 273.15]);
      fullRow2.push([row2.Tw_1 - 273.15, row2.Ta_1 - 273.15]);
    }
    setRow1(fullRow1);
    setRow2(fullRow2);
  };

  return (
    <div className="App-background">
      <div className="inputs-container">
        <div>
          <h3>Heat Exchanger geometrical parameters:</h3>
          <form>
            {inputTitlesHeat.map((input) => {
              return (
                <div className="input-container">
                  <span>{input.title}</span>
                  <input
                    name={input.varName}
                    type="text"
                    onChange={(e) => setHeatExchanger({ ...heatExchanger, [e.target.name]: e.target.value })}
                    defaultValue={heatExchanger[input.varName]}
                  />
                </div>
              );
            })}
          </form>
        </div>
        <div>
          <h3>Tube paramaters:</h3>
          <form>
            {inputTitlesTubeParameters.map((input) => {
              return (
                <div className="input-container">
                  <span>{input.title}</span>
                  <input
                    name={input.varName}
                    type="text"
                    onChange={(e) => setTubeParameters({ ...tubeParameters, [e.target.name]: e.target.value })}
                    defaultValue={tubeParameters[input.varName]}
                  />
                </div>
              );
            })}
          </form>
        </div>
        <div>
          <h3>Fins paramaters:</h3>
          <form>
            {inputTitlesFinParameters.map((input) => {
              return (
                <div className="input-container">
                  <span>{input.title}</span>
                  <input
                    name={input.varName}
                    type="text"
                    onChange={(e) => setFinsParameters({ ...finsParameters, [e.target.name]: e.target.value })}
                    defaultValue={finsParameters[input.varName]}
                  />
                </div>
              );
            })}
          </form>
        </div>
        <div>
          <h3>Water paramaters:</h3>
          <form>
            {inputTitlesWaterParameters.map((input) => {
              return (
                <div className="input-container">
                  <span>{input.title}</span>
                  <input
                    name={input.varName}
                    type="text"
                    onChange={(e) => setWaterParameters({ ...waterParameters, [e.target.name]: e.target.value })}
                    defaultValue={waterParameters[input.varName]}
                  />
                </div>
              );
            })}
          </form>
        </div>
        <div>
          <h3>Air paramaters:</h3>
          <form>
            {inputTitlesAirParameters.map((input) => {
              return (
                <div className="input-container">
                  <span>{input.title}</span>
                  <input
                    name={input.varName}
                    type="text"
                    onChange={(e) => setAirParameters({ ...airParameters, [e.target.name]: e.target.value })}
                    defaultValue={airParameters[input.varName]}
                  />
                </div>
              );
            })}
          </form>
        </div>
      </div>
      <Link to={"/generalresult"}>
        <button type="submit" onClick={handleSubmit}>
          Oblicz
        </button>
      </Link>
    </div>
  );
};

export default Parameters;
