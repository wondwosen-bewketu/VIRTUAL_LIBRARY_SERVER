// items.jsx
import React, { useEffect } from "react";
import { Box, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header";
import {
  fetchItems,
  selectItems,
} from "../../redux/slice/itemSlice";

const Items = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectItems);

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  const columns = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "price", headerName: "Price", flex: 1 },
    { field: "location", headerName: "Location", flex: 1 },
    { field: "item", headerName: "Item", flex: 1 },
    { field: "date", headerName: "Date", flex: 1 },
  
  ];

  
  return (
    <Box m="20px">
      <Header title="Items" subtitle="List of Items" />
      <Box m="40px 0 0 0" height="75vh">
        <DataGrid
          rows={items || []}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection
          getRowId={(row) => row._id} // Use the _id property as the unique identifier
        />
      </Box>
    </Box>
  );
};

export default Items;
