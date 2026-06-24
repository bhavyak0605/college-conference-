import { auth } from "./firebase.js";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Protect dashboard
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "login.html";
  }
});

// Login
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      window.location.href = "admin-dashboard.html";
    } catch (error) {
      alert(error.message);
    }
  });
}

// Logout
const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    await signOut(auth);
    window.location.href = "login.html";
  });
}
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
// 2. HELPER FUNCTIONS & DOM INITIALIZATION
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        initLoginPage(loginForm);
    } else {
        initDashboardPage();
    }
});

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
            // Mock authentication check supporting both vista & placeholder emails with admin123
            if ((email === "admin@vista2027.edu.in" || email === "admin@bvvistacon.in") && password === "admin123") {
                window.location.href = "admin-dashboard.html";
            } else {
                if (loginBtn) {
                    loginBtn.classList.remove("loading");
                    loginBtn.disabled = false;
                }
                if (errorBox && errorText) {
                    errorText.innerText = "Invalid email or password. Please try again.";
                    errorBox.classList.add("show");
                }
            }
        }, 1200); // Simulated secure authentication delay
    });
}

function initDashboardPage() {
    // Initial UI Render
    updateStats();
    renderSpeakers();
    renderCommittee();
    renderSchedule();
    renderRegistrations();
    renderAnnouncements();
    renderActivityLogs();

    // Attach SPA Navigation Events
    const navItems = document.querySelectorAll(".nav-item");
    navItems.forEach(item => {
        item.addEventListener("click", () => {
            const tabName = item.getAttribute("data-tab");
            switchTab(tabName);

            // On Mobile view, close the sidebar drawer after selecting a tab
            if (window.innerWidth <= 768) {
                document.getElementById("adminSidebar").classList.remove("open");
            }
        });
    });

    // Mobile Sidebar Drawer Toggle
    const menuToggleBtn = document.getElementById("menuToggleBtn");
    const adminSidebar = document.getElementById("adminSidebar");
    if (menuToggleBtn && adminSidebar) {
        menuToggleBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            adminSidebar.classList.toggle("open");
        });
    }

    // Close mobile sidebar if clicked outside of it
    document.addEventListener("click", (e) => {
        const adminSidebar = document.getElementById("adminSidebar");
        const menuToggleBtn = document.getElementById("menuToggleBtn");
        if (window.innerWidth <= 768 && adminSidebar && adminSidebar.classList.contains("open")) {
            if (!adminSidebar.contains(e.target) && e.target !== menuToggleBtn) {
                adminSidebar.classList.remove("open");
            }
        }
    });

    // Logout Action Trigger
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            logActivity("Logout trigger initialized.", "System", "warning");
            alert("You have successfully logged out of the session (Mock Portal). Click OK to refresh the view.");
            window.location.reload();
        });
    }

    // Modal Add Button Listeners
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

    // Form Submissions
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

    // Clear Logs Button
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
// 3. SPA TAB NAVIGATION
// ==========================================

function switchTab(tabName) {
    // Remove active class from all nav list items
    const navItems = document.querySelectorAll(".nav-item");
    navItems.forEach(item => {
        if (item.getAttribute("data-tab") === tabName) {
            item.classList.add("active");
        } else {
            item.classList.remove("active");
        }
    });

    // Hide all panels and show active panel
    const panels = document.querySelectorAll(".tab-panel");
    panels.forEach(panel => {
        if (panel.id === `${tabName}-panel`) {
            panel.classList.add("active");
        } else {
            panel.classList.remove("active");
        }
    });

    // Scroll main container to top
    window.scrollTo({ top: 0, behavior: "smooth" });
}

// ==========================================
// 4. STATS METRICS UPDATE
// ==========================================

function updateStats() {
    document.getElementById("stat-speakers").innerText = speakers.length;
    document.getElementById("stat-registrations").innerText = registrations.length;
    document.getElementById("stat-events").innerText = scheduleEvents.length;

    // Calculate pending registrations
    const pendingCount = registrations.filter(r => r.status === "Pending").length;
    document.getElementById("stat-pending").innerText = pendingCount;
}

// ==========================================
// 5. RENDERING PIPELINES (DASHBOARD VIEWS)
// ==========================================

// --- Speakers Rendering ---
function renderSpeakers() {
    const grid = document.getElementById("speakersAdminGrid");
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

// --- Committee Rendering ---
function renderCommittee() {
    const tbody = document.getElementById("committeeTableBody");
    tbody.innerHTML = "";

    if (committee.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; color:var(--text-secondary)">No committee members found. Click "Add Member" to create one.</td></tr>`;
        return;
    }

    committee.forEach((member, idx) => {
        // Build distinct badges for committee category
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

// --- Schedule Timeline Rendering ---
function renderSchedule() {
    const list = document.getElementById("timelineAdminList");
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

// --- Registrations Table Rendering ---
function renderRegistrations() {
    const tbody = document.getElementById("registrationsTableBody");
    tbody.innerHTML = "";

    if (registrations.length === 0) {
        tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; color:var(--text-secondary)">No registrations recorded.</td></tr>`;
        return;
    }

    registrations.forEach((reg, idx) => {
        let badgeClass = "warning";
        if (reg.status === "Approved") badgeClass = "success";
        else if (reg.status === "Rejected") badgeClass = "danger";

        // Show action items only if pending
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

// --- Announcements Feed Rendering ---
function renderAnnouncements() {
    const feed = document.getElementById("announcementFeedList");
    const miniList = document.getElementById("announcements-mini-list");

    feed.innerHTML = "";
    miniList.innerHTML = "";

    if (announcements.length === 0) {
        feed.innerHTML = `<div style="text-align:center; padding:3rem; color:var(--text-muted)">No announcements published.</div>`;
        miniList.innerHTML = `<div style="text-align:center; padding:1rem; color:var(--text-muted); font-size:0.8rem">No alerts.</div>`;
        return;
    }

    announcements.forEach((ann, idx) => {
        const publishDate = new Date(ann.time);
        const timeStr = publishDate.toLocaleString();

        // 1. Build main announcements panel feed item
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

        // 2. Build mini-list widget items (Overview page limit 3)
        if (idx < 3) {
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

// --- Activity Audit Logs Rendering ---
function renderActivityLogs() {
    const tbody = document.getElementById("logsTableBody");
    const miniList = document.getElementById("logs-mini-list");

    tbody.innerHTML = "";
    miniList.innerHTML = "";

    if (activityLogs.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; color:var(--text-secondary)">No audit logs recorded in this session.</td></tr>`;
        miniList.innerHTML = `<div style="text-align:center; padding:1rem; color:var(--text-muted); font-size:0.8rem">No recent logs.</div>`;
        return;
    }

    activityLogs.forEach((log, idx) => {
        const timeStr = new Date(log.time).toLocaleTimeString();

        // 1. Full Logs Table Rows
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td><span class="log-timestamp">${new Date(log.time).toLocaleString()}</span></td>
            <td><strong>${log.category}</strong></td>
            <td>${log.description}</td>
            <td><span class="badge ${log.status}">${log.status}</span></td>
        `;
        tbody.appendChild(tr);

        // 2. Mini Log Widget (Limit 5)
        if (idx < 5) {
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
// 6. ACTION & CRUD OPERATIONS HANDLERS
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

// --- Modal Display Utilities ---
function openModal(modalId) {
    document.getElementById(modalId).classList.add("open");
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove("open");
}

// --- Keynote Speakers CRUD ---
function openSpeakerModal(index = -1) {
    const modal = document.getElementById("speakerModal");
    const form = document.getElementById("speakerForm");
    const titleEl = document.getElementById("speakerModalTitle");

    form.reset();

    if (index >= 0) {
        // Edit Mode
        titleEl.innerText = "Edit Speaker Profile";
        document.getElementById("speakerEditIndex").value = index;
        document.getElementById("speakerName").value = speakers[index].name;
        document.getElementById("speakerTitle").value = speakers[index].title;
        document.getElementById("speakerPhoto").value = speakers[index].photo || "";
        document.getElementById("speakerBio").value = speakers[index].bio;
    } else {
        // Create Mode
        titleEl.innerText = "Add New Keynote Speaker";
        document.getElementById("speakerEditIndex").value = "";
    }

    openModal("speakerModal");
}

function handleSpeakerSubmit(e) {
    e.preventDefault();
    const indexVal = document.getElementById("speakerEditIndex").value;
    const name = document.getElementById("speakerName").value.trim();
    const title = document.getElementById("speakerTitle").value.trim();
    const photo = document.getElementById("speakerPhoto").value.trim();
    const bio = document.getElementById("speakerBio").value.trim();

    if (indexVal !== "") {
        // Update Action
        const idx = parseInt(indexVal);
        speakers[idx] = { name, title, photo, bio };
        logActivity(`Speaker profile updated: ${name}`, "Speakers", "success");
    } else {
        // Create Action
        speakers.push({ name, title, photo, bio });
        logActivity(`New speaker profile created: ${name}`, "Speakers", "success");
    }

    closeModal("speakerModal");
    renderSpeakers();
    updateStats();
}

function deleteSpeaker(idx) {
    if (confirm(`Are you sure you want to delete keynote speaker "${speakers[idx].name}"?`)) {
        const name = speakers[idx].name;
        speakers.splice(idx, 1);
        logActivity(`Speaker profile deleted: ${name}`, "Speakers", "danger");
        renderSpeakers();
        updateStats();
    }
}

// --- Committee Members CRUD ---
function openCommitteeModal(index = -1) {
    const modal = document.getElementById("committeeModal");
    const form = document.getElementById("committeeForm");
    const titleEl = document.getElementById("committeeModalTitle");

    form.reset();

    if (index >= 0) {
        // Edit Mode
        titleEl.innerText = "Edit Committee Member";
        document.getElementById("committeeEditIndex").value = index;
        document.getElementById("committeeName").value = committee[index].name;
        document.getElementById("committeeRole").value = committee[index].role;
        document.getElementById("committeeOrg").value = committee[index].org;
        document.getElementById("committeeCategory").value = committee[index].category;
    } else {
        // Create Mode
        titleEl.innerText = "Add Committee Member";
        document.getElementById("committeeEditIndex").value = "";
    }

    openModal("committeeModal");
}

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

function deleteCommittee(idx) {
    if (confirm(`Are you sure you want to delete committee member "${committee[idx].name}"?`)) {
        const name = committee[idx].name;
        committee.splice(idx, 1);
        logActivity(`Committee member removed: ${name}`, "Committee", "danger");
        renderCommittee();
    }
}

// --- Timeline Schedule CRUD ---
function openEventModal(index = -1) {
    const modal = document.getElementById("eventModal");
    const form = document.getElementById("eventForm");
    const titleEl = document.getElementById("eventModalTitle");

    form.reset();

    if (index >= 0) {
        // Edit Mode
        titleEl.innerText = "Edit Schedule Event";
        document.getElementById("eventEditIndex").value = index;
        document.getElementById("eventName").value = scheduleEvents[index].name;
        document.getElementById("eventDate").value = scheduleEvents[index].date;
    } else {
        // Create Mode
        titleEl.innerText = "Add Timeline Event";
        document.getElementById("eventEditIndex").value = "";
    }

    openModal("eventModal");
}

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

function deleteEvent(idx) {
    if (confirm(`Are you sure you want to delete event "${scheduleEvents[idx].name}"?`)) {
        const name = scheduleEvents[idx].name;
        scheduleEvents.splice(idx, 1);
        logActivity(`Schedule event deleted: ${name}`, "Schedule", "danger");
        renderSchedule();
        updateStats();
    }
}

// --- Registration Approval Operations ---
function approveRegistration(idx) {
    const name = registrations[idx].name;
    registrations[idx].status = "Approved";
    logActivity(`Registration approved for ${name}. Status badge updated.`, "Registrations", "success");
    renderRegistrations();
    updateStats();
}

function rejectRegistration(idx) {
    if (confirm(`Are you sure you want to REJECT the registration of "${registrations[idx].name}"?`)) {
        const name = registrations[idx].name;
        registrations[idx].status = "Rejected";
        logActivity(`Registration rejected for ${name}. Payment status marked void.`, "Registrations", "danger");
        renderRegistrations();
        updateStats();
    }
}

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

function deleteAnnouncement(idx) {
    if (confirm("Are you sure you want to delete this announcement? It will be removed from the feed.")) {
        announcements.splice(idx, 1);
        logActivity("Announcement removed from the public board.", "Announcements", "danger");
        renderAnnouncements();
    }
}
