// src/components/ReportIssue.jsx
import React, { useState } from 'react';
import axios from 'axios';
import '@/style/ReportIssue.css';

const ReportIssue = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('Submitting...');

        try {
            const response = await axios.post('http://localhost:3000/api/report-issue', {
                title: title,
                body: body,
            });

            if (response.status === 201) {
                setMessage('Issue submitted successfully!');
                setTitle('');
                setBody('');
            } else {
                setMessage('Failed to submit issue.');
            }
        } catch (error) {
            setMessage(`Error: ${error.response?.data?.message || error.message}`);
        }
    };

    return (
        <div className="report-issue">
            <h2>Report an Issue</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Body:</label>
                    <textarea
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        required
                    ></textarea>
                </div>
                <button type="submit">Submit</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ReportIssue;