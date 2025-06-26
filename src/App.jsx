import React, { useEffect, useState } from "react";
import Login from "./pages/Login";
import Todos from "./pages/todos";

function App() {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("checkit_user");
    if (storedUser) {
      setUsername(storedUser);
    }
  }, []);

  return (
    <>
      {username ? (
        <Todos username={username} />
      ) : (
        <Login onLogin={setUsername} />
      )}
    </>
  );
}

export default App;
