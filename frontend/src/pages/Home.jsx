import React from "react";
import family from "../assets/Family.mp4";
import Services from "./Services";

const Home = () => {
  return (
    <section className="mb-5 mt-4">

      <div className="video-container position-relative overflow-hidden ">
        <video
          src={family}
          style={{
            width: "100%",
            height: "90vh",
            objectFit: "cover",
            transform: "scale(1.2)",
          }}
          autoPlay
          loop
          muted
        ></video>
        <div
          className="overlay position-absolute w-100 z-2 top-0 start-0"
          style={{ background: "rgb(0,0,0,0.7)", height: "100%" }}
        ></div>
        <div
          className="home-content position-absolute top-50 start-50 z-3 text-white text-center px-4"
          style={{ transform: "translate(-50%, -50%)" }}
        >
          <h1 style={{ fontSize: "4rem"}}>
            WELCOME TO BARMAN'S DWELL{" "}
          </h1>
          <h2>A Housing Site</h2>
          <p className="fs-5"> 
            Where you get affordable rooms for rent with all facilities.
          </p>
          <button className="btn btn-primary">Explore More</button>
        </div>
      </div>

      <Services/>
    </section>
  );
};

export default Home;
