// =========================
// KALAM HUB ACTIVITIES
// =========================

const WEB_APP_URL =
"https://script.google.com/macros/s/AKfycbyCkmRwo8kA8TyALX50UKMnOCorLwObJ27a5XCC0-EAEoDNEv1sW0wZwKwE70UNzBOZOA/exec";

document.addEventListener(
    "DOMContentLoaded",
    loadActivities
);

async function loadActivities() {

    const container =
    document.getElementById(
        "activitiesContainer"
    );

    if (!container) return;

    try {

        const response =
        await fetch(
            WEB_APP_URL +
            "?action=getActivities"
        );

        const activities =
        await response.json();

        container.innerHTML = "";

        if (!activities.length) {

            container.innerHTML = `

            <div class="service-card">

                <h3>No Activities Available</h3>

                <p>
                Activities uploaded from
                admin panel will appear here.
                </p>

            </div>

            `;

            return;
        }

        // Latest activity first

        activities.reverse();

        activities.forEach(activity => {

            const date =
            new Date(activity[1]);

            const formattedDate =
            date.toLocaleDateString(
                "en-IN",
                {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                }
            );

            container.innerHTML += `

            <div class="project-card">

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

        console.error(error);

        container.innerHTML = `

        <div class="service-card">

            <h3>Failed To Load Activities</h3>

            <p>
            Check API deployment
            and internet connection.
            </p>

        </div>

        `;

    }

}