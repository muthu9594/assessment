import React, { useState, useEffect } from "react";
import axios from "axios";
import Imagee from "./Imagee";
import "./images.css";

const Images = () => {
  const [images, setImages] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [result, setResult] = useState("");

  const accessKey = "m_qklrwKMFcYpl5mn2PnnuFPzRsyZB5aY8_Yrk8rzWQ";

  const fetchImages = () => {
    axios
      .get("https://api.unsplash.com/photos/random", {
        params: {
          client_id: accessKey,
          count: 30,
        },
      })
      .then((response) => {
        setImages(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSubmit = async (e) => {
    console.log(searchValue);
    e.preventDefault();
    try {
      const response = await axios.get(
        "https://api.unsplash.com/search/photos",
        {
          params: {
            query: searchValue,
            client_id: accessKey,
          },
        }
      );
      console.log(response);

      setImages(response.data.results);
      setResult(searchValue);
      setSearchValue("");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div>
      <div
        className="text-emphasis-primary"
        style={{ height: "8rem", backgroundColor: "#0F52BA" }}
      >
        <h4
          style={{
            padding: "10px 0 0 43.5%",
            fontWeight: "500",
            fontSize: "1.5rem",
          }}
        >
          IMAGE FINDER
        </h4>
        <div className="pt-3 d-flex" style={{ paddingLeft: "38%" }}>
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="form-control w-25 "
            type="text"
            placeholder="Search Here..."
          />
          <button onClick={handleSubmit} className="btn btn-primary">
            Search
          </button>
        </div>
      </div>
      <h3 style={{ textAlign: "center", paddingTop: "15px" }}>
        Search Result For: {result}
      </h3>

      <div className="grid-container" style={{ padding: "5%" }}>
        {images.length > 0 ? (
          images.map((image) => (
            <div key={image.id} className="grid-item">
              <Imagee
                image={image.urls.regular}
                description={image.description}
                alt={image.alt_description}
                imageLink={image.links.html}
                author={image.user.name}
              />
            </div>
          ))
        ) : (
          <h3 style={{ paddingLeft: "20%", color: "grey" }}>
            No result found for {result}....
          </h3>
        )}
      </div>
    </div>
  );
};

export default Images;
