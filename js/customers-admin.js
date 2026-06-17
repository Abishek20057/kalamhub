// =========================
// KALAM HUB CUSTOMERS ADMIN
// =========================

const WEB_APP_URL =
"https://script.google.com/macros/s/AKfycbyCkmRwo8kA8TyALX50UKMnOCorLwObJ27a5XCC0-EAEoDNEv1sW0wZwKwE70UNzBOZOA/exec";

document.addEventListener(
    "DOMContentLoaded",
    loadCustomers
);

// =========================
// LOAD CUSTOMERS
// =========================

async function loadCustomers() {

    const table =
    document.getElementById(
        "customersTable"
    );

    if (!table) return;

    try {

        const response =
        await fetch(
            WEB_APP_URL +
            "?action=getCustomers"
        );

        const customers =
        await response.json();

        table.innerHTML = "";

        if (!customers.length) {

            table.innerHTML = `

            <tr>
                <td colspan="4">
                    No Customers Found
                </td>
            </tr>

            `;

            return;

        }

        customers.reverse().forEach(customer => {

            table.innerHTML += `

            <tr>

                <td>
                    ${customer[1] || ""}
                </td>

                <td>
                    ${customer[2] || ""}
                </td>

                <td>
                    ${customer[3] || ""}
                </td>

                <td>

                    <button
                    class="action-btn edit-btn"
                    onclick="editCustomer(
                    '${customer[0]}',
                    '${customer[1]}'
                    )">

                    Edit

                    </button>

                    <button
                    class="action-btn delete-btn"
                    onclick="deleteCustomer(
                    '${customer[0]}'
                    )">

                    Delete

                    </button>

                </td>

            </tr>

            `;

        });

    }

    catch(error){

        console.error(error);

        table.innerHTML = `

        <tr>
            <td colspan="4">
                Failed To Load Customers
            </td>
        </tr>

        `;

    }

}

// =========================
// ADD CUSTOMER
// =========================

async function addCustomer() {

    const customerName =
    document.getElementById(
        "customerName"
    ).value.trim();

    const customerEmail =
    document.getElementById(
        "customerEmail"
    ).value.trim();

    const customerPhone =
    document.getElementById(
        "customerPhone"
    ).value.trim();

    if (
        !customerName ||
        !customerEmail ||
        !customerPhone
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

                    action:"addCustomer",

                    customerName,
                    customerEmail,
                    customerPhone

                })
            }
        );

        const result =
        await response.json();

        if(result.success){

            alert(
            "Customer Added Successfully"
            );

            document
            .getElementById(
                "customerName"
            ).value = "";

            document
            .getElementById(
                "customerEmail"
            ).value = "";

            document
            .getElementById(
                "customerPhone"
            ).value = "";

            loadCustomers();

        }
        else{

            alert(
            "Failed To Add Customer"
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
// EDIT CUSTOMER
// =========================

async function editCustomer(
    customerId,
    currentName
){

    const newName =
    prompt(
        "Edit Customer Name",
        currentName
    );

    if(!newName) return;

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

                    action:"editCustomer",

                    customerId,

                    customerName:
                    newName

                })
            }
        );

        const result =
        await response.json();

        if(result.success){

            alert(
            "Customer Updated"
            );

            loadCustomers();

        }

    }

    catch(error){

        console.error(error);

        alert(
        "Update Failed"
        );

    }

}

// =========================
// DELETE CUSTOMER
// =========================

async function deleteCustomer(
    customerId
){

    const confirmDelete =
    confirm(
    "Delete this customer?"
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
                    "deleteCustomer",

                    customerId

                })
            }
        );

        const result =
        await response.json();

        if(result.success){

            alert(
            "Customer Deleted"
            );

            loadCustomers();

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
    loadCustomers,
    30000
);

// =========================
// CONSOLE
// =========================

console.log(`

=================================
   KALAM HUB CUSTOMER MANAGER
=================================

Customers Loaded Successfully

`);