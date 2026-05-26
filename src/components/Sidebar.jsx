import { Link } from "react-router-dom";

const Sidebar = ({ selectedTab,setSelectedTab }) => {

  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark sidebar"
      style={{ width: "200px", scrollBehavior: "none", position: "fixed", height: "100vh" }}
    >
      <Link
        to="/"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
      >
        <svg
          className="bi pe-none me-2"
          width="40"
          height="32"
          aria-hidden="true"
        >
          <use xlinkHref="#bootstrap" />
        </svg>
        <span className="fs-4">Post Love</span>
      </Link>

      <hr />

      <ul className={`nav nav-pills flex-column mb-auto`}>
        <li onClick={() => setSelectedTab("Home")} className="nav-item">
          <Link to="/" className={`nav-link text-white ${selectedTab === "Home" ? "active" : ""}`} aria-current="page">
            <svg
              className="bi pe-none me-2"
              width="16"
              height="16"
              aria-hidden="true"
            >
              <use xlinkHref="#home" />
            </svg>
            Home
          </Link>
        </li>

        <li onClick={() => setSelectedTab("Create Post")} className="nav-item">
          <Link to="/create-post" className={`nav-link text-white ${selectedTab === "Create Post" ? "active" : ""}`} aria-current="page">
            <svg
              className="bi pe-none me-2"
              width="16"
              height="16"
              aria-hidden="true"
            >
              <use xlinkHref="#home" />
            </svg>
            Create Post
          </Link>
        </li>
      </ul>

      <hr />

      <div className="dropdown">
        <Link
          to="#"
          className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img
            src="https://github.com/mdo.png"
            alt=""
            width="32"
            height="32"
            className="rounded-circle me-2"
          />
          <strong>mdo</strong>
        </Link>

        <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
          <li>
            <Link to="#" className="dropdown-item">
              New project...
            </Link>
          </li>
          <li>
            <Link to="#" className="dropdown-item">
              Settings
            </Link>
          </li>
          <li>
            <Link to="#" className="dropdown-item">
              Profile
            </Link>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <Link to="#" className="dropdown-item">
              Sign out
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
