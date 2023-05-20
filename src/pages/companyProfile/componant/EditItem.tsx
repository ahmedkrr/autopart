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
} from "@mui/material";
import { useEffect, useState } from "react";
import { API_ENDPOINT } from "../../../API";
import axios from "axios";

type AddItms = {
  open: boolean;
  togglePopUp: () => void;
  Id: number;
  handleupdate: () => void;
};

export default function EditItem(props: AddItms) {
  const { open, togglePopUp } = props;
  const [itemname, setitemname] = useState("");
  const [itemprice, setitemprice] = useState(0);
  const [discription, setdescriptions] = useState("");

  const getinfoItem = async () => {
    const response = await axios.get(
      `${API_ENDPOINT}item/Getiteminfo/${props.Id}`
    );
    if (response.status == 200) {
      setitemname(response.data?.name);
      setitemprice(response.data?.price);
      setdescriptions(response.data?.discription);
    }
  };
  useEffect(() => {
    getinfoItem();
  }, [props.Id]);

  const onSubmit = async () => {
    const formData = new FormData();
    formData.append("Name", itemname);
    formData.append("Discription", discription);
    formData.append("Price", `${itemprice}`);

    try {
      const response = await axios.put(
        `${API_ENDPOINT}item/UpdateItem/${props.Id}`,
        formData
      );

      if (response.status == 200) {
        alert("Updated Success");
        togglePopUp();
        props.handleupdate();
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
        position: "absolute",
      }}
    >
      <Dialog open={open} fullWidth maxWidth="sm">
        <DialogTitle align="center" fontSize={30}>
          Edit Item
        </DialogTitle>
        <Divider />

        <DialogContent>
          <Grid container columnSpacing={6} justifyContent="center">
            <Grid item>
              <TextField
                value={itemname}
                type="text"
                label="Item Name"
                required
                onChange={(event) => {
                  setitemname(event.target.value);
                }}
              />
            </Grid>

            <Grid item>
              <TextField
                value={itemprice}
                type="number"
                label="Price"
                required
                onChange={(event) => {
                  setitemprice(parseInt(event.target.value));
                }}
              />
            </Grid>

            <Grid
              container
              item
              mt="10px"
              xs={12}
              justifyContent="center"
              alignItems="center"
              columnSpacing={3}
            ></Grid>

            <Grid item xs={10} mt="10px">
              <TextField
                value={discription}
                fullWidth
                label="Description"
                multiline
                rows={3}
                required
                style={{ height: "90px" }}
                onChange={(e) => {
                  setdescriptions(e.target.value);
                }}
              />
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
            onClick={onSubmit}
          >
            Edit Item
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
