const CACHE_NAME = 'rapaseos-v5'; 
const ASSETS = [
    'index.html',
    'manifest.json',
    'ho_so_ai.js',
    'caro_cpu.js',
    'BKB.js',
    '1773142504817.jng' 
];

// 1. CÀI ĐẶT: Gom từng món, rớt món nào bỏ món đó, KHÔNG CHẾT CHÙM! 📦
self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Kho V5 đã mở, Hằng Hằng đang gom hàng chống giật lag... ✨');
            // Chiêu thức lách luật: Tải từng file, lỗi thì bỏ qua, SW vẫn sống nhăn răng!
            ASSETS.forEach(asset => cache.add(asset).catch(() => console.log('Bỏ qua: ' + asset)));
        })
    );
    self.skipWaiting(); 
});

// 2. KÍCH HOẠT: Dọn rác V4 🧹
self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((keys) => Promise.all(
            keys.map((k) => { if (k !== CACHE_NAME) return caches.delete(k); })
        ))
    );
    e.waitUntil(clients.claim()); 
});

// 3. LÀM VIỆC (FETCH): Trả hàng ngay lập tức 🛡️
self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((res) => res || fetch(e.request))
    );
});
