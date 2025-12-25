import React, { useState } from 'react';
import { TextField, Button, Typography, Paper } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { createIssue } from '../../api/index'; // Import the Courier


const Form = () => {
  // --- PART 1: THE MEMORY (State) ---
  // We create a "state" object to hold the data.
  // initially, title and description are empty strings "".
  const [issueData, setIssueData] = useState({
    title: '',
    description: '',
    creator: '',
    location: ''
  });

  const handleLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }

    // 1. We assume "Loading..." state could be useful here if you wanted to add a spinner later
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
          // 2. SWITCH TO OPENSTREETMAP (Nominatim) for street-level precision
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          
          console.log(data); // Check console to see all available details!

          // 3. Extract precise details (Neighborhood/Suburb/Area)
          // It tries to find the most specific part first
          const area = data.address.suburb || data.address.neighbourhood || data.address.residential || data.address.road;
          const city = data.address.city || data.address.town || data.address.village || data.address.county;
          const state = data.address.state;

          // Format: "Kothrud, Pune" or "Main St, New York"
          const preciseLocation = `${area ? area + ', ' : ''}${city || ''}`;
          
          setIssueData({ ...issueData, location: preciseLocation });
          
        } catch (error) {
          console.log(error);
          alert("Could not fetch address details.");
        }
      }, 
      (error) => {
         // ... (Keep your existing error switch case here) ...
         alert("Error getting location: " + error.message);
      },
      // 4. ENABLE HIGH ACCURACY (Crucial for correct location)
      { 
        enableHighAccuracy: true, 
        timeout: 10000, 
        maximumAge: 0 
      }
    );
  };

  // --- PART 2: THE SUBMIT HANDLER ---
  // This function runs when you click the "Submit" button
  const handleSubmit = async (e) => {
    e.preventDefault(); // Stop the browser from refreshing (default HTML behavior)

    try {
      // Call the API to send data to the backend
      await createIssue(issueData);
      
      // Clear the form after sending so user can type again
      setIssueData({ title: '', description: '', creator: '', location: ''});
      
      // Optional: Alert the user (We will make this better later)
      alert("Issue Reported Successfully!");
      
      // Temporary hack: Reload page to see the new item (we will fix this with Redux later)
      window.location.reload(); 
      
    } catch (error) {
      console.log(error);
    }
  };

  // --- PART 3: THE UI (JSX) ---
  return (
    <Paper style={{ padding: '20px',
      borderRadius: '15px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      marginTop: '20px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
     }}>
      <form onSubmit={handleSubmit}>
        <Typography variant="h6">Report a City Issue</Typography>

        {/* INPUT 1: Creator Name */}
        <TextField 
          name="creator" 
          variant="outlined" 
          label="Your Name" 
          fullWidth
          style={{ marginBottom: '10px' }}
          value={issueData.creator}
          // THE MAGIC: When user types, update the 'creator' part of the state
          onChange={(e) => setIssueData({ ...issueData, creator: e.target.value })} 
        />

        {/* INPUT 2: Title */}
        <TextField 
          name="title" 
          variant="outlined" 
          label="Issue Title (e.g. Pothole)" 
          fullWidth
          style={{ marginBottom: '10px' }}
          value={issueData.title}
          onChange={(e) => setIssueData({ ...issueData, title: e.target.value })} 
        />

        {/* INPUT 3: Description */}
        <TextField 
          name="description" 
          variant="outlined" 
          label="Description & Location" 
          fullWidth
          multiline
          rows={4}
          style={{ marginBottom: '10px' }}
          value={issueData.description}
          onChange={(e) => setIssueData({ ...issueData, description: e.target.value })} 
        />

        {/* --- LOCATION SECTION --- */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
            <TextField 
            name="location" variant="outlined" label="Location" fullWidth
            value={issueData.location} 
            onChange={(e) => setIssueData({ ...issueData, location: e.target.value })} 
            />
            <Button 
                variant="outlined" 
                color="primary" 
                onClick={handleLocation}
                style={{ minWidth: '50px' }}
            >
                <LocationOnIcon />
            </Button>
        </div>

        {/* SUBMIT BUTTON */}
        <Button variant="contained" color="primary" size="large" type="submit" fullWidth>
          Submit Report
        </Button>
      </form>
    </Paper>
  );
};

export default Form;