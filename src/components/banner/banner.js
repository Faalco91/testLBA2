import './banner.css';

import React from 'react';
import { AppBar} from '@mui/material';
import { Box } from '@mui/material';
import { Toolbar } from '@mui/material';
import { Typography } from '@mui/material';

import {Stack, Avatar, InputBase, Paper, IconButton} from '@mui/material';
import { Search } from '@mui/icons-material';

import shoppingCart  from '../../images/shopping-cart.png';
import logo from '../../images/logo.png';
import avatar from '../../images/avatarBatman.png';

export default function Banner() {
  return (
    <Box className='navbar'>
      <AppBar sx={{ backgroundColor: 'white', color: 'black', boxShadow: 'none !important'}} position="static">
        <Toolbar className='navbar-content'>
          <div className='logo-side'>
            <img src={logo} alt='' height={22} className='logo'/>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight:'600', fontSize: '1.675rem' }}> Front Market </Typography>
          </div>
          <div className='menu'>
            <a>Qui sommes-nous</a> 
            <a>Revendre</a>
            <a>Aide</a>
          </div>
          <div className='search-bar'>
          <Paper className='paper'>
            <InputBase  sx={{ ml: 1, flex: 1, fontSize: '13px'  }} placeholder="Que cherchez-vous ?"/>
            <IconButton sx={{padding:'0'}} aria-label="search">
              <Search sx={{width:'19px', height:'19px', color :'rgba(0, 0, 0, 0.826)'}} />
            </IconButton>
          </Paper>
          </div>
          <div className='login-side'>
            <Stack direction="row" spacing={2}>
              <div className='shoppingLogo'>
                  <img src={shoppingCart} width={32} alt='' />
              </div>
              <Avatar sx={{cursor:'pointer'}} alt="Batman" src={avatar} />
            </Stack>     
          </div>

        </Toolbar>
      </AppBar>
    </Box>
  );
}