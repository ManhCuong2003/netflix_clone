import { Box } from '@mui/material'
import React from 'react'
import requests from '../../api/requests'
import Header from '../../components/Header/Header'
import HeroSection from '../../components/HeroSection/HeroSection'
import ListMovies from '../../components/ListMovies/ListMovies'

function HomePage() {
  return (
    <Box>
      <HeroSection fetchUrl={requests.fetchHeroMovies} />
      <ListMovies title='Trending Now' fetchUrl={requests.fetchTrending} />
      <ListMovies title='Animation' fetchUrl={requests.fetchAnimation} />
      <ListMovies title='Action Movies' fetchUrl={requests.fetchActionMovies} />
    </Box>
  )
}

export default HomePage
