import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Parameters from "./components/Parameters";
import GeneralResult from "./components/GeneralResult";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="App-header">
          <div className="grid-container">
            <Link to="/" className="Header-button">
              Parameters
            </Link>
            <Link to="/generalresult" className="Header-button">
              General Result
            </Link>
          </div>
        </div>
        <div>
          <Routes>
            <Route path="/" element={<Parameters />} />
            <Route path="/generalresult" element={<GeneralResult />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
