import { useEffect, useState } from "react";
import Crud from "./Crud";

const Home = () => {
  const [authenticated, setauthenticated] = useState(null);
  useEffect(() => {
    const loggedInUser = localStorage.getItem("authenticated");
    if (loggedInUser) {
      setauthenticated(loggedInUser);
    }
  }, []);

  if (!authenticated) {
  // Redirect
  } else {
    return (
      <div>
        <p>Welcome to your HomePage!</p>
        <Crud/>
      </div>
    );
  }
};

export default Home;