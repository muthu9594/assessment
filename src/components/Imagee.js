import React from "react";
import "./imagee.css";
import { Link } from "react-router-dom";

const Imagee = ({ image, alt, description, imageLink, author }) => {
  return (
    <Link className="link" target="_blank" to={imageLink}>
      <img className="imagee" alt={alt} src={image} />
      <h6>Author:{author}</h6>
    </Link>
  );
};

export default Imagee;
