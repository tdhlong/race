document.addEventListener("DOMContentLoaded", () => {
    // Các biến DOM
    const main = document.querySelector("main");
    const startLine = document.querySelector(".race-start-img");
    const finishLine = document.querySelector(".race-end-img");
    const modal = document.getElementById("players-modal");
    const selectCharacter = document.querySelector(".select-character");
    const participants = document.querySelector(".participants");
    const raceMusic = document.querySelector(".race-music");
    const clapSound = document.querySelector(".race-clap");
    const jsConfetti = new JSConfetti();
    const winnerImage = document.querySelector(".race-winner-img");
    const winnerName = document.querySelector(".winner");
    let raceOver = false;
    let speedIntervalId = null;

    const players = [];
    const avatarSrcs = {
        bike: "./gif/bike.gif",
        bus: "./gif/bus.gif",
        bee: "./gif/bee.gif"
    };

    // Cập nhật hình ảnh và kiểu của avatar
    function updateAvatars() {
        const characterType = selectCharacter.value;

        const avatarSrc = avatarSrcs[characterType] || avatarSrcs.bee;
        const shouldFlip = characterType === "bee" || characterType === "bus";
        const resize = characterType === "bus";

        // Cập nhật tất cả avatar
        const avatars = participants.querySelectorAll(".avatar");
        avatars.forEach((avatar) => {
            avatar.src = avatarSrc;
            avatar.style.transform = shouldFlip ? "scaleX(-1)" : "scaleX(1)";

            // Cập nhật vị trí và kích thước
            if (resize) {
                avatar.classList.add("bus-avatar"); // Thêm lớp CSS cho bus
            } else {
                avatar.classList.remove("bus-avatar"); // Gỡ lớp CSS cho những avatar khác
            }
        });
    }

    // Hàm gán vị trí người chơi
    function positionPlayers() {
        const trackHeight = 505;
        const avatars = participants.querySelectorAll("img");
        const names = participants.querySelectorAll("span");
        const gap = trackHeight / avatars.length;

        avatars.forEach((avatar, i) => {
            const name = names[i];
            const nameWidth = name.offsetWidth;
            const newLeft = `calc(254px - ${nameWidth}px)`;
            avatar.style.top = `${i * gap}px`;
            name.style.top = `${i * gap + 30}px`;
            name.style.left = newLeft;
            players.push({
                avatar,
                name,
                speed: Math.random() * 0.05 + 0.02,
                position: 16.5,
            });
        });
    }

    // Hiển thị người chiến thắng
    function displayWinner(name) {
        winnerImage.style.display = "block";
        winnerName.textContent = name;
        jsConfetti.addConfetti();

    }

    // Hàm cập nhật vị trí người chơi
    function updatePlayerPositions() {
        players.forEach((player) => {
            if (!raceOver) {
                player.position += player.speed;
                player.avatar.style.left = `${player.position}%`;
    
                // Cập nhật left của name dựa trên position và width thực tế
                const nameWidth = player.name.offsetWidth;
                player.name.style.left = `calc(${player.position}% - ${nameWidth}px)`;
    
                if (player.position >= 88 && !raceOver) {
                    raceOver = true;
                    clapSound.play();
                    displayWinner(player.name.textContent);
                    clearInterval(speedIntervalId);
                }
            }
        });
    
        if (!raceOver) {
            requestAnimationFrame(updatePlayerPositions);
        }
    }
    

    // Hàm thay đổi tốc độ ngẫu nhiên
    function randomizePlayerSpeeds() {
        players.forEach((player) => {
            player.speed = Math.random() * 0.05 + 0.02;
        });
    }

    // Khởi động cuộc đua
    function startRace() {
        raceOver = false;
        winnerImage.style.display = "none";
        winnerName.textContent = "";
    
        main.classList.remove("main-move");
        startLine.classList.remove("moveStartingLine");
        finishLine.classList.remove("moveFinishLine");
    
        setTimeout(() => {
            main.classList.add("main-move");
            startLine.classList.add("moveStartingLine");
            finishLine.classList.add("moveFinishLine");
        }, 50);
    
        raceMusic.play();
    
        players.forEach((player) => {
            player.position = 16.5;
            player.speed = Math.random() * 0.05 + 0.02;
            player.avatar.style.left = "16.5%";
    
            // Đặt lại vị trí left cho name
            const nameWidth = player.name.offsetWidth;
            player.name.style.left = `calc(16.5% - ${nameWidth}px)`;
    
            if (selectCharacter.value === "bus") {
                player.avatar.style.marginLeft = "10px";
            }
        });
    
        speedIntervalId = setInterval(() => {
            if (!raceOver) {
                randomizePlayerSpeeds();
            }
        }, 2000);
    
        requestAnimationFrame(updatePlayerPositions);
    }
    

    // Xử lý lưu danh sách người chơi
    function savePlayerList() {
        const playerNames = document
            .querySelector(".player-list")
            .value.split("\n")
            .map((name) => name.trim())
            .filter((name) => name);
    
        if (playerNames.length === 0) {
            alert("Vui lòng thêm ít nhất một người chơi!");
            return;
        }
    
        const characterType = selectCharacter.value;
        const avatarSrc = avatarSrcs[characterType] || avatarSrcs.bee;
    
        participants.innerHTML = playerNames
            .map(
                (name, i) => `
                <img class="avatar avatar-${i} ${characterType}-avatar" src="${avatarSrc}" alt="${name}">
                <span class="name name-${i}">${name}</span>`
            )
            .join("");
    
        players.length = 0;
    
        const avatars = participants.querySelectorAll(".avatar");
        avatars.forEach((avatar) => {
            avatar.classList.remove("bee-avatar", "bike-avatar", "bus-avatar");
            avatar.classList.add(`${characterType}-avatar`);
    
            if (characterType === "bike") {
                avatar.style.transform = "scaleX(1)";
            } else if (characterType === "bee" || characterType === "bus") {
                avatar.style.transform = "scaleX(-1)";
            }
        });
    
        winnerImage.style.display = "none";
        winnerName.textContent = "";
    
        main.classList.remove("main-move");
        startLine.classList.remove("moveStartingLine");
        finishLine.classList.remove("moveFinishLine");
    
        positionPlayers();
        modal.style.display = "none";
    }
    

    // Gán sự kiện
    document.getElementById("start-btn").addEventListener("click", startRace);
    document.querySelector(".list-btn").addEventListener("click", () => (modal.style.display = "block"));
    document.querySelector(".cancel").addEventListener("click", () => (modal.style.display = "none"));
    window.addEventListener("click", (e) => e.target === modal && (modal.style.display = "none"));
    document.querySelector(".save").addEventListener("click", savePlayerList);
    document.getElementById("restart-btn").addEventListener("click", () => location.reload());
    selectCharacter.addEventListener("change", updateAvatars);

    // Khởi tạo vị trí ban đầu
    positionPlayers();
});
