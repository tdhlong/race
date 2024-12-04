// Hàm tính toán và gán vị trí cho các người chơi ngay khi tải trang
function positionPlayers() {
    const trackHeight = 505; // Chiều cao vạch
    const playerAvatars = document.querySelectorAll(".participants img"); // Lấy danh sách avatar
    const playerNames = document.querySelectorAll(".participants span");    // Lấy danh sách tên
    const playerCount = playerAvatars.length; // Tổng số người chơi

    // Tính toán khoảng cách dọc (gap)
    const gap = trackHeight / playerCount;

    // Gán vị trí top cho từng người chơi
    playerAvatars.forEach((player, index) => {
        player.style.top = `${index * gap}px`; // Tính toán vị trí top
    });

    playerNames.forEach((player, index) => {
        player.style.top = `${index * gap + 25}px`;
    });
}

// Gán vị trí khi DOM tải xong
document.addEventListener("DOMContentLoaded", positionPlayers);

// Khi nhấn nút bắt đầu
document.getElementById("start-btn").addEventListener("click", function () {

    const playerAvatars = document.querySelectorAll(".participants img");
    const playerNames = document.querySelectorAll(".participants span");
    const finishLine = document.querySelector(".race-end-img");

    const body = document.body; 
    body.classList.add("moveScreen"); 
    const main = document.querySelector("main"); 
    main.classList.add("main-move");
    
    let raceOver = false;
    // Tạo danh sách người chơi dựa trên số lượng avatar
    const players = Array.from({ length: playerAvatars.length }, (_, index) => ({
        avatar: playerAvatars[index],
        name: playerNames[index],
    }));

    players.forEach((player) => {
        const randomDuration = Math.random() * 5 + 5;
        player.avatar.style.animationDuration = `${randomDuration}s`;
        player.name.style.animationDuration = `${randomDuration}s`;

        // Thêm class "move" để bắt đầu animation
        player.avatar.classList.add("moveAvatar");
        player.name.classList.add("moveName");

        // Lắng nghe sự kiện animation kết thúc
        player.avatar.addEventListener("animationend", function () {
            if (!raceOver) {
                raceOver = true;
                alert(`${player.name.textContent} đã chiến thắng!`);

                // Dừng tất cả các avatar và tên
                players.forEach((p) => {
                    p.avatar.style.animationPlayState = "paused";
                    p.name.style.animationPlayState = "paused";
                });
                finishLine.style.animationPlayState = "paused";
                
            }
        });
    });
});

// Lấy modal và các thành phần liên quan
const modal = document.getElementById("players-modal");
const listButton = document.querySelector(".list-btn"); // Nút "Danh sách"
const closeButton = document.querySelector(".cancel");

// Hiển thị modal khi nhấn vào nút "Danh sách"
listButton.addEventListener("click", () => {
    modal.style.display = "block";
});

// Đóng modal khi nhấn vào nút đóng
closeButton.addEventListener("click", () => {
    modal.style.display = "none";
});

// Đóng modal khi nhấn ra ngoài modal
window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

document.querySelector(".save").addEventListener("click", function () {
    // Lấy nội dung từ textarea
    const playerList = document.querySelector(".player-list").value;
    const playerNames = playerList
        .split("\n") // Tách từng dòng
        .map(name => name.trim()) // Loại bỏ khoảng trắng
        .filter(name => name); // Loại bỏ các dòng rỗng

    // Lấy container chứa các con ong
    const participants = document.querySelector(".participants");

    // Xóa nội dung cũ
    participants.innerHTML = "";

    // Tạo các thẻ ong và tên tương ứng
    playerNames.forEach((name, index) => {
        // Tạo avatar ong
        const avatar = document.createElement("img");
        avatar.className = `bee-avatar bee-avatar-${index}`;
        avatar.src = "./gif/bee-fly.gif";

        // Tạo tên ong
        const nameTag = document.createElement("span");
        nameTag.className = `bee-name bee-name-${index}`;
        nameTag.textContent = name;

        // Thêm vào container
        participants.appendChild(avatar);
        participants.appendChild(nameTag);
    });

    // Cập nhật vị trí của các con ong
    positionPlayers();

    // Đóng modal
    document.querySelector("#players-modal").style.display = "none";
});