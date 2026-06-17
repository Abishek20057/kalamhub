// =========================
// KALAM HUB CONTACT FORM
// =========================

const WEB_APP_URL =
"https://script.google.com/macros/s/AKfycbyCkmRwo8kA8TyALX50UKMnOCorLwObJ27a5XCC0-EAEoDNEv1sW0wZwKwE70UNzBOZOA/exec";

document.addEventListener("DOMContentLoaded", function () {

    const form =
    document.getElementById("contactForm");

    if (!form) return;

    form.addEventListener("submit", async function (e) {

        e.preventDefault();

        const submitBtn =
        form.querySelector("button");

        submitBtn.disabled = true;
        submitBtn.innerText = "Sending...";

        const data = {

            name:
            document.getElementById("name").value,

            email:
            document.getElementById("email").value,

            phone:
            document.getElementById("phone").value,

            project:
            document.getElementById("project").value,

            message:
            document.getElementById("message").value

        };

        try {

            const response =
            await fetch(WEB_APP_URL, {

                method: "POST",

                headers: {
                    "Content-Type": "text/plain"
                },

                body: JSON.stringify(data)

            });

            const result =
            await response.json();

            console.log(result);

            if (result.success) {

                alert(
                    "Project Request Submitted Successfully!"
                );

                form.reset();

            } else {

                alert(
                    "Submission Failed : " +
                    result.error
                );

            }

        }

        catch (error) {

            console.error(error);

            alert(
                "Connection Failed"
            );

        }

        submitBtn.disabled = false;

        submitBtn.innerText =
        "Submit Request";

    });

});