// =========================
// KALAM HUB PROJECTS ADMIN
// =========================

const WEB_APP_URL =
"https://script.google.com/macros/s/AKfycbyCkmRwo8kA8TyALX50UKMnOCorLwObJ27a5XCC0-EAEoDNEv1sW0wZwKwE70UNzBOZOA/exec";

document.addEventListener(
    "DOMContentLoaded",
    loadProjects
);

// =========================
// LOAD PROJECTS
// =========================

async function loadProjects() {

    const table =
    document.getElementById(
        "projectsTable"
    );

    if (!table) return;

    try {

        const response =
        await fetch(
            WEB_APP_URL +
            "?action=getProjects"
        );

        const projects =
        await response.json();

        table.innerHTML = "";

        if (!projects.length) {

            table.innerHTML = `

            <tr>
                <td colspan="5">
                    No Projects Found
                </td>
            </tr>

            `;

            return;

        }

        projects.reverse().forEach(project => {

            table.innerHTML += `

            <tr>

                <td>${project[1]}</td>

                <td>${project[2]}</td>

                <td>₹${project[3]}</td>

                <td>${project[4]}</td>

                <td>

                    <button
                    class="action-btn edit-btn"
                    onclick="editProject(
                    '${project[0]}',
                    '${project[1]}'
                    )">

                    Edit

                    </button>

                    <button
                    class="action-btn delete-btn"
                    onclick="deleteProject(
                    '${project[0]}'
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
            <td colspan="5">
                Failed To Load Projects
            </td>
        </tr>

        `;

    }

}

// =========================
// ADD PROJECT
// =========================

async function addProject() {

    const projectName =
    document.getElementById(
        "projectName"
    ).value.trim();

    const customerName =
    document.getElementById(
        "customerName"
    ).value.trim();

    const projectCost =
    document.getElementById(
        "projectCost"
    ).value.trim();

    const projectStatus =
    document.getElementById(
        "projectStatus"
    ).value;

    if (
        !projectName ||
        !customerName ||
        !projectCost
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

                    action:"addProject",

                    projectName,
                    customerName,
                    projectCost,
                    projectStatus

                })
            }
        );

        const result =
        await response.json();

        if(result.success){

            alert(
            "Project Added Successfully"
            );

            document
            .getElementById(
                "projectName"
            ).value = "";

            document
            .getElementById(
                "customerName"
            ).value = "";

            document
            .getElementById(
                "projectCost"
            ).value = "";

            document
            .getElementById(
                "projectStatus"
            ).selectedIndex = 0;

            loadProjects();

        }
        else{

            alert(
            "Failed To Add Project"
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
// EDIT PROJECT
// =========================

async function editProject(
    projectId,
    currentName
){

    const newName =
    prompt(
        "Edit Project Name",
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

                    action:"editProject",

                    projectId,

                    projectName:
                    newName

                })
            }
        );

        const result =
        await response.json();

        if(result.success){

            alert(
            "Project Updated"
            );

            loadProjects();

        }

    }

    catch(error){

        console.error(error);

    }

}

// =========================
// DELETE PROJECT
// =========================

async function deleteProject(
    projectId
){

    const confirmDelete =
    confirm(
    "Delete this project?"
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
                    "deleteProject",

                    projectId

                })
            }
        );

        const result =
        await response.json();

        if(result.success){

            alert(
            "Project Deleted"
            );

            loadProjects();

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
    loadProjects,
    30000
);

// =========================
// CONSOLE BRANDING
// =========================

console.log(`

=================================
   KALAM HUB PROJECT MANAGER
=================================

Projects Loaded Successfully

`);