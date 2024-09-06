import React from "react";
import Box from "../../components/Box";
import Box2 from "../../components/Box2";
import './dashboard.styles.css';


const D1 = () => {

  return (
    <div className="row gap">
      <div className="col-12 col-lg-8 col-md-7 col-sm-12 pe-0 justify-content-center">
        <div className="row" style={{rowGap:'14px'}}>
          <div className="col-12 col-lg-6 col-md-12 col-sm-12">
            <Box prop={["#29a329", "#70db70"]} />
          </div>
          <div className="col-12 col-lg-6 col-md-12 col-sm-12">
            <Box prop={["#cc00cc", "#ff1aff"]} />
          </div>
        </div>
        <div className="row " style={{rowGap:'14px'}}>
          <div className="col-12 col-lg-6 col-md-12 col-sm-12">
            <Box prop={["#1a66ff", "#80aaff"]} />
          </div>
          <div className="col-12 col-lg-6 col-md-12 col-sm-12">
            <Box prop={["#ff9900", "#ffd633"]} />
          </div>
        </div>
      </div>

      <div className="col-12 col-lg-4 col-md-5 col-sm-12 pb-3 ps-0">
        <Box2 prop={["#5200cc", "#8533ff"]} />
      </div>

    </div>
  );
};

export default D1;
