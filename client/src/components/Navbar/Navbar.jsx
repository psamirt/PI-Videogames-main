import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const currentPath = window.location.pathname;

  return (
    <div className="nav-container">
      <div className="img-container">
        <Link to="/">
          <img
            src="https://img.freepik.com/vector-gratis/skull-gaming-with-joy-stick-emblema-estilo-moderno_32991-492.jpg?w=740&t=st=1683332513~exp=1683333113~hmac=fa4bf8da400751ddbfc33c8b9ba891a5b868fcc0969232a41dcad0d32ed43af3"
            alt="logo"
          />
        </Link>
      </div>
      <div className="link-card" >
        {currentPath === "/home" ? (
          <Link to="/create">Crear</Link>
        ) : (
          <Link to="/home">Home</Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
