import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <style>{`
        .custom-navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: #1a1a1a;
          padding: 1rem 2rem;
          position: sticky;
          top: 0;
          z-index: 1000;
          font-family: sans-serif;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .navbar-logo a {
          color: #ffffff;
          font-size: 1.5rem;
          font-weight: bold;
          text-decoration: none;
        }

        /* This wrapper ensures the links stay perfectly centered on the screen */
        .nav-links-wrapper {
          display: flex;
          justify-content: center;
          flex-grow: 1;
        }

        .nav-links {
          display: flex;
          list-style: none;
          gap: 32px;
          margin: 0;
          padding: 0;
        }

        .nav-item-link {
          color: #cccccc;
          text-decoration: none;
          font-size: 1.1rem;
          font-weight: 500;
          padding-bottom: 4px;
          transition: color 0.2s ease-in-out;
        }

        .nav-item-link:hover {
          color: #00bcd4;
        }

        .nav-item-link.active {
          color: #00bcd4;
          border-bottom: 2px solid #00bcd4;
        }

        /* Invisible spacer that mirrors the logo width to keep centering mathematically perfect */
        .navbar-spacer {
          visibility: hidden;
        }
      `}</style>

      <nav className="custom-navbar">
        <div className="nav-links-wrapper">
          <ul className="nav-links">
            <li>
              <NavLink to="/bookings" className="nav-item-link">
                Bookings
              </NavLink>
            </li>
            <li>
              <NavLink to="/vehicles" className="nav-item-link">
                Vehicles
              </NavLink>
            </li>
            <li>
              <NavLink to="/contacts" className="nav-item-link">
                Contacts
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="navbar-spacer" />
      </nav>
    </>
  );
};

export default Navbar;
