import React, { useState,useEffect } from "react";
import { Box, Input,TextField, IconButton, Button, Modal, Typography, List, ListItem, ListItemText } from "@mui/material";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import ScheduleIcon from "@mui/icons-material/Schedule";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import Header from "../../components/Header";

const New = () => {
  const [to, setTo] = useState("");
  const [message, setMessage] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [savedMessages, setSavedMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState("");

  const handleSaveModalOpen = () => {
    setModalOpen(true);
  };

  const handleSaveModalClose = () => {
    setModalOpen(false);
    setSelectedMessage(""); // Clear selected message after closing the modal
  };

  
  const handleSaveMessage = () => {
    if (selectedMessage) {
      // Update an existing saved message
      const updatedMessages = savedMessages.map((msg) =>
        msg === selectedMessage ? message : msg
      );
      setSavedMessages(updatedMessages);
    } else {
      // Add a new saved message
      setSavedMessages([...savedMessages, message]);
    }

    setModalOpen(false);
    setSelectedMessage(""); // Clear selected message after saving
  };

  const handleLoadMessage = (loadedMessage) => {
    setMessage(loadedMessage);
    setModalOpen(false);
    setSelectedMessage(loadedMessage);
  };

  
  

  const handleSend = () => {
    alert(`Message sent: ${message}`);
    setMessage("");
    setTo("");
    }
  
  
  
  
  return (
    <Box m="20px">
      <Header title="New Message" subtitle="Compose a new message" />

      <Box bgcolor="#f4f4f4" p="20px" borderRadius="8px">
    {/* TO input field and icons */}
    <Box display="flex" alignItems="center" mb={2}>
      <TextField
        label="Type a phone number or username"
        variant="outlined"
        fullWidth
        value={to}
        onChange={(e) => setTo(e.target.value)}
      />
    </Box>


        {/* Save, Load, and Attach File buttons */}
       {/* Save, Load, and Attach File buttons */}
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button
          startIcon={<SaveOutlinedIcon />}
          onClick={handleSaveModalOpen}
        >
          Save
        </Button>
        <Button
          onClick={() => setModalOpen(true)}
          disabled={savedMessages.length === 0}
          startIcon={<SaveOutlinedIcon />}
        >
          Load
        </Button>
       
      
      <Button   startIcon={<ScheduleIcon />} sx={{ ml: 1 }}>
            Schedule
          </Button>
      </Box>
        {/* Message box */}
        <TextField
          label="Message"
         
          multiline
          rows={4}
          fullWidth
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      
        {/* Send button */}
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleSend}
          sx={{ mt: 2 }}
        >
          <SendOutlinedIcon sx={{ mr: 1 }} />
          Send
        </Button>
{/* Scheduled Messages */}
\

        {/* Save Modal */}
        <Modal open={isModalOpen} onClose={handleSaveModalClose}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "white",
              boxShadow: 24,
              borderRadius: 8,
              p: 4,
            }}
          >
            <Typography variant="h6" mb={2}>
              {selectedMessage ? "Update" : "Save"} Message
            </Typography>
            <TextField
              label="Saved Message"
              variant="outlined"
              fullWidth
              value={selectedMessage}
              onChange={(e) => setSelectedMessage(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveMessage}
            >
              {selectedMessage ? "Update" : "Save"}
            </Button>
          </Box>
        </Modal>

        {/* Load Messages Modal */}
        <Modal open={savedMessages.length > 0} onClose={handleSaveModalClose}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "white",
              boxShadow: 24,
              borderRadius: 8,
              p: 4,
            }}
          >
            <Typography variant="h6" mb={2}>
              Load Saved Message
            </Typography>
            <List>
              {savedMessages.map((msg, index) => (
                <ListItem button key={index} onClick={() => handleLoadMessage(msg)}>
                  <ListItemText primary={msg} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
};

export default New;
