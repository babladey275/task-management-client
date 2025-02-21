import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";

import Home from "./pages/Home/Home";
import AuthProvider from "./providers/AuthProvider/AuthProvider";
import Root from "./layouts/Root/Root";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/" element={<Root />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
