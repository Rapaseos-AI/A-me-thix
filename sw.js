const CACHE_NAME = 'rapaseos-v4'; // Lên V4 để thoát xác hoàn toàn!
const ASSETS_TO_CACHE = [
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

// 1. CÀI ĐẶT: Gom hàng an toàn tuyệt đối 📦
self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Kho V4 đã mở, Hằng Hằng đang gom hàng an toàn... ✨');
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
    self.skipWaiting(); 
});

// 2. KÍCH HOẠT: Dọn rác V3 🧹
self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    e.waitUntil(clients.claim()); 
});

// 3. LÀM VIỆC (FETCH): Sinh tồn không cần mạng 🛡️
self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => {
            return response || fetch(e.request).catch(() => {
                return caches.match('./index.html');
            });
        })
    );
});
