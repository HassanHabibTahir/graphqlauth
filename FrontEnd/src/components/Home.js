import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const loggedInn = JSON.parse(localStorage?.getItem("email"));
  useEffect(() => {
    if (!loggedInn) {
      navigate("/login");
    } else {
    }
  }, []);
  return (
    <div>
      <center>
        <h2 className="mt-5">
          <b>{loggedInn}</b>
        </h2>
        <button
          className="btn btn-primary"
          onClick={() => {
            localStorage.clear();
            navigate("/login");
          }}
        >
          LogOut
        </button>
      </center>
    </div>
  );
};

export default Home;
