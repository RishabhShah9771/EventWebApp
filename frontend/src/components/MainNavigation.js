import classes from "./MainNavigation.module.css";
import { NavLink } from "react-router-dom";

const MainNavigation = () => {
  const activeLinkHandler = ({ isActive }) => {
    return isActive ? classes.active : undefined;
  };

  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <ul>
            <li>
              <NavLink to="/" className={activeLinkHandler} end>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/events" className={activeLinkHandler} end>
                Event
              </NavLink>
            </li>
          </ul>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
