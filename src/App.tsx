import React from "react";
import { Button } from "@mui/material";
import { Home } from "./Pages/Home/Home";
import CreatePetForm from "./Pages/CreatePet/CreatePetForm";
import AlertPopup from "./components/AlertPopup";
import "./App.css";
import SignIn from "./Pages/SignIn/SignIn";
import { useSelector } from "react-redux";
import {
  selectCurrentRole,
  selectCurrentUser,
} from "./store/services/authSlice";
import { Role } from "./types";
import Header from "./components/Header";

function App() {
  const role = useSelector(selectCurrentRole);
  const user = useSelector(selectCurrentUser);

  const [isCreatePetFormVisible, setIsCreatePetFormVisible] =
    React.useState<boolean>(false);
  const [petId, setPetId] = React.useState<string>("");

  const toggleCreatePetForm = () => {
    setIsCreatePetFormVisible((prevState) => !prevState);
  };

  return (
    <div className="App">
      <Header />
      <div className="app-container">
        {!role && <SignIn />}
        {role === Role.Admin && (
          <section>
            {petId.length > 0 && (
              <AlertPopup
                message={`You successfully add ${petId} !`}
                severity={"success"}
              />
            )}
            <Button
              id="create-pet"
              variant="contained"
              onClick={toggleCreatePetForm}
              sx={{ marginBottom: "1rem", marginRight: "5rem" }}
            >
              {isCreatePetFormVisible ? "Hide" : "Create Pet"}
            </Button>
            {isCreatePetFormVisible && (
              <CreatePetForm
                setIsCreatePetFormVisible={setIsCreatePetFormVisible}
                setPetId={setPetId}
              />
            )}
          </section>
        )}
        {!isCreatePetFormVisible && role && user && <Home />}
      </div>
    </div>
  );
}

export default App;
