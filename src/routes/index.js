import { createBrowserRouter } from "react-router-dom";
import App from '../App';
import Home from "../pages/Home";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import SignUp from "../pages/SignUp";
import AdminPage from "../pages/AdminPage";
import AllProduct from "../pages/AllProduct";
import Alluser from "../pages/Alluser";
import Analyze from "../pages/Analyze";
import UploadImage from "../pages/UploadImage";
import NotFound from "../pages/404";  // Import the NotFound component

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: "",
                element: <Home />
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "forgot-password",
                element: <ForgotPassword />
            },
            {
                path: "sign-up",
                element: <SignUp />
            },
            {
                path: "admin-page",
                element: <AdminPage />, 
                children: [
                    {
                        path: "all-products",
                        element: <AllProduct />,
                    },
                    {
                        path: "all-user",
                        element: <Alluser />,
                    },
                    {
                        path: "analyze",
                        element: <Analyze />,
                    },
                    {
                        path: "upload-images",
                        element: <UploadImage />,
                    },
                ]
            },
            {
                path: "*",
                element: <NotFound />  // Add this route to handle unmatched paths
            }
        ]
    }
]);

export default router;
