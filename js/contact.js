// =========================
// KALAM HUB CONTACT FORM
// =========================

const WEB_APP_URL =
"https://script.google.com/macros/s/AKfycbyCkmRwo8kA8TyALX50UKMnOCorLwObJ27a5XCC0-EAEoDNEv1sW0wZwKwE70UNzBOZOA/exec";
document.addEventListener("DOMContentLoaded", () => {

    const form = document.querySelector(".contact-form");

    if (!form) return;

    form.addEventListener("submit", async (e) => {

        e.preventDefault();

        const name =
            form.querySelector('input[placeholder="Full Name"]').value;

        const email =
            form.querySelector('input[placeholder="Email Address"]').value;

        const phone =
            form.querySelector('input[placeholder="Phone Number"]').value;

        const project =
            form.querySelector('input[placeholder="Project Title"]').value;

        const description =
            form.querySelector('textarea').value;

        // Save to Google Sheets
        try {

            await fetch(WEB_APP_URL, {
    method: "POST",
    headers: {
        "Content-Type": "text/plain"
    },
    body: JSON.stringify({
        name,
        email,
        phone,
        project,
        message: description
    })
});


        } catch (error) {

            console.error("Google Sheet Error:", error);

        }



    });

});