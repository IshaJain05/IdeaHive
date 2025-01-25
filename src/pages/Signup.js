import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db, storage } from "../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("student"); // Default role
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Save user role in Firestore
            await setDoc(doc(db, "users", user.uid), { email, role });

            toast.success("Signup successful!");
            navigate("/dashboard");
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div>
            <h1>Signup</h1>
            <form onSubmit={handleSignup}>
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
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="student">Student</option>
                    <option value="faculty">Faculty</option>
                </select>
                <button type="submit">Signup</button>
            </form>
        </div>
    );
};

export default Signup;
