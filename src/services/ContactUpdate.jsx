import React, { useEffect, useState } from "react";
import '@/style/ContactUpdate.css';

function ContactUpdate() {
    const [contact, setContact] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [newContactName, setNewContactName] = useState('');
    const [newContactValue, setNewContactValue] = useState('');

    useEffect(() => {
        async function fetchContact() {
            try {
                const response = await fetch('http://localhost:3000/api/get-contacts', {
                    method: 'GET',
                });

                if (response.ok) {
                    const res = await response.json();
                    console.log('Contact fetched:', res);
                    setContact(res);
                } else {
                    console.error('Failed to fetch contact:', response.statusText);
                    setContact([]);
                }
            } catch (error) {
                console.error('Error fetching contact:', error);
                setContact([]);
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
        if (isEdit) {
            try {
                fetch('http://localhost:3000/api/update-contacts', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(contact),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log('Success:', data);
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
            } catch (error) {
                console.error('Error updating contact:', error);
            }
        }
    };

    const addNewContact = () => {
        if (newContactName && newContactValue) {
            setContact([...contact, { name: newContactName, value: newContactValue }]);
            setNewContactName('');
            setNewContactValue('');
            setIsEdit(true);
        }
    };

    return (
        <div className={"contact-update-wrapper"}>
            <h2>Contact Update</h2>
            <hr className="custom-hr" />
            <div className={"contact-update-list"}>
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

            <div className={"contact-new-wrapper"}>
                <h3>Add New Contact</h3>
                <input
                    type="text"
                    placeholder="Name"
                    value={newContactName}
                    onChange={(e) => setNewContactName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Value"
                    value={newContactValue}
                    onChange={(e) => setNewContactValue(e.target.value)}
                />
                <button onClick={addNewContact}>Add Contact</button>
                <button onClick={submitNewContact}>
                    {isEdit ? "Save" : "Edit"}
                </button>
            </div>
        </div>
    );
}

export default ContactUpdate;