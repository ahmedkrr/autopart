import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import {
  Box,
  DialogActions,
  DialogContent,
  DialogContentText,
  Select,
  TextField,
  Typography,
  MenuItem,
  selectClasses,
} from "@mui/material";
import { useState } from "react";
import { Button } from "@mui/material";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import UserList from "../Pages/Dashboard/UserList";
interface EdituserPopupsProps {
  open: boolean;
}
export default function EdituserPopups(props: EdituserPopupsProps) {
  const { open } = props;

  const [opens, setOpen] = useState(open);
  // const [open, setOpen] = useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Dialog open={opens}>
        <Box padding={1} style={{ color: "black" }}>
          <Box>
            <TextField type={"text"} label="Name" />
          </Box>

          <Box display="inline-block">
            <Select>
              <MenuItem value="dog">Dog</MenuItem>
              <MenuItem value="cat">Cat</MenuItem>
              <MenuItem value="fish">Fish</MenuItem>
              <MenuItem value="bird">Bird</MenuItem>
            </Select>
          </Box>

          <Box display="inline-block">
            <Select>
              <MenuItem value="dog">Dog</MenuItem>
              <MenuItem value="cat">Cat</MenuItem>
              <MenuItem value="fish">Fish</MenuItem>
              <MenuItem value="bird">Bird</MenuItem>
            </Select>
          </Box>

          <Box display="inline-block">
            <Select>
              <MenuItem value="dog">Dog</MenuItem>
              <MenuItem value="cat">Cat</MenuItem>
              <MenuItem value="fish">Fish</MenuItem>
              <MenuItem value="bird">Bird</MenuItem>
            </Select>
          </Box>
          <DialogActions>
            <Button
              variant="outlined"
              onClick={() => {
                setOpen(false);
                return <UserList />;
              }}
            >
              Cancle
            </Button>
            <Button variant="contained" sx={{ background: "green" }}>
              Submit
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
}
