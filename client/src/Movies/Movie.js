import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import MovieCard from './MovieCard';

export default function Movie(props) {
  const [movie, setMovie] = useState();

  const params = useParams();
  let id = params.id;
  // Change ^^^ that line and use a hook to obtain the :id parameter from the URL

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`) // Study this endpoint with Postman
      .then((response) => {
        // Study this response with a breakpoint or log statements
        // and set the response data as the 'movie' slice of state
        setMovie(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    // This effect should run every time time
    // the `id` changes... How could we do this?
  }, [id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const { title, director, metascore, stars } = movie;

  return (
    <div className="save-wrapper">
      <MovieCard
        title={title}
        director={director}
        metascore={metascore}
        stars={stars}
      />
      <div className="save-button" onClick={() => props.save(id)}>
        Save
      </div>
    </div>
  );
}
