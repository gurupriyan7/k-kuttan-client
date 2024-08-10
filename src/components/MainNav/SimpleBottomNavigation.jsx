import * as React from 'react'
import Box from '@mui/material/Box'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import SearchIcon from '@mui/icons-material/Search'
import TvIcon from '@mui/icons-material/Tv'
import WhatshotIcon from '@mui/icons-material/Whatshot'
import MovieIcon from '@mui/icons-material/Movie'
import HomeIcon from '@mui/icons-material/Home'
import AllOutIcon from '@mui/icons-material/AllOut'
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber'
import { useNavigate } from 'react-router-dom'
import { path } from '../../paths/paths'

export default function SimpleBottomNavigation({ value, setValue }) {
  // const [value, setValue] = React.useState()
  const navigate = useNavigate()

  return (
    <div className='w-full'>
      <Box
        sx={{
          width: '100%',
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          backgroundColor: `red`,
        }}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            if (newValue === 0) {
              // navigate("/trending")
              setValue(0)
            } else if (newValue === 1) {
              setValue(1)
              // navigate("/movies")
            } else if (newValue === 2) {
              setValue(2)
              // navigate("/series")
            } else if (newValue === 3) {
              setValue(3)
              // navigate("/search")
            } else if (newValue === 4) {
              navigate(path.home)
            }
          }}
        >
          {/* <BottomNavigationAction */}
          {/*   sx={{ */}
          {/*     ...(value === 0 && { */}
          {/*       backgroundColor: 'orange', */}
          {/*     }), */}
          {/*   }} */}
          {/*   label="Trending" */}
          {/*   icon={<WhatshotIcon />} */}
          {/* /> */}
          {/* <BottomNavigationAction  sx={{ */}
          {/*     ...(value === 1 && { */}
          {/*       backgroundColor: 'orange', */}
          {/*     }), */}
          {/*   }} label="Recent" icon={<MovieIcon />} /> */}
          {/* <BottomNavigationAction  sx={{ */}
          {/*     ...(value === 2 && { */}
          {/*       backgroundColor: 'orange', */}
          {/*     }), */}
          {/*   }} label="Most liked" icon={<TvIcon />} /> */}
          <BottomNavigationAction sx={{
            ...(value === 3 && {
              backgroundColor: 'orange',
            }),
          }} label="Suggested" icon={<SearchIcon />} onClick={() => navigate(path.explore)} />
          <BottomNavigationAction sx={{
            ...(value === 4 && {
              backgroundColor: 'orange',
            }),
          }} label="home" icon={<HomeIcon />} onClick={() => navigate(path.home)} />
        </BottomNavigation>
      </Box>
    </div>
  )
}
