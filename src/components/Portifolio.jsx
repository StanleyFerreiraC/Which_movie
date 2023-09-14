import React from "react";
import Logo from "../assets/LogoS.png"
import LogoReact from "../assets/React.png"
import LogoGit from "../assets/GitHub.png"
import LogoTheMovie from "../assets/Themoviedb.png"

import "./style/Portifolio.css";
import { Link } from "react-router-dom";

const Portifolio = () => {
  return (
    <div className="box">
      <div className="ferramentas">
        <h5 className="a">Tools</h5>
        <img className="logoF" src={LogoReact}/>
        <img className="logoF" src={LogoGit}/>
        <img className="logoF" src={LogoTheMovie}/>
      </div>
      <div>
        <img className="logo" src={Logo}></img>
      </div>
      
      <div>

      </div>
    </div>
  );
};

export default Portifolio;
