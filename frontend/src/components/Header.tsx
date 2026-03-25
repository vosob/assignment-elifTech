import { useState } from "react";
import { Link } from "react-router-dom";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-slate-900 text-white">
      <nav className="flex items-center justify-between h-16 px-6 md:h-20">
        <Link to="/" className="text-xl font-bold tracking-tight">
          MyShop
        </Link>

        <ul className="hidden md:flex items-center gap-8 text-base">
          <li>
            <Link to="/" className="hover:text-slate-300 transition-colors">
              Shop
            </Link>
          </li>
          <li>
            <Link
              to="/order"
              className="hover:text-slate-300 transition-colors"
            >
              Order
            </Link>
          </li>
        </ul>

        <button
          className="md:hidden flex flex-col gap-1.5 cursor-pointer"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span
            className={`block w-6 h-0.5 bg-white transition-transform ${isOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 bg-white transition-opacity ${isOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 bg-white transition-transform ${isOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </nav>

      {isOpen && (
        <ul className="md:hidden flex flex-col px-6 pb-4 gap-4 text-base">
          <li>
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="hover:text-slate-300 transition-colors"
            >
              Shop
            </Link>
          </li>
          <li>
            <Link
              to="/order"
              onClick={() => setIsOpen(false)}
              className="hover:text-slate-300 transition-colors"
            >
              Order
            </Link>
          </li>
        </ul>
      )}
    </header>
  );
};
