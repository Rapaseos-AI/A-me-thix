/**
 * ============================================================
 * NÃO BỘ CPU CARO 5x5 - ĐỘC CÔ CẦU BẠI (MẮT DIỀU HÂU)
 * ============================================================
 */

function getBestHeuristicMove(board, aiSymbol, playerSymbol) {
    let bestScore = -1;
    let bestMove = -1;

    for (let i = 0; i < 25; i++) {
        if (board[i] !== "") continue;

        let totalScore = 0;
        const directions = getDirections(i);

        for (const dir of directions) {
            const line = dir.map(idx => board[idx]);
            const pos = dir.indexOf(i);

            // Điểm tấn công: giả sử đặt AI vào ô i (isAI = true)
            const attackScore = evaluateDirection(line, pos, aiSymbol, true);
            // Điểm phòng thủ: giả sử đặt Player vào ô i (isAI = false)
            const defendScore = evaluateDirection(line, pos, playerSymbol, false);

            totalScore += attackScore + defendScore;
        }

        totalScore += getPositionScore(board, i, playerSymbol);

        if (totalScore > bestScore) {
            bestScore = totalScore;
            bestMove = i;
        }
    }

    return bestMove !== -1 ? bestMove : 0;
}

function getDirections(index) {
    const row = Math.floor(index / 5);
    const col = index % 5;
    const dirs = [];

    // Ngang
    dirs.push(Array.from({ length: 5 }, (_, c) => row * 5 + c));

    // Dọc
    dirs.push(Array.from({ length: 5 }, (_, r) => r * 5 + col));

    // Chéo chính (row - col = const)
    const diag1 = [];
    const d1 = row - col;
    for (let r = 0; r < 5; r++) {
        const c = r - d1;
        if (c >= 0 && c < 5) diag1.push(r * 5 + c);
    }
    diag1.sort((a, b) => a - b);
    dirs.push(diag1);

    // Chéo phụ (row + col = const)
    const diag2 = [];
    const d2 = row + col;
    for (let r = 0; r < 5; r++) {
        const c = d2 - r;
        if (c >= 0 && c < 5) diag2.push(r * 5 + c);
    }
    diag2.sort((a, b) => a - b);
    dirs.push(diag2);

    return dirs;
}

function evaluateDirection(line, pos, color, isAI) {
    const temp = line.slice();
    temp[pos] = color;

    // Đếm trái, phải
    let left = 0;
    for (let i = pos - 1; i >= 0 && temp[i] === color; i--) left++;
    let right = 0;
    for (let i = pos + 1; i < 5 && temp[i] === color; i++) right++;
    const total = left + right + 1;

    // Kiểm tra các đầu có trống không
    const leftOpen = (pos - left - 1 >= 0) && temp[pos - left - 1] === "";
    const rightOpen = (pos + right + 1 < 5) && temp[pos + right + 1] === "";

    // --- THANG ĐIỂM PHÂN BIỆT AI/PLAYER ---
    if (total === 5) return isAI ? 1000000 : 999999;
    if (total === 4 && (leftOpen || rightOpen)) return isAI ? 500000 : 490000;
    if (total === 3 && leftOpen && rightOpen) return isAI ? 100000 : 90000;
    if (total === 3 && (leftOpen || rightOpen) && !(leftOpen && rightOpen)) return isAI ? 20000 : 18000;
    if (total === 2 && leftOpen && rightOpen && isAI) return 10000;

    return 0;
}

function getPositionScore(board, index, playerSymbol) {
    const row = Math.floor(index / 5);
    const col = index % 5;
    let score = 0;

    const centerDist = Math.abs(row - 2) + Math.abs(col - 2);
    score += (4 - centerDist) * 5; 

    for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
            if (dr === 0 && dc === 0) continue;
            const nr = row + dr, nc = col + dc;
            if (nr >= 0 && nr < 5 && nc >= 0 && nc < 5) {
                if (board[nr * 5 + nc] === playerSymbol) {
                    score += 2; 
                }
            }
        }
    }
    return score;
}

