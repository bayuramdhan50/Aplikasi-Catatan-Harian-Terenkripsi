# Aplikasi Catatan Harian Terenkripsi (Encrypted Daily Notes Application)

Sebuah aplikasi web untuk mencatat dan menyimpan catatan harian Anda dengan aman menggunakan enkripsi. Dibangun dengan React dan Vite.

## Fitur Utama

- 📝 Buat, edit, dan hapus catatan harian
- 🔍 Pencarian catatan berdasarkan kata kunci
- 🔒 Enkripsi end-to-end untuk menjaga kerahasiaan catatan Anda
- 💾 Penyimpanan lokal yang aman di perangkat Anda
- 📱 Responsif dan dapat digunakan di berbagai perangkat

## Teknologi yang Digunakan

- **React** - Library JavaScript untuk membangun antarmuka pengguna
- **Vite** - Build tool yang cepat untuk pengembangan modern
- **TailwindCSS** - Framework CSS untuk desain yang cepat dan responsif
- **PostCSS** - Tool untuk transformasi CSS

## Cara Menggunakan

1. Clone repositori ini ke komputer Anda
2. Install dependencies dengan menjalankan `npm install`
3. Jalankan aplikasi dalam mode pengembangan dengan `npm run dev`
4. Buka browser dan akses `http://localhost:5173`

## Struktur Proyek

```
src/
  ├── components/        # Komponen React
  │   ├── NoteForm.jsx       # Form untuk membuat/mengedit catatan
  │   ├── NoteItem.jsx       # Tampilan individual catatan
  │   ├── NoteModal.jsx      # Modal untuk melihat/mengedit catatan
  │   ├── NotesContainer.jsx # Container untuk semua catatan
  │   ├── SearchBar.jsx      # Komponen pencarian
  │   └── SplashScreen.jsx   # Layar pembuka aplikasi
  ├── assets/           # Aset statis seperti gambar
  ├── App.jsx           # Komponen utama aplikasi
  ├── App.css           # Gaya khusus untuk App
  ├── index.css         # Gaya global
  └── main.jsx          # Entry point aplikasi
```

## Keamanan

Aplikasi ini menggunakan enkripsi untuk melindungi catatan Anda. Semua catatan dienkripsi di sisi klien sebelum disimpan secara lokal, sehingga tidak ada yang dapat membaca catatan Anda tanpa kunci enkripsi yang Anda tentukan.

## Lisensi

[MIT](https://choosealicense.com/licenses/mit/)
