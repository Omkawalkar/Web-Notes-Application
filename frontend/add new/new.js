const API_URL = "http://localhost:5000/api";

// Helper function to get auth token
const getAuthToken = () => {
    return localStorage.getItem("authToken");
};

// Check authentication
function checkAuth() {
    const token = getAuthToken();
    if (!token) {
        window.location.href = "../login/login.html";
        return false;
    }
    return true;
}

// Helper function to save content as HTML
function getContentAsHTML() {
    const editor = document.getElementById("contentEditor");
    return editor ? editor.innerHTML : "";
}

// Helper function to set HTML content
function setContentFromHTML(html) {
    const editor = document.getElementById("contentEditor");
    if (editor) editor.innerHTML = html || "";
}

// Helper function to get plain text
function getContentAsPlainText() {
    const editor = document.getElementById("contentEditor");
    return editor ? editor.innerText : "";
}

// Save the current selection before color picker opens
let savedSelection = null;

function saveSelection() {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
        savedSelection = selection.getRangeAt(0).cloneRange();
    }
}

function restoreSelection() {
    if (savedSelection) {
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(savedSelection);
        savedSelection = null;
    }
}

// Apply font size
function applyFontSize(size) {
    const editor = document.getElementById("contentEditor");
    if (!editor) return;
    editor.focus();

    const sizes = {
        '1': '10px',
        '2': '12px',
        '3': '14px',
        '4': '16px',
        '5': '18px',
        '6': '24px',
        '7': '32px'
    };

    try {
        document.execCommand('fontSize', false, size);
        const fontElements = document.querySelectorAll('#contentEditor font[size]');
        fontElements.forEach(el => {
            const fontSize = el.getAttribute('size');
            if (sizes[fontSize]) {
                el.style.fontSize = sizes[fontSize];
                el.removeAttribute('size');
            }
        });
    } catch (error) {
        console.error("Font size error:", error);
    }
}

// Apply multilevel list
function applyMultiLevelList() {
    const editor = document.getElementById("contentEditor");
    if (!editor) return;
    editor.focus();

    try {
        const selection = window.getSelection();
        if (!selection.rangeCount) return;

        const range = selection.getRangeAt(0);
        const parentElement = range.commonAncestorContainer.parentElement;

        if (parentElement && parentElement.tagName === 'LI') {
            const list = parentElement.parentElement;
            const newList = document.createElement(list.tagName === 'UL' ? 'UL' : 'OL');
            newList.style.listStyleType = 'none';
            newList.style.paddingLeft = '20px';

            const clonedItem = parentElement.cloneNode(true);
            newList.appendChild(clonedItem);
            if (parentElement.parentElement) {
                parentElement.parentElement.insertBefore(newList, parentElement.nextSibling);
                parentElement.remove();
            }
        } else {
            document.execCommand('insertOrderedList', false, null);
        }
    } catch (error) {
        console.error("Multi-level list error:", error);
    }
}

// Apply highlight color - FIXED VERSION
function applyHighlightColor(color) {
    const editor = document.getElementById("contentEditor");
    if (!editor) return;
    
    editor.focus();
    restoreSelection();
    
    try {
        // Try execCommand first
        const success = document.execCommand('hiliteColor', false, color);
        if (success) {
            console.log("Highlight applied via execCommand:", color);
        } else {
            console.log("execCommand failed for highlight");
        }
    } catch (error) {
        console.error("Highlight color error:", error);
    }
}

// Apply font color - FIXED VERSION
function applyFontColor(color) {
    const editor = document.getElementById("contentEditor");
    if (!editor) return;
    
    editor.focus();
    restoreSelection();
    
    try {
        // Try execCommand first
        const success = document.execCommand('foreColor', false, color);
        if (success) {
            console.log("Color applied via execCommand:", color);
        } else {
            console.log("execCommand failed for color");
        }
    } catch (error) {
        console.error("Font color error:", error);
    }
}

// Update active state of toolbar buttons
function updateActiveStates() {
    const toolbarBtns = document.querySelectorAll(".toolbar-btn");
    toolbarBtns.forEach(btn => {
        const command = btn.getAttribute("data-command");
        if (command === "bold" && document.queryCommandState("bold")) {
            btn.classList.add("active");
        } else if (command === "italic" && document.queryCommandState("italic")) {
            btn.classList.add("active");
        } else if (command === "underline" && document.queryCommandState("underline")) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });
}

// Escape HTML
function escapeHtml(text) {
    if (!text) return "";
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

// Populate folder dropdown from API
async function populateFolderDropdown() {
    const folderSelect = document.getElementById("folderSelect");
    if (!folderSelect) return;

    try {
        const token = getAuthToken();
        const response = await fetch(`${API_URL}/folders`, {
            headers: { "Authorization": `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Failed to fetch folders");

        const folders = await response.json();

        while (folderSelect.options.length > 1) {
            folderSelect.remove(1);
        }

        folders.forEach(folder => {
            const option = document.createElement("option");
            option.value = folder.name;
            option.textContent = folder.name;
            folderSelect.appendChild(option);
        });
    } catch (error) {
        console.error("Error loading folders:", error);
    }
}

// Main DOM Content Loaded event
document.addEventListener("DOMContentLoaded", async () => {
    console.log("DOM Content Loaded - Initializing editor");

    // Check authentication
    if (!checkAuth()) return;

    // Get DOM elements
    const folderSelect = document.getElementById("folderSelect");
    const titleInput = document.getElementById("title");
    const contentEditor = document.getElementById("contentEditor");
    const saveBtn = document.getElementById("saveBtn");
    const deleteBtn = document.getElementById("deleteBtn");
    const pinToggle = document.getElementById("pinToggle");
    const favToggle = document.getElementById("favToggle");
    const downloadPdfBtn = document.getElementById("downloadPdfBtn");

    let editId = localStorage.getItem("editNoteId");

    // Populate folder dropdown
    await populateFolderDropdown();

    // Set up toolbar formatting commands
    const toolbarBtns = document.querySelectorAll(".toolbar-btn");
    console.log("Found toolbar buttons:", toolbarBtns.length);

    toolbarBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            const command = btn.getAttribute("data-command");
            const value = btn.getAttribute("data-value");

            if (command === "createLink") {
                const url = prompt("Enter the URL:", "https://");
                if (url) document.execCommand(command, false, url);
            } else if (command === "formatBlock") {
                document.execCommand(command, false, value);
            } else if (command === "justifyFull") {
                document.execCommand('justifyFull', false, null);
            } else if (command === "bold" || command === "italic" || command === "underline") {
                document.execCommand(command, false, null);
            } else if (command === "justifyLeft" || command === "justifyCenter" || command === "justifyRight") {
                document.execCommand(command, false, null);
            } else if (command === "insertUnorderedList" || command === "insertOrderedList") {
                document.execCommand(command, false, null);
            }

            updateActiveStates();
            if (contentEditor) contentEditor.focus();
        });
    });

    // Font size selector
    const fontSizeSelect = document.getElementById("fontSizeSelect");
    if (fontSizeSelect) {
        fontSizeSelect.addEventListener("change", (e) => {
            applyFontSize(e.target.value);
            if (contentEditor) contentEditor.focus();
        });
    }

    // ============================================
    // TEXT COLOR PICKER - FIXED
    // ============================================
    const fontColorBtn = document.getElementById("fontColorBtn");
    const fontColorPalette = document.getElementById("fontColorPalette");
    const customFontColor = document.getElementById("customFontColor");
    const currentColorPreview = document.getElementById("currentColorPreview");

    if (fontColorBtn) {
        fontColorBtn.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log("Font color button clicked");
            
            // SAVE the current selection BEFORE opening the palette
            saveSelection();
            
            // Close highlight palette if open
            const highlightColorPalette = document.getElementById("highlightColorPalette");
            if (highlightColorPalette) {
                highlightColorPalette.classList.add("hidden");
            }
            
            // Toggle text color palette
            if (fontColorPalette) {
                fontColorPalette.classList.toggle("hidden");
            }
        });
    }

    // Handle predefined color clicks - TEXT COLORS (8 colors)
    const colorOptions = document.querySelectorAll('.color-option');
    console.log("Color options found:", colorOptions.length);

    colorOptions.forEach(option => {
        option.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            const color = option.getAttribute("data-color");
            console.log("Color selected:", color);
            
            // Apply the color
            applyFontColor(color);
            
            if (currentColorPreview) {
                currentColorPreview.style.backgroundColor = color;
            }
            if (fontColorPalette) {
                fontColorPalette.classList.add("hidden");
            }
            if (contentEditor) contentEditor.focus();
        });
    });

    // Handle custom color
    if (customFontColor) {
        customFontColor.addEventListener("change", (e) => {
            const color = e.target.value;
            console.log("Custom color selected:", color);
            applyFontColor(color);
            if (currentColorPreview) {
                currentColorPreview.style.backgroundColor = color;
            }
            if (fontColorPalette) {
                fontColorPalette.classList.add("hidden");
            }
            if (contentEditor) contentEditor.focus();
        });
    }

    // ============================================
    // HIGHLIGHT COLOR PICKER - FIXED
    // ============================================
    const highlightColorBtn = document.getElementById("highlightColorBtn");
    const highlightColorPalette = document.getElementById("highlightColorPalette");
    const customHighlightColor = document.getElementById("customHighlightColor");
    const currentHighlightPreview = document.getElementById("currentHighlightPreview");

    if (highlightColorBtn) {
        highlightColorBtn.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log("Highlight button clicked");
            
            // SAVE the current selection BEFORE opening the palette
            saveSelection();
            
            // Close text color palette if open
            if (fontColorPalette) {
                fontColorPalette.classList.add("hidden");
            }
            
            // Toggle highlight palette
            if (highlightColorPalette) {
                highlightColorPalette.classList.toggle("hidden");
            }
        });
    }

    // Handle predefined highlight clicks - HIGHLIGHT COLORS (8 colors)
    const highlightOptions = document.querySelectorAll('.highlight-option');
    console.log("Highlight options found:", highlightOptions.length);

    highlightOptions.forEach(option => {
        option.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            const color = option.getAttribute("data-color");
            console.log("Highlight color selected:", color);
            
            // Apply the highlight
            applyHighlightColor(color);
            
            if (currentHighlightPreview) {
                currentHighlightPreview.style.backgroundColor = color;
            }
            if (highlightColorPalette) {
                highlightColorPalette.classList.add("hidden");
            }
            if (contentEditor) contentEditor.focus();
        });
    });

    // Handle custom highlight color
    if (customHighlightColor) {
        customHighlightColor.addEventListener("change", (e) => {
            const color = e.target.value;
            console.log("Custom highlight selected:", color);
            applyHighlightColor(color);
            if (currentHighlightPreview) {
                currentHighlightPreview.style.backgroundColor = color;
            }
            if (highlightColorPalette) {
                highlightColorPalette.classList.add("hidden");
            }
            if (contentEditor) contentEditor.focus();
        });
    }

    // Close color palettes when clicking outside
    document.addEventListener("click", function(e) {
        if (fontColorPalette && fontColorBtn && !fontColorBtn.contains(e.target) && !fontColorPalette.contains(e.target)) {
            fontColorPalette.classList.add("hidden");
        }
        if (highlightColorPalette && highlightColorBtn && !highlightColorBtn.contains(e.target) && !highlightColorPalette.contains(e.target)) {
            highlightColorPalette.classList.add("hidden");
        }
    });

    // Multi-level list button
    const multiLevelListBtn = document.getElementById("multiLevelListBtn");
    if (multiLevelListBtn) {
        multiLevelListBtn.addEventListener("click", () => {
            applyMultiLevelList();
            if (contentEditor) contentEditor.focus();
        });
    }

    // Handle selection changes for active states
    if (contentEditor) {
        contentEditor.addEventListener("mouseup", updateActiveStates);
        contentEditor.addEventListener("keyup", updateActiveStates);
    }

    // Load existing note if in edit mode
    if (editId) {
        try {
            const token = getAuthToken();
            const response = await fetch(`${API_URL}/notes/${editId}`, {
                headers: { "Authorization": `Bearer ${token}` },
            });

            if (!response.ok) {
                if (response.status === 401) {
                    localStorage.removeItem("authToken");
                    localStorage.removeItem("user");
                    window.location.href = "../login/login.html";
                    return;
                }
                throw new Error("Failed to fetch note");
            }

            const currentNote = await response.json();

            if (titleInput) titleInput.value = currentNote.title || "";
            if (contentEditor) setContentFromHTML(currentNote.content || "");
            if (pinToggle) pinToggle.checked = currentNote.pinned || false;
            if (favToggle) favToggle.checked = currentNote.favorite || false;
            if (folderSelect) folderSelect.value = currentNote.folder || "";

            const createdDateSpan = document.getElementById("createdDate");
            const editedDateSpan = document.getElementById("editedDate");

            if (createdDateSpan && currentNote.createdAt) {
                createdDateSpan.innerText = new Date(currentNote.createdAt).toLocaleDateString();
            }
            if (editedDateSpan && currentNote.updatedAt) {
                editedDateSpan.innerText = new Date(currentNote.updatedAt).toLocaleString();
            }
        } catch (error) {
            console.error("Error loading note:", error);
            alert("Failed to load note: " + error.message);
        }
    } else {
        if (pinToggle) pinToggle.checked = false;
        if (favToggle) favToggle.checked = false;
        if (contentEditor) contentEditor.innerHTML = '<p>Start typing your brilliance here...</p>';
    }

    // Save note
    if (saveBtn) {
        saveBtn.addEventListener("click", async () => {
            const title = titleInput ? titleInput.value.trim() : "";
            let content = getContentAsHTML();

            if (!content || content === '<p><br></p>' || content === '<br>' || content === '<p>Start typing your brilliance here...</p>') {
                content = getContentAsPlainText();
            }

            if (!title) {
                alert("Please add a title");
                return;
            }

            if (!content || content === "Start typing your brilliance here...") {
                alert("Please add some content");
                return;
            }

            const noteData = {
                title: title,
                content: content,
                pinned: pinToggle ? pinToggle.checked : false,
                favorite: favToggle ? favToggle.checked : false,
                folder: folderSelect ? folderSelect.value : "",
            };

            try {
                const token = getAuthToken();
                let response;

                if (editId) {
                    response = await fetch(`${API_URL}/notes/${editId}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`,
                        },
                        body: JSON.stringify(noteData),
                    });
                } else {
                    response = await fetch(`${API_URL}/notes`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`,
                        },
                        body: JSON.stringify(noteData),
                    });
                }

                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.message || "Failed to save note");
                }

                localStorage.removeItem("editNoteId");
                window.location.href = "../Home page/Home.html";
            } catch (error) {
                console.error("Error saving note:", error);
                alert("Failed to save note: " + error.message);
            }
        });
    }

    // Delete note
    if (deleteBtn) {
        deleteBtn.addEventListener("click", async () => {
            if (!confirm("Are you sure you want to delete this note?")) return;

            if (!editId) {
                alert("No note to delete");
                return;
            }

            try {
                const token = getAuthToken();
                const response = await fetch(`${API_URL}/notes/${editId}`, {
                    method: "DELETE",
                    headers: { "Authorization": `Bearer ${token}` },
                });

                if (!response.ok) {
                    throw new Error("Failed to delete note");
                }

                localStorage.removeItem("editNoteId");
                window.location.href = "../Home page/Home.html";
            } catch (error) {
                console.error("Error deleting note:", error);
                alert("Failed to delete note: " + error.message);
            }
        });
    }

    // Download PDF
    if (downloadPdfBtn) {
        downloadPdfBtn.addEventListener("click", () => {
            const title = titleInput ? titleInput.value.trim() : "Untitled Note";
            const content = getContentAsHTML();

            const printWindow = window.open('', '_blank');
            if (printWindow) {
                printWindow.document.write(`
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <title>${escapeHtml(title)}</title>
                        <style>
                            body { font-family: 'Inter', sans-serif; padding: 40px; max-width: 800px; margin: 0 auto; }
                            h1 { font-size: 2rem; margin-bottom: 1rem; }
                            .content { line-height: 1.6; }
                            .content ul, .content ol { margin: 0.5rem 0; padding-left: 1.5rem; }
                            .content blockquote { border-left: 4px solid #6366f1; padding-left: 1rem; margin: 0.5rem 0; color: #6b7280; }
                            .content span[style*="background-color"] { padding: 2px 4px; border-radius: 4px; }
                        </style>
                    </head>
                    <body>
                        <h1>${escapeHtml(title)}</h1>
                        <div class="content">${content}</div>
                        <p style="margin-top: 40px; font-size: 12px; color: #9ca3af; text-align: center;">
                            Generated on ${new Date().toLocaleString()}
                        </p>
                    </body>
                    </html>
                `);
                printWindow.document.close();
                printWindow.print();
            }
        });
    }

    console.log("Editor initialization complete");
});