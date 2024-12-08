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
    let raceOver = false;
    let speedIntervalId = null;

    const players = [];

    function updateAvatars() {
        const characterType = selectCharacter.value;
        const names = participants.querySelectorAll("span");
    
        let avatarSrc = "./gif/bee.gif";
        let shouldFlip = false;
        let resize = false;
    
        if (characterType === "bike") {
            avatarSrc = "./gif/bike.gif";
        } else if (characterType === "bus") {
            avatarSrc = "./gif/bus.gif";
            shouldFlip = true;
            resize = true;
        } else if (characterType === "bee") {
            shouldFlip = true; // Bật cờ lật ảnh
        }
    
        // Cập nhật tất cả avatar
        const avatars = participants.querySelectorAll(".avatar");
        avatars.forEach((avatar, i) => {
            const name = names[i];
            avatar.src = avatarSrc;
    
            // Thêm hoặc xóa thuộc tính lật ảnh
            if (shouldFlip) {
                avatar.style.transform = "scaleX(-1)";
            } else {
                avatar.style.transform = "scaleX(1)";
            }

            // Sửa kích thước cho bus
            if (resize) {
                avatar.style.width = "85px";
                avatar.style.height = "85px";
                avatar.style.left = "180px";
                name.style.left = "30px";
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
            const name = names[i]; // Lấy tên tương ứng
            avatar.style.top = `${i * gap}px`;
            name.style.top = `${i * gap + 25}px`; // Gán vị trí cho tên
            players.push({
                avatar,
                name,
                speed: Math.random() * 0.05 + 0.02, // Tốc độ ban đầu
            });
        });
    }

    // Hiển thị người chiến thắng
    function displayWinner(name) {
        document.querySelector(".race-winner-img").style.display = "block";
        document.querySelector(".winner").textContent = name;
        jsConfetti.addConfetti();
    }

    // Hàm cập nhật vị trí người chơi
    function updatePlayerPositions() {
        players.forEach((player) => {
            if (!raceOver) {
                player.position += player.speed;
                player.avatar.style.left = `${player.position}%`;
                player.name.style.left = `${player.position - 9}%`;

                // Kiểm tra xem đã vượt qua vạch đích chưa
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
            player.speed = Math.random() * 0.05 + 0.02; // Tốc độ mới
        });
    }

    // Khởi động cuộc đua
    function startRace() {
        main.classList.add("main-move");
        startLine.classList.add("moveStartingLine");
        finishLine.classList.add("moveFinishLine");
        raceOver = false;

        // Bật nhạc
        raceMusic.play();

        // Reset vị trí ban đầu
        players.forEach((player) => {
            player.position = 11.5;
            player.speed = Math.random() * 0.05 + 0.02; // Giảm tốc độ xuống
            player.avatar.style.left = "11.5%";
            if (selectCharacter.value === "bus") {
                player.avatar.style.marginLeft = "10px";
            }
        });

        // Thay đổi tốc độ mỗi 2 giây
        speedIntervalId = setInterval(() => {
            if (!raceOver) {
                randomizePlayerSpeeds();
            }
        }, 2000);

        // Bắt đầu cập nhật vị trí
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

        // Lấy giá trị từ dropdown
        const characterType = selectCharacter.value;
        let additionalStyle = "";

        // Xác định URL ảnh dựa trên lựa chọn
        if (characterType === "bike") {
            avatarSrc = "./gif/bike.gif";
            additionalStyle = "transform: scaleX(1);";
        } else if (characterType === "bus") {
            avatarSrc = "./gif/bus.gif";
            additionalStyle = "width: 85px; height: 85px; left: 180px;";
        } else if (characterType === "bee") {
            avatarSrc = "./gif/bee.gif";
        }

        participants.innerHTML = playerNames
            .map(
                (name, i) => `
                <img class="avatar avatar-${i}" src="${avatarSrc}" style="${additionalStyle}" alt="${name}">
                <span class="name name-${i}" style="${characterType === "bus" ? "left: 30px;" : ""}">${name}</span>`
            )
            .join("");

        positionPlayers();
        modal.style.display = "none";
    }

    // Gán sự kiện
    document.getElementById("start-btn").addEventListener("click", startRace);
    document.querySelector(".list-btn").addEventListener("click", () => (modal.style.display = "block"));
    document.querySelector(".cancel").addEventListener("click", () => (modal.style.display = "none"));
    window.addEventListener("click", (e) => e.target === modal && (modal.style.display = "none"));
    document.querySelector(".save").addEventListener("click", savePlayerList);
    document.getElementById("restart-btn").addEventListener("click", () => {
        location.reload(); // Tải lại trang
    });
    selectCharacter.addEventListener("change", updateAvatars);

    // Khởi tạo vị trí ban đầu
    positionPlayers();
});
