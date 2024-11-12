/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Card, CardContent, Typography, CardActionArea, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";

export const Cards = ({ id, title, description, link }) => {
  const responseURL = "http://localhost:8080";
  const handleClick = () => {
    window.open(link, "_blank");
  };

  const handleDeleteIconClick = (id) => {
    axios
      .delete(responseURL + "/deleteLink", {
        data: { id: id },
      })
      .then((response) => {
        console.log("Record deleted successfully:", response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error deleting record:", error.response ? error.response.data : error.message);
      });
  };

  // const handleEditIconClick = (id) => {

  // }

  return (
    <>
      <Card sx={{ maxWidth: 345, margin: 0.5, position: "relative" }}>
        <CardActionArea onClick={handleClick}>
          <CardContent>
            <Typography
              variant="h5"
              component="div"
            >
              {title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
            >
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <IconButton
          aria-label="edit"
          sx={{ position: "absolute", top: 8, right: 8 }}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          aria-label="delete"
          sx={{ position: "absolute", bottom: 8, right: 8 }}
          onClick={() => handleDeleteIconClick(id)}
        >
          <DeleteIcon />
        </IconButton>
      </Card>
    </>
  );
};
