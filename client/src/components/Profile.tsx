import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectCurrentUser } from "../store/services/authSlice";
import Button from "@mui/material/Button";

export default function Profile() {
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  return (
    <div className={"profile"}>
      <p>Welcome {user?.userName}</p>
      <Button onClick={() => dispatch(logout())}> Sign out </Button>
    </div>
  );
}
