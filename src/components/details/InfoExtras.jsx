import React from "react";

const InfoExtras = ({ movie }) => {
  const formatCurrency = (number) => {
    return number.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  return (
    <div
      id="filme"
      style={{
        marginLeft: "20px",
        marginTop: "40px",
        marginRight: "20px",
      }}
    >
      <div className="extras-movie">
        <h4>Titulo original:</h4>
        <p>{movie.original_title}</p>
      </div>
      <div className="extras">
        <h4>Situação:</h4>
        <p>{movie.status === "Released" ? "Lançado" : movie.status}</p>
      </div>
      <div className="extras">
        <h4>Data de lançameto:</h4>
        <p>{movie.release_date}</p>
      </div>
      <div className="extras">
        <h4>Idioma original:</h4>
        <p>{movie.spoken_languages[0].name || movie.original_language}</p>
      </div>
      <div className="extras">
        <h4>Duração:</h4>
        <p>{movie.runtime}min</p>
      </div>
      <div className="extras">
        <h4>Orçamento:</h4>
        <p>{formatCurrency(movie.budget)}</p>
      </div>
      <div className="extras">
        <h4>Receita:</h4>
        <p>{formatCurrency(movie.revenue)}</p>
      </div>
    </div>
  );
};

export default InfoExtras;
