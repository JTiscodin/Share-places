import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import "./NavLinks.css";
const NavLinks = (props) => {
  const auth = useContext(AuthContext);
  const uid = auth.userId
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>
          {" "}
          All Users
        </NavLink>
      </li>
      {auth.isLoggedIn && (
        <>
          <li>
            <NavLink to="/places/new"> Add Place</NavLink>
          </li>

          <li>
            <NavLink to={`/${uid}/places`}> My Places</NavLink>
          </li>
        </>
      )}

      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/auth">Authenticate</NavLink>
        </li>
      )}
      {auth.isLoggedIn && <button onClick={auth.logout}>LOGOUT</button>}
    </ul>
  );
};

export default NavLinks;
