import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// Firebase config (Replace with your Firebase credentials)
const env= import.meta.env;
const firebaseConfig = {
    apiKey: `${env.VITE_API_KEY}`,
    authDomain: `${env.VITE_AUTH_DOMAIN}`,
    projectId: `${env.VITE_PROJECT_ID}`,
    storageBucket: `${env.VITE_STORAGE_BUCKET}`,
    messagingSenderId: `${env.VITE_MESSAGING_SENDER_ID}`,
    appId: `${env.VITE_APP_ID}`,
    measurementId: `${env.VITE_MEASUREMENT_ID}`
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignup, setIsSignup] = useState(true);
  const navigate = useNavigate();
  
  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (isSignup) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const idToken = await userCredential.user.getIdToken();
        localStorage.setItem("idToken", idToken);
        toast.success("Signup Successful!");
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const idToken = await userCredential.user.getIdToken();
        localStorage.setItem("idToken", idToken);
        toast.success("Signin Successful!");
      }
      navigate("/calculator");
    } catch (error) {
      toast.error(`${isSignup ? "Signup" : "Signin"} Error: ` + error.message);
      console.error(`${isSignup ? "Signup" : "Signin"} Error:`, error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
        <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-2xl overflow-hidden w-full max-w-4xl">
            <div className="w-full md:w-1/2 bg-cover bg-center">
                <img src="World.gif" alt="World illustration" className="w-full h-full object-cover" />
            </div>
            <div className="w-full md:w-1/2 p-8 text-center flex flex-col justify-center items-center">
                <h2 className="text-4xl font-bold mb-6">{isSignup ? "Signup" : "Signin"}</h2>
                <form onSubmit={handleAuth} className="space-y-4 w-full">
                    <input 
                        type="email" 
                        placeholder="Email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                        className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                        className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                    <button 
                        type="submit" 
                        className="w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                        disabled={loading}
                    >
                        {loading ? (isSignup ? "Signing Up..." : "Signing In...") : (isSignup ? "Sign Up" : "Sign In")}
                    </button>
                </form>
                <button 
                    onClick={() => setIsSignup(!isSignup)} 
                    className="mt-4 text-blue-500 hover:underline"
                >
                    {isSignup ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
                </button>
                <ToastContainer />
            </div>
        </div>
    </div>
  );
}
