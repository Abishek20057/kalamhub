// =========================
// KALAM HUB GALLERY
// =========================

const WEB_APP_URL =
"https://script.google.com/macros/s/AKfycbyCkmRwo8kA8TyALX50UKMnOCorLwObJ27a5XCC0-EAEoDNEv1sW0wZwKwE70UNzBOZOA/exec";

document.addEventListener("DOMContentLoaded", loadActivities);

async function loadActivities() {

    const galleryContainer =
    document.getElementById("galleryContainer");

    if (!galleryContainer) return;

    try {

        const response =
        await fetch(
            WEB_APP_URL +
            "?action=getActivities"
        );

        const activities =
        await response.json();

        galleryContainer.innerHTML = "";

        if (!activities.length) {

            galleryContainer.innerHTML = `

            <div class="empty-gallery">

                <h3>No Activities Found</h3>

                <p>
                Activities uploaded from admin
                will appear here.
                </p>

            </div>

            `;

            return;
        }

        activities.reverse().forEach(activity => {

            galleryContainer.innerHTML += `

            <div class="gallery-card">

                <img
                src="${activity[4]}"
                alt="${activity[2]}">

                <div class="gallery-content">

                    <h3>${activity[2]}</h3>

                    <p>${activity[3]}</p>

                </div>

            </div>

            `;

        });

    }

    catch (error) {

        console.error(error);

        galleryContainer.innerHTML = `

        <div class="empty-gallery">

            <h3>Failed To Load Activities</h3>

        </div>

        `;

    }

}
<script src="js/gallery.js"></script>