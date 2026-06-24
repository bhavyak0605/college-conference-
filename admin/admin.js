/* 
================================================================
VISTA 2027 Admin Console Core JavaScript
Aesthetic: Dark Space Navy & Deep Purple Space Gradients, Gold Accents,
           and Premium Glassmorphic Cards.
================================================================
*/

// --- Mock Session Protection (Runs immediately to prevent layout pop-in) ---
(function() {
    const path = window.location.pathname;
    const isLoginPage = path.endsWith("login.html") || document.getElementById("loginForm") !== null;
    const isLoggedIn = sessionStorage.getItem("adminLoggedIn") === "true";

    if (!isLoginPage && !isLoggedIn) {
        window.location.href = "login.html";
    } else if (isLoginPage && isLoggedIn) {
        window.location.href = "admin-dashboard.html";
    }
})();

// ==========================================
// 1. DATA STORE (Stateful mock database)
// ==========================================

let speakers = [
    {
        name: "Dr. Ramesh K. Somashekar",
        title: "Professor, IISc Bangalore",
        photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
        bio: "Dr. Ramesh Somashekar is a leading academician at IISc, specializing in Artificial Intelligence for clinical healthcare. He has authored over 80+ peer-reviewed journal papers and serves on the advisory boards of major biomedical research councils."
    },
    {
        name: "Dr. Arlene Peterson",
        title: "Senior AI Scientist, OpenAI",
        photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
        bio: "Dr. Peterson works in San Francisco focusing on scaling laws for Large Multimodal Models (LMMs). Prior to OpenAI, she received her PhD from Stanford University and worked on foundational NLP systems."
    },
    {
        name: "Prof. Hiroshi Tanaka",
        title: "Director of Robotics, Tokyo Tech",
        photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
        bio: "Professor Tanaka leads the Autonomous Systems Lab at Tokyo Institute of Technology. His research includes tactile sensing, cobotics, and smart city robotic automation frameworks for heavy industries."
    }
];

let committee = [
    {
        name: "Dr. Patangrao Kadam",
        role: "Founder Chancellor",
        org: "Bharati Vidyapeeth, Pune",
        category: "Chief Patron"
    },
    {
        name: "Dr. Vishwajeet Kadam",
        role: "Secretary & Pro-Vice Chancellor",
        org: "Bharati Vidyapeeth University, Pune",
        category: "Chief Patron"
    },
    {
        name: "Dr. Anand Bhalerao",
        role: "Principal & Dean",
        org: "BVDU College of Engineering, Pune",
        category: "Organizing Committee"
    },
    {
        name: "Dr. Sandeep Upadhyaya",
        role: "Head of Department (Computer Science)",
        org: "BVDU College of Engineering, Pune",
        category: "Organizing Committee"
    },
    {
        name: "Prof. Deborah Johnson",
        role: "Emerita Professor of Applied Ethics",
        org: "University of Virginia, USA",
        category: "Advisory Board"
    },
    {
        name: "Dr. Manisha Desai",
        role: "Professor & Technical Lead",
        org: "Bharati Vidyapeeth University, Pune",
        category: "Technical Advisor"
    }
];

let scheduleEvents = [
    { name: "Full Paper Submission Deadline", date: "15th April, 2027" },
    { name: "Notification of Acceptance/Rejection", date: "15th May, 2027" },
    { name: "Camera Ready Copy & Registration Due", date: "1st June, 2027" },
    { name: "Conference Inauguration & Keynote Speech", date: "15th July, 2027" },
    { name: "Parallel Technical Sessions & Workshops", date: "16th July, 2027" },
    { name: "Valedictory Ceremony & Best Paper Awards", date: "17th July, 2027" }
];

let registrations = [
    {
        name: "Bhavya Kadam",
        email: "bhavya.kadam@example.com",
        country: "India",
        category: "Academician",
        amount: "₹5,000",
        txnId: "TXN9081234",
        status: "Approved"
    },
    {
        name: "Dr. Sarah Jenkins",
        email: "s.jenkins@example.com",
        country: "United States",
        category: "Academician",
        amount: "₹8,500",
        txnId: "TXN9081546",
        status: "Pending"
    },
    {
        name: "Aditya Sharma",
        email: "aditya.sharma@example.com",
        country: "India",
        category: "Student",
        amount: "₹3,000",
        txnId: "TXN9081890",
        status: "Approved"
    },
    {
        name: "Prof. Kenji Sato",
        email: "k.sato@example.com",
        country: "Japan",
        category: "Industry Professional",
        amount: "₹10,000",
        txnId: "TXN9081999",
        status: "Rejected"
    }
];

let announcements = [
    {
        text: "Welcome to the VISTA 2027 Admin Portal! You can add, edit, and delete speakers, committee members, and timeline events in real-time.",
        time: "2026-06-25T00:01:00.000Z",
        author: "System Administrator"
    },
    {
        text: "The paper submission deadline has been officially extended to April 15th, 2027 to accommodate international submissions.",
        time: "2026-06-24T18:30:00.000Z",
        author: "Admin Coordinator"
    }
];

let activityLogs = [
    {
        time: "2026-06-25T00:15:22.000Z",
        category: "System",
        description: "Admin session initialized successfully.",
        status: "success"
    },
    {
        time: "2026-06-24T23:59:12.000Z",
        category: "Registrations",
        description: "New registration received from Dr. Sarah Jenkins (USA).",
        status: "info"
    }
];

// ==========================================
// 2. DOM INITIALIZATION
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        initLoginPage(loginForm);
    } else {
        initDashboardPage();
    }
});

// --- Login Page Initialization ---
function initLoginPage(loginForm) {
    const togglePasswordBtn = document.getElementById("togglePassword");
    const passwordInput = document.getElementById("password");
    const errorBox = document.getElementById("errorBox");
    const errorText = document.getElementById("errorText");
    const loginBtn = document.getElementById("loginBtn");

    if (togglePasswordBtn && passwordInput) {
        togglePasswordBtn.addEventListener("click", () => {
            const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
            passwordInput.setAttribute("type", type);
            const icon = togglePasswordBtn.querySelector("i");
            if (icon) {
                icon.classList.toggle("fa-eye");
                icon.classList.toggle("fa-eye-slash");
            }
        });
    }

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        if (loginBtn) {
            loginBtn.classList.add("loading");
            loginBtn.disabled = true;
        }
        if (errorBox) {
            errorBox.classList.remove("show");
        }

        setTimeout(() => {
            // Mock authentication credentials check
            const isValidUser = (email === "admin@bvuvista.com" || email === "admin@vista2027.edu.in" || email === "admin@bvvistacon.in" || email === "admin");
            const isValidPass = (password === "P@ssword06" || password === "admin123");

            if (isValidUser && isValidPass) {
                sessionStorage.setItem("adminLoggedIn", "true");
                window.location.href = "admin-dashboard.html";
            } else {
                if (loginBtn) {
                    loginBtn.classList.remove("loading");
                    loginBtn.disabled = false;
                }
                if (errorBox && errorText) {
                    errorText.innerText = "Invalid credentials. Please use admin@bvuvista.com / P@ssword06.";
                    errorBox.classList.add("show");
                }
            }
        }, 1200); // Simulated secure authentication delay
    });
}

// --- Dashboard Page Initialization ---
function initDashboardPage() {
    // Initial Render of All Visual Pipelines
    updateStats();
    renderSpeakers();
    renderCommittee();
    renderSchedule();
    renderRegistrations();
    renderAnnouncements();
    renderActivityLogs();

    // Attach SPA Navigation Sidebar Tab Switchers
    const navItems = document.querySelectorAll(".nav-item");
    navItems.forEach(item => {
        item.addEventListener("click", () => {
            const tabName = item.getAttribute("data-tab");
            switchTab(tabName);

            // On Mobile drawers, close overlay on selection
            const sidebar = document.getElementById("adminSidebar");
            if (window.innerWidth <= 768 && sidebar) {
                sidebar.classList.remove("open");
            }
        });
    });

    // Mobile Sidebar Drawer Toggle Button
    const menuToggleBtn = document.getElementById("menuToggleBtn");
    const adminSidebar = document.getElementById("adminSidebar");
    if (menuToggleBtn && adminSidebar) {
        menuToggleBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            adminSidebar.classList.toggle("open");
        });
    }

    // Close mobile drawer if clicked outside of its container bounds
    document.addEventListener("click", (e) => {
        const sidebar = document.getElementById("adminSidebar");
        const toggleBtn = document.getElementById("menuToggleBtn");
        if (window.innerWidth <= 768 && sidebar && sidebar.classList.contains("open")) {
            if (!sidebar.contains(e.target) && e.target !== toggleBtn && !toggleBtn.contains(e.target)) {
                sidebar.classList.remove("open");
            }
        }
    });

    // Logout Button Trigger
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            logActivity("Logout trigger initialized.", "System", "warning");
            sessionStorage.removeItem("adminLoggedIn");
            alert("You have successfully logged out of the VISTA 2027 Mock Portal.");
            window.location.href = "login.html";
        });
    }

    // Add Trigger Modal Listeners
    const addSpeakerBtn = document.getElementById("addSpeakerBtn");
    if (addSpeakerBtn) {
        addSpeakerBtn.addEventListener("click", () => {
            openSpeakerModal();
        });
    }

    const addCommitteeBtn = document.getElementById("addCommitteeBtn");
    if (addCommitteeBtn) {
        addCommitteeBtn.addEventListener("click", () => {
            openCommitteeModal();
        });
    }

    const addEventBtn = document.getElementById("addEventBtn");
    if (addEventBtn) {
        addEventBtn.addEventListener("click", () => {
            openEventModal();
        });
    }

    // Form Submit Direct Event Hooks
    const speakerForm = document.getElementById("speakerForm");
    if (speakerForm) {
        speakerForm.addEventListener("submit", handleSpeakerSubmit);
    }

    const committeeForm = document.getElementById("committeeForm");
    if (committeeForm) {
        committeeForm.addEventListener("submit", handleCommitteeSubmit);
    }

    const eventForm = document.getElementById("eventForm");
    if (eventForm) {
        eventForm.addEventListener("submit", handleEventSubmit);
    }

    const announcementForm = document.getElementById("announcementForm");
    if (announcementForm) {
        announcementForm.addEventListener("submit", handleAnnouncementSubmit);
    }

    // Clear Logs Handler
    const clearLogsBtn = document.getElementById("clearLogsBtn");
    if (clearLogsBtn) {
        clearLogsBtn.addEventListener("click", () => {
            activityLogs = [];
            logActivity("All activity logs cleared by admin.", "System", "danger");
            renderActivityLogs();
        });
    }
}

// ==========================================
// 3. SPA TAB ROUTING (Global Scope)
// ==========================================

window.switchTab = function(tabName) {
    // Remove active class from all nav items
    const navItems = document.querySelectorAll(".nav-item");
    navItems.forEach(item => {
        if (item.getAttribute("data-tab") === tabName) {
            item.classList.add("active");
        } else {
            item.classList.remove("active");
        }
    });

    // Toggle target panel layout visibilities
    const panels = document.querySelectorAll(".tab-panel");
    panels.forEach(panel => {
        if (panel.id === `${tabName}-panel`) {
            panel.classList.add("active");
        } else {
            panel.classList.remove("active");
        }
    });

    // Scroll main viewport window to top smoothly
    window.scrollTo({ top: 0, behavior: "smooth" });
};

// ==========================================
// 4. STATS METRICS SYNC
// ==========================================

function updateStats() {
    const sEl = document.getElementById("stat-speakers");
    const rEl = document.getElementById("stat-registrations");
    const eEl = document.getElementById("stat-events");
    const pEl = document.getElementById("stat-pending");

    if (sEl) sEl.innerText = speakers.length;
    if (rEl) rEl.innerText = registrations.length;
    if (eEl) eEl.innerText = scheduleEvents.length;

    if (pEl) {
        const pendingCount = registrations.filter(r => r.status === "Pending").length;
        pEl.innerText = pendingCount;
    }
}

// ==========================================
// 5. RENDERING PIPELINES
// ==========================================

// --- Keynote Speakers Render ---
function renderSpeakers() {
    const grid = document.getElementById("speakersAdminGrid");
    if (!grid) return;
    grid.innerHTML = "";

    if (speakers.length === 0) {
        grid.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding:3rem; color:var(--text-secondary)">No keynote speakers found. Click "Add New Speaker" to create one.</div>`;
        return;
    }

    speakers.forEach((sp, idx) => {
        const photoHtml = sp.photo
            ? `<img src="${sp.photo}" alt="${sp.name}" class="speaker-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'">
               <div class="speaker-img-fallback" style="display:none;"><i class="fas fa-user"></i></div>`
            : `<div class="speaker-img-fallback" style="display:flex;"><i class="fas fa-user"></i></div>`;

        const card = document.createElement("div");
        card.className = "speaker-card-admin";
        card.innerHTML = `
            <div class="speaker-photo-wrapper">
                ${photoHtml}
                <div class="speaker-photo-overlay"></div>
            </div>
            <div class="speaker-info-body">
                <h4>${sp.name}</h4>
                <span class="speaker-title-tag">${sp.title}</span>
                <p class="speaker-bio-text">${sp.bio}</p>
                <div class="speaker-actions-row">
                    <button class="card-btn-edit" onclick="openSpeakerModal(${idx})">
                        <i class="fas fa-user-pen"></i> Edit
                    </button>
                    <button class="card-btn-delete" onclick="deleteSpeaker(${idx})">
                        <i class="fas fa-trash-can"></i> Delete
                    </button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// --- Committee Members Table Render ---
function renderCommittee() {
    const tbody = document.getElementById("committeeTableBody");
    if (!tbody) return;
    tbody.innerHTML = "";

    if (committee.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; color:var(--text-secondary)">No committee members found. Click "Add Member" to create one.</td></tr>`;
        return;
    }

    committee.forEach((member, idx) => {
        let badgeClass = "info";
        if (member.category === "Chief Patron") badgeClass = "success";
        else if (member.category === "Organizing Committee") badgeClass = "warning";
        else if (member.category === "Advisory Board") badgeClass = "danger";

        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td><span class="committee-member-name">${member.name}</span></td>
            <td>${member.role}</td>
            <td>${member.org}</td>
            <td><span class="badge ${badgeClass}">${member.category}</span></td>
            <td>
                <div class="table-action-btns">
                    <button class="table-action-btn edit" onclick="openCommitteeModal(${idx})" title="Edit Member">
                        <i class="fas fa-user-pen"></i>
                    </button>
                    <button class="table-action-btn delete" onclick="deleteCommittee(${idx})" title="Delete Member">
                        <i class="fas fa-trash-can"></i>
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// --- Schedule/Timeline Render ---
function renderSchedule() {
    const list = document.getElementById("timelineAdminList");
    if (!list) return;
    list.innerHTML = "";

    if (scheduleEvents.length === 0) {
        list.innerHTML = `<div style="text-align:center; padding:2rem; color:var(--text-secondary)">No schedule events found. Click "Add Event" to create one.</div>`;
        return;
    }

    scheduleEvents.forEach((ev, idx) => {
        const item = document.createElement("div");
        item.className = "timeline-item-admin";
        item.innerHTML = `
            <div class="timeline-details">
                <span class="timeline-time-badge"><i class="fas fa-clock"></i> ${ev.date}</span>
                <span class="timeline-title">${ev.name}</span>
            </div>
            <div class="table-action-btns">
                <button class="table-action-btn edit" onclick="openEventModal(${idx})" title="Edit Event">
                    <i class="fas fa-pen-to-square"></i>
                </button>
                <button class="table-action-btn delete" onclick="deleteEvent(${idx})" title="Delete Event">
                    <i class="fas fa-trash-can"></i>
                </button>
            </div>
        `;
        list.appendChild(item);
    });
}

// --- Registrations Data Render ---
function renderRegistrations() {
    const tbody = document.getElementById("registrationsTableBody");
    if (!tbody) return;
    tbody.innerHTML = "";

    if (registrations.length === 0) {
        tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; color:var(--text-secondary)">No registrations recorded.</td></tr>`;
        return;
    }

    registrations.forEach((reg, idx) => {
        let badgeClass = "warning";
        if (reg.status === "Approved") badgeClass = "success";
        else if (reg.status === "Rejected") badgeClass = "danger";

        let actionsHtml = `<span style="color:var(--text-muted); font-size:0.8rem">No Actions</span>`;
        if (reg.status === "Pending") {
            actionsHtml = `
                <div class="table-action-btns">
                    <button class="table-action-btn approve" onclick="approveRegistration(${idx})" title="Approve Registration">
                        <i class="fas fa-check"></i>
                    </button>
                    <button class="table-action-btn reject" onclick="rejectRegistration(${idx})" title="Reject Registration">
                        <i class="fas fa-xmark"></i>
                    </button>
                </div>
            `;
        }

        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td><strong style="color:#fff">${reg.name}</strong></td>
            <td>${reg.email}</td>
            <td>${reg.country}</td>
            <td>${reg.category}</td>
            <td>${reg.amount}</td>
            <td><code style="color:var(--gold); font-size:0.8rem">${reg.txnId}</code></td>
            <td><span class="badge ${badgeClass}">${reg.status}</span></td>
            <td>${actionsHtml}</td>
        `;
        tbody.appendChild(tr);
    });
}

// --- Announcements Notice Render ---
function renderAnnouncements() {
    const feed = document.getElementById("announcementFeedList");
    const miniList = document.getElementById("announcements-mini-list");

    if (feed) feed.innerHTML = "";
    if (miniList) miniList.innerHTML = "";

    if (announcements.length === 0) {
        if (feed) feed.innerHTML = `<div style="text-align:center; padding:3rem; color:var(--text-muted)">No announcements published.</div>`;
        if (miniList) miniList.innerHTML = `<div style="text-align:center; padding:1rem; color:var(--text-muted); font-size:0.8rem">No alerts.</div>`;
        return;
    }

    announcements.forEach((ann, idx) => {
        const publishDate = new Date(ann.time);
        const timeStr = publishDate.toLocaleString();

        if (feed) {
            const item = document.createElement("div");
            item.className = "announcement-item";
            item.innerHTML = `
                <div class="announcement-meta">
                    <span class="announcement-author"><i class="fas fa-user-tie"></i> ${ann.author}</span>
                    <span class="announcement-date"><i class="fas fa-clock"></i> ${timeStr}</span>
                </div>
                <p class="announcement-msg">${ann.text}</p>
                <button class="announcement-delete-btn" onclick="deleteAnnouncement(${idx})" title="Remove Alert">
                    <i class="fas fa-trash-can"></i>
                </button>
            `;
            feed.appendChild(item);
        }

        if (miniList && idx < 3) {
            const miniItem = document.createElement("div");
            miniItem.className = "mini-announcement-item";
            miniItem.innerHTML = `
                <span class="mini-announcement-time"><i class="fas fa-clock"></i> ${timeStr}</span>
                <p class="mini-announcement-text">${ann.text}</p>
            `;
            miniList.appendChild(miniItem);
        }
    });
}

// --- Activity Logs System Render ---
function renderActivityLogs() {
    const tbody = document.getElementById("logsTableBody");
    const miniList = document.getElementById("logs-mini-list");

    if (tbody) tbody.innerHTML = "";
    if (miniList) miniList.innerHTML = "";

    if (activityLogs.length === 0) {
        if (tbody) tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; color:var(--text-secondary)">No audit logs recorded in this session.</td></tr>`;
        if (miniList) miniList.innerHTML = `<div style="text-align:center; padding:1rem; color:var(--text-muted); font-size:0.8rem">No recent logs.</div>`;
        return;
    }

    activityLogs.forEach((log, idx) => {
        const timeStr = new Date(log.time).toLocaleTimeString();

        if (tbody) {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td><span class="log-timestamp">${new Date(log.time).toLocaleString()}</span></td>
                <td><strong>${log.category}</strong></td>
                <td>${log.description}</td>
                <td><span class="badge ${log.status}">${log.status}</span></td>
            `;
            tbody.appendChild(tr);
        }

        if (miniList && idx < 5) {
            const miniItem = document.createElement("div");
            miniItem.className = "mini-log-item";
            miniItem.innerHTML = `
                <div class="mini-log-content">
                    <span class="mini-log-desc">${log.description}</span>
                    <span class="mini-log-time"><i class="fas fa-clock"></i> ${timeStr}</span>
                </div>
                <span class="mini-log-badge ${log.status}">${log.status}</span>
            `;
            miniList.appendChild(miniItem);
        }
    });
}

// ==========================================
// 6. ACTION & CRUD OPERATIONS (Global Scope)
// ==========================================

// --- Activity Logger Helper ---
function logActivity(description, category, status = "success") {
    activityLogs.unshift({
        time: new Date().toISOString(),
        category: category,
        description: description,
        status: status
    });
    renderActivityLogs();
}

// --- Modal Display Utilities (Direct styling toggles as requested) ---
window.openModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "flex";
    }
};

window.closeModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "none";
    }
};

// --- Speakers CRUD ---
window.openSpeakerModal = function(index = -1) {
    const form = document.getElementById("speakerForm");
    const titleEl = document.getElementById("speakerModalTitle");
    if (!form) return;

    form.reset();

    if (index >= 0) {
        titleEl.innerText = "Edit Speaker Profile";
        document.getElementById("speakerEditIndex").value = index;
        document.getElementById("speakerName").value = speakers[index].name;
        document.getElementById("speakerTitle").value = speakers[index].title;
        document.getElementById("speakerPhoto").value = speakers[index].photo || "";
        document.getElementById("speakerBio").value = speakers[index].bio;
    } else {
        titleEl.innerText = "Add New Keynote Speaker";
        document.getElementById("speakerEditIndex").value = "";
    }

    openModal("speakerModal");
};

function handleSpeakerSubmit(e) {
    e.preventDefault();
    const indexVal = document.getElementById("speakerEditIndex").value;
    const name = document.getElementById("speakerName").value.trim();
    const title = document.getElementById("speakerTitle").value.trim();
    const photo = document.getElementById("speakerPhoto").value.trim();
    const bio = document.getElementById("speakerBio").value.trim();

    if (indexVal !== "") {
        const idx = parseInt(indexVal);
        speakers[idx] = { name, title, photo, bio };
        logActivity(`Speaker profile updated: ${name}`, "Speakers", "success");
    } else {
        speakers.push({ name, title, photo, bio });
        logActivity(`New speaker profile created: ${name}`, "Speakers", "success");
    }

    closeModal("speakerModal");
    renderSpeakers();
    updateStats();
}

window.deleteSpeaker = function(idx) {
    if (confirm(`Are you sure you want to delete keynote speaker "${speakers[idx].name}"?`)) {
        const name = speakers[idx].name;
        speakers.splice(idx, 1);
        logActivity(`Speaker profile deleted: ${name}`, "Speakers", "danger");
        renderSpeakers();
        updateStats();
    }
};

// --- Committee CRUD ---
window.openCommitteeModal = function(index = -1) {
    const form = document.getElementById("committeeForm");
    const titleEl = document.getElementById("committeeModalTitle");
    if (!form) return;

    form.reset();

    if (index >= 0) {
        titleEl.innerText = "Edit Committee Member";
        document.getElementById("committeeEditIndex").value = index;
        document.getElementById("committeeName").value = committee[index].name;
        document.getElementById("committeeRole").value = committee[index].role;
        document.getElementById("committeeOrg").value = committee[index].org;
        document.getElementById("committeeCategory").value = committee[index].category;
    } else {
        titleEl.innerText = "Add Committee Member";
        document.getElementById("committeeEditIndex").value = "";
    }

    openModal("committeeModal");
};

function handleCommitteeSubmit(e) {
    e.preventDefault();
    const indexVal = document.getElementById("committeeEditIndex").value;
    const name = document.getElementById("committeeName").value.trim();
    const role = document.getElementById("committeeRole").value.trim();
    const org = document.getElementById("committeeOrg").value.trim();
    const category = document.getElementById("committeeCategory").value;

    if (indexVal !== "") {
        const idx = parseInt(indexVal);
        committee[idx] = { name, role, org, category };
        logActivity(`Committee member updated: ${name} (${category})`, "Committee", "success");
    } else {
        committee.push({ name, role, org, category });
        logActivity(`New committee member added: ${name} (${category})`, "Committee", "success");
    }

    closeModal("committeeModal");
    renderCommittee();
}

window.deleteCommittee = function(idx) {
    if (confirm(`Are you sure you want to delete committee member "${committee[idx].name}"?`)) {
        const name = committee[idx].name;
        committee.splice(idx, 1);
        logActivity(`Committee member removed: ${name}`, "Committee", "danger");
        renderCommittee();
    }
};

// --- Timeline Schedule CRUD ---
window.openEventModal = function(index = -1) {
    const form = document.getElementById("eventForm");
    const titleEl = document.getElementById("eventModalTitle");
    if (!form) return;

    form.reset();

    if (index >= 0) {
        titleEl.innerText = "Edit Schedule Event";
        document.getElementById("eventEditIndex").value = index;
        document.getElementById("eventName").value = scheduleEvents[index].name;
        document.getElementById("eventDate").value = scheduleEvents[index].date;
    } else {
        titleEl.innerText = "Add Timeline Event";
        document.getElementById("eventEditIndex").value = "";
    }

    openModal("eventModal");
};

function handleEventSubmit(e) {
    e.preventDefault();
    const indexVal = document.getElementById("eventEditIndex").value;
    const name = document.getElementById("eventName").value.trim();
    const date = document.getElementById("eventDate").value.trim();

    if (indexVal !== "") {
        const idx = parseInt(indexVal);
        scheduleEvents[idx] = { name, date };
        logActivity(`Schedule event updated: ${name}`, "Schedule", "success");
    } else {
        scheduleEvents.push({ name, date });
        logActivity(`New schedule event added: ${name}`, "Schedule", "success");
    }

    closeModal("eventModal");
    renderSchedule();
    updateStats();
}

window.deleteEvent = function(idx) {
    if (confirm(`Are you sure you want to delete event "${scheduleEvents[idx].name}"?`)) {
        const name = scheduleEvents[idx].name;
        scheduleEvents.splice(idx, 1);
        logActivity(`Schedule event deleted: ${name}`, "Schedule", "danger");
        renderSchedule();
        updateStats();
    }
};

// --- Registrations Approvals ---
window.approveRegistration = function(idx) {
    const name = registrations[idx].name;
    registrations[idx].status = "Approved";
    logActivity(`Registration approved for ${name}.`, "Registrations", "success");
    renderRegistrations();
    updateStats();
};

window.rejectRegistration = function(idx) {
    if (confirm(`Are you sure you want to REJECT the registration of "${registrations[idx].name}"?`)) {
        const name = registrations[idx].name;
        registrations[idx].status = "Rejected";
        logActivity(`Registration rejected for ${name}.`, "Registrations", "danger");
        renderRegistrations();
        updateStats();
    }
};

// --- Announcements CRUD ---
function handleAnnouncementSubmit(e) {
    e.preventDefault();
    const text = document.getElementById("announcementText").value.trim();

    if (text === "") return;

    announcements.unshift({
        text: text,
        time: new Date().toISOString(),
        author: "Admin Coordinator"
    });

    logActivity("New announcement published to public board.", "Announcements", "info");
    document.getElementById("announcementText").value = "";
    renderAnnouncements();
}

window.deleteAnnouncement = function(idx) {
    if (confirm("Are you sure you want to delete this announcement? It will be removed from the feed.")) {
        announcements.splice(idx, 1);
        logActivity("Announcement removed from the public board.", "Announcements", "danger");
        renderAnnouncements();
    }
};