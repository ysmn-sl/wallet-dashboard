import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import WalletDetails from "./components/WalletDetails";

function App() {
  return (
    <div className="min-h-screen">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/wallet/:walletAddress" element={<WalletDetails />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
