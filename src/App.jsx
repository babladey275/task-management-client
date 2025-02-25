import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home/Home";
import AuthProvider from "./providers/AuthProvider/AuthProvider";
import Root from "./layouts/Root/Root";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/home" element={<Root />}>
              <Route index element={<Home />} />
            </Route>
          </Routes>
        </QueryClientProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
