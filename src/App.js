import "./App.css";
import Header from "./components/Header";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import Signup from "./components/Signup";
import Main from "./components/layout/Main";
import Home from "./components/Home";
import About from "./modules/pages/About/About";
import Contact from "./modules/pages/Contact/Contact";
import ShoeShop from "./modules/pages/Product/ShoeShop";
import Layout from "./components/Admin/components/Users/Layout";
import LayoutCar from "./components/Admin/components/Cars/LayoutCar";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Main />}></Route>
        <Route index element={<Home />}></Route>
        <Route exact path="/login" element={<Login />}></Route>
        <Route exact path="/signup" element={<Signup />}></Route>
        <Route exact path="/home" element={<Header />}></Route>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/about" element={<About />}></Route>
        <Route exact path="/contact" element={<Contact />}></Route>
        <Route exact path="/tracuu" element={<ShoeShop />}></Route>

        <Route exact path="/adminUser" element={<Layout />}></Route>
        <Route exact path="/adminCar" element={<LayoutCar />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
