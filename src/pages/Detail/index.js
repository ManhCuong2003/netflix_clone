import { Box, Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Axios from '../../api/axiosClient'
import Header from '../../components/Header/Header'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import './Detail.scss'

const BASE_URL_MOVIE_DETAIL = '/movie/'

function DetaiPage() {
  const { movieId } = useParams()
  const [movie, setMovie] = useState({})
  const [trailer, setTrailer] = useState()
  const [showTrailer, setShowTrailer] = useState(false)

  useEffect(() => {
    const fetchData = async (movieId) => {
      const res = await Axios.get(
        `${BASE_URL_MOVIE_DETAIL}${movieId}?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=videos`
      )
      setMovie(res.data)
      setTrailer(res.data.videos.results[0]?.key)
    }
    fetchData(movieId)
  }, [movieId])

  const handleShowTrailer = () => {
    if (showTrailer) {
      setShowTrailer(false)
    } else {
      setShowTrailer(true)
    }
  }

  return (
    <Box>
      <Box
        className='background'
        sx={{
          backgroundImage: `url(${process.env.REACT_APP_BASE_URL_IMAGE}${movie.backdrop_path})`
        }}
      ></Box>
      <Box className='wrapper'>
        <Box className='movie-detail'>
          <Box className='movie-detail__wrapper'>
            <Box className='movie-detail__wrapper__poster'>
              <img
                src={`${process.env.REACT_APP_BASE_URL_IMAGE}${movie.poster_path}`}
                alt='movie poster'
              />
            </Box>
            <Box className='movie-detail__wrapper__content'>
              <Typography className='movie-detail__wrapper__content__releaseDate'>
                {movie.release_date}
              </Typography>
              <Typography
                variant='h3'
                className='movie-detail__wrapper__content__title'
              >
                {movie.title}
              </Typography>
              <Typography className='movie-detail__wrapper__content__overview'>
                {movie.overview}
              </Typography>
              {trailer && (
                <Box className='movie-detail__wrapper__content__button'>
                  <Button
                    onClick={handleShowTrailer}
                    startIcon={<PlayArrowIcon />}
                  >
                    Trailer
                  </Button>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
        {showTrailer && (
          <Box className='trailer_movie-detail'>
            <Box
              className='trailer_movie-detail__overlay'
              onClick={handleShowTrailer}
            >
              <iframe
                src={`https://www.youtube.com/embed/${trailer}?autoplay=1&mute=0&loop=1&playlist=${trailer}`}
                title='YouTube video player'
                frameBorder='0'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen
              ></iframe>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default DetaiPage
