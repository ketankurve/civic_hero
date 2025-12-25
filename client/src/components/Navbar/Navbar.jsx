import React from 'react';
import { AppBar, Typography, Toolbar, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Hook for navigation
import AddCircleIcon from '@mui/icons-material/AddCircle'; // Nice "+" Icon
import './Navbar.css'; // Import the styles

const Navbar = () => {
  const navigate = useNavigate(); // This is your navigation tool

  return (
    <AppBar className="navbar"  color="inherit" elevation={0}>
      <div className="brand-container">
        <Typography variant="h4" align="center" className="navbar-heading">
          Civic Hero
        </Typography>
        <Button
            variant="contained" 
            color="primary" 
            size="small"
            startIcon={<AddCircleIcon />}
            onClick={() => navigate('/report')} // <--- CLICK TO GO TO FORM
            style={{ 
              borderRadius: '25px', 
              padding: '10px 25px',
              textTransform: 'none',
              fontSize: '1rem'
            }}
        >
            Report Issue
        </Button>
      </div>
    </AppBar>
  );
};

export default Navbar;