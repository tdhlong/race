// Di chuyển một
document.getElementById("start-btn").addEventListener("click", function () {
    // Phần tử cần di chuyển
    const beeAvatar = document.getElementById("bee-avatar-1");
    const beeName = document.getElementById("bee-name-1");

    // Lấy khoảng cách từ điểm bắt đầu đến điểm kết thúc
    const startPosition = parseInt(getComputedStyle(beeAvatar).left); // Vị trí bắt đầu
    const endPosition = 1370; // Vị trí kết thúc (giống giá trị "left" của .race-end-img)

    // Di chuyển phần tử
    let currentPosition = startPosition;
    const interval = setInterval(() => {
        currentPosition += 10; // Tăng vị trí mỗi bước
        beeAvatar.style.left = currentPosition + "px";
        beeName.style.left = currentPosition - 140 + "px"; // Đồng bộ vị trí tên với avatar

        // Dừng lại khi đến vị trí kết thúc
        if (currentPosition === endPosition) {
            clearInterval(interval);
            alert("Win");
        }
    }, 50); // Mỗi bước cách nhau 50ms
});

// Di chuyển tất cả
// document.getElementById("start-btn").addEventListener("click", function () {
//     const bees = [
//         { avatar: "bee-avatar-0", name: "bee-name-0" },
//         { avatar: "bee-avatar-1", name: "bee-name-1" },
//         { avatar: "bee-avatar-2", name: "bee-name-2" },
//         { avatar: "bee-avatar-3", name: "bee-name-3" }
//     ];
    
//     const endPosition = 1370; // Vị trí kết thúc
//     let raceOver = false; // Biến cờ để kiểm tra khi cuộc đua kết thúc
//     const intervals = []; // Lưu các interval để dừng lại khi cần

//     bees.forEach((bee) => {
//         const beeAvatar = document.getElementById(bee.avatar);
//         const beeName = document.getElementById(bee.name);

//         // Lấy vị trí bắt đầu
//         const startPosition = parseInt(getComputedStyle(beeAvatar).left);
//         let currentPosition = startPosition;

//         // Tốc độ ngẫu nhiên (giá trị từ 5 đến 15 px mỗi bước)
//         const speed = Math.random() * 10 + 5;

//         // Di chuyển ong
//         const interval = setInterval(() => {
//             if (raceOver) {
//                 clearInterval(interval);
//                 return;
//             }

//             currentPosition += speed; // Tăng vị trí theo tốc độ
//             beeAvatar.style.left = currentPosition + "px";
//             beeName.style.left = currentPosition - 140 + "px";

//             // Kiểm tra nếu ong về đích
//             if (currentPosition >= endPosition) {
//                 raceOver = true; // Đặt cờ kết thúc cuộc đua
//                 clearInterval(intervals.forEach((id) => clearInterval(id))); // Dừng tất cả
//                 alert(`${bee.name} đã chiến thắng!`); // Thông báo
//             }
//         }, 50); // Mỗi bước cách nhau 50ms

//         intervals.push(interval); // Lưu interval để dừng toàn bộ khi cần
//     });
// });
