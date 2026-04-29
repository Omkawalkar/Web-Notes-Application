// Tailwind configuration injection to maintain the "Ethereal Canvas" design system tokens
tailwind.config = {
    darkMode: "class",
    theme: {
        extend: {
            "colors": {
                "on-secondary-container": "#6900b4",
                "on-tertiary-container": "#63054a",
                "primary": "#4647d3",
                "tertiary": "#963776",
                "primary-container": "#9396ff",
                "on-tertiary-fixed": "#3b002b",
                "secondary-container": "#e5c6ff",
                "inverse-on-surface": "#9a9d9f",
                "on-surface-variant": "#595c5e",
                "primary-fixed-dim": "#8387ff",
                "on-secondary-fixed": "#4f0089",
                "outline": "#747779",
                "error-container": "#f74b6d",
                "tertiary-dim": "#882a69",
                "error-dim": "#a70138",
                "surface-container-low": "#eef1f3",
                "error": "#b41340",
                "on-primary-container": "#0a0081",
                "outline-variant": "#abadaf",
                "on-surface": "#2c2f31",
                "primary-dim": "#3939c7",
                "on-tertiary": "#ffeef4",
                "on-primary": "#f4f1ff",
                "surface-variant": "#d9dde0",
                "on-background": "#2c2f31",
                "inverse-primary": "#8083ff",
                "inverse-surface": "#0b0f10",
                "surface-dim": "#d0d5d8",
                "secondary-fixed": "#e5c6ff",
                "surface-container-lowest": "#ffffff",
                "on-secondary": "#fbefff",
                "surface-container": "#e5e9eb",
                "surface-container-high": "#dfe3e6",
                "secondary-fixed-dim": "#dbb4ff",
                "on-error": "#ffefef",
                "on-error-container": "#510017",
                "primary-fixed": "#9396ff",
                "tertiary-container": "#ff8ed2",
                "surface-tint": "#4647d3",
                "tertiary-fixed-dim": "#ef81c4",
                "secondary": "#8126cf",
                "on-secondary-fixed-variant": "#7511c3",
                "on-primary-fixed-variant": "#0e009d",
                "on-tertiary-fixed-variant": "#6e1354",
                "surface": "#f5f7f9",
                "surface-bright": "#f5f7f9",
                "secondary-dim": "#740ec2",
                "tertiary-fixed": "#ff8ed2",
                "background": "#f5f7f9",
                "surface-container-highest": "#d9dde0",
                "on-primary-fixed": "#000000"
            },
            "borderRadius": {
                "DEFAULT": "1rem",
                "lg": "2rem",
                "xl": "3rem",
                "full": "9999px"
            },
            "fontFamily": {
                "headline": ["Inter"],
                "body": ["Inter"],
                "label": ["Inter"]
            }
        },
    },
}

const API_URL = "http://localhost:5000/api";

const getAuthToken = () => localStorage.getItem("authToken");

function checkAuth() {
    const token = getAuthToken();
    if (!token) {
        window.location.href = "../login/login.html";
        return false;
    }
    return true;
}

let allNotes = [];
let currentFolder = null;

// Fetch folders from API
async function fetchFolders() {
    try {
        const token = getAuthToken();
        const response = await fetch(`${API_URL}/folders`, {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
        
        if (!response.ok) {
            if (response.status === 401) {
                localStorage.removeItem("authToken");
                window.location.href = "../login/login.html";
            }
            throw new Error("Failed to fetch folders");
        }
        
        return await response.json();
    } catch (error) {
        console.error("Error fetching folders:", error);
        return [];
    }
}

// Create a new folder
async function createFolder(name) {
    try {
        const token = getAuthToken();
        const response = await fetch(`${API_URL}/folders`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ name: name.trim() }),
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Failed to create folder");
        }
        
        return await response.json();
    } catch (error) {
        console.error("Error creating folder:", error);
        throw error;
    }
}

// Update a folder
async function updateFolder(id, newName) {
    try {
        const token = getAuthToken();
        const response = await fetch(`${API_URL}/folders/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ name: newName.trim() }),
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Failed to update folder");
        }
        
        return await response.json();
    } catch (error) {
        console.error("Error updating folder:", error);
        throw error;
    }
}

// Delete a folder
async function deleteFolderFromAPI(id) {
    try {
        const token = getAuthToken();
        const response = await fetch(`${API_URL}/folders/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Failed to delete folder");
        }
        
        return true;
    } catch (error) {
        console.error("Error deleting folder:", error);
        throw error;
    }
}

// Fetch all notes
async function fetchNotes() {
    try {
        const token = getAuthToken();
        const response = await fetch(`${API_URL}/notes`, {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
        
        if (!response.ok) throw new Error("Failed to fetch notes");
        
        return await response.json();
    } catch (error) {
        console.error("Error fetching notes:", error);
        return [];
    }
}

// Get note count for a folder
function getNoteCountForFolder(folderName, notes) {
    return notes.filter(note => note.folder === folderName).length;
}

// Render folders grid
async function renderFolders() {
    const container = document.getElementById("foldersGrid");
    if (!container) return;
    
    container.innerHTML = '<div class="col-span-full text-center py-10">Loading folders...</div>';
    
    const [folders, notes] = await Promise.all([fetchFolders(), fetchNotes()]);
    allNotes = notes;
    
    if (folders.length === 0) {
        container.innerHTML = `
            <div class="col-span-full text-center py-20 text-gray-400">
                <span class="material-symbols-outlined text-6xl mb-4">folder_open</span>
                <p>No folders yet. Click "New Folder" to create one!</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = "";
    
    for (const folder of folders) {
        const noteCount = getNoteCountForFolder(folder.name, notes);
        
        const folderCard = document.createElement("div");
        folderCard.className = "group relative bg-white rounded-2xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer";
        folderCard.onclick = () => showFolderNotes(folder);
        
        folderCard.innerHTML = `
            <div class="flex items-start justify-between">
                <div class="flex-1">
                    <span class="material-symbols-outlined text-4xl text-primary mb-3">folder</span>
                    <h3 class="text-lg font-bold mb-2">${escapeHtml(folder.name)}</h3>
                    <p class="text-sm text-gray-500">${noteCount} ${noteCount === 1 ? 'note' : 'notes'}</p>
                </div>
                <div class="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button class="edit-folder-btn p-1 hover:bg-gray-100 rounded" data-id="${folder._id}" data-name="${folder.name}">
                        <span class="material-symbols-outlined text-sm">edit</span>
                    </button>
                    <button class="delete-folder-btn p-1 hover:bg-red-100 rounded text-red-500" data-id="${folder._id}">
                        <span class="material-symbols-outlined text-sm">delete</span>
                    </button>
                </div>
            </div>
        `;
        
        container.appendChild(folderCard);
    }
    
    // Add event listeners for edit/delete buttons
    document.querySelectorAll(".edit-folder-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const id = btn.getAttribute("data-id");
            const name = btn.getAttribute("data-name");
            openEditFolderModal(id, name);
        });
    });
    
    document.querySelectorAll(".delete-folder-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const id = btn.getAttribute("data-id");
            handleDeleteFolder(id);
        });
    });
}

// Show notes in a specific folder
async function showFolderNotes(folder) {
    currentFolder = folder;
    document.getElementById("folderNotesSection").classList.remove("hidden");
    document.getElementById("foldersGrid").parentElement.classList.add("hidden");
    document.getElementById("selectedFolderName").querySelector("span").innerHTML = escapeHtml(folder.name);
    
    const notes = await fetchNotes();
    const folderNotes = notes.filter(note => note.folder === folder.name);
    
    const container = document.getElementById("folderNotesContainer");
    
    if (folderNotes.length === 0) {
        container.innerHTML = `
            <div class="col-span-full text-center py-20 text-gray-400">
                <span class="material-symbols-outlined text-6xl mb-4">folder_open</span>
                <p>No notes in "${escapeHtml(folder.name)}" folder yet.</p>
                <a href="../add new/new.html" class="text-primary hover:underline mt-2 inline-block flex items-center justify-center gap-1">
                    <span class="material-symbols-outlined text-sm">add</span>
                    Create a note
                </a>
            </div>
        `;
        return;
    }
    
    container.innerHTML = "";
    
    for (const note of folderNotes) {
        const card = document.createElement("div");
        card.className = "bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all cursor-pointer group";
        card.onclick = () => {
            localStorage.setItem("editNoteId", note._id);
            window.location.href = "../add new/new.html";
        };
        
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = note.content || "";
        const plainText = tempDiv.innerText || tempDiv.textContent || "";
        const truncatedText = plainText.length > 100 ? plainText.substring(0, 100) + "..." : plainText;
        
        card.innerHTML = `
            <div class="flex items-start justify-between">
                <div class="flex-1">
                    <h3 class="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        ${escapeHtml(note.title || "Untitled")}
                    </h3>
                    <p class="text-sm text-gray-600 line-clamp-3 mb-3">
                        ${escapeHtml(truncatedText)}
                    </p>
                    <div class="flex items-center gap-3 text-xs text-gray-400">
                        <span>${new Date(note.createdAt).toLocaleDateString()}</span>
                        ${note.pinned ? '<span class="text-primary flex items-center gap-1"><span class="material-symbols-outlined text-xs">push_pin</span> Pinned</span>' : ''}
                        ${note.favorite ? '<span class="text-yellow-500 flex items-center gap-1"><span class="material-symbols-outlined text-xs">star</span> Favorite</span>' : ''}
                    </div>
                </div>
                <div class="opacity-0 group-hover:opacity-100 transition-opacity">
                    <span class="material-symbols-outlined text-gray-400">chevron_right</span>
                </div>
            </div>
        `;
        
        container.appendChild(card);
    }
}

// Handle delete folder
async function handleDeleteFolder(id) {
    const folderToDelete = await fetchFolders().then(folders => folders.find(f => f._id === id));
    if (!folderToDelete) return;
    
    if (!confirm(`Delete folder "${folderToDelete.name}"? Notes inside will NOT be deleted, but will be moved to "No Folder".`)) return;
    
    try {
        await deleteFolderFromAPI(id);
        
        // Update notes that had this folder (set folder to empty string)
        const token = getAuthToken();
        const notes = await fetchNotes();
        const notesToUpdate = notes.filter(note => note.folder === folderToDelete.name);
        
        for (const note of notesToUpdate) {
            await fetch(`${API_URL}/notes/${note._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ ...note, folder: "" }),
            });
        }
        
        await renderFolders();
        
        if (currentFolder && currentFolder._id === id) {
            document.getElementById("backToFoldersBtn").click();
        }
    } catch (error) {
        alert(error.message);
    }
}

// Handle create folder
async function handleCreateFolder(name) {
    try {
        await createFolder(name);
        await renderFolders();
        return true;
    } catch (error) {
        alert(error.message);
        return false;
    }
}

// Handle update folder
async function handleUpdateFolder(id, newName) {
    try {
        const oldFolder = await fetchFolders().then(folders => folders.find(f => f._id === id));
        await updateFolder(id, newName);
        
        // Update notes that had the old folder name
        const token = getAuthToken();
        const notes = await fetchNotes();
        const notesToUpdate = notes.filter(note => note.folder === oldFolder.name);
        
        for (const note of notesToUpdate) {
            await fetch(`${API_URL}/notes/${note._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ ...note, folder: newName }),
            });
        }
        
        await renderFolders();
        
        if (currentFolder && currentFolder._id === id) {
            currentFolder.name = newName;
            showFolderNotes(currentFolder);
        }
        return true;
    } catch (error) {
        alert(error.message);
        return false;
    }
}

// Modal handlers
function openCreateFolderModal() {
    document.getElementById("modalTitle").innerText = "Create New Folder";
    document.getElementById("folderNameInput").value = "";
    document.getElementById("confirmFolderBtn").onclick = async () => {
        const name = document.getElementById("folderNameInput").value.trim();
        if (name) {
            const success = await handleCreateFolder(name);
            if (success) closeModal();
        }
    };
    document.getElementById("folderModal").classList.remove("hidden");
    document.getElementById("folderModal").classList.add("flex");
}

function openEditFolderModal(id, currentName) {
    document.getElementById("modalTitle").innerText = "Edit Folder";
    document.getElementById("folderNameInput").value = currentName;
    document.getElementById("confirmFolderBtn").onclick = async () => {
        const newName = document.getElementById("folderNameInput").value.trim();
        if (newName && newName !== currentName) {
            const success = await handleUpdateFolder(id, newName);
            if (success) closeModal();
        } else if (newName === currentName) {
            closeModal();
        }
    };
    document.getElementById("folderModal").classList.remove("hidden");
    document.getElementById("folderModal").classList.add("flex");
}

function closeModal() {
    document.getElementById("folderModal").classList.add("hidden");
    document.getElementById("folderModal").classList.remove("flex");
    document.getElementById("folderNameInput").value = "";
}

function escapeHtml(text) {
    if (!text) return "";
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

// Update folder dropdown in new.html
async function updateFolderDropdown() {
    const folderSelect = document.getElementById("folderSelect");
    if (!folderSelect) return;
    
    const folders = await fetchFolders();
    
    // Clear existing options except the first one
    while (folderSelect.options.length > 1) {
        folderSelect.remove(1);
    }
    
    folders.forEach(folder => {
        const option = document.createElement("option");
        option.value = folder.name;
        option.textContent = folder.name;
        folderSelect.appendChild(option);
    });
}

// Initialize page
document.addEventListener('DOMContentLoaded', async () => {
    if (!checkAuth()) return;
    
    await renderFolders();
    
    // Modal handlers
    document.getElementById("createFolderBtn").onclick = openCreateFolderModal;
    document.getElementById("cancelModalBtn").onclick = closeModal;
    document.getElementById("backToFoldersBtn").onclick = () => {
        document.getElementById("folderNotesSection").classList.add("hidden");
        document.getElementById("foldersGrid").parentElement.classList.remove("hidden");
        currentFolder = null;
    };
    
    // Close modal when clicking outside
    document.getElementById("folderModal").onclick = (e) => {
        if (e.target === document.getElementById("folderModal")) {
            closeModal();
        }
    };
});

// Clean up interval when page is unloaded
window.addEventListener("beforeunload", () => {
    if (refreshInterval) {
        clearInterval(refreshInterval);
    }
});