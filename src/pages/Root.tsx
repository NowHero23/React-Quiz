import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header";

export default function Root() {
  return (
    <div className="flex flex-col items-center h-screen">
      <Header />
      <Outlet />
    </div>
  );
}
