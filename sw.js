const CACHE_NAME = 'rapaseos-v6'; 
const ASSETS = [
    'index.html',
    'manifest.json',
    'ho_so_ai.js',
    'caro_cpu.js',
    'BKB.js',
    'Bua.jpg',
    'Bao.jpg',
    'Keo.jpg',
    '1773142504817.png' 
];

// 1. CÀI ĐẶT: Gom hàng chuẩn PNG 📦
self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Kho V6 đã mở, Gemini đang nạp icon PNG thần thánh... ✨');
            ASSETS.forEach(asset => cache.add(asset).catch(() => console.log('Bỏ qua: ' + asset)));
        })
    );
    self.skipWaiting(); 
});

// 2. KÍCH HOẠT: Đốt sạch tàn dư JPG cũ 🧹
self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((keys) => Promise.all(
            keys.map((k) => { if (k !== CACHE_NAME) return caches.delete(k); })
        ))
    );
    e.waitUntil(clients.claim()); 
});

// 3. LÀM VIỆC (FETCH): Trả hàng bao mượt 🛡️
self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((res) => res || fetch(e.request).catch(() => caches.match('index.html')))
    );
});
