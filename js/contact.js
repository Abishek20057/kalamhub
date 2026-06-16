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

        const submitBtn = form.querySelector("button");

        submitBtn.innerText = "Sending...";
        submitBtn.disabled = true;

        const data = {
            name: form.querySelector('input[placeholder="Full Name"]').value,
            email: form.querySelector('input[placeholder="Email Address"]').value,
            phone: form.querySelector('input[placeholder="Phone Number"]').value,
            project: form.querySelector('input[placeholder="Project Title"]').value,
            message: form.querySelector('textarea').value
        };

        try {

            const response = await fetch(WEB_APP_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "text/plain"
                },
                body: JSON.stringify(data)
            });

            const result = await response.text();

            console.log(result);

            alert("Project Request Submitted Successfully!");

            form.reset();

        } catch (error) {

            console.error(error);

            alert("Failed to send request. Check Apps Script.");

        }

        submitBtn.innerText = "Submit Request";
        submitBtn.disabled = false;

    });

});