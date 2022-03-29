import {
  getAuth,
  signOut,
  signInWithPopup,
  GithubAuthProvider,
} from "firebase/auth";
import { useState } from "react";
import "./App.css";
import initializeAuthentication from "./Firebase/firebase.initialize";

initializeAuthentication();

const gitHubProvider = new GithubAuthProvider();

function App() {
  const [user, setUser] = useState({});
  const { name, image, email, from } = user;
  const handleGitHubSignIn = () => {
    const auth = getAuth();
    signInWithPopup(auth, gitHubProvider)
      .then((result) => {
        const { displayName, email, photoURL, providerId } = result.user;
        const loggedInUser = {
          name: displayName,
          image: photoURL,
          email: email,
          from: providerId,
        };
        setUser(loggedInUser);
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  const handleLogOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        setUser({});
      })
      .catch((error) => {
        // An error happened.
      });
  };
  return (
    <div className="App">
      {email ? (
        <button className="github-btn" onClick={handleLogOut}>
          Log Out
        </button>
      ) : (
        <button className="github-btn" onClick={handleGitHubSignIn}>
          GitHub
        </button>
      )}
      <br />
      <br />
      <br />
      <br />
      <br />
      {email && (
        <div className="user-all-data">
          <div className="user-image">
            <img src={image} alt="" />
          </div>
          <div className="logged-in-user">
            <h4>Name: {name}</h4>
            <p>Email: {email}</p>
            <p>
              Provider: <span className="provider-id">{from}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
