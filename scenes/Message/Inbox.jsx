import React, { useState } from "react";
import {
  Box,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Inbox = () => {
  const [searchDate, setSearchDate] = useState("");
  const [messages, setMessages] = useState([]); // Fetch your messages from the backend

  const handleSearch = () => {
    // Add logic to fetch messages based on the search date from the backend
    // Update the "messages" state accordingly
  };

  return (
    <Box m="20px">
      <Typography variant="h5" mb={2}>
        Inbox Messages
      </Typography>

      {/* Search by date */}
      <Box display="flex" alignItems="center" justifyContent="flex-end" mb={2}>
        <TextField
         
          type="date"
          variant="outlined"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
        />
        <SearchIcon style={{ cursor: "pointer", marginLeft: "10px" }} onClick={handleSearch} />
      </Box>

     

      {/* Display table */}
      <TableContainer component={Paper} style={{ height: "400px" }}>
        <Table>
          <TableHead style={{background:"#71bdf0"}}>
            <TableRow>
              <TableCell>Received Date</TableCell>
              <TableCell>Sender ID</TableCell>
              <TableCell>Recipient</TableCell>
              <TableCell>Message</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {messages.length > 0 ? (
              messages.map((message, index) => (
                <TableRow key={index}>
                  <TableCell>{message.receivedDate}</TableCell>
                  <TableCell>{message.senderId}</TableCell>
                  <TableCell>{message.recipient}</TableCell>
                  <TableCell>{message.message}</TableCell>
                  <TableCell>{message.status}</TableCell>
                </TableRow>
              ))
            ) : (
                <TableRow>
                <TableCell colSpan={5} align="center">
                  No rows to show
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Inbox;
