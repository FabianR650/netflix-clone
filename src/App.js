import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Browse from "./pages/Browse/Browse";
import Search from "./pages/Search/Search";
import Layout from "./Layout";
import "./App.css";
import { ProfileProvider } from "./context/ProfileContext";

function App() {
  return (
    <ProfileProvider>
      <BrowserRouter basename="/netflix-clone">
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ProfileProvider>
  );
}

export default App;