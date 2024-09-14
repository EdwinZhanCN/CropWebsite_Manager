import React from "react";
import MainPicker from "@/components/MainPicker";
import AvatarContainer from "@/components/containers/AvatarContainer";

// Define the routes
const router = [
    {
        path: "/",
        element: <MainPicker />,
    },
    {
        path: "/avatar",
        element: <AvatarContainer />,
    },
    {
        path: "/contact",
        element: <Contact />,
    },
    {
        path: "/product",
        element: <Product />,
    },
    {
        path: "/origin",
        element: <Origin />,
    },
    {
        path: "/news",
        element: <News />,
    },
    {
        path: "/service",
        element: <Service />,
    }
];

export default router;