import { Box, Container, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './Search.scss'
import { useParams } from 'react-router-dom'
import Axios from '../../api/axiosClient'
import Movie from '../../components/Movie/Movie'

function SearchPage() {
  const { searchcode } = useParams()
  const [listMoviesSearched, setListMoviesSearched] = useState([])

  const searchValue = searchcode.replace('+', ' ')

  useEffect(() => {
    const fetchData = async (searchValue) => {
      const res = await Axios.get(
        `/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${searchValue}`
      )
      console.log(res.data.results)
      setListMoviesSearched(res.data.results)
    }
    fetchData(searchValue)
  }, [searchcode])
  return (
    <Box className='search'>
      <Box className='search__value'>
        <Typography
          variant='h3'
          sx={{ color: 'white' }}
        >{`${listMoviesSearched.length} results for: '${searchValue}'`}</Typography>
      </Box>
      {listMoviesSearched.length && (
        <Container className='search__results'>
          <Grid container spacing={5}>
            {listMoviesSearched?.map((movie) => (
              <Grid key={movie.id} item xs={3}>
                <Movie movie={movie} isPoster />
              </Grid>
            ))}
          </Grid>
        </Container>
      )}
    </Box>
  )
}

export default SearchPage
