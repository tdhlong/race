document.addEventListener("DOMContentLoaded", () => {
    // Các biến DOM
    const main = document.querySelector("main");
    const startLine = document.querySelector(".race-start-img");
    const finishLine = document.querySelector(".race-end-img");
    const modal = document.getElementById("players-modal");
    const participants = document.querySelector(".participants");
    const jsConfetti = new JSConfetti();
    let raceOver = false;

    // Hàm gán vị trí người chơi
    function positionPlayers() {
        const trackHeight = 505;
        const avatars = participants.querySelectorAll("img");
        const names = participants.querySelectorAll("span");
        const gap = trackHeight / avatars.length;

        avatars.forEach((avatar, i) => (avatar.style.top = `${i * gap}px`));
        names.forEach((name, i) => (name.style.top = `${i * gap + 25}px`));
    }

    // Hiển thị người chiến thắng
    function displayWinner(name) {
        document.querySelector(".race-winner-img").style.display = "block";
        document.querySelector(".winner").textContent = name;
        jsConfetti.addConfetti();
        setTimeout(() => jsConfetti.addConfetti(), 2000);
    }

    // Khởi động cuộc đua
    function startRace() {
        raceOver = false;
        startLine.classList.add("moveStartingLine");
        finishLine.classList.add("moveFinishLine");
        main.classList.add("main-move");

        const players = Array.from(participants.querySelectorAll("img")).map(
            (avatar, index) => ({
                avatar,
                name: participants.querySelectorAll("span")[index],
            })
        );

        players.forEach((player) => {
            const randomDuration = Math.random() * 5 + 9;
            ["avatar", "name"].forEach((key) =>
                player[key].classList.add(`move${key.charAt(0).toUpperCase() + key.slice(1)}`)
            );
            player.avatar.style.animationDuration = `${randomDuration}s`;
            player.name.style.animationDuration = `${randomDuration}s`;

            player.avatar.addEventListener("animationend", () => {
                if (!raceOver) {
                    raceOver = true;
                    displayWinner(player.name.textContent);
                    players.forEach((p) =>
                        ["avatar", "name"].forEach((key) =>
                            p[key].style.animationPlayState = "paused"
                        )
                    );
                    finishLine.style.animationPlayState = "paused";
                }
            });
        });
    }

    // Xử lý lưu danh sách người chơi
    function savePlayerList() {
        const playerNames = document
            .querySelector(".player-list")
            .value.split("\n")
            .map((name) => name.trim())
            .filter((name) => name);

        participants.innerHTML = playerNames
            .map(
                (name, i) => `
            <img class="bee-avatar bee-avatar-${i}" src="./gif/bee-fly.gif">
            <span class="bee-name bee-name-${i}">${name}</span>`
            )
            .join("");

        positionPlayers();
        modal.style.display = "none";
    }

    // Sự kiện
    document.getElementById("start-btn").addEventListener("click", startRace);
    document.querySelector(".list-btn").addEventListener("click", () => (modal.style.display = "block"));
    document.querySelector(".cancel").addEventListener("click", () => (modal.style.display = "none"));
    window.addEventListener("click", (e) => e.target === modal && (modal.style.display = "none"));
    document.querySelector(".save").addEventListener("click", savePlayerList);

    positionPlayers();
});
