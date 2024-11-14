import React from "react";
import MainPicker from "@/pages/MainPicker";
import AvatarContainer from "@/components/containers/AvatarContainer";
import ReportIssue from "@/pages/ReportIssue";
import Setting from "@/pages/Setting";

// Define the routes
const router = [
    {
        index: 0,
        path: "/",
        element: <MainPicker />,
    },
    {
        index: 1,
        path: "/avatar",
        element: <AvatarContainer />,
    },
    {
        index: 2,
        path: "/report",
        element: <ReportIssue />,
    },
    {
        index: 3,
        path: "/setting",
        element: <Setting />,
    }
];

export default router;