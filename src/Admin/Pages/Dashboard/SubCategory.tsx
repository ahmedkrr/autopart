import DeleteIcon from "@mui/icons-material/Delete";
import { AiFillEdit } from "react-icons/ai";
import AddIcon from "@mui/icons-material/Add";
import { useToggle } from "../../../common/hooks/useToggle";

import {
  Grid,
  Table,
  TableContainer,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  Typography,
  Button,
  Paper,
  Fab,
  InputLabel,
  FormControl,
  MenuItem,
  Select,
  Pagination,
} from "@mui/material";
import { useEffect, useState } from "react";
import { API_ENDPOINT } from "../../../API";
import axios from "axios";
import AddSubCategory from "../../componants/AddSubCategory";

type Categories = {
  id: number;
  categoryName: string;
  imageData: string;
};
type SubCategories = {
  subCategoryId: number;
  categoryId: number;
  subCategoryName: string;
  imageData: string;
};

export default function SubCategory() {
  const [categories, setcategoreylist] = useState<Categories[]>([]);
  const [subCategorylist, setsubCategorylist] = useState<SubCategories[]>([]);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [openAddCategoreyPopUp, AddCategoryPopUpToggle] = useToggle();

  const [page, setPage] = useState(1);
  const pageCount = Math.ceil(subCategorylist.length / 5);
  const itemsPerPage = 5;
  const startIndex = (page - 1) * itemsPerPage;
  const visibleItems = subCategorylist.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleAddCategory = () => {
    // Handle the update operation here
    AddCategoryPopUpToggle();
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_ENDPOINT}lookups/GetCategory`);
      if (response.data) {
        setcategoreylist(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchSubCategory = async () => {
    try {
      const response = await axios.get(
        `${API_ENDPOINT}lookups/GetSubCategory/${selectedCategory}`
      );
      if (response.data) {
        setsubCategorylist(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    fetchSubCategory();
  }, [selectedCategory, openAddCategoreyPopUp]);

  const handleDelete = async (subId: number) => {
    try {
      const confirmed = window.confirm(
        ` Are you sure you want to delete this Category ID = ${subId} ?`
      );

      if (confirmed) {
        const response = await axios.delete(
          `${API_ENDPOINT}admin/deletesubcategory/${subId}`
        );

        if (response.data.success) {
          alert(`Category Deleted successfully! ${response.data.categoryName}`);
          fetchSubCategory();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <Typography align="center" variant="h4">
            Sub Category
          </Typography>
        </Grid>

        <Grid item xs={11} sx={{ pt: "10px", pb: "15px" }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Select Category
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedCategory}
              label="Select Category"
              onChange={(event) => setSelectedCategory(event.target.value)}
            >
              {categories?.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.categoryName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={11}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead sx={{ background: "rgb(64,78,103)" }}>
                <TableRow>
                  <TableCell align="center" sx={{ color: "white" }}>
                    id
                  </TableCell>
                  <TableCell align="center" sx={{ color: "white" }}>
                    Category id
                  </TableCell>
                  <TableCell align="center" sx={{ color: "white" }}>
                    Sub Name
                  </TableCell>
                  <TableCell align="center" sx={{ color: "white" }}>
                    Photo
                  </TableCell>
                  <TableCell align="center" sx={{ color: "white" }}>
                    Delete
                  </TableCell>
                  <TableCell align="center" sx={{ color: "white" }}>
                    Update
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {visibleItems.map((subcategorylist) => (
                  <TableRow key={subcategorylist.subCategoryId}>
                    <TableCell align="center">
                      {subcategorylist.subCategoryId}
                    </TableCell>
                    <TableCell align="center">
                      {subcategorylist.categoryId}
                    </TableCell>
                    <TableCell align="center">
                      {subcategorylist.subCategoryName}
                    </TableCell>

                    <TableCell align="center">
                      <img
                        width="184px"
                        height="120px"
                        src={`data:image/jpeg;base64,${subcategorylist.imageData}`}
                      />
                    </TableCell>

                    <TableCell align="center">
                      <Button
                        variant="outlined"
                        startIcon={<DeleteIcon />}
                        style={{ backgroundColor: "red", color: "white" }}
                        onClick={() =>
                          handleDelete(subcategorylist.subCategoryId)
                        }
                      >
                        Delete
                      </Button>
                    </TableCell>

                    <TableCell align="center">
                      <Button
                        style={{ backgroundColor: "green", color: "white" }}
                        variant="outlined"
                        startIcon={<AiFillEdit />}
                        // onClick={() => handleUpdate(user.id)}
                      >
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        {selectedCategory && (
          <Fab
            color="primary"
            aria-label="add"
            sx={{
              position: "fixed",
              bottom: "25px",
              right: "25px",
            }}
            onClick={handleAddCategory}
          >
            <AddIcon />
          </Fab>
        )}

        <AddSubCategory
          open={openAddCategoreyPopUp}
          togglePopUp={AddCategoryPopUpToggle}
          categoryId={parseInt(selectedCategory)}
        />
      </Grid>
      <Grid container xs={12} justifyContent="center" mt={3}>
        <Pagination
          count={pageCount}
          variant="outlined"
          onChange={(event, page) => {
            setPage(page);
          }}
        />
      </Grid>
    </>
  );
}
