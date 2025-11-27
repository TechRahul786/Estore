import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./components/Dashboard";
import Products from "./pages/Products";
import ProductDetails from "./components/ProductDetails";
import AuthLayout from "./pages/auth/AuthLayout";
import Cart from "./pages/Cart";
import ShowCart from "./components/ShowCart";
import Orders from "./pages/Orders";

function App() {
  return (
    <>
      <div className="bg-gray-100">
        <Routes>
          <Route path="/auth" element={<AuthLayout />} />

          <Route path="/" element={<Home />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />}>
              <Route path="/cart" element={<ShowCart />} />
            </Route>
            <Route path="/orders" element={<Orders/>}/>
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
