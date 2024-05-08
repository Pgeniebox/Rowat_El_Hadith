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


    function listPathsInRepository(wind) {

        if (githubToken) {
            fetch(`https://api.github.com/repos/${githubOwner}/${githubRepo}/contents`, {
                            method: 'GET',
                            headers: {
                                'Authorization': `token ${githubToken}`,
                                'Content-Type': 'application/json'
                            }
                        })
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    const paths = data.filter(item => item.type === 'file'||item.type === 'dir').map(item => item);
                    displayPathList(paths,wind);
                } else {
                    throw new Error('Failed to fetch paths');
                }
            })
            .catch(error => {
                console.error(error);
                alert("Failed to fetch paths. Please try again.");
            });
        } else {
            alert("GitHub token is missing. Please log in and authorize access.");
        }
        }
        
        function displayPathList(paths, wind) {
            paths.forEach(item => {
                var button = document.createElement('li');
                const svg = document.createElement('svg');
                button.appendChild(svg);
                const p = document.createElement('p');
                p.textContent = item.path;
                button.appendChild(p);
                wind.appendChild(button);
                ///button.path =item.path;
        
               /// button.download_url = item.download_url;
        
                if (item.type === 'dir') {
                    svg.outerHTML = '<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M2.06935 5.25839C2 5.62595 2 6.06722 2 6.94975V9.25H21.9531C21.8809 8.20117 21.6973 7.51276 21.2305 6.99383C21.1598 6.91514 21.0849 6.84024 21.0062 6.76946C20.1506 6 18.8345 6 16.2021 6H15.8284C14.6747 6 14.0979 6 13.5604 5.84678C13.2651 5.7626 12.9804 5.64471 12.7121 5.49543C12.2237 5.22367 11.8158 4.81578 11 4L10.4497 3.44975C10.1763 3.17633 10.0396 3.03961 9.89594 2.92051C9.27652 2.40704 8.51665 2.09229 7.71557 2.01738C7.52976 2 7.33642 2 6.94975 2C6.06722 2 5.62595 2 5.25839 2.06935C3.64031 2.37464 2.37464 3.64031 2.06935 5.25839ZM21.9978 10.75H2V14C2 17.7712 2 19.6569 3.17157 20.8284C4.34315 22 6.22876 22 10 22H14C17.7712 22 19.6569 22 20.8284 20.8284C22 19.6569 22 17.7712 22 14V11.7979C22 11.4227 21.9978 10.75 21.9978 10.75Z" fill="rgba(255, 255, 255, 0.196)"/></svg>';
                } else if (item.type === 'file') {
                    svg.outerHTML = '<svg  width="20px" height="20px" viewBox="0 0 24 24" fill="none"><path d="M12.0098 3H8.2C7.0799 3 6.51984 3 6.09202 3.21799C5.71569 3.40973 5.40973 3.71569 5.21799 4.09202C5 4.51984 5 5.0799 5 6.2V17.8C5 18.9201 5 19.4802 5.21799 19.908C5.40973 20.2843 5.71569 20.5903 6.09202 20.782C6.51984 21 7.0799 21 8.2 21H15.8C16.9201 21 17.4802 21 17.908 20.782C18.2843 20.5903 18.5903 20.2843 18.782 19.908C19 19.4802 19 18.9201 19 17.8V9M13 3L19 9M13 3V7.4C13 7.96005 13 8.24008 13.109 8.45399C13.2049 8.64215 13.3578 8.79513 13.546 8.89101C13.7599 9 14.0399 9 14.6 9H19" stroke="rgba(255, 255, 255, 0.26)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
                    const down = document.createElement('svg');
                    const a = document.createElement('a');
                    button.appendChild(a);
                    a.href = item.download_url;
                    a.path =item.path;
                    a.slot = 'down';
                    a.style.left = '0';
                    a.style.position = 'absolute';
                    a.appendChild(down);
                    down.outerHTML = '<svg fill="rgba(255, 255, 255, 0.196)" width="20px" height="20px" viewBox="0 0 32 32" version="1.1" ><title>download-cloud</title><path d="M0 16q0 2.912 1.824 5.088t4.576 2.752q0.032 0 0.032-0.032v-0.064t0.032-0.032q0.544-1.344 1.344-2.176t2.208-1.184v-2.336q0-2.496 1.728-4.256t4.256-1.76 4.256 1.76 1.76 4.256v2.336q1.376 0.384 2.176 1.216t1.344 2.144l0.096 0.288h0.384q2.464 0 4.224-1.76t1.76-4.224v-2.016q0-2.464-1.76-4.224t-4.224-1.76q-0.096 0-0.32 0.032 0.32-1.152 0.32-2.048 0-3.296-2.368-5.632t-5.632-2.368q-2.88 0-5.056 1.824t-2.784 4.544q-1.152-0.352-2.176-0.352-3.296 0-5.664 2.336t-2.336 5.664v1.984zM10.016 25.824q-0.096 0.928 0.576 1.6l4 4q0.576 0.576 1.408 0.576t1.408-0.576l4-4q0.672-0.672 0.608-1.6-0.064-0.32-0.16-0.576-0.224-0.576-0.736-0.896t-1.12-0.352h-1.984v-5.984q0-0.832-0.608-1.408t-1.408-0.608-1.408 0.608-0.576 1.408v5.984h-2.016q-0.608 0-1.12 0.352t-0.736 0.896q-0.096 0.288-0.128 0.576z"></path></svg>'
                    button.onclick = function() { 
        
                        fetch(item.download_url)           
                .then(response => response.text())
                .then(text=> {  
                    var newmodel;
                    const newwind = document.createElement('div');
                    document.body.appendChild(newwind);
                    newmodel = windmodel.replace(
                        "<ul></ul>",
                        "<ul slot='seltext' style=' padding: 22px; word-wrap: break-word; overflow-wrap: break-word;background-color: #070816;height: 100%'>"+ text +"</ul>"
                    );
                    newmodel = newmodel.replaceAll('القاعدة', item.path);
                    newwind.outerHTML = newmodel;
                })
                .catch(error => console.error('Error downloading file:', error)); 
                     };
        
                }
                
            });
        }