document.addEventListener("DOMContentLoaded", function () {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const videos = JSON.parse(localStorage.getItem("videos")) || [];

    const loginBtn = document.getElementById("login-btn");
    if (loginBtn) {
        loginBtn.addEventListener("click", function () {
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            if (username === "admin" && password === "admin2009") {
                localStorage.setItem("loggedInUser", "admin");
                window.location.href = "admin.html";
            } else {
                const user = users.find(u => u.username === username && u.password === password);
                if (user) {
                    localStorage.setItem("loggedInUser", user.username);
                    window.location.href = "user.html";
                } else {
                    alert("Invalid login");
                }
            }
        });
    }

    const logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            localStorage.removeItem("loggedInUser");
            window.location.href = "login.html";
        });
    }

    if (document.getElementById("add-video-btn")) {
        document.getElementById("add-video-btn").addEventListener("click", function () {
            document.getElementById("add-video-form").classList.remove("hidden");
        });

        document.getElementById("upload-video").addEventListener("click", function () {
            const videoFile = document.getElementById("video-upload").files[0];
            const description = document.getElementById("video-desc").value;

            if (videoFile) {
                const videoURL = URL.createObjectURL(videoFile);
                videos.push({ url: videoURL, desc: description });
                localStorage.setItem("videos", JSON.stringify(videos));
                location.reload();
            }
        });

        document.getElementById("cancel-add-video").addEventListener("click", function () {
            document.getElementById("add-video-form").classList.add("hidden");
        });
    }

    if (document.getElementById("delete-video-btn")) {
        document.getElementById("delete-video-btn").addEventListener("click", function () {
            const videoSelect = document.getElementById("video-select");
            videoSelect.innerHTML = "";
            videos.forEach((video, index) => {
                let option = document.createElement("option");
                option.value = index;
                option.textContent = video.desc || "Video " + (index + 1);
                videoSelect.appendChild(option);
            });
            document.getElementById("delete-video-form").classList.remove("hidden");
        });

        document.getElementById("confirm-delete-video").addEventListener("click", function () {
            const selectedIndex = document.getElementById("video-select").value;
            videos.splice(selectedIndex, 1);
            localStorage.setItem("videos", JSON.stringify(videos));
            location.reload();
        });

        document.getElementById("cancel-delete-video").addEventListener("click", function () {
            document.getElementById("delete-video-form").classList.add("hidden");
        });
    }

    if (document.getElementById("add-user-btn")) {
        document.getElementById("add-user-btn").addEventListener("click", function () {
            document.getElementById("add-user-form").classList.remove("hidden");
        });

        document.getElementById("create-user").addEventListener("click", function () {
            const email = document.getElementById("user-email").value;
            const username = document.getElementById("user-username").value;
            const password = document.getElementById("user-password").value;

            users.push({ email, username, password });
            localStorage.setItem("users", JSON.stringify(users));
            alert("User added successfully");
            document.getElementById("add-user-form").classList.add("hidden");
        });

        document.getElementById("cancel-add-user").addEventListener("click", function () {
            document.getElementById("add-user-form").classList.add("hidden");
        });
    }
});
