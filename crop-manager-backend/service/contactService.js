const axios = require('axios');

// Function to fetch data from the backend
async function getContacts(req, res) {
    try {
        const response = await axios.get('http://localhost:8080/api/static/contacts');
        if (response.status === 200) {
            console.log('Contacts fetched successfully');
            res.status(200).json(response.data.data); // Send the array of objects as the response
        } else {
            console.error('Failed to fetch contacts:', response.statusText);
            res.status(response.status).json({ error: response.statusText });
        }
    } catch (error) {
        console.error('Error fetching contacts:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { getContacts, updateContacts };

// Function to update contact information
// data is an object with all contact information
async function updateContacts(req, res) {
    try {
        const response = await axios.post('http://localhost:8080/api/static/contacts', req.body);
        if (response.status === 200) {
            console.log('Contacts updated successfully');
            res.status(200).json(response.data); // Send the updated contact information as the response
        } else {
            console.error('Failed to update contacts:', response.statusText);
            res.status(response.status).json({ error: response.statusText });
        }
    } catch (error) {
        console.error('Error updating contacts:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


module.exports = { getContacts, updateContacts };
