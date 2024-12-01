// Hàm tính toán và gán vị trí cho các con ong ngay khi tải trang
function positionBees() {
    const trackHeight = 505; // Chiều cao vạch
    const beeAvatars = document.querySelectorAll(".participants img"); // Lấy danh sách ong
    const playerCount = beeAvatars.length; // Tổng số ong

    // Tính toán khoảng cách dọc (gap)
    const gap = trackHeight / playerCount;

    // Gán vị trí top cho từng con ong
    beeAvatars.forEach((bee, index) => {
        bee.style.top = `${index * gap}px`; // Tính toán vị trí top
    });
}

// Gán vị trí khi DOM tải xong
document.addEventListener("DOMContentLoaded", positionBees);

// Khi nhấn nút bắt đầu
document.getElementById("start-btn").addEventListener("click", function () {
    const beeAvatars = document.querySelectorAll(".participants img");

    let raceOver = false;
    const players = Array.from({ length: beeAvatars.length }, (_, index) => ({
        avatarId: `bee-avatar-${index}`,
    }));

    players.forEach((player) => {
        const beeAvatar = document.getElementById(player.avatarId);

        const randomDuration = Math.random() * 5 + 3;

        beeAvatar.style.animationDuration = `${randomDuration}s`;
        beeAvatar.classList.add("move");

        beeAvatar.addEventListener("animationend", function () {
            if (!raceOver) {
                raceOver = true;
                alert(`${player.avatarId} đã chiến thắng!`);

                players.forEach((p) => {
                    const avatar = document.getElementById(p.avatarId);
                    avatar.style.animationPlayState = "paused";
                });
            }
        });
    });
});
