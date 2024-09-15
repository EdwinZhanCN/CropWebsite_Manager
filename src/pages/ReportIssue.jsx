// src/components/ReportIssue.jsx
import React, { useState } from 'react';
import axios from 'axios';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import '@/style/ReportIssue.css';

const mdParser = new MarkdownIt();

const ReportIssue = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [message, setMessage] = useState('');

    const handleEditorChange = ({ text }) => {
        setBody(text);
    };

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
                    <MdEditor
                        value={body}
                        style={{ height: '300px' }}
                        renderHTML={(text) => mdParser.render(text)}
                        onChange={handleEditorChange}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ReportIssue;