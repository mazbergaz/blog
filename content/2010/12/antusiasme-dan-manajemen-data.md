# Antusiasme dan Manajemen Data

dengan hormat,  
Bergas Bimo Branarto - 3:30 AM Sabtu, 18 Desember 2010

waktu yang tepat untuk rehat sebentar. orang-orang udah pada tidur. enak, sepi.

jadi di sini lah gw berada sekarang, di sebuah rumah kontrakan dengan 1 rumah utama dan 10 kamar. ngumpul bareng beberapa temen dengan ide dan cita-cita yang sama, nyoba ngembangin diri dalam sebuah grup, masih nyoba menghidupi diri dengan proyek lepas. dengan fasilitas seadanya, dengan kemampuan semampunya, dengan cita-cita dan kemauan belajar sebesar-besarnya. tercatat 12 orang udah bergabung, 2 kamar dan 1 rumah utama (kebagi jadi 4 bagian) udah terkontrak.

jadi di sini gw belajar jalan ke suatu tujuan tertentu, pada jarak tertentu dari tempat awal, nyoba membaginya dalam beberapa tahapan, yang kemudian dibagi lagi dalam satuan-satuan langkah kecil. tiap kesalahan atau keambiguan di suatu langkah bisa mengakibatkan kesalahan atau keambiguan pada langkah berikutnya. di sini juga gw belajar tentang memberi perintah, menjalankan perintah dan menampilkan hasil perintah. bahwa ternyata memberi, menjalankan dan menampilkan hasil perintah masing-masing punya tingkat kesulitannya sendiri-sendiri.

berulang-ulang terlintas di pikiran, bahwa **dunia ini diciptakan bagi orang-orang yang memiliki antusiasme terhadap hal tertentu**. antusiasme berawal dari minat. minat bisa berawal dari tuntutan atau dari keingintahuan. minat menghasilkan kemauan untuk belajar. kemauan untuk belajar menghasilkan kegiatan. kegiatan menghasilkan keahlian. dan dengan keahlian kita bisa mengambil peran.

ngomong-ngomong soal peran: ada peran, ada fasilitas, dan tentunya ada tipe akses yang dimiliki tiap peran itu terhadap fasilitas yang ada. tidak semua fasilitas bisa diakses dengan cara yang sama oleh semua peran. terima aja, emang gitu adanya. sama seperti admin yang memiliki akses tak terbatas atas data-data di sebuah instansi, melebihi akses yang dimiliki sama pimpinan proyek, pemilik proyek, dan pekerja proyek.

> _jadi sejauh ini gw tuh mau nulis apa? entah, blom kepikiran.. yang penting kejar setoran dulu untuk ngisi archive bulan desember._

gara-gara barusan nulis data, baru inget lagi bahwa beberapa minggu terakhir ini pikiran gw dipenuhin sama gimana caranya ngatur data-data sedemikian rupa biar gampang diaturnya. mulai dari masukin data, ngehapus data, ngerevisi data dan ngatur keterkaitan antar data. orang-orang bilang semua kegiatan tadi bisa dimasukin jadi 1 variabel namanya _**database**_. keterkaitan antar data, perubahan satu data bisa ngakibatin perubahan dari banyak data lainnya.

misalnya sebuah perusahaan: punya data keuangan, data karyawan, data proyek. dalam data keuangan ada data tiap karyawan (dan gaji2nya), data tiap proyek (pengeluaran dan pemasukannya, waktu pelaksanaannya). dalam data karyawan ada data nama, alamat, gaji dan ada juga data proyek (tiap karyawan terlibat di proyek apa aja, peran masing2 di proyek itu apa aja, dll). semua saling terkait, gimana cara ngerumusin keterkaitannya? gimana cara ngebagi perumusan itu jadi langkah-langkah kecil? gimana cara nyampein langkah-langkah kecil itu dalam barisan perintah? gimana cara ngecek/ngukur ketepatan hasil tiap perintah? gitu deh.

> _jadi ngelantur kemana-mana deh, lanjut aja lah._

jadi inget sama **keteraturan singapur**. dengan sebuah kartu, kita bisa ngakses kereta MRT, bis dan minimarket 711. cara nggunainnya kira-kira mirip sama pulsa hp. si kartu itu dibeli dengan harga tertentu dan berisi nilai tertentu (sama kaya beli pulsa), penggunaannya:

pas masuk stasiun MRT kartu itu kita tempelin di sebuah mesin (yang nyatet lokasi stasiun dan nyatet jumlah pulsa di kartu) trus tinggal naik aja ke keretanya, pas turun dan keluar stasiun kita nempelin lagi kartunya (yang nyatet dan mbandingin lokasi stasiun berangkat dan lokasi stasiun pas turun - kalo ga keluar stasiun berarti dianggepnya ga ada perpindahan, pulsa ga berkurang).

penggunaan lain pas naik bis, begitu naik bis kita nempelin kartu itu di sebuah mesin yang nyatet lokasi kita naik, dan pas turun kita nempelin lagi ke mesin lain yang nyatet lokasi kita turun, pengurangan pulsa bergantung jarak antara naik dan turun). contoh di 711 gw ga sempet nyobain, ke minimarket gituan paling utk beli rokok, tapi rokoknya mahal banget (pulsa di kartu gw selalu ga pernah cukup utk beli rokok).

---

nah lho, kira-kira gimana tuh **sistem manajemen data transportasi**nya? gw kebayangnya gini:

tiap kartu punya data `jumlah_pulsa`. tiap stasiun MRT punya data `nomer_ID_stasiun`, data jarak antar stasiun dan method `pengurangan_jumlah_pulsa` . tiap bis 'terhubung' sama halte. tiap halte punya data nomer_ID_halte dan tiap ada bis dia 'ngirim' data ID itu ke mesin yang ada di bis. tiap bis punya _method_ `pengurangan_jumlah_pulsa`. bentuk keterhubungannya bisa jadi ada sistem komunikasi bis-halte, bisa juga ada tombol di dalem bis yang meng-generate `nomer_ID_halte` berdasarkan urutan di databasenya.

tiap kartu juga punya `tabel_sementara` yang isinya `nomer_ID_naik` dan `nomer_ID_turun`. masing-masing nomer ID itu sifatnya sementara (cuma bertahan dalam tiap pasang naik-turun) selebihnya data di 2 tabel itu dihapus lagi. tiap bis juga punya tabel_sementara yang gunanya untuk penyimpanan sementara `nomer_ID_halte`. selama bis berenti di halte, data itu kesimpen dan 'dioper' ke `tabel_sementara` di tiap kartu yang ditempelin.

karena ada 2 mesin di bis, berarti 1 mesin tugasnya masukin `nomer_ID_halte` ke tabel `nomer_ID_naik` di kartu, dan 1 mesin lagi tugasnya masukin nomer_ID_halte ke tabel `nomer_ID_turun` dan langsung masukin parameter jumlah_pulsa,  `nomer_ID_naik` dan `nomer_ID_turun` itu ke sebuah _method_ `pengurangan_jumlah_pulsa` yang memproses (mengkalikan jarak dengan satuan pengurangan) dan me-return nilai pengurangan jumlah pulsa untuk nggantiin data jumlah_pulsa di kartu. berikutnya mesin ini juga ngehapus data `nomer_ID_naik` dan `nomer_ID_turun` di kartu.

kalo di MRT, prosesnya mirip2 gitu juga, mungkin bedanya: tiap ada kartu yang ditempelin, mesin akan ngoper `nomer_ID_stasiun` dengan syarat: 'kalo tabel `nomer_ID_naik` kosong maka `nomer_ID_stasiun` dimasukin ke tabel `nomer_ID_naik`, jika tabel `nomer_ID_naik` berisi nilai tertentu maka `nomer_ID_stasiun` dimasukin ke tabel `nomer_ID_turun`' dan langsung masukin 2 nilai itu dan nilai `jumlah_pulsa` sebagai parameter di _method_ `pengurangan_jumlah_pulsa` yang me-return nilai ke kartu untuk menggantikan data jumlah_pulsa. berikutnya mesin ini juga ngehapus data `nomer_ID_naik` dan `nomer_ID_turun` di kartu.

untuk yang 711, mungkin mesin di kasirnya masukin nilai jumlah_harga_barang dan data `jumlah_pulsa` ke _method_ `pengurangan_jumlah_pulsa` dan kemudian me-return nilai hasilnya untuk nggantiin nilai jumlah_pulsa sebelumnya.

kalo mau dipilah-pilah properti dan aktivitas di tiap objek:

objek: kartu.
atribut: `jumlah_pulsa`, nilai temporary `nomer_ID_naik` dan nilai temporary `nomer_ID_turun`.

objek: mesin di stasiun MRT.
atribut: `nomer_ID_stasiun`.
method: ```pengurangan_jumlah_pulsa(jumlah_pulsa, nomer_ID_naik, nomer_ID_turun),  penghapusan_nilai_temporary(nomer_ID_naik, nomer_ID_turun).```


objek: mesin di bis. 
atribut: nilai temporary `nomer_ID_halte`. 
method: ```pengurangan_jumlah_pulsa(jumlah_pulsa, nomer_ID_naik, nomer_ID_turun),  penghapusan_nilai_temporary(nomer_ID_naik, nomer_ID_turun).```

objek: mesin kasir 711. 
atribut: nilai temporary `jumlah_harga_barang`.
method: ```pengurangan_jumlah_pulsa(jumlah_pulsa, jumlah_harga_barang),  penghapusan_nilai_temporary(nomer_ID_naik, nomer_ID_turun).```

objek: mesin pengisi pulsa
atribut: nilai temporary `jumlah_pengisian_pulsa`.
method: ```pengisian_pulsa(jumlah_pulsa, jumlah_pengisian_pulsa),  penghapusan_nilai_temporary(jumlah_pengisian_pulsa).```

---

kapan ya indonesia (khususnya bandung) bisa make skema se-sistematis itu (atau lebih baik lagi) untuk sistem transportasinya, gw mau lah jadi bagian yang ngerjain sistem manajemen datanya.