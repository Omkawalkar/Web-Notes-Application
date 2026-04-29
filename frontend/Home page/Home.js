// Tailwind configuration setup
tailwind.config = {
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "surface-tint": "#4647d3",
                primary: "#4647d3",
            },
        },
    },
};

const API_URL = "http://localhost:5000/api";

// Helper function to get auth token
const getAuthToken = () => {
    return localStorage.getItem("authToken");
};

// Check if user is logged in
function checkAuth() {
    const token = getAuthToken();
    if (!token) {
        window.location.href = "../login/login.html";
        return false;
    }
    return true;
}

// Get user info
function getUserInfo() {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    return user;
}

// Display user info in profile sections
function displayUserInfo() {
    const user = getUserInfo();
    const userName = user.name || "User";
    const userEmail = user.email || "user@example.com";

    // Update sidebar user name
    const userNameElement = document.getElementById("userName");
    if (userNameElement) {
        userNameElement.textContent = userName;
    }

    // Update modal user info
    const modalUserName = document.getElementById("modalUserName");
    const modalUserEmail = document.getElementById("modalUserEmail");
    if (modalUserName) modalUserName.textContent = userName;
    if (modalUserEmail) modalUserEmail.textContent = userEmail;
}

// Profile modal handlers
function setupProfileModal() {
    const profileBtn = document.getElementById("profileBtn");
    const profileModal = document.getElementById("profileModal");
    const closeModal = document.getElementById("closeProfileModal");
    const logoutBtn = document.getElementById("logoutBtn");

    // Open modal
    if (profileBtn) {
        profileBtn.addEventListener("click", () => {
            profileModal.classList.remove("hidden");
            profileModal.classList.add("flex");
        });
    }

    // Close modal
    if (closeModal) {
        closeModal.addEventListener("click", () => {
            profileModal.classList.add("hidden");
            profileModal.classList.remove("flex");
        });
    }

    // Close modal when clicking outside
    if (profileModal) {
        profileModal.addEventListener("click", (e) => {
            if (e.target === profileModal) {
                profileModal.classList.add("hidden");
                profileModal.classList.remove("flex");
            }
        });
    }

    // Logout functionality
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("authToken");
            localStorage.removeItem("user");
            window.location.href = "../login/login.html";
        });
    }
}

// Fetch notes from API
async function fetchNotes() {
    try {
        const token = getAuthToken();
        const response = await fetch(`${API_URL}/notes`, {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            if (response.status === 401) {
                localStorage.removeItem("authToken");
                localStorage.removeItem("user");
                window.location.href = "../login/login.html";
            }
            throw new Error("Failed to fetch notes");
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching notes:", error);
        return [];
    }
}

// Helper function to strip HTML tags for preview
function getPlainTextFromHTML(html) {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.innerText || tempDiv.textContent || "";
}

// Helper function to truncate text
function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
}

// Theme Toggle Logic
document.addEventListener("DOMContentLoaded", async () => {
    // Check authentication
    if (!checkAuth()) return;

    // Display user info
    displayUserInfo();

    // Setup profile modal
    setupProfileModal();

    const themeToggle = document.getElementById("theme-toggle");
    const htmlElement = document.documentElement;

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            if (htmlElement.classList.contains("light")) {
                htmlElement.classList.remove("light");
                htmlElement.classList.add("dark");
                themeToggle.textContent = "light_mode";
            } else {
                htmlElement.classList.remove("dark");
                htmlElement.classList.add("light");
                themeToggle.textContent = "dark_mode";
            }
        });
    }

    // Load notes from API
    await loadNotes();
});

async function loadNotes() {
    const container = document.getElementById("notesContainer");
    if (!container) return;

    container.innerHTML = '<div class="col-span-full text-center py-10">Loading notes...</div>';

    const allNotes = await fetchNotes();

    // Filter notes: Only show regular notes (not pinned, not favorite, and no folder)
    const regularNotes = allNotes.filter(note => {
        return !note.pinned && !note.favorite && (!note.folder || note.folder === "");
    });

    if (regularNotes.length === 0) {
        container.innerHTML = `
            <div class="col-span-full text-center py-20 text-gray-400">
                <span class="material-symbols-outlined text-6xl mb-4">description</span>
                <p>No regular notes yet.</p>
                <p class="text-sm mt-2">Pinned, favorite, and folder notes appear in their respective sections.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = "";

    regularNotes.forEach((note) => {
        const noteCard = document.createElement("div");
        noteCard.className = "bg-white p-4 rounded-xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer h-[220px] flex flex-col justify-between";
        noteCard.onclick = () => openNote(note._id);

        // Get plain text from HTML content
        const plainTextContent = getPlainTextFromHTML(note.content || "");
        const truncatedContent = truncateText(plainTextContent, 120);

        noteCard.innerHTML = `
            <div>
                <h2 class="text-base font-semibold mb-2 line-clamp-2">
                    ${escapeHtml(note.title)}
                </h2>
                <p class="text-sm text-gray-600 line-clamp-3">
                    ${escapeHtml(truncatedContent)}
                </p>
            </div>
            <div class="text-xs text-gray-400 mt-2">
                ${new Date(note.createdAt).toLocaleDateString()}
            </div>
        `;

        container.appendChild(noteCard);
    });
}

function openNote(id) {
    localStorage.setItem("editNoteId", id);
    window.location.href = "../add new/new.html";
}

function clearEdit() {
    localStorage.removeItem("editNoteId");
}

function escapeHtml(text) {
    if (!text) return "";
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

function displayNotes(notes) {
    container.innerHTML = "";

    if (!notes || notes.length === 0) {
        container.innerHTML = `
            <div class="col-span-full text-center py-10 text-gray-500">
                No notes yet. Click the + button to create your first note!
            </div>
        `;
        return;
    }

    notes.forEach((note) => {
        const noteCard = document.createElement("div");
        noteCard.className = "bg-white p-4 rounded-xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer h-[220px] flex flex-col justify-between";
        noteCard.onclick = () => openNote(note._id);

        // Create a temporary div to strip HTML tags for preview
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = note.content;
        const plainTextContent = tempDiv.innerText || tempDiv.textContent || "";

        noteCard.innerHTML = `
            <div>
                <h2 class="text-base font-semibold mb-2 line-clamp-2">
                    ${escapeHtml(note.title)}
                </h2>
                <p class="text-sm text-gray-600 line-clamp-3">
                    ${escapeHtml(plainTextContent.substring(0, 150))}
                </p>
            </div>
            <div class="text-xs text-gray-400 mt-2">
                ${new Date(note.createdAt).toLocaleDateString()}
            </div>
        `;

        container.appendChild(noteCard);
    });
}
// Add search functionality
const searchInput = document.getElementById("searchInput");
if (searchInput) {
    searchInput.addEventListener("input", async (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const allNotes = await fetchNotes();
        
        const regularNotes = allNotes.filter(note => {
            return !note.pinned && !note.favorite && (!note.folder || note.folder === "");
        });
        
        const filteredNotes = regularNotes.filter(note => 
            note.title.toLowerCase().includes(searchTerm) || 
            getPlainTextFromHTML(note.content).toLowerCase().includes(searchTerm)
        );
        
        displayFilteredNotes(filteredNotes);
    });
}

function displayFilteredNotes(notes) {
    const container = document.getElementById("notesContainer");
    if (!container) return;
    
    if (notes.length === 0) {
        container.innerHTML = `
            <div class="col-span-full text-center py-20 text-gray-400">
                <span class="material-symbols-outlined text-6xl mb-4">search</span>
                <p>No matching notes found.</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = "";
    
    notes.forEach((note) => {
        const noteCard = document.createElement("div");
        noteCard.className = "bg-white p-4 rounded-xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer h-[220px] flex flex-col justify-between";
        noteCard.onclick = () => openNote(note._id);
        
        const plainTextContent = getPlainTextFromHTML(note.content || "");
        const truncatedContent = truncateText(plainTextContent, 120);
        
        noteCard.innerHTML = `
            <div>
                <h2 class="text-base font-semibold mb-2 line-clamp-2">
                    ${escapeHtml(note.title)}
                </h2>
                <p class="text-sm text-gray-600 line-clamp-3">
                    ${escapeHtml(truncatedContent)}
                </p>
            </div>
            <div class="text-xs text-gray-400 mt-2">
                ${new Date(note.createdAt).toLocaleDateString()}
            </div>
        `;
        
        container.appendChild(noteCard);
    });
}