import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  Grid,
  DialogTitle,
  Button,
  Divider,
  Typography,
  Alert,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { Dropdownlistitem, DropdownlitstCategory } from "./Dropdownlistitem";
import { useState } from "react";
import { API_ENDPOINT } from "../../../API";
import axios from "axios";

type AddItms = {
  open: boolean;
  togglePopUp: () => void;
  Id: number;
};

type AddItemForm = {
  itemname: string;
  itemprice: number;
  description: string;
  carName: number;
};
export default function EditItem(props: AddItms) {
  const { open, togglePopUp } = props;
  const { handleSubmit, register, reset } = useForm<AddItemForm>();
  const [photoname, setphotoname] = useState("");
  const [photofile, setphotofile] = useState<File | null>(null);
  const [carName, setCarName] = useState(0);
  const [carType, setCarType] = useState(0);
  const [carYear, setCarYear] = useState(0);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setphotofile(event.target.files[0]);
      console.log(event.target.files[0]);
    }
  };
  const onSubmit = async (data: AddItemForm) => {
    const formData = new FormData();
    formData.append("file", photofile != null ? photofile : "");
    formData.append("ItemName", data.itemname);
    formData.append("Discription", data.description);
    formData.append("Price", `${data.itemprice}`);
    formData.append("CarModelId", `${carName == 0 ? "" : carName}`);
    formData.append("CartTypeId", `${carType == 0 ? "" : carType}`);
    formData.append("YearId", `${carYear == 0 ? "" : carYear}`);
    formData.append("SubCategoryId", `${subcategory}`);

    console.log(formData);

    try {
      const response = await axios.post(
        `${API_ENDPOINT}item/AddItem`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        togglePopUp();
        setphotofile(null);
        setphotoname("");
        reset();
        <Alert variant="outlined" severity="success">
          The Item Added Successfully
        </Alert>;
      }

      console.log(localStorage.getItem("token"));
    } catch (error) {
      console.log(error);
    }
  };

  function handleCarSelection(name: number, type: number, year: number) {
    setCarName(name);
    setCarType(type);
    setCarYear(year);
  }
  const [subcategory, setsubcategory] = useState(0);

  function handelCategorySelection(subcategory: number) {
    setsubcategory(subcategory);
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        position: "absolute",
      }}
    >
      <Dialog open={open} fullWidth maxWidth="sm">
        <DialogTitle align="center" fontSize={30}>
          Edit Item
        </DialogTitle>
        <Divider />

        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <Grid container columnSpacing={3} justifyContent="center">
              <Grid item>
                <TextField
                  {...register("itemname")}
                  type="text"
                  label="Item Name"
                  required
                />
              </Grid>

              <Grid item>
                <TextField
                  type="number"
                  label="Price"
                  {...register("itemprice")}
                  required
                />
              </Grid>

              <Grid item container xs={10}>
                <DropdownlitstCategory
                  handelCategorySelection={handelCategorySelection}
                />
              </Grid>

              <Grid item xs={10}>
                <Dropdownlistitem handleCarSelection={handleCarSelection} />
              </Grid>

              <Grid
                container
                item
                mt="10px"
                xs={12}
                justifyContent="center"
                alignItems="center"
                columnSpacing={3}
              >
                <Grid item mr="10px">
                  <Button variant="contained" component="label">
                    Upload Photo
                    <input
                      required
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
                            document.querySelector(
                              "label[for='upload-photo']"
                            ) ?? document.createElement("label");
                          label.textContent = fileName;
                          setphotoname(
                            typeof fileName != undefined ? fileName : ""
                          );
                        }
                      }}
                    />
                  </Button>
                </Grid>

                <Grid item>
                  <Typography variant="body2" sx={{ color: "blue" }}>
                    {photoname}
                  </Typography>
                </Grid>
              </Grid>

              <Grid item xs={10} mt="10px">
                <TextField
                  fullWidth
                  label="Description"
                  {...register("description")}
                  multiline
                  rows={3}
                  required
                  style={{ height: "90px" }}
                />
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions>
            <Button
              variant="outlined"
              onClick={() => {
                togglePopUp();
                setphotofile(null);
                setphotoname("");
                reset();
              }}
            >
              Cancle
            </Button>

            <Button
              variant="contained"
              type="submit"
              sx={{ background: "green" }}
            >
              Edit Item
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}
