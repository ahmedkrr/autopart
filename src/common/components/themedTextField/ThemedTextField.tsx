import { TextField } from "@mui/material";
import { TextFieldProps } from "@mui/material/TextField";

export function ThemedTextField({ ...props }: TextFieldProps) {
  return (
    <TextField
      margin="normal"
      variant="filled"
      size="small"
      style={{ width: "80%" }}
      {...props}
    />
  );
}
