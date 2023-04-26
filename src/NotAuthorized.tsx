import { Box, Typography } from "@mui/material";

function NotAuthorized() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="error.main"
    >
      <Typography variant="h2" color="error.contrastText">
        Not Authorized
      </Typography>
    </Box>
  );
}

export default NotAuthorized;
