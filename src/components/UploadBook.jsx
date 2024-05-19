import React, { useState } from "react";
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Box, Typography } from '@mui/material';

const FileUploadForm = () => {
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    year: "",
    genre: "",
    type: "", // New state for book type
  });

  const genres = [
    "Fiction",
    "Non-Fiction",
    "Science",
    "Biography",
    "Fantasy",
    "History",
  ];
  const types = [
    "Hardcover",
    "Paperback",
    "E-book",
    "Audiobook",
    "PDF",
    "Magazine",
    "Journal",
    "Comic Book",
  ];

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formDataToSend = new FormData();
    formDataToSend.append('file', file);
    Object.keys(formData).forEach(key => {
      formDataToSend.append(key, formData[key]);
    });

    try {
      const response = await fetch("http://localhost:4000/book/uploadBook", {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        console.log('File uploaded successfully');
      } else {
        console.log('Failed to upload file');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f4f4f9',
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          maxWidth: '500px',
          width: '100%',
        }}
      >
        <Typography variant="h4" component="h2" sx={{ marginBottom: '1.5rem', color: '#333' }}>
          Upload PDF and Enter Details
        </Typography>

        <FormControl fullWidth sx={{ marginBottom: '1rem' }}>
          <TextField
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </FormControl>

        <FormControl fullWidth sx={{ marginBottom: '1rem' }}>
          <TextField
            label="Author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
          />
        </FormControl>

        <FormControl fullWidth sx={{ marginBottom: '1rem' }}>
          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            multiline
            rows={4}
          />
        </FormControl>

        <FormControl fullWidth sx={{ marginBottom: '1rem' }}>
          <TextField
            label="Year"
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
            required
          />
        </FormControl>

        <FormControl fullWidth sx={{ marginBottom: '1rem' }}>
          <InputLabel>Genre</InputLabel>
          <Select
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            required
          >
            <MenuItem value="" disabled>Select a genre</MenuItem>
            {genres.map((genre) => (
              <MenuItem key={genre} value={genre}>{genre}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ marginBottom: '1rem' }}>
          <InputLabel>Type</InputLabel>
          <Select
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <MenuItem value="" disabled>Select a type</MenuItem>
            {types.map((type) => (
              <MenuItem key={type} value={type}>{type}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ marginBottom: '1rem' }}>
          <Button
            variant="contained"
            component="label"
            color="primary"
          >
            Upload File
            <input
              type="file"
              accept=".pdf, audio/*, video/*"
              hidden
              onChange={handleFileChange}
            />
          </Button>
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            padding: '0.75rem 1.5rem',
            marginTop: '1rem',
          }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default FileUploadForm;
