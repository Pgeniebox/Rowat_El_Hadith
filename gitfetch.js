 function updateJSONFile() {
        if (githubOwner && githubRepo && githubPath && githubFileName) {
            const fileContent = JSON.stringify(jsonObject, null, 2);
            const commitMessage = prompt("ادخل تعليق :");
            if(commitMessage.length<1){return;}
            fetch(`https://api.github.com/repos/${githubOwner}/${githubRepo}/contents/${githubPath}/${githubFileName}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `token ${githubToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: commitMessage,
                    content: btoa(fileContent)
                })
            })
            .then(response => {
                if (response.ok) {
                    alert("JSON file updated successfully!");
                } else {
                    throw new Error('Failed to update JSON file');
                }
            })
            .catch(error => {
                console.error(error);
                alert("Failed to update JSON file. Please try again.");
            });
        }
    }


    function modifyJSONFile() {
        if (githubOwner && githubRepo && githubPath && githubFileName) {
            // Retrieve the current commit SHA of the file
            fetch(`https://api.github.com/repos/${githubOwner}/${githubRepo}/contents/${githubPath}/${githubFileName}`)
                .then(response => response.json())
                .then(data => {
                    if (data && data.sha) {
                            const commitMessage = prompt("أدخل التعليق :");
                           const fileContent = JSON.stringify(jsonObject, null, 2);
                            // Make API request to update the JSON file in the GitHub repository
                            fetch(`https://api.github.com/repos/${githubOwner}/${githubRepo}/contents/${githubPath}/${githubFileName}`, {
                                method: 'PUT',
                                headers: {
                                    'Authorization': `token ${githubToken}`,
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    message: commitMessage,
                                    content: btoa(fileContent), // encode content as base64
                                    sha: data.sha // include the current commit SHA
                                })
                            })
                            .then(response => {
                                if (response.ok) {
                                    alert("JSON file modified successfully!");
                                } else {
                                    throw new Error('Failed to modify JSON file');
                                }
                            })
                            .catch(error => {
                                console.error(error);
                                alert("Failed to modify JSON file. Please try again.");
                            });
                        
                    } else {
                        throw new Error('Failed to retrieve file information');
                    }
                })
                .catch(error => {
                    console.error(error);
                    alert("Failed to retrieve file information. Please try again.");
                });
        } else {
            alert("GitHub configuration is missing. Please configure GitHub first.");
        }
    }


    function removeJSONFile() {
        if (githubOwner && githubRepo && githubPath && githubFileName) {
            // Retrieve the current commit SHA of the file
            fetch(`https://api.github.com/repos/${githubOwner}/${githubRepo}/contents/${githubPath}/${githubFileName}`)
                .then(response => response.json())
                .then(data => {
                    if (data && data.sha) {
                        const commitMessage = prompt("أدخل التعليق :");
    
                        // Make API request to delete the JSON file from the GitHub repository
                        fetch(`https://api.github.com/repos/${githubOwner}/${githubRepo}/contents/${githubPath}/${githubFileName}`, {
                            method: 'DELETE',
                            headers: {
                                'Authorization': `token ${githubToken}`,
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                message: commitMessage,
                                sha: data.sha // include the current commit SHA
                            })
                        })
                        .then(response => {
                            if (response.ok) {
                                alert("JSON file removed successfully!");
                            } else {
                                throw new Error('Failed to remove JSON file');
                            }
                        })
                        .catch(error => {
                            console.error(error);
                            alert("Failed to remove JSON file. Please try again.");
                        });
                    } else {
                        throw new Error('Failed to retrieve file information');
                    }
                })
                .catch(error => {
                    console.error(error);
                    alert("Failed to retrieve file information. Please try again.");
                });
        } else {
            alert("GitHub configuration is missing. Please configure GitHub first.");
        }
    }