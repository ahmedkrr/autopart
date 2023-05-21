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
  Pagination,
} from "@mui/material";
import { useEffect, useState } from "react";
import { API_ENDPOINT } from "../../../API";
import axios from "axios";
import AddCategory from "../../componants/AddCategory";
import EditCategoryPopUps from "../../componants/EditCategoryPopUps";

type Categories = {
  id: number;
  categoryName: string;
  imageData: string;
};
export default function Categorylist() {
  const [categories, setcategoreylist] = useState<Categories[]>([]);
  const [editcategory, seteditcategory] = useState(0);
  const [editcategoryname, seteditcategoryname] = useState("");

  const [openAddCategoreyPopUp, AddCategoryPopUpToggle] = useToggle();
  const [openEditCategoreyPopUp, EditCategoryPopUpToggle] = useToggle();

  const [page, setPage] = useState(1);
  const pageCount = Math.ceil(categories.length / 5);
  const itemsPerPage = 5;
  const startIndex = (page - 1) * itemsPerPage;
  const visibleItems = categories.slice(startIndex, startIndex + itemsPerPage);

  const handleAddCategory = () => {
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
  useEffect(() => {
    fetchData();
  }, [openAddCategoreyPopUp]);

  const handleDelete = async (categoreyid: number) => {
    try {
      const confirmed = window.confirm(
        ` Are you sure you want to delete this Category ID = ${categoreyid}?`
      );

      if (confirmed) {
        const response = await axios.delete(
          `${API_ENDPOINT}admin/deletecategory/${categoreyid}`
        );

        if (response.data.success) {
          alert(`Category Deleted successfully! ${response.data.categoryName}`);
          fetchData();
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
            Category
          </Typography>
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
                    Category Name
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
                {visibleItems.map((categorey) => (
                  <TableRow key={categorey.id}>
                    <TableCell align="center">{categorey.id}</TableCell>
                    <TableCell align="center">
                      {categorey.categoryName}
                    </TableCell>
                    <TableCell align="center">
                      <img
                        // width="184px"
                        // height="120px"
                        src={`data:image/jpeg;base64,${categorey.imageData}`}
                      />
                    </TableCell>

                    <TableCell align="center">
                      <Button
                        variant="outlined"
                        startIcon={<DeleteIcon />}
                        style={{ backgroundColor: "red", color: "white" }}
                        onClick={() => handleDelete(categorey.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>

                    <TableCell align="center">
                      <Button
                        style={{ backgroundColor: "green", color: "white" }}
                        variant="outlined"
                        startIcon={<AiFillEdit />}
                        onClick={() => {
                          seteditcategory(categorey.id);
                          seteditcategoryname(categorey.categoryName);
                          EditCategoryPopUpToggle();
                        }}
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

        {openAddCategoreyPopUp && (
          <AddCategory
            open={openAddCategoreyPopUp}
            togglePopUp={AddCategoryPopUpToggle}
          />
        )}
      </Grid>

      {openEditCategoreyPopUp && (
        <EditCategoryPopUps
          open={openEditCategoreyPopUp}
          togglePopUp={EditCategoryPopUpToggle}
          categoryId={editcategory}
          categoryName={editcategoryname}
          fetchData={fetchData}
        />
      )}

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
