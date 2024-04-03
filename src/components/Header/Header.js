import SearchIcon from '@mui/icons-material/Search'
import { Box, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Header.scss'

function Header() {
  const [searchValue, setSearchValue] = useState('')
  const navigate = useNavigate()
  const handleSubmit = (event) => {
    event.preventDefault()
    if (searchValue.trim().length === 0) {
      return
    }
    const search = searchValue.split(' ').join('+')
    navigate(`/movies/search/${search}`)
  }

  const handleChange = (event) => {
    const { value } = event.target
    setSearchValue(value)
  }

  return (
    <Box className='header' position='relative'>
      <Typography
        variant='h5'
        component={Link}
        to={`/`}
        className='header__logo'
      >
        Netflix Clone
      </Typography>
      <Box>
        <form onSubmit={handleSubmit}>
          <TextField
            name='search'
            value={searchValue}
            className='header__search'
            placeholder='Search...'
            InputProps={{
              endAdornment: <SearchIcon />
            }}
            onChange={handleChange}
          />
        </form>
      </Box>
    </Box>
  )
}

export default Header
