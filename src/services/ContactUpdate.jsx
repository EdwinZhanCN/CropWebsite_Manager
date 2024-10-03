import React, { useEffect, useState } from "react";

/**
 * This component is used to update the contact information
 * @returns {Element}
 * @constructor
 * current contact information
 * WhatsApp: string
 * WeChat: QR code
 * Tel: string
 */
function ContactUpdate() {
    // sample contact information
    const data = [
        {
            name: "WhatsApp",
            value: "1234567890",
            image: null
        },
        {
            name: "WeChat",
            value: null,
            image: "https://example.com"
        },
        {
            name: "Tel",
            value: "0987654321",
            image: null
        }
    ];

    const [contact, setContact] = useState([]);
    const [isEdit, setIsEdit] = useState(false);

    // TODO: use real data from the backend
    useEffect(() => {
        async function fetchContact() {
            try {
                setContact(data);
            } catch (error) {
                console.error('Error fetching contact:', error);
                setContact(data);  // Set contact to sample data on error
            }
        }
        fetchContact().then(() => console.log('Contact fetched'));
    }, []);

    const handleContactChange = (index) => (e) => {
        const { value } = e.target;
        setContact((prevContact) => {
            const newContact = [...prevContact];
            newContact[index].value = value;
            return newContact;
        });
    };

    const submitNewContact = () => {
        setIsEdit(!isEdit);
        console.log(contact);
    };

    return (
        <div>
            <h2>Contact Update</h2>
            <hr className="custom-hr" />
            <div>
                {contact.length === 0 ? (
                    <p>loading...</p>
                ) : (
                    contact.map((item, index) => (
                        <div key={item.name}>
                            {item.name}:
                            <input
                                type="text"
                                placeholder={item.value}
                                value={item.value || ''}
                                onChange={handleContactChange(index)}
                                readOnly={!isEdit}
                            />
                        </div>
                    ))
                )}
            </div>
            <button onClick={submitNewContact}>
                {isEdit ? "Save" : "Edit"}
            </button>
        </div>
    );
}

export default ContactUpdate;