import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  Grid,
  DialogTitle,
  Divider,
  Typography,
} from "@mui/material";
import { Button } from "@mui/material";
import UserList from "../Pages/Dashboard/UserList";
import { useState } from "react";
import axios from "axios";
import { API_ENDPOINT } from "../../API";
import { useForm } from "react-hook-form";
interface Addcategory {
  open: boolean;
  togglePopUp: () => void;
}
export default function AddCategory(props: Addcategory) {
  const { open, togglePopUp } = props;
  const [photoname, setphotoname] = useState("");
  const [categoryname, setCategoryname] = useState("");
  const [photofile, setphotofile] = useState<File | null>(null);
  const { handleSubmit } = useForm();
  const formData = new FormData();
  formData.append("CategoryName", categoryname);
  formData.append("file", photofile != null ? photofile : "");
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setphotofile(event.target.files[0]);
      console.log(event.target.files[0]);
    }
  };
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryname(event.target.value);
  };

  const handleAddCategory = async () => {
    // if(photofile!=null && categoryname!= null)
    try {
      const response = await axios.post(
        `${API_ENDPOINT}Admin/addCategory`,
        formData
      );
      console.log(response.data);
      if (response.data.success) {
        togglePopUp();
        alert(`Category added successfully! ${response.data.categoryname}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Dialog open={open} fullWidth maxWidth="sm">
        <DialogTitle align="center" fontSize={30}>
          Edit Category
        </DialogTitle>
        <Divider />
        <form onSubmit={handleSubmit(handleAddCategory)}>
          <DialogContent>
            <Grid container columnSpacing={3} justifyContent="center">
              <Grid item>
                <TextField
                  type="text"
                  label="Name"
                  required
                  onChange={handleNameChange}
                />
              </Grid>
              <Grid item>
                <Button variant="contained" component="label">
                  Upload Photo
                  <input
                    hidden
                    accept="image/*"
                    multiple
                    type="file"
                    onChange={(event) => {
                      if (
                        event.target instanceof HTMLInputElement &&
                        event.target.files != null
                      ) {
                        handleFileChange(event);
                        const fileName = event.target.files[0].name;
                        const label =
                          document.querySelector("label[for='upload-photo']") ??
                          document.createElement("label");
                        label.textContent = fileName;
                        setphotoname(
                          typeof fileName != undefined ? fileName : ""
                        );
                      }
                    }}
                  />
                </Button>
                <Typography variant="body2">{photoname}</Typography>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              variant="outlined"
              onClick={() => {
                togglePopUp();
              }}
            >
              Cancle
            </Button>
            <Button
              variant="contained"
              sx={{ background: "green" }}
              type="submit"
            >
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}
