import React from "react";
import Logo from "../assets/LogoS.png";
import LogoReact from "../assets/React.png";
import LogoGit from "../assets/GitHub.png";
import LogoTheMovie from "../assets/Themoviedb.png";

import "./style/Portifolio.css";

const Portifolio = () => {

    function handleClickLink() {
      window.location.assign("https://github.com/StanleyFerreiraC");
    }


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
        <button onClick={handleClickLink} className="developer">Stanley Ferreira</button>
      </div>
    </div>
  );
};

export default Portifolio;
