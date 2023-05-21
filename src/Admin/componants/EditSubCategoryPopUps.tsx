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
import { useState } from "react";
import axios from "axios";
import { API_ENDPOINT } from "../../API";
import { useForm } from "react-hook-form";
interface Editcategory {
  togglePopUp: () => void;

  open: boolean;
  subCategoryId: number;
  SubCategoryName: string;
}
export default function EditSubCategoryPopUps(props: Editcategory) {
  const { open, togglePopUp } = props;
  const [photoname, setphotoname] = useState("");
  const [subCategoryname, setSubCategoryname] = useState(props.SubCategoryName);
  const [photofile, setphotofile] = useState<File | null>(null);
  const { handleSubmit } = useForm();

  const formData = new FormData();
  formData.append("CategoryName", subCategoryname);
  formData.append("file", photofile != null ? photofile : "");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setphotofile(event.target.files[0]);
      console.log(event.target.files[0]);
    }
  };
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSubCategoryname(event.target.value);
  };

  const handleEditCategory = async () => {
    try {
      console.log(formData);
      const response = await axios.put(
        `${API_ENDPOINT}Admin/UpdateSubCategory/${props.subCategoryId}`,
        formData
      );
      console.log(response.data);
      if (response.status === 200) {
        togglePopUp();
        alert(`Category Edited successfully!`);
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
        <form onSubmit={handleSubmit(handleEditCategory)}>
          <DialogContent>
            <Grid container columnSpacing={3} justifyContent="center">
              <Grid item>
                <TextField
                  value={subCategoryname}
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
