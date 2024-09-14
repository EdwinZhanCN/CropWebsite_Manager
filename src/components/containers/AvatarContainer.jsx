import React from "react";
import Avatar from "@/pages/Avatar";

function AvatarContainer() {
    const sampleData = {
        id: 1,
        username: 'sample',
        email: '445667723@mail.com',
        phone: '123456789',
        role: 'admin',
    }

    return (
        <div>
            <Avatar accountData={sampleData} />
        </div>
    );
}

export default AvatarContainer;