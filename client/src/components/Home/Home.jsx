import React, { useState, useEffect } from 'react';
import { Container, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddCircleIcon from '@mui/icons-material/AddCircle'; // Nice "+" Icon
import { fetchIssues } from '../../api';
import Posts from '../Posts/Posts';

const Home = () => {
  const [issues, setIssues] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const getIssues = async () => {
      try {
        const { data } = await fetchIssues();
        setIssues(data);
      } catch (error) {
        console.log(error);
      }
    };
    getIssues();
  }, []);

  return (
    <Container maxWidth="md"> {/* Limit width so it doesn't stretch too wide */}
      
      {/* 1. Hero / Action Section */}
      <Box 
        display="flex" 
        justifyContent="space-between" 
        alignItems="center" 
        my={4}
        style={{ 
             
            borderRadius: '15px',
            marginTop: '100px'
        }}
      >
        <div>
            <Typography variant="h5" color="white" style={{ fontWeight: 'bold' }}>Community Feed</Typography>
        </div>
      </Box>

      {/* 2. The Vertical Feed */}
      <Posts issues={issues} />
      
    </Container>
  );
};

export default Home;