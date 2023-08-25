import React from "react";
import Profile from "./Profile";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../store/services/authSlice";

export default function Header() {
  const user = useSelector(selectCurrentUser);

  return (
    <header className="App-header">
      {user && <Profile />}
      <Typography
        gutterBottom
        variant="h3"
        component="div"
        sx={{ textAlign: "center" }}
      >
        Pet Shop
      </Typography>
    </header>
  );
}
