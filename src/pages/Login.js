import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db, storage } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { doc, getDoc } from "firebase/firestore";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
    
            // Fetch user role from Firestore
            const userDoc = await getDoc(doc(db, "users", user.uid));
            if (userDoc.exists()) {
                const userData = userDoc.data();
                if (userData.role === "faculty") {
                    navigate("/faculty-dashboard");
                } else {
                    navigate("/student-dashboard");
                }
            } else {
                toast.error("User data not found!");
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
