import React, {useState} from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import { AppBar,IconButton, Toolbar, InputBase, Badge, Menu, MenuItem, Typography } 
from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({
    
    title: {
      marginLeft: "auto",
      textAlign: 'center',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
   
    sectionDesktop: {
      textAlign: 'center',
      marginLeft: "auto",
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      position: 'center',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
  }));
function Navbar() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const [unreadMessages, setUnreadMessages] = useState(0)

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
      };
    
      const handleLogout = () =>{
        localStorage.removeItem('token');
        window.location.reload();

      }
    
      const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
      };

      const menuId = 'primary-search-account-menu';
     
      const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
    
    return (
        <div className={classes.grow}>
        <AppBar position="static">
          <Toolbar>
           
            <Typography className={classes.title} variant="h6" noWrap>
              Autoceste
            </Typography>
            <div className={classes.sectionDesktop}>
              <IconButton aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={unreadMessages} color="secondary">
                  <MailIcon />
                </Badge>
              </IconButton>
              <IconButton
                edge="end"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleLogout}
                color="inherit"
              >
                <ExitToAppIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        
      </div>
    );
}


export default Navbar;