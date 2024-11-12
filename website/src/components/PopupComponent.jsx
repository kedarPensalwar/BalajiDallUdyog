/* eslint-disable no-unused-vars */
import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import AddCircleIcon from "@mui/icons-material/AddCircle";

export default function PopupComponent() {
  const [open, setOpen] = React.useState(false);
  const responseURL = "http://localhost:8080";

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const insertRecord = (jsonData) => {
    axios
      .post(responseURL + "/addLink", jsonData)
      .then((response) => {
        console.log("Record added successfully:", response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error adding record:", error.response ? error.response.data : error.message);
      });
  };

  return (
    <React.Fragment>
      <AddCircleIcon
        fontSize="large"
        onClick={handleClickOpen}
        style={{ position: "fixed", right: "80px", bottom: "60px" }}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: async (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const jsonData = {
              link: formJson.link,
              title: formJson.title,
              description: formJson.description,
            };

            insertRecord(jsonData);
            handleClose();
          },
        }}
      >
        <DialogTitle>Add URL</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="title"
            name="title"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            autoComplete="false"
          />
          <TextField
            required
            margin="dense"
            id="link"
            name="link"
            label="URL"
            type="text"
            fullWidth
            variant="standard"
            autoComplete="false"
          />
          <TextField
            required
            margin="dense"
            id="description"
            name="description"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            autoComplete="false"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Save</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
