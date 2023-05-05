import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  FormControl,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Radio,
  Grid,
  DialogTitle,
  Button,
} from "@mui/material";
import UserList from "../Pages/Dashboard/UserList";
interface EdituserPopupsProps {
  open: boolean;
  togglePopUp: () => void;
}
export default function EdituserPopups(props: EdituserPopupsProps) {
  const { open, togglePopUp } = props;

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
          Edit User
        </DialogTitle>
        <DialogContent>
          <Grid container columnSpacing={3} justifyContent="center">
            <Grid item>
              <TextField type="text" label="Name" />
            </Grid>
            <Grid item>
              <TextField type="email" label="email" />
            </Grid>
          </Grid>
          <Grid container columnSpacing={3} maxWidth="470px" mt={3} mx="auto">
            <Grid item xs={6}>
              <FormControl>
                <FormLabel id="is-Admin">Is Admin</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="is-Admin"
                  name="radio-buttons-group-isadmin"
                >
                  <FormControlLabel
                    value="YES"
                    control={<Radio />}
                    label="yes"
                  />
                  <FormControlLabel value="NO" control={<Radio />} label="no" />
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormControl>
                <FormLabel id="is-Deactive">Is Deactive</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="is-Deactive"
                  name="radio-buttons-group-isDeactive"
                >
                  <FormControlLabel
                    value="YES"
                    control={<Radio />}
                    label="yes"
                  />
                  <FormControlLabel value="NO" control={<Radio />} label="no" />
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormControl>
                <FormLabel id="Role">Role</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="Role"
                  name="radio-buttons-group-Role"
                >
                  <FormControlLabel
                    value="Admin"
                    control={<Radio />}
                    label="Admin"
                  />
                  <FormControlLabel
                    value="Member"
                    control={<Radio />}
                    label="Member"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => {
              togglePopUp();
              return <UserList />;
            }}
          >
            Cancle
          </Button>
          <Button variant="contained" sx={{ background: "green" }}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
