import "./App.css";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import MainPage from "./pages/MainPage";
import EditPage from "./pages/EditPage";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mainpage" element={<MainPage />} />
        <Route path="/editpage/:id" element={<EditPage />} />
      </Routes>
    </>
  );
}

export default App;
