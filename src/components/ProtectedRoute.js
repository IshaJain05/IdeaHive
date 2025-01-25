import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { auth, db, storage } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

const ProtectedRoute = ({ role, children }) => {
    const [userRole, setUserRole] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserRole = async () => {
            const user = auth.currentUser;
            if (user) {
                const userDoc = await getDoc(doc(db, "users", user.uid));
                if (userDoc.exists()) {
                    setUserRole(userDoc.data().role);
                }
            }
            setLoading(false);
        };

        fetchUserRole();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (userRole !== role) return <Navigate to="/login" />;
    return children;
};

export default ProtectedRoute;
