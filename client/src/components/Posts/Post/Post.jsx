import React from 'react';
import { Card, CardContent, CardMedia, Typography, CardActions, Button, Chip } from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import moment from 'moment';
import { upvoteIssue } from '../../../api'; 

const Post = ({ issue }) => {

  const handleUpvote = async () => {
    try {
      await upvoteIssue(issue._id);
      window.location.reload(); 
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card style={{ 
        maxWidth: '600px', // Limit width like a phone feed
        margin: '20px auto', // Center it
        borderRadius: '15px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)' 
    }}>
      {/* 1. Header: User Info */}
      <div style={{ padding: '15px', display: 'flex', alignItems: 'center' }}>
        <div style={{ 
            width: '40px', height: '40px', borderRadius: '50%', 
            backgroundColor: '#ddd', marginRight: '10px' 
        }}></div>
        <div>
            <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>{issue.creator}</Typography>
            <Typography variant="caption" color="textSecondary">
              {moment(issue.createdAt).fromNow()}
            </Typography>
        </div>
        {/* Status Badge (Top Right) */}
        <Chip 
            label={issue.status} 
            style={{ 
                marginLeft: 'auto', 
                backgroundColor: issue.status === 'Fixed' ? '#e8f5e9' : '#fff3e0',
                color: issue.status === 'Fixed' ? 'green' : 'orange'
            }} 
        />
      </div>

      {/* 2. Big Image */}
      <CardMedia 
        component="img"
        height="300" // Taller image for impact
        image={issue.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} 
        alt={issue.title}
        style={{ objectFit: 'cover' }}
      />
      
      {/* 3. Content & Actions */}
      <CardContent>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <Button 
                onClick={handleUpvote}
                startIcon={<ThumbUpAltIcon />} 
                style={{ color: '#d32f2f', fontWeight: 'bold' }}
            >
                {issue.upvotes} Upvotes
            </Button>
        </div>

        <Typography variant="h6" style={{ fontWeight: 'bold', marginBottom: '5px' }}>
            {issue.title}
        </Typography>
        
        <Typography variant="body1" color="textSecondary" style={{ marginBottom: '10px' }}>
            {issue.description}
        </Typography>

        <div style={{ display: 'flex', alignItems: 'center', color: '#555', marginTop: '10px' }}>
            <LocationOnIcon fontSize="small" style={{ marginRight: '5px', color: '#1976d2' }}/>
            <Typography variant="body2">
                {issue.location || "Unknown Location"} {/* Shows database value */}
            </Typography> 
        </div>
      </CardContent>
    </Card>
  );
};

export default Post;