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

async function fetchFavoriteNotes() {
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
        return allNotes.filter(note => note.favorite === true);
    } catch (error) {
        console.error("Error fetching favorite notes:", error);
        return [];
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    if (!checkAuth()) return;
    
    const container = document.getElementById("favoriteContainer");
    if (!container) return;
    
    container.innerHTML = '<div class="col-span-full text-center py-10">Loading favorites...</div>';
    
    const favoriteNotes = await fetchFavoriteNotes();
    
    if (favoriteNotes.length === 0) {
        container.innerHTML = '<div class="col-span-full text-center py-20 text-gray-400"><span class="material-symbols-outlined text-6xl mb-4">star</span><p>No favorite notes yet. Star a note to see it here!</p></div>';
        return;
    }
    
    container.innerHTML = "";
    
    favoriteNotes.forEach(note => {
        const card = document.createElement("div");
        card.className = "group relative bg-white rounded-xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer";
        card.addEventListener("click", () => {
            localStorage.setItem("editNoteId", note._id);
            window.location.href = "../add new/new.html";
        });
        
        const plainTextContent = getPlainTextFromHTML(note.content || "");
        const truncatedContent = truncateText(plainTextContent, 120);
        
        card.innerHTML = `
            <div class="absolute top-4 right-4 text-yellow-500">
                <span class="material-symbols-outlined" style='font-variation-settings: "FILL" 1;'>star</span>
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