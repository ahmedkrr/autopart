import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_ENDPOINT } from "../../../API";
import DeleteIcon from "@mui/icons-material/Delete";
import { AiFillEdit } from "react-icons/ai";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Box,
  Button,
  Typography,
  colors,
  Grid,
  Fab,
} from "@mui/material";
import EdituserPopups from "../../componants/EdituserPopups";

import { useToggle } from "../../../common/hooks/useToggle";

interface users {
  id: number;
  name: string;
  email: string;
  phoneNumber: number;
  role: string;
  isCompanyOwner: boolean;
  isAdmin: boolean;
  isDeactive: boolean;
  creatDate: string;
  companyProfile: string | null;
  companyProfileId: number | null;
}

export default function UserList() {
  const [usersList, setUsersList] = useState<users[]>([]);
  const [openEditUserPopUp, editUserPopUpToggle] = useToggle();
  const [selectedUser, setSelectedUser] = useState(0);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_ENDPOINT}admin/GetAllUsers`);
      if (response.data) {
        setUsersList(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [openEditUserPopUp]);

  const handleDelete = async (userId: number) => {
    const confirmed = window.confirm(
      ` Are you sure you want to delete this user ID = ${userId}?`
    );
    if (confirmed) {
      try {
        const response = await axios.delete(
          `${API_ENDPOINT}admin/deleteuser/${userId}`
        );
        console.log(response.data);
        fetchData();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleUpdate = (userId: number) => {
    setSelectedUser(userId);
    editUserPopUpToggle();
  };

  return (
    <>
      <Box>
        <Box>
          <Typography align="center" variant="h4" mt={1}>
            Manage User
          </Typography>
        </Box>
        <Grid
          xs={12}
          sx={{
            display: "flex",
            mt: 2,
            ml: 4,
          }}
        >
          <TableContainer component={Paper} sx={{ width: 1100 }}>
            <Table>
              <TableHead sx={{ background: "rgb(64,78,103)" }}>
                <TableRow>
                  <TableCell align="center" sx={{ color: "white" }}>
                    id
                  </TableCell>
                  <TableCell align="center" sx={{ color: "white" }}>
                    name
                  </TableCell>
                  <TableCell align="center" sx={{ color: "white" }}>
                    email
                  </TableCell>
                  <TableCell align="center" sx={{ color: "white" }}>
                    phoneNumber
                  </TableCell>
                  <TableCell align="center" sx={{ color: "white" }}>
                    isCompanyOwner
                  </TableCell>
                  <TableCell align="center" sx={{ color: "white" }}>
                    isAdmin
                  </TableCell>
                  <TableCell align="center" sx={{ color: "white" }}>
                    isDeactive
                  </TableCell>
                  <TableCell align="center" sx={{ color: "white" }}>
                    creatDate
                  </TableCell>
                  <TableCell align="center" sx={{ color: "white" }}>
                    companyprofile
                  </TableCell>
                  <TableCell align="center" sx={{ color: "white" }}>
                    companyProfileId
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
                {usersList.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell align="center">{user.id}</TableCell>
                    <TableCell align="center">{user.name}</TableCell>
                    <TableCell align="center">{user.email}</TableCell>
                    <TableCell align="center">{user.phoneNumber}</TableCell>
                    <TableCell align="center">
                      {user.isCompanyOwner ? "Yes" : "No"}
                    </TableCell>
                    <TableCell align="center">
                      {user.isAdmin ? "Yes" : "No"}
                    </TableCell>
                    <TableCell align="center">
                      {user.isDeactive ? "Yes" : "No"}
                    </TableCell>
                    <TableCell align="center">{user.creatDate}</TableCell>
                    <TableCell align="center">
                      {user.companyProfile || "-"}
                    </TableCell>
                    <TableCell align="center">
                      {user.companyProfileId || "-"}
                    </TableCell>
                    <TableCell>
                      <Button
                        disabled={user.id == 1}
                        variant="outlined"
                        startIcon={<DeleteIcon />}
                        style={{ backgroundColor: "red", color: "white" }}
                        onClick={() => handleDelete(user.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>

                    <TableCell>
                      <Button
                        style={{ backgroundColor: "green", color: "white" }}
                        variant="outlined"
                        startIcon={<AiFillEdit />}
                        onClick={() => handleUpdate(user.id)}
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

        <EdituserPopups
          userId={selectedUser}
          open={openEditUserPopUp}
          togglePopUp={editUserPopUpToggle}
        />
      </Box>
    </>
  );
}
