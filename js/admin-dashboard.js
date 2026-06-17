// =========================
// KALAM HUB ADMIN DASHBOARD
// =========================

const WEB_APP_URL =
"https://script.google.com/macros/s/AKfycbyCkmRwo8kA8TyALX50UKMnOCorLwObJ27a5XCC0-EAEoDNEv1sW0wZwKwE70UNzBOZOA/exec";

document.addEventListener(
    "DOMContentLoaded",
    loadDashboard
);

async function loadDashboard() {

    await loadActivities();
    await loadInquiries();

}

// =========================
// LOAD ACTIVITIES
// =========================

async function loadActivities() {

    try {

        const response =
        await fetch(
            WEB_APP_URL +
            "?action=getActivities"
        );

        const activities =
        await response.json();

        const totalActivities =
        document.getElementById(
            "totalActivities"
        );

        if (totalActivities) {

            totalActivities.innerText =
            activities.length;

        }

        const recentContainer =
        document.getElementById(
            "recentActivities"
        );

        if (!recentContainer) return;

        recentContainer.innerHTML = "";

        activities
        .reverse()
        .slice(0, 6)
        .forEach(activity => {

            const date =
            new Date(activity[1]);

            const formattedDate =
            date.toLocaleDateString(
                "en-IN",
                {
                    day: "numeric",
                    month: "short",
                    year: "numeric"
                }
            );

            recentContainer.innerHTML += `

            <div class="activity-card">

                <img
                src="${activity[4]}"
                alt="${activity[2]}">

                <h3>
                    ${activity[2]}
                </h3>

                <p>
                    ${activity[3]}
                </p>

                <p style="
                    padding:0 20px 20px;
                    color:#2563eb;
                    font-weight:600;
                ">
                    📅 ${formattedDate}
                </p>

            </div>

            `;

        });

    }

    catch (error) {

        console.error(
            "Activity Load Error:",
            error
        );

    }

}

// =========================
// LOAD INQUIRIES
// =========================

async function loadInquiries() {

    try {

        const response =
        await fetch(
            WEB_APP_URL +
            "?action=getInquiries"
        );

        const inquiries =
        await response.json();

        const totalInquiries =
        document.getElementById(
            "totalInquiries"
        );

        if (totalInquiries) {

            totalInquiries.innerText =
            Math.max(
                inquiries.length - 1,
                0
            );

        }

    }

    catch (error) {

        console.error(
            "Inquiry Load Error:",
            error
        );

    }

}

// =========================
// AUTO REFRESH
// =========================

setInterval(() => {

    loadActivities();
    loadInquiries();

}, 30000);

// =========================
// CONSOLE BRANDING
// =========================

console.log(`

=================================
      KALAM HUB ADMIN
=================================

Dashboard Loaded Successfully

`);