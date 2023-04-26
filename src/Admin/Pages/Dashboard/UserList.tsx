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
  companyprofile: string | null;
  companyProfileId: number | null;
}

export default function UserList() {
  const [usersList, setUsersList] = useState<users[]>([]);
  const [openEditUserPopUp, editUserPopUpToggle] = useToggle();

  useEffect(() => {
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

    fetchData();
  }, []);

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
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleUpdate = (userId: number) => {
    // Handle the update operation here
    editUserPopUpToggle();
  };

  return (
    <Box>
      <Box>
        <Typography align="center" variant="h4" mt={1}>
          Manage User
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          mt: 2,
          ml: 4,
        }}
      >
        <TableContainer component={Paper} sx={{ width: 1100 }}>
          <Table>
            <TableHead sx={{ background: "grey" }}>
              <TableRow>
                <TableCell align="center">id</TableCell>
                <TableCell align="center">name</TableCell>
                <TableCell align="center">email</TableCell>
                <TableCell align="center">phoneNumber</TableCell>
                <TableCell align="center">isCompanyOwner</TableCell>
                <TableCell align="center">isAdmin</TableCell>
                <TableCell align="center">isDeactive</TableCell>
                <TableCell align="center">creatDate</TableCell>
                <TableCell align="center">companyprofile</TableCell>
                <TableCell align="center">companyProfileId</TableCell>
                <TableCell align="center">Delete</TableCell>
                <TableCell align="center">Update</TableCell>
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
                    {user.companyprofile || "-"}
                  </TableCell>
                  <TableCell align="center">
                    {user.companyProfileId || "-"}
                  </TableCell>
                  <TableCell>
                    <Button
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
      </Box>
      <EdituserPopups
        open={openEditUserPopUp}
        togglePopUp={editUserPopUpToggle}
      />
    </Box>
  );
}
