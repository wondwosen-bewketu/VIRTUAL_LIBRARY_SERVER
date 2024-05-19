import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";

const Contacts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [contacts, setContacts] = useState([
    { id: 1, name: "John Doe", phone: "+1234567890" },
    { id: 2, name: "Jane Smith", phone: "+9876543210" },
    // Add more contacts as needed
  ]);

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.phone.includes(searchTerm)
  );

  return (
    <Box m="20px">
      <Typography variant="h5" mb={2}>
        Contacts
      </Typography>

      {/* Search bar */}
      <Box display="flex" alignItems="center" justifyContent="flex-end" mb={2}>
        <TextField
          label="Search Contacts"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <IconButton>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* Contact list */}
      <List>
        {filteredContacts.map((contact) => (
          <React.Fragment key={contact.id}>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={contact.name} secondary={contact.phone} />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default Contacts;
