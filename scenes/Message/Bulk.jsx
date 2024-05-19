import React, { useState } from "react";
import {
  Box,
  Input,
  Checkbox,
  TextField,
  IconButton,
  Button,
  Modal,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import ScheduleIcon from "@mui/icons-material/Schedule";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import Header from "../../components/Header";
import { CheckBox } from "@mui/icons-material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
const initialUsers = ["User1", "User2", "User3"]; // Add your initial user list

const Bulk = () => {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null); // Track the attached file
  const [selectAll, setSelectAll] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [savedMessages, setSavedMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState("");
  const [selectedUserType, setSelectedUserType] = useState("All");
  const [searchInput, setSearchInput] = useState("");

  const handleSearchUsers = (user) => {
    return user.toLowerCase().includes(searchInput.toLowerCase());
  };

  const handleUserTypeChange = (event) => {
    const newUserType = event.target.value;
    setSelectedUserType(newUserType);
    // Reset selected users when user type changes
    setSelectedUsers([]);
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    // Select all users based on the current user type
    setSelectedUsers(selectAll ? [] : filteredUsers());
  };
  const filteredUsers = () => {
    if (selectedUserType === "All") {
      return initialUsers;
    } else if (selectedUserType === "Shareholder") {
      const shareholderUsers = ["Shareholder1", "Shareholder2", "Shareholder3"];
      return shareholderUsers;
    } else {
      return " Add conditions for other user types";
    }
  };

  const handleSend = () => {
    // Add your logic for sending the message
    alert(`Message sent: ${message}`);

    // Reset message box
    setMessage("");
   
  };

  const handleSaveModalOpen = () => {
    setModalOpen(true);
  };

  const handleSaveModalClose = () => {
    setModalOpen(false);
    setSelectedMessage(""); // Clear selected message after closing the modal
  };
  const handleUserModalOpen = () => {
    setModalOpen(true);
  };

  const handleUserModalClose = () => {
    setModalOpen(false);
    setSelectedMessage(""); // Clear selected message after closing the modal
  };

  const handleUserSelect = (user) => {
    const updatedSelectedUsers = selectedUsers.includes(user)
      ? selectedUsers.filter((selectedUser) => selectedUser !== user)
      : [...selectedUsers, user];

    setSelectedUsers(updatedSelectedUsers);
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

 
  const handleAddContacts = () => {
    // Add selected users to the "To" input field
    // setTo(selectedUsers.join(", "));
    handleUserModalClose();
    // Reset selected users and clear checkboxes
    setSelectedUsers([]);
    setSelectAll(false);
  };

  return (
    <Box m="20px">
      <Header title="Bulk Message" subtitle="Compose a bulk message" />

      <Box bgcolor="#f4f4f4" p="20px" borderRadius="8px">
        {/* TO input field and icons */}
        <Box display="flex" alignItems="center" mb={2}>
          To: 
          <IconButton onClick={handleUserModalOpen}>
            <PeopleOutlineIcon />
          </IconButton>
        </Box>
       
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
                <ListItem
                  button
                  key={index}
                  onClick={() => handleLoadMessage(msg)}
                >
                  <ListItemText primary={msg} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Modal>
        <Modal open={isModalOpen} onClose={handleUserModalClose}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "800px",
              bgcolor: "white",
              boxShadow: 24,
              borderRadius: 2,
              p: 4,
              outline: 0,
            }}
          >
            <Box display="flex" alignItems="center" mb={4}>
              <Checkbox
                checked={selectAll}
                onChange={handleSelectAll}
                color="primary"
              />
              <Typography variant="h5" ml={2} color="textPrimary">
                Select Users
              </Typography>
              <Select
                value={selectedUserType}
                onChange={handleUserTypeChange}
                displayEmpty
                fullWidth
                sx={{ ml: 2 }}
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Shareholder">Shareholder</MenuItem>
                {/* Add other user types as needed */}
              </Select>
              <TextField
                label="Search Users"
                variant="outlined"
                fullWidth
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                sx={{ ml: 2 }}
              />
            </Box>

            <Box maxHeight="300px" overflow="auto">
              <List>
                {filteredUsers()
                  .filter((user) => handleSearchUsers(user))
                  .map((user, index) => (
                    <ListItem key={index} sx={{ py: 1 }}>
                      <Checkbox
                        checked={selectedUsers.includes(user)}
                        onChange={() => handleUserSelect(user)}
                        color="primary"
                      />
                      <ListItemText primary={user} sx={{ ml: 2 }} />
                    </ListItem>
                  ))}
              </List>
            </Box>

            <Box mt={4} display="flex" justifyContent="flex-end">
              <Button
                onClick={handleAddContacts}
                color="primary"
                variant="contained"
                sx={{ mr: 2 }}
              >
                Add Contacts
              </Button>
              <Button
                onClick={handleUserModalClose}
                color="secondary"
                variant="outlined"
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Modal>
        
      </Box>
    </Box>
  );
};

export default Bulk;
