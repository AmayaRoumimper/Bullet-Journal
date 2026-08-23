document.getElementById("loginBtn").addEventListener("click", () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
            document.getElementById("login").style.display = "none";
            document.getElementById("content").style.display = "block";
        })
        .catch(() => {
            document.getElementById("loginError").style.display = "block";
        });
});

document.getElementById("logoutBtn").addEventListener("click", () => {
    firebase.auth().signOut().then(() => {
        // Terug naar login-scherm
        document.getElementById("login").style.display = "block";
        document.getElementById("content").style.display = "none";
    });
});

// Automatisch ingelogd blijven
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        document.getElementById("login").style.display = "none";
        document.getElementById("content").style.display = "block";
    } else {
        document.getElementById("login").style.display = "block";
        document.getElementById("content").style.display = "none";
    }
});

