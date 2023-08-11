"use client";
import { auth, googleProvider } from "@/services/firebase";
import {
  GoogleAuthProvider,
  User,
  signInWithPopup,
  onIdTokenChanged,
} from "firebase/auth";
import { useCallback, useEffect, useState } from "react";

function Home() {
  const [user, setUser] = useState<User>();
  const [idToken, setIdToken] = useState<string>();
  const handleSignIn = useCallback(() => {
    try {
      signInWithPopup(auth, googleProvider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          if (credential) {
            const token = credential.accessToken;
            setIdToken(credential.idToken);
          }

          // The signed-in user info.
          const user = result.user;
          setUser(user);
          // IdP data available using getAdditionalUserInfo(result)
          // ...
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
        });
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    onIdTokenChanged(auth, (u) => {
      if (u) {
        setUser(u);
        u.getIdToken().then((t) => setIdToken(t));
      }
    });
  }, []);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100">
      <div className="bg-white p-6 w-auto rounded-lg shadow-lg">
        {user ? (
          <div className="mx-auto">
            <p className="mb-4">Welcome, {user.displayName}</p>
            <p>Access Token: </p>
            <p className="whitespace-pre-wrap text-xs  break-words w-96">
              {idToken}
            </p>
          </div>
        ) : (
          <button
            className="bg-blue-500 text-white p-2 rounded"
            onClick={handleSignIn}
          >
            Sign In with Google
          </button>
        )}
      </div>
    </div>
  );
}

export default Home;
