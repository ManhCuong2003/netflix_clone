import { Box, Button, Typography } from '@mui/material'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import React, { useEffect, useState } from 'react'
import './HeroSection.scss'
import Slider from 'react-slick'
import Axios from '../../api/axiosClient'

function HeroSection({ fetchUrl }) {
  const [heroSectionMovie, setHeroSectionMovie] = useState([])
  const [trailers, setTrailers] = useState([])
  const [trailer, setTrailer] = useState([])
  const [showTrailer, setShowTrailer] = useState(false)

  useEffect(() => {
    const getHeroSectionFilm = async () => {
      const res = await Axios.get(fetchUrl)
      setHeroSectionMovie(res.data.results)
      const trailers = await Promise.all(
        res.data.results.map(async (movie) => {
          const res = await Axios.get(
            `/movie/${movie.id}/videos?api_key=${process.env.REACT_APP_API_KEY}`
          )
          return res.data.results
        })
      )
      setTrailers(trailers)
    }
    getHeroSectionFilm()
  }, [fetchUrl])

  const handleOpenTrailer = (index) => {
    setTrailer(trailers[index][0]?.key)
    setShowTrailer(true)
  }

  const handleCloseTrailer = () => {
    setShowTrailer(false)
  }

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 5000,
    prevArrow: null,
    nextArrow: null
  }
  return (
    <Box className='slider-container'>
      <Slider {...settings}>
        {heroSectionMovie.map((movie, index) => (
          <Box
            key={movie.id}
            sx={{
              backgroundImage: `url(${process.env.REACT_APP_BASE_URL_IMAGE}${movie.backdrop_path})`
            }}
            className='movie'
          >
            <Box className='movie__wrapper'>
              <Box className='movie__wrapper__content'>
                <Typography
                  variant='h2'
                  className='movie__wrapper__content__title'
                >
                  {movie.title}
                </Typography>
                <Typography className='movie__wrapper__content__overview'>
                  {movie.overview.substring(0, 150) + '...'}
                </Typography>
                <Box className='movie__wrapper__content__button'>
                  <Button
                    onClick={() => handleOpenTrailer(index)}
                    startIcon={<PlayArrowIcon />}
                  >
                    Trailer
                  </Button>
                </Box>
              </Box>
            </Box>
            <Box className='movie__bottomFade'></Box>
          </Box>
        ))}
      </Slider>
      {showTrailer && (
        <Box className='trailer_movie-hero'>
          <Box
            className='trailer_movie-detail__overlay'
            onClick={handleCloseTrailer}
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
  )
}

export default HeroSection
