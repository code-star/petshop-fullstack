import React from "react";
import { useSelector } from "react-redux";
import { logout, selectCurrentUser } from "../store/services/authSlice";
import Button from "@mui/material/Button";
import { store } from "../store/store";

export default function Profile() {
  const user = useSelector(selectCurrentUser);

  return (
    <div className={"profile"}>
      <p>Welcome {user?.userName}</p>
      <Button onClick={() => store.dispatch(logout())}> Sign out </Button>
    </div>
  );
}
