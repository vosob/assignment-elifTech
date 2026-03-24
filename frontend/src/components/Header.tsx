import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header>
      <nav>
        <ul className="flex items-center justify-center gap-4 h-24 px-4 bg-slate-900 text-white text-3xl">
          <li>
            <Link to="/">Shop</Link>
          </li>
          <li>
            <Link to="/order">Order</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
