import './banner.module.css';

import * as React from 'react';
import { AppBar} from '@mui/material';
import { Box } from '@mui/material';
import { Toolbar } from '@mui/material';
import { Typography } from '@mui/material';

import { Avatar } from '@mui/material';
import { Stack } from '@mui/material';

import shoppingCart  from '../../images/shopping-cart.png';
import logo from '../../images/logoFrontMarket.svg';
import avatar from '../../images/avatarBatman.png';

export default function Banner() {
  return (
    <Box className='navbar'>
      <AppBar sx={{ backgroundColor: 'white', color: 'black', boxShadow: 'none !important'}} position="static">
        <Toolbar>
          <img src={logo} alt='' width={45} className='logo'/>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight:'500', fontSize: '1.5rem' }}>
            Front Market
          </Typography>
          <Stack direction="row" spacing={2}>
            <div className='shoppingLogo'>
                <img src={shoppingCart} width={35} alt='' />
            </div>
            <Avatar alt="Batman" src={avatar} />
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}