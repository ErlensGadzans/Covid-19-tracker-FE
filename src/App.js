import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "../src/components/HomePage";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <HomePage />
      </Router>
    </div>
  );
}

export default App;
