# Masalah Untuk Mengurangi Masalah

dengan hormat,  
Bergas Bimo Branarto - 2:15 PM Sabtu, 08 Oktober 2011

bayangin kita duduk di sebuah teras, di posisi yang agak lebih tinggi dari aktivitas keseharian, di tengah kota. kita liat kemacetan, kita liat pelanggaran-pelanggaran "kecil" seputar lalu lintas, kita liat trotoar berubah fungsi jadi tempat jualan atau tempat melintasnya motor yang mau ngehindarin macet, bukan lagi tempat yang nyaman bagi pejalan kaki.

dalam hati mungkin kita akan berkata "untunglah gw ga ada di jalan raya yang semrawut itu..", lalu mulai membayangkan asiknya duduk mengamati kesibukan (atau kesemrawutan?) sambil minum segelas kopi panas sambil ngerokok.

lalu kita alihkan pandangan ke lingkungan yang lebih dekat dengan posisi duduk kita. bayangin ada biji kopi yang baru aja disangrai, belom digiling jadi bubuk. bayangin juga seandainya ada sebuah alat, bentuknya kotak, kalo kita masukin biji kopi tadi, ga lama kemudian segelas kopi panas dengan aroma yang menggugah selera telah tiba secara otomatis di samping kita.

trus kita mulai mbayangin lagi, seandainya alat seperti itu emang ada, gimana cara kerjanya?

pasti ada sistem penghancur biji kopi, pasti ada sistem pemanas air, pasti ada sistem penuang bubuk kopi, pasti ada sensor untuk menentukan volume bubuk kopi yang harus dituang (berdasarkan volume gelas dan perbandingan takaran), pasti ada sistem penuang air dan penentu volume air yang mesti dituang (berdasarkan volume gelas dan perbandingan takaran), pasti ada sistem pengaduk, dan terakhir pasti ada sistem 'pengantar' gelas dari alat tersebut sampai lokasi tertentu di samping kita. dan masih banyak lagi masalah yang bisa diajukan terkait dengan alat itu, mengembangkan lagi dari masalah-masalah yang disebutin sedikit di atas.

ada sangat banyak masalah yang harus dipecahkan sebelum hidup kita sedikit lebih nyaman, menyempurnakan hidup.

apa yang menyempurnakan hidup? kenyamanan yang sempurna atau kegiatan yang kita lakukan untuk menyempurnakan kenyamanan itu sendiri? entah, terserah gimana masing-masing orang mempersepsikannya. bisa jadi salah satunya, bisa jadi keduanya.

kenyamanan yang sempurna. kalo kita artikan 'nyaman' sebagai kondisi dimana tidak ada (atau ada tapi sedikit) masalah, berarti untuk mendekati kenyamanan itu kita mesti mengurangi jumlah masalah.

kita balik lagi ke hal-hal yang tadi kita bayangin, ada kondisi lalu lintas, ada alat pembuat kopi, dan mungkin ada yang mbayangin hal-hal lain, ada banyak sekali masalah di sekitar kita. mulai dari masalah aktual (seperti contoh lalu lintas) sampai masalah ideal (berawal dan/atau berada di tataran ide).

dan dengan asumsi bahwa semua hal yang menjadi perhatian kita bermula dari persepsi tertentu kita akan sesuatu itu (semua hal punya potensi untuk jadi masalah, semua hal punya potensi untuk jadi peluang, semua hal punya potensi untuk membuat senang, semua hal punya potensi untuk membuat sedih, dan seterusnya), maka untuk mengurangi jumlah masalah yang mesti kita lakukan adalah berfokus pada satu hal/masalah/bidang/apapun.

dalam contoh kasus alat pembuat kopi otomatis tadi, keseluruhan sistem kerja terbagi jadi 7 subsistem. tiap subsistem memiliki masalah-masalahnya masing-masing. bayangin kalo 1 orang mau ngerjain semua itu sendiri. kebanyakan masalah tuh orang ntar, ksian..

pembagian sistem ke dalam subsistem itu sendiri udah merupakan upaya pengurangan masalah. berikutnya, mending dibagi-bagi aja masalah itu ke beberapa orang. misalnya 1 subsistem dibebanin ke 1 orang. bukan ga mungkin nantinya tiap subsistem ini akan terbagi jadi beberapa subsistem lagi. tergantung tingkat kesulitannya.

untuk ngehemat waktu, enaknya sih tiap subsistem itu dikerjain paralel. berarti yang perlu dilakukan berikutnya adalah bikin interface untuk komunikasi antar subsistem itu. misalnya interface antara sistem penghancur biji dengan sistem penuang bubuk kopi.

di sini orang yang ngerjain sistem penuang mesti ngasih tau kebutuhannya untuk memulai sistemnya. misalnya: dia butuh tau kopi udah jadi bubuk atau belum dan berapa volumenya. sepakatin dulu, kalo kopi udah jadi bubuk, sistem penghancur akan ngelempar variabel String bernilai "OK", dan akan ngelempar variabel double bernilai volume bubuk kopi.

baru deh sekarang orang yang ngerjain bubuk kopi bisa kerja, acuannya: dia mesti ngehasilin output String "OK" dan double volume bubuk kopi. dan orang yang ngerjain sistem penuang mengacu sama begitu ada variabel String "OK" nyampe ke sistemnya, dia akan ngecek berapa jumlah volume bubuk kopi, ngecek berapa volume gelas, dan ngaktifin sistem penuangnya.

jika kita adalah orang yang ngerjain sistem penghancur, kita ga usah mikirin sistem2 lainnya. yang penting kan udah jelas apa outputnya yang perlu kita hasilin. selanjutnya mungkin kita bisa mulai dengan 1. sensor (atau 'listener') utk ngecek apa ada biji tertuang, 2. proses penggilingan, 3. pengukuran volume, 4. media untuk melempar pesan ke interface.

gitu tuh, ternyata di dalam (sub)sistem penghancur, masih beranak lagi jadi 4 (sub)subsistem. mau bagi2 tugas lagi? atau mau dikerjain sendiri? terserah. yang pasti, utk mulai ngerjain kita perlu nyiapin interface lagi antar (sub)subsistem. 4 subsistem berarti 4 masalah. mau ngurangin masalah? kita pilih aja satu subsistem, sisanya dibagi-bagi ke orang lain.

misalnya kita pilih proses penggilingan. berarti kita mesti nunggu pesen yang masuk dari sistem listener, sepakatin dulu apa kode yang akan dilempar sama sistem listener, misalnya String "lanjut!". nah sekarang proses penggilingan akan digenerate sama sistem yang nerima kode String "lanjut!". program akan mengatur tegangan mana yang diaktifkan untuk njalanin mesin penggiling. kemudian bubuk kopi yang udah tergiling akan 'dijatuhkan' di sebuah wadah di bawah mesinnya.

lalu mungkin kita bisa nari sebuah timbangan digital di bawah wadah itu dan menyambungkannya dengan interface pengukuran volume. jika berat wadah > 0 maka sebuah kode akan terkirim ke interface dan interface itu akan ngelanjutin ke sistem pengukuran volumenya. tapi tenang, ini bukan masalah kita. ini masalahnya orang yang ngerjain pengukuran volume. dan seterusnya..

setelah semua orang selesai dengan kerjaannya masing-masing. tinggal dites deh hasilnya. masukin biji kopi ke alat dan lihat apa yang terjadi selanjutnya, pasti bisa dilacak di sistem mana terletak kesalahannya (kalau ada). dan biarkan orang itu bertanggung jawab sama kerjaannya (kalo orangnya udah ga ada, sepakatin aja siapa yg mesti beresin itu)..

jadi sejauh ini apa yang bisa disimpulin?
menurut gw,
1. secara manusiawi tiap orang akan bergerak menuju kenyamanannya masing-masing dengan membatasi lingkup perhatian dan pekerjaan sesuai minatnya (mengurangi scope masalah yang dihadapi). dan pada akhirnya kegiatan ini akan menghasilkan spesifikasi (atau keahlian spesifik) dari orang itu.

2. dengan simpulan 1, kita mesti siap dengan pertanyaan: "lu orang atau bukan? kalo lu orang, apa spesifikasi lu?". dan mungkin hal ini udah jadi trend di masa sekarang, dimana tiap orang akan menangani masalah tertentu yang spesifik di dalam sebuah keseluruhan sistem besar. istilah kerennya: outsourcing.

3. dari simpulan 2, ngeliat maraknya outsourcing sekarang ini, interfacing bisa dilihat sebagai satu titik vital dari semua sistem. bermain di zona interface berarti menggunakan sudut pandang bahwa keseluruhan sistem terbagi jadi beberapa subsistem yang saling berkomunikasi satu sama lain.