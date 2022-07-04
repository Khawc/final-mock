import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import logo from '../../assets/commerce.png';
import './Navbar.css';
import { Link, useLocation } from 'react-router-dom';

function Navbar({totalItems}) {
    return (
        <>
            <AppBar position="fixed" className={'appBar'} color="inherit">
                <Toolbar>
                <Typography component={Link} to="/" variant="h6" className={'title'} color="inherit">
                    <img src={logo} alt="commerce.js" height="25px" className={'image'} /> Điện máy sang
                </Typography>
                <div className={'grow'} />
                {location.pathname === '/' && (
                <div className={'button'}>
                    <IconButton component={Link} to="/cart" aria-label="Show cart items" color="inherit">
                    <Badge badgeContent={totalItems} color="secondary">
                        <ShoppingCart />
                    </Badge>
                    </IconButton>
                </div>
                 )}
                </Toolbar>
            </AppBar>
        </>
    );
}

export default Navbar