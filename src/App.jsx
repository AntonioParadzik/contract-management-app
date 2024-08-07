import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Contracts from "./components/Contracts/Contracts.jsx";
import CreateContract from "./components/CreateContract/CreateContract.jsx";
import Sidebar from "./components/Sidebar.jsx";

function App() {
  return (
    <>
      <Router>
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Contracts />} />
            <Route path="/create" element={<CreateContract />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
