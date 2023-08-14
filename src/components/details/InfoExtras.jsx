import React from 'react'

const InfoExtras = ({movie}) => {

    const formatCurrency = (number) => {
        return number.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        });
      };

  return (
<div>
    <div className="extras">
              <h4>Titulo original:</h4>
              <p>{movie.original_title}</p>
              </div>
              <div className="extras">
              <h4>Situação:</h4>
              <p>{movie.status}</p>
              </div>
              <div className="extras">
              <h4>Data de lançameto:</h4>
              <p>{movie.release_date}</p>
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
  )
}

export default InfoExtras