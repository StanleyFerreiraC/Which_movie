import React from 'react'

const InfoExtrasTv = ({movie}) => {

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
        <p>{movie.original_name}</p>
      </div>
      <div className="extras">
        <h4>Situação:</h4>
        <p>{movie.in_production == true ? "Em produção" : "Encerrada"}</p>
      </div>
      <div className="extras">
        <h4>Data de lançameto:</h4>
        <p>{movie.first_air_date}</p>
      </div>
      <div className="extras">
        <h4>Idioma original:</h4>
        <p>{movie.spoken_languages[0].english_name || movie.original_language}</p>
      </div>
      <div className="extras">
        <h4>Duração:</h4>
        <p>{movie.episode_run_time}min</p>
      </div>
      <div className="extras">
        <h4>Ultimo episodio lançado:</h4>
        <p>{movie.last_episode_to_air.episode_number}</p>
      </div>
    </div>

  )
}

export default InfoExtrasTv