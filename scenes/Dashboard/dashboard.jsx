import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { Bar } from "react-chartjs-2";

const Dashboard = () => {
  const barChartData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Sales",
        backgroundColor: "#71bdf0",
        borderColor: "#007BFF",
        borderWidth: 1,
        hoverBackgroundColor: "#007BFF",
        hoverBorderColor: "#71bdf0",
        data: [65, 59, 80, 81, 56, 55], 
      },
    ],
  };

  return (
    <Box m="20px">
      <Typography variant="h4" mb={4}>
        Dashboard
      </Typography>

      
    </Box>
  );
};

export default Dashboard;
