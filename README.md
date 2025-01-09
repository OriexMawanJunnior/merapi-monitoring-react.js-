# Sistem Monitoring Gunung Merapi

Sistem monitoring real-time untuk Gunung Merapi yang dibangun dengan React.js dan Firebase. Aplikasi ini memungkinkan pengguna yang terautentikasi untuk melacak dan mengelola data terkait bencana dengan pembaruan real-time.

## Fitur

- 🔐 Autentikasi Pengguna (Daftar/Login)
- 📊 Dashboard Real-time
- 💾 Operasi CRUD untuk Data Bencana
- 🎨 UI Responsif dengan Tailwind CSS
- 🔄 Pembaruan Real-time dengan Firebase
- 🛡️ Proteksi Route
- 🎯 Manajemen State dengan Redux

## Prasyarat

Sebelum memulai, pastikan Anda telah menginstal:
- Node.js (v14 atau lebih tinggi)
- npm atau yarn
- Git

## Instalasi

1. Clone repository:
```bash
git clone https://github.com/username-anda/merapi-monitoring.git
cd merapi-monitoring
```

2. Install dependensi:
```bash
npm install
# atau
yarn install
```

## Konfigurasi Firebase

1. Buka [Firebase Console](https://console.firebase.google.com)
2. Klik "Buat Proyek" atau "Add project"
3. Masukkan nama proyek (misalnya: merapi-monitoring)
4. Ikuti langkah-langkah pembuatan proyek

### Mengaktifkan Autentikasi:
1. Di sidebar kiri, klik "Authentication"
2. Klik tab "Sign-in method"
3. Klik "Email/Password"
4. Aktifkan toggle "Enable"
5. Klik "Save"

### Mengatur Realtime Database:
1. Di sidebar kiri, klik "Realtime Database"
2. Klik "Create Database"
3. Pilih lokasi (disarankan: asia-southeast1 untuk Asia Tenggara)
4. Mulai dalam "test mode" dengan mengklik "Next"
5. Salin URL database yang muncul (akan digunakan di konfigurasi)
6. Untuk pengaturan keamanan database, buka tab "Rules" dan paste kode berikut:
```json
{
  "rules": {
    ".read": "auth != null",
    ".write": "auth != null"
  }
}
```

### Menambahkan Firebase ke Aplikasi Web:
1. Di halaman overview proyek, klik ikon web (`</>`)
2. Daftarkan nama aplikasi
3. Copy konfigurasi yang muncul (akan digunakan di `auth.js`)

Contoh konfigurasi di `auth.js`:
```javascript
const firebaseConfig = {
    apiKey: "your-api-key",
    authDomain: "your-project.firebaseapp.com",
    databaseURL: "https://your-project.firebasedatabase.app",
    projectId: "your-project",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "your-sender-id",
    appId: "your-app-id",
    measurementId: "your-measurement-id"
};
```

## Pengembangan Lokal

Untuk menjalankan aplikasi di localhost:

```bash
npm start
# atau
yarn start
```

Aplikasi akan tersedia di `http://localhost:3000`

## Build untuk Production

```bash
npm run build
# atau
yarn build
```

## Deployment dengan Vercel

1. Push kode Anda ke GitHub

2. Deploy menggunakan Vercel Dashboard:
   - Buka [Vercel](https://vercel.com)
   - Daftar/Login dengan akun GitHub Anda
   - Klik "Import Project"
   - Pilih repository GitHub Anda
   - Konfigurasi proyek:
     - Framework Preset: Create React App
     - Build Command: `npm run build`
     - Output Directory: `build`
   - Klik Deploy

### Catatan Penting untuk Deployment:
- Karena konfigurasi Firebase ada langsung di file `auth.js`, Anda tidak perlu menambahkan environment variables di Vercel
- Pastikan file `auth.js` sudah berisi konfigurasi Firebase yang benar sebelum melakukan deployment
- Jika ingin menggunakan environment variables, Anda perlu mengubah kode di `auth.js` untuk membaca dari `process.env`

## Struktur Proyek

```
src/
├── components/            # Komponen yang dapat digunakan kembali
│   ├── Navbar.js
│   └── PrivateRoute.js
├── pages/                # Komponen halaman
│   ├── Dashboard.js
│   ├── Home.js
│   ├── Login.js
│   └── Register.js
├── services/             # Fungsi API dan layanan
│   └── auth.js
├── store/                # Redux store dan slice
│   ├── authSlice.js
│   ├── disasterSlice.js
│   └── store.js
└── App.js               # Komponen aplikasi utama
```

## Penggunaan

1. Daftar akun baru menggunakan email dan password
2. Login dengan akun yang sudah dibuat
3. Akses dashboard untuk mengelola data bencana:
   - Tambah data baru
   - Edit data yang ada
   - Hapus data
   - Lihat semua data dalam tabel

## Kontribusi

1. Fork repository
2. Buat branch fitur (`git checkout -b fitur/FiturBaru`)
3. Commit perubahan (`git commit -m 'Menambah FiturBaru'`)
4. Push ke branch (`git push origin fitur/FiturBaru`)
5. Buat Pull Request

## Lisensi

Proyek ini dilisensikan di bawah Lisensi MIT - lihat file [LICENSE](LICENSE) untuk detail

## Dukungan

Untuk dukungan, email ke oriex21001@mail.unpad.ac.id atau buat issue di repository ini.
