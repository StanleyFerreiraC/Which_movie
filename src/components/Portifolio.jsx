import React from "react";
import Logo from "../assets/LogoS.png";
import LogoReact from "../assets/React.png";
import LogoGit from "../assets/GitHub.png";
import LogoTheMovie from "../assets/Themoviedb.png";

import "./style/Portifolio.css";

const Portifolio = () => {
  return (
    <div className="boxRodape">
      <div className="ferramentas">
        <h5 className="text">Tools</h5>
        <img className="logoF" src={LogoReact} />
        <img className="logoF" src={LogoGit} />
        <img className="logoF" src={LogoTheMovie} />
      </div>
      <div>
        <img className="logoS" src={Logo}></img>
      </div>

      <div className="infoContants">
        <h5 className="text">Developer</h5>
        <a className="developer">Stanley Ferreira</a>
        <h5 className="contacts">Contacts</h5>
        <a className="email">Stanley_Ferreira_@outlook.com</a>
      </div>
    </div>
  );
};

export default Portifolio;
