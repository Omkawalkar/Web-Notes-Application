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

function getPlainTextFromHTML(html) {
    if (!html) return "";
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.innerText || tempDiv.textContent || "";
}

function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
}

function escapeHtml(text) {
    if (!text) return "";
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

async function fetchPinnedNotes() {
    try {
        const token = getAuthToken();
        const response = await fetch(`${API_URL}/notes`, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        
        if (!response.ok) {
            if (response.status === 401) {
                localStorage.removeItem("authToken");
                window.location.href = "../login/login.html";
            }
            throw new Error("Failed to fetch notes");
        }
        
        const allNotes = await response.json();
        return allNotes.filter(note => note.pinned === true);
    } catch (error) {
        console.error("Error fetching pinned notes:", error);
        return [];
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    if (!checkAuth()) return;
    
    const container = document.getElementById("pinnedContainer");
    if (!container) return;
    
    container.innerHTML = '<div class="col-span-full text-center py-10">Loading pinned notes...</div>';
    
    const pinnedNotes = await fetchPinnedNotes();
    
    if (pinnedNotes.length === 0) {
        container.innerHTML = '<div class="col-span-full text-center py-20 text-gray-400"><span class="material-symbols-outlined text-6xl mb-4">push_pin</span><p>No pinned notes yet. Pin a note to see it here!</p></div>';
        return;
    }
    
    container.innerHTML = "";
    
    pinnedNotes.forEach(note => {
        const card = document.createElement("div");
        card.className = "group relative bg-white rounded-xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer";
        card.addEventListener("click", () => {
            localStorage.setItem("editNoteId", note._id);
            window.location.href = "../add new/new.html";
        });
        
        const plainTextContent = getPlainTextFromHTML(note.content || "");
        const truncatedContent = truncateText(plainTextContent, 120);
        
        card.innerHTML = `
            <div class="absolute top-4 right-4 text-primary">
                <span class="material-symbols-outlined" style='font-variation-settings: "FILL" 1;'>push_pin</span>
            </div>
            <h3 class="text-lg font-bold text-on-surface mb-2 line-clamp-2">
                ${escapeHtml(note.title || "Untitled")}
            </h3>
            <p class="text-on-surface-variant text-sm line-clamp-3">
                ${escapeHtml(truncatedContent)}
            </p>
            <div class="mt-3 text-xs text-gray-400">${new Date(note.createdAt).toLocaleDateString()}</div>
        `;
        
        container.appendChild(card);
    });
});