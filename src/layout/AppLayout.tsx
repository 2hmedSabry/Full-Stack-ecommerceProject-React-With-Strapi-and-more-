import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import CartDrawer from "../components/CartDrawer";
const AppLayout = () => {
  return (
    <div>
      <Navbar />
      <CartDrawer />
      <Outlet />
    </div>
  );
};

export default AppLayout;
