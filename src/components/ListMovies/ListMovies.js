import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'
import Axios from '../../api/axiosClient'
import Movie from '../Movie/Movie'

function ListMovies({ title, fetchUrl }) {
  const [listMovies, setListMovies] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const res = await Axios.get(fetchUrl)
      setListMovies(res.data.results)
    }
    fetchData()
  }, [fetchUrl])

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6
  }
  return (
    <Box sx={{ padding: '2% 3%', mb: 2 }}>
      <Typography
        variant='h4'
        sx={{
          color: '#fff',
          pb: 2
        }}
      >
        {title}
      </Typography>
      <Slider {...settings}>
        {listMovies.map((movie) => (
          <Movie key={movie.id} movie={movie} />
        ))}
      </Slider>
    </Box>
  )
}

export default ListMovies
