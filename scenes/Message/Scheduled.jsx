import React, { useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";

const Scheduled = () => {
  const [scheduledMessages, setScheduledMessages] = useState([
    {
      id: 1,
      date: "2023-01-01",
      senderId: "user123",
      recipient: "friend456",
      message: "Hello, this is a scheduled message!",
    },
    // Add more scheduled messages as needed
  ]);

  if (scheduledMessages.length === 0) {
    return (
      <Box m="20px">
        <Typography variant="h5" mb={2}>
          Scheduled Messages
        </Typography>
        <Typography variant="body1">You have no Scheduled Messages.</Typography>
      </Box>
    );
  }

  return (
    <Box m="20px">
      <Typography variant="h5" mb={2}>
        Scheduled Messages
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Submission Date</TableCell>
              <TableCell>Sender ID</TableCell>
              <TableCell>Recipient</TableCell>
              <TableCell>Message</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {scheduledMessages.map((message) => (
              <TableRow key={message.id}>
                <TableCell>{message.date}</TableCell>
                <TableCell>{message.senderId}</TableCell>
                <TableCell>{message.recipient}</TableCell>
                <TableCell>{message.message}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Scheduled;
