import { Grid, TextField, InputAdornment, IconButton } from "@mui/material";
import { BsSearch } from "react-icons/bs";

type SearchBar = {
  handleSearchBar: (searchBar: string) => void;
};

export default function FilterItems({ handleSearchBar }: SearchBar) {
  return (
    <Grid container item xs={12} justifyContent="left">
      <TextField
        // value={searchTerm}
        onChange={(event) => handleSearchBar(event.target.value)}
        placeholder="Search..."
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton>
                <BsSearch />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Grid>
  );
}
