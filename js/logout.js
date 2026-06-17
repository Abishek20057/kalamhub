// =========================
// KALAM HUB LOGOUT SYSTEM
// =========================

// Logout Function

function logout() {

    const confirmLogout =
    confirm(
        "Are you sure you want to logout?"
    );

    if (!confirmLogout) return;

    localStorage.removeItem(
        "isAdminLoggedIn"
    );

    window.location.href =
    "login.html";

}

// =========================
// PROTECT ADMIN PAGES
// =========================

(function () {

    const isLoggedIn =
    localStorage.getItem(
        "isAdminLoggedIn"
    );

    if (isLoggedIn !== "true") {

        window.location.href =
        "login.html";

    }

})();