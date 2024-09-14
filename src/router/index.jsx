import React from "react";

// Define the routes
const router = [
    {
        path: "/",
        element: <Main />,
    },
    {
        path: "/about",
        element: <About />,
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