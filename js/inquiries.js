// =========================
// KALAM HUB INQUIRIES
// =========================

const WEB_APP_URL =
"https://script.google.com/macros/s/AKfycbyCkmRwo8kA8TyALX50UKMnOCorLwObJ27a5XCC0-EAEoDNEv1sW0wZwKwE70UNzBOZOA/exec";

document.addEventListener(
    "DOMContentLoaded",
    loadInquiries
);

// =========================
// LOAD INQUIRIES
// =========================

async function loadInquiries() {

    const table =
    document.getElementById(
        "inquiriesTable"
    );

    if (!table) return;

    try {

        const response =
        await fetch(
            WEB_APP_URL +
            "?action=getInquiries"
        );

        const inquiries =
        await response.json();

        table.innerHTML = "";

        if (
            !inquiries ||
            inquiries.length <= 1
        ) {

            table.innerHTML = `

            <tr>
                <td colspan="5">
                    No Inquiries Found
                </td>
            </tr>

            `;

            return;
        }

        inquiries
        .slice(1)
        .reverse()
        .forEach(inquiry => {

            table.innerHTML += `

            <tr>

                <td>
                    ${inquiry[2] || ""}
                </td>

                <td>
                    ${inquiry[3] || ""}
                </td>

                <td>
                    ${inquiry[4] || ""}
                </td>

                <td>
                    ${inquiry[5] || ""}
                </td>

                <td>
                    <button
                    class="action-btn status-btn"
                    onclick="markContacted(
                    '${inquiry[0]}'
                    )">

                    Contacted

                    </button>

                    <button
                    class="action-btn delete-btn"
                    onclick="deleteInquiry(
                    '${inquiry[0]}'
                    )">

                    Delete

                    </button>
                </td>

            </tr>

            `;

        });

    }

    catch (error) {

        console.error(error);

        table.innerHTML = `

        <tr>
            <td colspan="5">
                Failed To Load Inquiries
            </td>
        </tr>

        `;

    }

}

// =========================
// DELETE INQUIRY
// =========================

async function deleteInquiry(id) {

    if (
        !confirm(
        "Delete this inquiry?"
        )
    ) return;

    try {

        const response =
        await fetch(
            WEB_APP_URL,
            {
                method:"POST",
                headers:{
                    "Content-Type":
                    "text/plain"
                },
                body:JSON.stringify({
                    action:
                    "deleteInquiry",
                    inquiryId:id
                })
            }
        );

        const result =
        await response.json();

        if(result.success){

            alert(
            "Inquiry Deleted"
            );

            loadInquiries();

        }
        else{

            alert(
            "Delete Failed"
            );

        }

    }

    catch(error){

        console.error(error);

        alert(
        "Server Error"
        );

    }

}

// =========================
// MARK CONTACTED
// =========================

function markContacted(id){

    alert(
    "Customer Contacted ✔"
    );

    console.log(
    "Inquiry:",
    id,
    "marked contacted"
    );

}

// =========================
// AUTO REFRESH
// =========================

setInterval(
    loadInquiries,
    30000
);

// =========================
// CONSOLE
// =========================

console.log(`

=================================
     KALAM HUB INQUIRIES
=================================

Loaded Successfully

`);