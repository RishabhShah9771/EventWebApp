import { NavLink } from "react-router-dom";
const MainNavigation = () => {
  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <NavLink to="" end>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="EventPage" end>
                Event
              </NavLink>
            </li>
            <li>
              <NavLink to="NewEvent" end>
                NewEvent
              </NavLink>
            </li>
            <li>
              <NavLink to="EditEvent" end>
                EditEvent
              </NavLink>
            </li>
            <li>
              <NavLink to="EventDetail" end>
                EventDetail
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};
export default MainNavigation;
