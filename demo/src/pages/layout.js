import { Outlet, } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          {/* <li>
            <Link to="/">login</Link>
          </li>
          <li>
            <Link to="/forgotpassword">forgotpassword</Link>
          </li> */}
          {/* <li>
            <Link to="/singup">Signup</Link>
          </li> */}
          


        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;
