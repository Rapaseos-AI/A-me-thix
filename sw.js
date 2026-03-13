const CACHE_NAME = 'rapaseos-v3'; // Lên hẳn V3 để ép Chrome nôn cái logo và tên cũ ra!
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './manifest.json',
    './ho_so_ai.js',
    './caro_cpu.js',
    './BKB.js',
    './Bua.jpg',
    './Bao.jpg',
    './Keo.jpg',
    './1773142504817.jpg' 
];

// 1. CÀI ĐẶT: Gom hàng phiên bản mới nhất vô kho 📦
self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Kho V3 đã mở, Hằng Hằng đang gom hàng mới vô... ✨');
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
    self.skipWaiting(); // Ép kích hoạt ngay lập tức không chờ đợi
});

// 2. KÍCH HOẠT: Tàn nhẫn vứt hết rác cũ đi để cập nhật Tên/Màu mới 🧹
self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Đá văng kho cũ, dọn đường cho V3! 😎');
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    e.waitUntil(clients.claim()); // Chiếm quyền điều khiển trang ngay lập tức
});

// 3. LÀM VIỆC (FETCH): Sinh tồn không cần mạng 🛡️
self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => {
            // Có trong kho thì lấy ra xài ngay cho mượt, không có thì chạy ra mạng tải
            return response || fetch(e.request).catch(() => {
                // Mất mạng thì móc thẳng HTML gốc ra đỡ đòn
                if (e.request.mode === 'navigate') {
                    return caches.match('./index.html');
                }
            });
        })
    );
});
