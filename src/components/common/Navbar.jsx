import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Meals", path: "/types/meal" },
    { label: "Dishes", path: "/types/dish" },
    { label: "Cuisines", path: "/types/cuisine" },
    { label: "Contact", path: "/contact" },
  ];
  return (
    <nav>
      <ul className="nav-list">
        {navItems?.map((item) => (
          <li key={item.path}>
            <CustomNavLink
              to={item.path}
              label={item.label}
              isActive={location.pathname === item.path}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;

const CustomNavLink = ({ to, label, isActive }) => (
  <Link to={to} className={`nav-link ${isActive ? "nav-link-active" : ""}`}>
    {label}
  </Link>
);

CustomNavLink.propTypes = {
  to: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
};
