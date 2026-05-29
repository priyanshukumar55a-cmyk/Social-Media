import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark sidebar"
      style={{
        width: "200px",
        position: "fixed",
        height: "100vh",
      }}
    >
      <NavLink
        to="/"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
      >
        <span className="fs-4">Post Love</span>
      </NavLink>

      <hr />

      <ul className="nav nav-pills flex-column mb-auto">

        <li className="nav-item">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `nav-link text-white ${isActive ? "active" : ""}`
            }
          >
            Home
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink
            to="/create-post"
            className={({ isActive }) =>
              `nav-link text-white ${isActive ? "active" : ""}`
            }
          >
            Create Post
          </NavLink>
        </li>

      </ul>
    </div>
  );
};

export default Sidebar;