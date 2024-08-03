import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import Teams from "./pages/Teams";
import Players from "./pages/Players";
import Matches from "./pages/Matches";
import Stats from "./pages/PlayerStatistics";

const App = () => {
  return (
    <Router>
      <div className="p-4">
        <nav className="mb-4">
          <Link to="/" className="mr-4">
            Home
          </Link>
          <Link to="/teams" className="mr-4">
            Teams
          </Link>
          <Link to="/players" className="mr-4">
            Players
          </Link>
          <Link to="/matches" className="mr-4">
            Matches
          </Link>
          <Link to="/stats">Stats</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/players" element={<Players />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/stats" element={<Stats />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
