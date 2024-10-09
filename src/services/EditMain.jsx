import React, {useEffect, useState} from "react";
import {links} from "@/data/data";
import "@/style/EditMain.css";
import EditPageView from "@/components/EditPageView";
import UploadNewsDoc from "@/services/UploadNewsDoc";

function EditMain() {
    const [isTabOpen, setIsTabOpen] = useState(false);
    const [selectedLink, setSelectedLink] = useState({});

    function renderTabContent() {
        if (isTabOpen && selectedLink.length !== 0) {
            if(selectedLink.text === "新闻动态") {
                return <UploadNewsDoc />;
            }
            return <EditPageView link={selectedLink} />;
        }else return null;
    }

    function LinkToEdit(link) {
        console.log(link);
        setIsTabOpen(true);
        setSelectedLink(link);
    }

    return (
        <>
            <h2>Edit Main</h2>
            <hr className={"custom-hr"}/>
            <h3>Select a page to edit</h3>
            {links.map((link) => (
                <div key={link.id} className={"links-holder"}>
                    <h3 style={{cursor:"pointer"}} onClick={()=> LinkToEdit(link) }>{link.text}</h3>
                    {link.submenu && link.submenu.map((sublink) => (
                        <p key={sublink.id}>{sublink.text}</p>
                    ))}
                </div>
            ))}
            <hr className={"custom-hr"}/>
            <div
                style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                }}
            >
                {renderTabContent()}
            </div>

        </>
    );
}

export default EditMain;