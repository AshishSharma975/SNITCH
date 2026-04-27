import { createBrowserRouter } from "react-router";
import Register from "../features/auth/pages/Register";
import Login from "../features/auth/pages/Login";
import CreateProduct from "../features/products/pages/createProduct";
import Dashboard from "../features/products/pages/Dashboard";
import Protected from "../features/auth/components/Protected";
import Home from "../features/products/pages/Home";
import ProductDeteail from "../features/products/pages/ProductDeteail";
import SellerProductDeteail from "../features/products/pages/SellerProductDeteail";
import CartPageFinal from "../features/cart/pages/CartPageFinal";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/seller/create-product",
    element: <Protected role="seller"><CreateProduct /></Protected>,
  },
  {
    path: "/seller/dashboard",
    element: <Protected role="seller"><Dashboard /></Protected>,
  },
  {
    path: "/product/details/:productId",
    element: <ProductDeteail />,
  },
  {
    path: "/seller/product/:productId",
    element: <Protected role="seller"><SellerProductDeteail /></Protected>,
  },
  {
    path: "/cart",
    element: <Protected role="buyer"><CartPageFinal /></Protected>,
  },
]);