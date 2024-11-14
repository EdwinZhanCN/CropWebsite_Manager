import React, {useState} from "react";
import "@/style/Setting.css";
import { useDispatch, useSelector } from 'react-redux';
import { setServerUrl, setToken, setAzureStorageAccountKey, setAzureStorageAccountName} from "@/store/connectionSlice";

function Setting() {
    const dispatch = useDispatch();
    const {SPRING_BACKEND_URL,
        AZURE_STORAGE_ACCOUNT_NAME,
        AZURE_STORAGE_ACCOUNT_KEY,
        GITHUB_ISSUE_TOKEN
    } = useSelector((state) => state.connection);

    const [springBackendUrl, setSpringBackendUrl] = useState(SPRING_BACKEND_URL);
    const [newAzureStorageAccountName, setNewAzureStorageAccountName] = useState(AZURE_STORAGE_ACCOUNT_NAME);
    const [newAzureStorageAccountKey, setNewAzureStorageAccountKey] = useState(AZURE_STORAGE_ACCOUNT_KEY);
    const [githubIssueToken, setGithubIssueToken] = useState(GITHUB_ISSUE_TOKEN);

    const handleSave = () => {
        dispatch(setServerUrl(springBackendUrl));
        dispatch(setToken(githubIssueToken));
        dispatch(setAzureStorageAccountName(newAzureStorageAccountName));
        dispatch(setAzureStorageAccountKey(newAzureStorageAccountKey));
        alert("Setting saved\n" +
            "Server URL: " + springBackendUrl + "" +
            "\nAzure Storage Account Name: " + newAzureStorageAccountName + "" +
            "\nAzure Storage Account Key: " + newAzureStorageAccountKey + "" +
            "\nGithub Issue Token: " + githubIssueToken
        );
    };

    return (
        <div className={"setting-wrapper"}>
            <h2>Setting</h2>
            <hr className={"custom-hr"}/>
            <form>
                <label>Spring Backend URL</label>
                <input type="text" value={springBackendUrl} onChange={(e) => setSpringBackendUrl(e.target.value)}/>
                <label>Azure Storage Account Name</label>
                <input type="text" value={newAzureStorageAccountName} onChange={(e) => setNewAzureStorageAccountName(e.target.value)}/>
                <label>Azure Storage Account Key</label>
                <input type="text" value={newAzureStorageAccountKey} onChange={(e) => setNewAzureStorageAccountKey(e.target.value)}/>
                <label>Github Issue Token</label>
                <input type="text" value={githubIssueToken} onChange={(e) => setGithubIssueToken(e.target.value)}/>
                <button type="button" onClick={handleSave}>Save</button>
            </form>
        </div>
    );
}

export default Setting;