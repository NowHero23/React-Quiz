import { NavLink as Link } from "react-router-dom";
import ThemeSwitcher from "../themeSwitcher/ThemeSwitcher";

export default function Header() {
  return (
    <>
      <header className="flex justify-center w-full px-2 bg-base-300">
        <div className="container flex flex-row justify-between">
          <Link to="/" className="text-xl btn btn-ghost">
            React-Quiz
          </Link>

          <ThemeSwitcher />
        </div>
      </header>
    </>
  );
}
