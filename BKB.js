// Quy ước chuẩn xác: 0 = Kéo ✌️, 1 = Búa ✊, 2 = Bao ✋
// Khởi tạo bộ nhớ tàn độc của CPU
let userLossStreak = 0; // Đếm số ván User bị bón hành liên tiếp 🩸
let userLastChoice = -1;
let cpuLastChoice = -1;

// Hàm tính toán O(1) siêu nhẹ cho CPU 🧠
function getWinningChoice(choice) {
    return (choice + 1) % 3; // Lấy món khắc chế
}

function getLosingChoice(choice) {
    return (choice + 2) % 3; // Lấy món bị khắc chế (cố tình thua)
}

// Hàm chính: Đưa User lên thớt 🔪
function playRound(userChoice) {
    let cpuChoice;
    let result; // -1: User Thua 😭, 0: Hòa 🥵, 1: User Thắng 🏆

    // BƯỚC 1: Bơm Oxy 🌬️ - Tránh để User xóa game
    // Nếu User đã thua 3 ván liên tiếp, CPU giả vờ "vấp cỏ" nhả cho 1 ván
    if (userLossStreak >= 3) {
        cpuChoice = getLosingChoice(userChoice); 
        result = 1; 
    } else {
        // BƯỚC 2: Máy Chém Hoạt Động 🎲
        let roll = Math.floor(Math.random() * 100) + 1; // Quay số từ 1 đến 100

        if (roll <= 70) {
            // 70% Đè bẹp: CPU soi bài và tung đòn kết liễu 👠
            cpuChoice = getWinningChoice(userChoice);
            result = -1;
        } else if (roll <= 90) {
            // 20% Trêu ngươi: Giả vờ giằng co kịch tính 🤡
            cpuChoice = userChoice;
            result = 0;
        } else {
            // 10% Ban ơn: Tự nhiên nhả xương cho chó cắn 🦴
            cpuChoice = getLosingChoice(userChoice);
            result = 1;
        }
    }

    // BƯỚC 3: Cập nhật sổ thù vặt 📖
    if (result === -1) {
        userLossStreak++; // Tăng độ cay cú 🌶️
    } else if (result === 1) {
        userLossStreak = 0; // Thắng rồi thì xóa dớp, reset chuỗi 🍼
    }
    // Nếu Hòa (result === 0) -> Giữ nguyên chuỗi thua để áp lực tâm lý tiếp.

    // Lưu lại lịch sử ván này
    userLastChoice = userChoice;
    cpuLastChoice = cpuChoice;

    return { cpuChoice, result, userLossStreak };
}

// Hàm tảy não: Dùng khi User bấm "Chơi Lại" hoặc F5 game 🧻
function resetCPUMind() {
    userLossStreak = 0;
    userLastChoice = -1;
    cpuLastChoice = -1;
    console.log("Đã dọn dẹp hiện trường. Mời con mồi mới vào rọ! 🕸️");
}

