import React from 'react';
import { Grid, CircularProgress, Container } from '@mui/material';
import Post from './Post/Post';

const Posts = ({ issues }) => {
  if (!issues.length) return <CircularProgress style={{ display: 'block', margin: '20px auto' }} />;

  return (
    // Replaced Grid with a simple Container for a vertical feed list
    <Container maxWidth="sm" style={{ padding: 0 }}>
      {issues.map((issue) => (
         <Post key={issue._id} issue={issue} />
      ))}
    </Container>
  );
};

export default Posts;