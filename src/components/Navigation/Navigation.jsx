import { NavLink, Router } from "react-router-dom";
import "./Navigation.css";
export default function Navigation() {
  return (
    <nav>
      <NavLink to="/" className="navLink">
        Home
      </NavLink>
      <NavLink to="/movies" className="navLink">
        Movies
      </NavLink>
    </nav>
  );
}
