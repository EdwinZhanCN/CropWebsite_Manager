import React from "react";
import {links} from "@/data/data";
import "@/style/EditMain.css";

function EditMain() {

    return (
        <>
            <h1>EditMain</h1>
            {links.map((link) => (
                <div key={link.id} className={"links-holder"}>
                    <h3>{link.text}</h3>
                    {link.submenu && link.submenu.map((sublink) => (
                        <p key={sublink.id}>{sublink.text}</p>
                    ))}
                </div>
            ))}
        </>
    );
}

export default EditMain;