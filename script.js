// ======================================
// RPL SMART ASSISTANT - SMKN 9 MEDAN
// ======================================

// BUKA CHATBOT
function bukaChatbot() {
    document.getElementById("chatbot").classList.remove("hidden");
    document.getElementById("chatToggle").style.display = "none";
}

// TUTUP CHATBOT
function tutupChatbot() {
    document.getElementById("chatbot").classList.add("hidden");
    document.getElementById("chatToggle").style.display = "block";
}

// Cek apakah pesan mengandung salah satu kata kunci
// (kata pendek 3 huruf ke bawah dicocokkan sebagai kata utuh, supaya "git" tidak cocok dengan "digital")
function ada(teks, daftar) {
    const padded = " " + teks + " ";
    return daftar.some(function (kata) {
        if (kata.length <= 3) {
            return padded.includes(" " + kata + " ");
        }
        return teks.includes(kata);
    });
}

// DATA GURU PRODUKTIF RPL (Tahun Pelajaran 2025/2026)
const guruRPL = [
    { kunci: "novelman", nama: "Novelman Manurung, ST", mapel: "Produktif RPL" },
    { kunci: "roy", nama: "Roy Hendro Siburian, S.Kom", mapel: "Produktif RPL" },
    { kunci: "gira", nama: "Gira Berlian Gabriela Htg, S.Pd", mapel: "Produktif RPL" },
    { kunci: "herbet", nama: "Herbet Helvi Roberto Bakkara, S.Kom", mapel: "Produktif RPL dan TKJ" },
    { kunci: "pirmando", nama: "Pirmando Gultom, M.Kom", mapel: "Produktif RPL dan TKJ" },
    { kunci: "annisah", nama: "Annisah Husni Daulay, M.Kom", mapel: "Produktif RPL" },
    { kunci: "ardiansyah", nama: "Ardiansyah, ST", mapel: "Produktif RPL" },
    { kunci: "senty", nama: "Senty Liastanova Sembiring, S.Kom", mapel: "Produktif RPL" },
    { kunci: "shinta", nama: "Shinta Hastia Putri, S.Pd", mapel: "Produktif RPL" }
];

// Jawaban jika datanya belum ada (isi sendiri nanti)
const belumAda = "Maaf, data tersebut belum tersedia di sistem saya. Silakan tanyakan langsung ke sekolah atau cek website resmi smkn9medan.sch.id.";

// DATABASE PERTANYAAN DAN JAWABAN
function cariJawaban(pesan) {
    let teks = pesan.toLowerCase().replace(/[?!.,]/g, " ").replace(/\s+/g, " ").trim();

    // Samakan singkatan & cara tulis nama sekolah
    teks = teks.replace(/\b(ttg|ttng|tntg|tentg)\b/g, "tentang")
               .replace(/\b(skolah|sklh|sekolahan)\b/g, "sekolah")
               .replace(/\bsmk\s*(negeri|n)?\s*0?9\b/g, "smkn 9");

    // ---------- SAPAAN & UMUM ----------
    if (ada(teks, ["hallo", "halo", "hai", "assalamualaikum", "selamat pagi", "selamat siang", "selamat sore", "selamat malam", "permisi"])) {
        return "Halo! Selamat datang di RPL Smart Assistant SMK Negeri 9 Medan. Silakan tanya tentang sekolah, jurusan RPL, jadwal, atau guru produktif RPL. Ketik \"bantuan\" untuk melihat daftar topik.";
    }

    if (ada(teks, ["siapa kamu", "nama kamu", "kamu siapa", "bot apa"])) {
        return "Saya RPL Smart Assistant, asisten virtual Portal RPL SMK Negeri 9 Medan.";
    }

    if (ada(teks, ["terima kasih", "makasih", "thanks", "makasi"])) {
        return "Sama-sama! Semangat belajar dan terus berkarya di bidang Rekayasa Perangkat Lunak!";
    }

    if (ada(teks, ["bantuan", "menu", "bisa apa", "help", "topik"])) {
        return "Kamu bisa bertanya tentang:\n" +
               "- Profil sekolah: alamat, akreditasi, NPSN, kepala sekolah, kontak, website\n" +
               "- Jurusan: RPL, TKJ, DKV, Animasi, BCF, Peksos\n" +
               "- Jam masuk, jam pulang, istirahat, jadwal praktik\n" +
               "- Guru produktif RPL (nama guru)\n" +
               "- Pendaftaran siswa baru, biaya, beasiswa\n" +
               "- PKL, LSP/uji kompetensi, prospek kerja RPL\n" +
               "- Proyek siswa RPL, HTML, CSS, JavaScript, database";
    }

    // ---------- GURU PRODUKTIF RPL ----------
    // Cari nama guru tertentu, contoh: "siapa pak roy"
    for (let i = 0; i < guruRPL.length; i++) {
        if (ada(teks, [guruRPL[i].kunci])) {
            return guruRPL[i].nama + " adalah guru " + guruRPL[i].mapel + " di SMK Negeri 9 Medan (tahun pelajaran 2025/2026).";
        }
    }

    if (ada(teks, ["berapa guru rpl", "jumlah guru rpl", "banyak guru rpl"])) {
        return "Guru produktif RPL di SMK Negeri 9 Medan berjumlah 9 orang (tahun pelajaran 2025/2026). Dua di antaranya, Pak Herbet dan Pak Pirmando, juga mengajar produktif TKJ.";
    }

    if (ada(teks, ["guru rpl", "guru produktif rpl", "guru jurusan rpl", "guru produktif", "nama guru rpl", "siapa guru rpl", "pengajar rpl", "guru pemrograman", "guru kejuruan"])) {
        return "Guru produktif RPL SMK Negeri 9 Medan (2025/2026):\n" +
               "1. Novelman Manurung, ST\n" +
               "2. Roy Hendro Siburian, S.Kom\n" +
               "3. Gira Berlian Gabriela Htg, S.Pd\n" +
               "4. Herbet Helvi Roberto Bakkara, S.Kom (RPL & TKJ)\n" +
               "5. Pirmando Gultom, M.Kom (RPL & TKJ)\n" +
               "6. Annisah Husni Daulay, M.Kom\n" +
               "7. Ardiansyah, ST\n" +
               "8. Senty Liastanova Sembiring, S.Kom\n" +
               "9. Shinta Hastia Putri, S.Pd";
    }

    if (ada(teks, ["jumlah guru", "berapa guru", "banyak guru", "total guru"])) {
        return "Daftar jam guru mengajar tahun pelajaran 2025/2026 SMK Negeri 9 Medan memuat sekitar 94 guru, mulai dari guru mata pelajaran umum sampai guru produktif tiap jurusan.";
    }

    if (ada(teks, ["guru tkj", "guru dkv", "guru animasi", "guru peksos", "guru bcf", "guru matematika", "guru bahasa", "guru agama", "guru olahraga", "guru bk", "daftar guru", "nama guru", "semua guru"])) {
        return "Saya hanya menyimpan nama guru produktif RPL. Untuk daftar guru lainnya, silakan lihat papan pengumuman sekolah atau tanyakan ke bagian tata usaha.";
    }

    if (ada(teks, ["guru"])) {
        return "Guru RPL membimbing siswa belajar pemrograman, pengembangan website, aplikasi, dan basis data. Ketik \"guru produktif RPL\" untuk melihat nama-namanya.";
    }

    // ---------- PROFIL SEKOLAH ----------
    if (ada(teks, ["kepala sekolah", "kepsek", "pimpinan sekolah", "kepala smk"])) {
        return "Plt. Kepala SMK Negeri 9 Medan adalah Cahyani Monalista Harefa, S.Pd., M.Si. (berdasarkan pengumuman resmi sekolah pada Juni 2026). Sebelumnya, jabatan Kepala SMK Negeri 9 Medan dipegang oleh M. Sofa Ananda, S.Pd., M.Pd..";
    }

    if (ada(teks, ["wakil kepala", "waka", "wakasek", "waka kurikulum"])) {
        return "Wakil Kepala Sekolah Bidang Kurikulum pada jadwal pembelajaran 2025/2026 tertulis atas nama Novelman Manurung, ST, epala SMK Negeri 9 Medan adalah Cahyani Monalista Harefa, S.Pd., M.Si. (berdasarkan pengumuman resmi sekolah pada Juni 2026). Untuk waka bidang lain, tanyakan ke tata usaha.";
    }

    if (ada(teks, ["alamat", "lokasi", "dimana sekolah", "letak sekolah", "dimana smkn", "maps", "peta", "menuju sekolah"])) {
        return "SMK Negeri 9 Medan beralamat di Jl. Patriot No. 20 A, Lalang, Kec. Medan Sunggal, Kota Medan, Sumatera Utara. Cari di Google Maps dengan kata kunci SMK Negeri 9 Medan.";
    }

    if (ada(teks, ["akreditasi", "terakreditasi"])) {
        return "SMK Negeri 9 Medan terakreditasi A.";
    }

    if (ada(teks, ["npsn", "kode sekolah"])) {
        return "NPSN SMK Negeri 9 Medan adalah 10210766.";
    }

    if (ada(teks, ["website", "web sekolah", "situs resmi", "laman sekolah", "link sekolah"])) {
        return "Website resmi sekolah: smkn9medan.sch.id";
    }

    if (ada(teks, ["kontak", "telepon", "telpon", "nomor sekolah", "no hp", "whatsapp", "email", "hubungi"])) {
        return "Untuk kontak resmi, kunjungi smkn9medan.sch.id atau datang langsung ke Jl. Patriot No. 20 A, Medan Sunggal, Medan.";
    }

    if (ada(teks, ["negeri atau swasta", "status sekolah", "sekolah negeri", "sekolah swasta"])) {
        return "SMK Negeri 9 Medan adalah sekolah berstatus negeri di bawah Dinas Pendidikan.";
    }

    if (ada(teks, ["jumlah siswa", "berapa siswa", "banyak siswa", "jumlah murid"])) {
        return "Menurut data portal sekolah, SMK Negeri 9 Medan memiliki sekitar 1.385 siswa. Jumlah ini bisa berubah setiap tahun.";
    }

    if (ada(teks, ["ruang kelas", "berapa kelas", "jumlah kelas", "jumlah ruangan"])) {
        return "Menurut data portal sekolah, SMK Negeri 9 Medan memiliki sekitar 37 -40ruang kelas.";
    }

    if (ada(teks, ["berdiri", "didirikan", "sejarah", "tahun berapa", "usia sekolah"])) {
        return "SMK Negeri 9 Medan berdiri pada 7 Maret 1997 berdasarkan SK Pendirian Nomor 036/0/1997"
    }

    if (ada(teks, ["visi", "misi", "motto"])) {
        return "visi dan misi sekolah bisa di lihat melalui web sekolah smkn9medan.sch.id"
    }

    if (ada(teks, ["prestasi", "juara", "lomba", "penghargaan"])) {
        return "prestasi siswa smkn 9 medan bisa dilihat dari web sekolah yaitu smkn9medan.sch.id"
    }

    if (ada(teks, ["kurikulum apa", "kurikulum merdeka", "kurikulum 2013", "pakai kurikulum"])) {
        return "Data portal pendidikan mencatat SMK Negeri 9 Medan memakai Kurikulum 2013. Untuk kurikulum yang berlaku saat ini, tanyakan ke wakil kepala sekolah bidang kurikulum.";
    }

    if (ada(teks, ["berapa lama", "lama sekolah", "berapa tahun"])) {
        return "Pendidikan di SMK umumnya ditempuh selama 3 tahun, yaitu kelas X, XI, dan XII.";
    }

    // ---------- JURUSAN ----------
    if (ada(teks, ["jurusan apa", "daftar jurusan", "ada jurusan", "jurusan apa saja", "program keahlian", "kompetensi keahlian", "berapa jurusan", "jurusan di smkn", "jurusan yang ada"])) {
        return "Berdasarkan daftar mata pelajaran produktif 2025/2026, SMK Negeri 9 Medan memiliki jurusan:\n" +
               "- RPL (Rekayasa Perangkat Lunak)\n" +
               "- TKJ (Teknik Komputer dan Jaringan)\n" +
               "- DKV (Desain Komunikasi Visual)\n" +
               "- AN (Animasi)\n" +
               "- BCF (Broadcasting dan Film)\n" +
               "- Peksos (Pekerjaan Sosial)\n" +
               "Untuk daftar resmi terbaru, cek smkn9medan.sch.id.";
    }

    if (ada(teks, ["beda rpl dan tkj", "bedanya rpl", "rpl atau tkj", "rpl vs tkj", "perbedaan rpl"])) {
        return "RPL fokus membuat perangkat lunak: aplikasi, website, dan database. TKJ fokus pada komputer dan jaringan: merakit komputer, mengatur jaringan, dan server.";
    }

    if (ada(teks, ["tkj", "teknik komputer"])) {
        return "TKJ (Teknik Komputer dan Jaringan) mempelajari perakitan komputer, jaringan, server, dan administrasi sistem.";
    }

    if (ada(teks, ["dkv", "desain komunikasi visual"])) {
        return "DKV (Desain Komunikasi Visual) mempelajari desain grafis, ilustrasi, fotografi, dan media visual kreatif.";
    }

    if (ada(teks, ["animasi", "jurusan an"])) {
        return "Jurusan Animasi mempelajari pembuatan animasi 2D/3D, storyboard, dan produksi konten visual bergerak.";
    }

    if (ada(teks, ["bcf", "broadcasting", "perfilman"])) {
        return "BCF (Broadcasting dan Film) mempelajari produksi siaran, videografi, dan perfilman.";
    }

    if (ada(teks, ["peksos", "pekerjaan sosial", "pekerja sosial"])) {
        return "Pekerjaan Sosial (Peksos) mempelajari pelayanan dan pendampingan sosial bagi masyarakat.";
    }

    if (ada(teks, ["syarat masuk rpl", "syarat jurusan rpl", "bisa masuk rpl", "harus bisa coding", "cocok masuk rpl", "cocok rpl"])) {
        return "Tidak wajib sudah bisa coding. Modal utama untuk RPL: suka komputer, mau belajar logika, dan tekun berlatih. Syarat resmi pendaftaran mengikuti ketentuan SPMB sekolah.";
    }

    if (ada(teks, ["laptop", "wajib bawa", "alat praktik"])) {
        return "diseuaikan dengan siswa jika tidak memiliki laptop disarankan memakai komputer lab jika ada keperluan,tetapi memang siswa rpl sangat disarankan memiliki laptop."
    }

    if (ada(teks, ["apa itu rpl", "pengertian rpl", "rpl itu apa", "rekayasa perangkat lunak", "jurusan rpl"])) {
        return "RPL adalah Rekayasa Perangkat Lunak. Jurusan ini mempelajari pembuatan aplikasi, website, pemrograman, database, dan pengembangan perangkat lunak.";
    }

    if (ada(teks, ["belajar apa di rpl", "materi rpl", "pelajaran rpl", "mapel rpl", "kurikulum rpl", "kurikulum", "pelajaran"])) {
        return "Pembelajaran RPL meliputi pemrograman, pengembangan web, basis data, pengembangan aplikasi, dan teknologi informasi, ditambah mata pelajaran umum.";
    }

    if (ada(teks, ["mata pelajaran umum", "mapel umum", "pelajaran apa saja", "mapel apa saja"])) {
        return "Mata pelajaran umum di SMK Negeri 9 Medan antara lain: Pendidikan Agama dan Budi Pekerti, Bahasa Indonesia, Bahasa Inggris, IPAS, Matematika, Pendidikan Jasmani, Pendidikan Pancasila, Sejarah Indonesia, Seni Rupa, dan Bahasa Jepang, ditambah mata pelajaran produktif sesuai jurusan.";
    }

    if (ada(teks, ["bahasa jepang"])) {
        return "Bahasa Jepang termasuk salah satu mata pelajaran yang diajarkan di SMK Negeri 9 Medan.";
    }

    // ---------- JAM & JADWAL ----------
    if (ada(teks, ["jam praktik", "jadwal praktik", "praktik pagi", "praktik siang", "shift", "sesi pagi", "sesi siang", "waktu praktik"])) {
        return "Pembelajaran praktik dibagi dua sesi (jadwal 2025/2026):\n" +
               "- Pagi: 07.00 - 12.45 (istirahat 09.00 - 09.15 dan 10.45 - 11.00)\n" +
               "- Siang: 13.00 - 17.55 (istirahat 15.30 - 15.50)\n" +
               "Kamu masuk sesi yang mana, tanyakan ke wali kelas.";
    }

    if (ada(teks, ["jam masuk", "masuk jam", "jam berapa masuk", "mulai sekolah", "jam mulai"])) {
        return "Pembelajaran teori dimulai pukul 07.00. Untuk praktik, sesi pagi mulai 07.00 dan sesi siang mulai 13.00.";
    }

    if (ada(teks, ["jam pulang", "pulang jam", "jam berapa pulang", "selesai jam", "sekolah selesai"])) {
        return "Jam pelajaran teori berakhir pukul 15.30 (jam ke-10). Sesi praktik siang berakhir pukul 17.55. Jadwal tiap hari bisa berbeda, tanyakan ke wali kelas.";
    }

    if (ada(teks, ["istirahat", "jam istirahat", "jam makan"])) {
        return "Istirahat pembelajaran teori: pukul 10.00 - 10.15 dan 12.30 - 13.15.";
    }

    if (ada(teks, ["jam sekolah", "jam belajar", "jam pelajaran", "lama pelajaran", "durasi pelajaran", "jadwal teori"])) {
        return "Jadwal pembelajaran teori (2025/2026): jam ke-1 mulai 07.00, satu jam pelajaran 45 menit, sampai jam ke-10 pukul 15.30. Istirahat pukul 10.00 - 10.15 dan 12.30 - 13.15.";
    }

    if (ada(teks, ["jadwal", "jadwal pelajaran", "jadwal kelas"])) {
        return "Jadwal pelajaran per kelas diatur oleh sekolah. Jam teori: 07.00 - 15.30. Praktik: sesi pagi 07.00 - 12.45 dan sesi siang 13.00 - 17.55. Jadwal tiap kelas, tanyakan ke wali kelas.";
    }

    if (ada(teks, ["libur", "kalender akademik", "tanggal merah"])) {
        return "Kalender akademik dan hari libur ditetapkan sekolah dan dinas pendidikan. Cek pengumuman di smkn9medan.sch.id atau tanyakan ke wali kelas.";
    }

    // ---------- PENDAFTARAN & BIAYA ----------
    if (ada(teks, ["daftar", "pendaftaran", "ppdb", "spmb", "siswa baru", "penerimaan siswa", "syarat masuk", "jalur masuk", "mau masuk", "zonasi"])) {
        return "Info pendaftaran siswa baru (syarat, jalur, dan jadwal) diumumkan lewat website resmi sekolah smkn9medan.sch.id dan portal SPMB resmi, atau datang langsung ke sekolah.";
    }

    if (ada(teks, ["biaya", "spp", "bayaran", "uang masuk", "uang gedung", "gratis", "iuran", "uang sekolah"])) {
        return "disesuaikan dengan peraturan yang sudah ditetapkan oleh smkn 9 medan"
    }

    if (ada(teks, ["beasiswa", "kip", "pip", "bantuan siswa", "keringanan"])) {
        return "Info beasiswa atau bantuan pendidikan diumumkan oleh sekolah. Tanyakan ke wali kelas atau tata usaha untuk syarat dan jadwalnya.";
    }

    // ---------- KEGIATAN & FASILITAS ----------
    if (ada(teks, ["fasilitas", "sarana", "laboratorium", "lab rpl", "lab komputer", "lab", "perpustakaan"])) {
        return "Fasilitas SMK Negeri 9 Medan antara lain ruang kelas, laboratorium komputer/RPL untuk praktikum, dan perpustakaan.";
    }

    if (ada(teks, ["ekskul", "ekstrakurikuler", "pramuka", "osis", "organisasi", "klub"])) {
        return "disesuaikan dengan peraturan sekolah smkn 9 medan"
    }

    if (ada(teks, ["seragam", "pakaian sekolah", "baju sekolah", "atribut", "sepatu"])) {
        return "seragam di susuaikan dengan aturan sekolah di smkn 9 medan"
    }

    if (ada(teks, ["tata tertib", "aturan sekolah", "peraturan", "sanksi", "larangan", "bawa hp", "rambut"])) {
        return "hak yang diberikan kepda sekolah untuk setiap murid dan murid bisa mempertanggung jawabkan sesuatu"
    }

    if (ada(teks, ["asrama", "kantin", "parkir", "wifi sekolah"])) {
        return "salah satu fasilitas yang di beri sekolah untuk murid-murid smkn 9 medan"
    }

    if (ada(teks, ["ujian", "pts", "pas", "ujian sekolah", "cbt", "ujian online"])) {
        return "Ujian di sekolah meliputi penilaian tengah dan akhir semester serta ujian praktik kejuruan. Salah satu proyek siswa RPL adalah Portal CBT Online untuk ujian berbasis komputer. Jadwal resminya diumumkan sekolah.";
    }

    if (ada(teks, ["nilai", "rapor", "raport", "cek nilai", "dashboard nilai"])) {
        return "Nilai dan rapor dikelola sekolah. Siswa RPL membuat proyek Dashboard Nilai Siswa untuk memonitor rapor akademik secara real-time. Untuk rapor resmi, tanyakan ke wali kelas.";
    }

    if (ada(teks, ["absen", "izin", "sakit", "tidak masuk", "surat izin", "alpa", "bolos"])) {
        return "Jika tidak bisa masuk karena sakit atau keperluan lain, orang tua/wali umumnya memberi kabar atau surat izin ke wali kelas.";
    }

    if (ada(teks, ["konseling", "guru bk", "curhat", "bimbingan konseling", "konsultasi"])) {
        return "Untuk konsultasi pribadi atau akademik, temui guru BK di sekolah. Siswa RPL juga membuat proyek Chatbot Bimbingan Konseling sebagai layanan informasi awal.";
    }

    // ---------- PKL, LSP, KARIER, PROYEK ----------
    if (ada(teks, ["pkl", "magang", "praktik kerja lapangan", "prakerin", "tempat pkl"])) {
        return "PKL atau Praktik Kerja Lapangan adalah kegiatan pembelajaran di dunia industri untuk memperoleh pengalaman kerja secara langsung. Penempatan dan jadwal PKL diatur oleh sekolah.";
    }

    if (ada(teks, ["lsp", "uji kompetensi", "ukk", "sertifikasi", "sertifikat"])) {
        return "Uji kompetensi (LSP/UKK) adalah penilaian kemampuan siswa sesuai standar profesi. Untuk RPL, siapkan portofolio web responsif sebelum jadwal asesmen.";
    }

    if (ada(teks, ["lulusan", "alumni", "setelah lulus", "prospek", "karier", "karir", "kerja jadi apa", "jadi apa", "lowongan"])) {
        return "Lulusan RPL bisa bekerja sebagai web developer, programmer, mobile developer, tester, UI/UX designer, atau admin database. Bisa juga berwirausaha digital, freelance, atau kuliah di bidang informatika.";
    }

    if (ada(teks, ["proyek", "karya siswa", "portofolio", "hasil karya", "contoh karya"])) {
        return "Contoh proyek siswa RPL: Aplikasi Inventaris QR, Portal CBT Online, E-Katalog Produk PKK, Sistem E-Learning, Chatbot Bimbingan Konseling, dan Dashboard Nilai Siswa.";
    }

    if (ada(teks, ["e-learning", "elearning", "e learning", "tugas online", "belajar online"])) {
        return "Sistem E-Learning & Tugas adalah proyek siswa RPL: platform pembelajaran daring untuk mengumpulkan tugas praktikum dan mengakses materi secara mandiri.";
    }

    if (ada(teks, ["siapa yang membuat", "siapa pembuat", "dibuat oleh", "siapa yang buat", "pembuat portal", "pembuat bot"])) {
        return "Portal dan chatbot ini dibuat sebagai proyek Modul Pemrograman Web Lanjut jurusan RPL SMK Negeri 9 Medan.";
    }

    // ---------- MATERI PEMROGRAMAN ----------
    if (ada(teks, ["html"])) {
        return "HTML adalah bahasa markup untuk membuat struktur halaman website, seperti judul, paragraf, gambar, dan tabel.";
    }

    if (ada(teks, ["css"])) {
        return "CSS digunakan untuk mengatur tampilan website, seperti warna, ukuran tulisan, tata letak, animasi, dan desain responsif.";
    }

    if (ada(teks, ["javascript"])) {
        return "JavaScript adalah bahasa pemrograman yang membuat website menjadi interaktif, seperti tombol, menu, dan chatbot.";
    }

    if (ada(teks, ["php", "laravel"])) {
        return "PHP adalah bahasa pemrograman sisi server untuk membuat website dinamis yang terhubung ke database. Framework populernya adalah Laravel.";
    }

    if (ada(teks, ["php", "laravel"])) {
        return "PHP adalah bahasa pemrograman sisi server untuk membuat website dinamis yang terhubung ke database. Framework populernya adalah Laravel.";
    }

    if (ada(teks, ["python"])) {
        return "Python adalah bahasa pemrograman yang mudah dibaca, dipakai untuk web, otomatisasi, data, dan kecerdasan buatan.";
    }

    if (ada(teks, ["java", "kotlin", "android", "flutter"])) {
        return "Aplikasi mobile bisa dibuat dengan Java atau Kotlin (Android) atau Flutter (lintas platform).";
    }

    if (ada(teks, ["database", "mysql", "basis data", "sql"])) {
        return "Database merupakan tempat menyimpan dan mengelola data. Salah satu contohnya adalah MySQL, yang diakses memakai perintah SQL.";
    }

    if (ada(teks, ["git", "github"])) {
        return "Git adalah alat untuk mencatat riwayat perubahan kode, dan GitHub adalah tempat menyimpan proyek secara online.";
    }

    if (ada(teks, ["belajar coding", "mulai coding", "pemula", "belajar pemrograman", "cara belajar"])) {
        return "Urutan belajar untuk pemula: HTML, lalu CSS, lalu JavaScript. Setelah itu PHP atau Python dan database. Praktik dengan membuat proyek kecil jauh lebih efektif daripada hanya membaca.";
    }

    if (ada(teks, ["website", "web"])) {
        return "Website adalah kumpulan halaman yang dapat diakses melalui browser. Website dibuat menggunakan HTML, CSS, dan JavaScript.";
    }

    // ---------- JIKA TIDAK ADA TOPIK LAIN YANG COCOK ----------
    if (ada(teks, ["rpl"])) {
        return "RPL adalah jurusan Rekayasa Perangkat Lunak. Tanyakan lebih lanjut, misalnya: guru produktif RPL, materi RPL, prospek kerja RPL, atau proyek siswa RPL.";
    }

    // ---------- PROFIL LENGKAP SEKOLAH ----------
    if (teks.includes("smkn 9") || teks.includes("sekolah") || ada(teks, ["profil", "tolong bantu", "bantu saya", "ceritakan", "kenalkan"])) {
        return "SMK Negeri 9 Medan\n" +
               "- Status: Negeri, akreditasi A\n" +
               "- NPSN: 10210766\n" +
               "- Alamat: Jl. Patriot No. 20 A, Lalang, Kec. Medan Sunggal, Kota Medan, Sumatera Utara\n" +
               "- Kepala sekolah: M. Sofa Ananda, S.Pd, M.Pd (jadwal 2025/2026)\n" +
               "- Jurusan: RPL, TKJ, DKV, Animasi, BCF, Pekerjaan Sosial\n" +
               "- Siswa sekitar 1.385, ruang kelas sekitar 37, guru sekitar 94\n" +
               "- Jam teori: 07.00 - 15.30 (praktik ada sesi pagi dan siang)\n" +
               "- Website: smkn9medan.sch.id\n\n" +
               "Kamu bisa tanya lebih lanjut, misalnya: alamat, jurusan, jam masuk, guru produktif RPL, pendaftaran, PKL, atau proyek siswa.";
    }

    return "Maaf, saya belum memahami pertanyaan tersebut. Ketik \"bantuan\" untuk melihat topik yang bisa saya jawab, atau cek smkn9medan.sch.id untuk informasi resmi.";
}

// MENAMPILKAN PESAN
function sendMessage() {
    const input = document.getElementById("userInput");
    const chatArea = document.getElementById("chatArea");

    if (!input || !chatArea) {
        console.error("Elemen chatbot tidak ditemukan!");
        return;
    }

    const pesan = input.value.trim();

    if (pesan === "") return;

    // Tampilkan pesan pengguna
    const userMessage = document.createElement("div");
    userMessage.className = "user-message";
    userMessage.textContent = pesan;
    chatArea.appendChild(userMessage);

    // Tampilkan jawaban chatbot
    const botMessage = document.createElement("div");
    botMessage.className = "bot-message";
    botMessage.style.whiteSpace = "pre-line"; // agar baris baru (\n) tampil

    try {
        botMessage.textContent = cariJawaban(pesan);
    } catch (error) {
        botMessage.textContent = "Maaf, terjadi kesalahan. Silakan coba kembali.";
        console.error(error);
    }

    chatArea.appendChild(botMessage);

    // Kosongkan kolom input
    input.value = "";

    // Scroll otomatis
    chatArea.scrollTop = chatArea.scrollHeight;
}

// ENTER UNTUK MENGIRIM PESAN
document.addEventListener("DOMContentLoaded", function() {
    const input = document.getElementById("userInput");

    if (input) {
        input.addEventListener("keydown", function(event) {
            if (event.key === "Enter") {
                sendMessage();
            }
        });
    }
});