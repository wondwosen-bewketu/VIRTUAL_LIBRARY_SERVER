import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../../redux/slice/itemSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: 400,
    margin: "0 auto",
  },
  form: {
    width: "100%",
    "& .MuiTextField-root": {
      marginBottom: theme.spacing(2),
    },
    "& .MuiOutlinedInput-root": {
      borderColor: theme.palette.mode === "dark" ? "white" : "gray",
      backgroundColor: theme.palette.mode === "dark" ? "#333" : "white",
      color: theme.palette.mode === "dark" ? "white" : "black",

      "&:hover fieldset": {
        borderColor: theme.palette.mode === "dark" ? "white" : "gray",
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.mode === "dark" ? "white" : "gray",
      },
    },
  },
  button: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));

const AddItemForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [item, setItem] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const newItemData = {
      name,
      location,
      price,
      item,
    };

    try {
      await dispatch(addItem(newItemData));
      toast.success("Item added successfully!");
      setName("");
      setLocation("");
      setPrice("");
      setItem("");
    } catch (error) {
      toast.error("Failed to add item");
    }
  };

  return (
    <div className={classes.container}>
      <h2 className="text-3xl font-bold mb-4">Add Item</h2>
      <form onSubmit={handleFormSubmit} className={classes.form}>
        <TextField
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
        />
        <TextField
          label="Location"
          variant="outlined"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          fullWidth
        />
        <TextField
          label="Price"
          variant="outlined"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          fullWidth
        />
        <TextField
          label="Item"
          variant="outlined"
          value={item}
          onChange={(e) => setItem(e.target.value)}
          fullWidth
        />
        <Button
          type="submit"
          variant="contained"
          className={classes.button}
          disableElevation
          fullWidth
        >
          Add Item
        </Button>
      </form>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        pauseOnHover
      />
    </div>
  );
};

export default AddItemForm
