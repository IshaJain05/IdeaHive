import React from "react";
import AppRoutes from "./routes";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const App = () => {
    return (
        <>
            <ToastContainer />
            <AppRoutes />
        </>
    );
};

export default App;
