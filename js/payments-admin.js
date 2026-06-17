// =========================
// KALAM HUB PAYMENTS ADMIN
// =========================

const WEB_APP_URL =
"https://script.google.com/macros/s/AKfycbyCkmRwo8kA8TyALX50UKMnOCorLwObJ27a5XCC0-EAEoDNEv1sW0wZwKwE70UNzBOZOA/exec";

document.addEventListener(
    "DOMContentLoaded",
    loadPayments
);

// =========================
// LOAD PAYMENTS
// =========================

async function loadPayments() {

    const table =
    document.getElementById(
        "paymentsTable"
    );

    if (!table) return;

    try {

        const response =
        await fetch(
            WEB_APP_URL +
            "?action=getPayments"
        );

        const payments =
        await response.json();

        table.innerHTML = "";

        let totalRevenue = 0;

        if (!payments.length) {

            table.innerHTML = `

            <tr>
                <td colspan="5">
                    No Payments Found
                </td>
            </tr>

            `;

            return;
        }

        payments.reverse().forEach(payment => {

            totalRevenue +=
            Number(payment[2]) || 0;

            table.innerHTML += `

            <tr>

                <td>
                    ${payment[0]}
                </td>

                <td>
                    ${payment[1]}
                </td>

                <td>
                    ₹${payment[2]}
                </td>

                <td>
                    ${payment[3]}
                </td>

                <td>

                    <button
                    class="action-btn edit-btn"
                    onclick="editPayment(
                    '${payment[0]}'
                    )">

                    Update

                    </button>

                    <button
                    class="action-btn delete-btn"
                    onclick="deletePayment(
                    '${payment[0]}'
                    )">

                    Delete

                    </button>

                </td>

            </tr>

            `;

        });

        document.getElementById(
            "totalRevenue"
        ).innerText =
        "₹" +
        totalRevenue.toLocaleString();

        document.getElementById(
            "totalPayments"
        ).innerText =
        payments.length;

    }

    catch(error){

        console.error(error);

        table.innerHTML = `

        <tr>
            <td colspan="5">
                Failed To Load Payments
            </td>
        </tr>

        `;

    }

}

// =========================
// ADD PAYMENT
// =========================

async function addPayment() {

    const customerName =
    document.getElementById(
        "customerName"
    ).value.trim();

    const projectName =
    document.getElementById(
        "projectName"
    ).value.trim();

    const amount =
    document.getElementById(
        "amount"
    ).value.trim();

    const status =
    document.getElementById(
        "status"
    ).value;

    if (
        !customerName ||
        !projectName ||
        !amount
    ) {

        alert(
        "Please fill all fields"
        );

        return;

    }

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

                    action:"addPayment",

                    customerName,
                    projectName,
                    amount,
                    status

                })
            }
        );

        const result =
        await response.json();

        if(result.success){

            alert(
            "Payment Added Successfully"
            );

            document
            .getElementById(
                "customerName"
            ).value = "";

            document
            .getElementById(
                "projectName"
            ).value = "";

            document
            .getElementById(
                "amount"
            ).value = "";

            document
            .getElementById(
                "status"
            ).selectedIndex = 0;

            loadPayments();

        }
        else{

            alert(
            "Failed To Add Payment"
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
// EDIT PAYMENT STATUS
// =========================

async function editPayment(
    paymentId
){

    const status =
    prompt(
        "Enter Status (Paid/Pending)"
    );

    if(!status) return;

    try{

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

                    action:"editPayment",

                    paymentId,

                    status

                })
            }
        );

        const result =
        await response.json();

        if(result.success){

            alert(
            "Payment Updated"
            );

            loadPayments();

        }

    }

    catch(error){

        console.error(error);

    }

}

// =========================
// DELETE PAYMENT
// =========================

async function deletePayment(
    paymentId
){

    const confirmDelete =
    confirm(
    "Delete this payment?"
    );

    if(!confirmDelete) return;

    try{

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
                    "deletePayment",

                    paymentId

                })
            }
        );

        const result =
        await response.json();

        if(result.success){

            alert(
            "Payment Deleted"
            );

            loadPayments();

        }

    }

    catch(error){

        console.error(error);

        alert(
        "Delete Failed"
        );

    }

}

// =========================
// AUTO REFRESH
// =========================

setInterval(
    loadPayments,
    30000
);

// =========================
// CONSOLE
// =========================

console.log(`

=================================
   KALAM HUB PAYMENT MANAGER
=================================

Payments Loaded Successfully

`);