// Di chuyển tất cả
document.getElementById("start-btn").addEventListener("click", function () {
    const players = [
        { avatarId: "bee-avatar-0", nameId: "bee-name-0" },
        { avatarId: "bee-avatar-1", nameId: "bee-name-1" },
        { avatarId: "bee-avatar-2", nameId: "bee-name-2" },
        { avatarId: "bee-avatar-3", nameId: "bee-name-3" },
    ];

    let raceOver = false;

    players.forEach((player) => {
        const beeAvatar = document.getElementById(player.avatarId);
        const beeName = document.getElementById(player.nameId);

        const randomDuration = Math.random() * 5 + 3;

        beeAvatar.style.animationDuration = `${randomDuration}s`;
        beeName.style.animationDuration = `${randomDuration}s`;

        beeAvatar.classList.add("move");
        beeName.classList.add("move");

        beeAvatar.addEventListener("animationend", function () {
            if (!raceOver) {
                raceOver = true;
                alert(`${beeName.textContent} đã chiến thắng!`);
                
                players.forEach((p) => {
                    const avatar = document.getElementById(p.avatarId);
                    const name = document.getElementById(p.nameId);

                    avatar.style.animationPlayState = "paused";
                    name.style.animationPlayState = "paused";
                });
            }
        });
    });
});
