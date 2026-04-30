import { createBrowserRouter } from "react-router";
import Register from "../features/auth/pages/Register";
import Login from "../features/auth/pages/Login";
import CreateProduct from "../features/products/pages/CreateProduct";
import Dashboard from "../features/products/pages/Dashboard";
import Protected from "../features/auth/components/Protected";
import Home from "../features/products/pages/Home";
import ProductDeteail from "../features/products/pages/ProductDeteail";
import SellerProductDeteail from "../features/products/pages/SellerProductDeteail";
import CartPageFinal from "../features/cart/pages/CartPageFinal";
import Orders from "../features/cart/pages/Orders";
import OrderSuccess from "../features/cart/pages/OrderSuccess";

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
  {
    path: "/orders",
    element: <Protected role="buyer"><Orders /></Protected>,
  },
  {
    path: "/order-success",
    element: <Protected role="buyer"><OrderSuccess /></Protected>,
  },
]);