import { Card, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import './Movie.scss'

function Movie({ movie, isPoster }) {
  console.log(isPoster)
  return (
    <Card
      component={Link}
      to={`/movies/${movie.id}`}
      className={`movie__element ${isPoster ? 'movie__element_poster' : ''}`}
    >
      <CardMedia
        component='img'
        src={`${process.env.REACT_APP_BASE_URL_IMAGE}${
          isPoster ? movie.poster_path : movie.backdrop_path
        }`}
        alt={movie.title}
        className={
          isPoster
            ? 'movie__element__image__poster'
            : 'movie__element__image__background'
        }
      />
      {isPoster === false && (
        <CardContent className='movie__element__content'>
          <Typography>{movie.name ? movie.name : movie.title}</Typography>
        </CardContent>
      )}
    </Card>
  )
}

export default Movie
