# Wind Flow Simulation - Lattice Gas Automata 1

dengan hormat,  
Bergas Bimo Branarto - 8:41 PM Senin, 22 Maret 2010

ni urutan kegiatan gw di pengerjaan tugas akhir, pake program matlab.
1. bikin lattice dan boundary condition.
2. bikin kondisi partikel pada lattice.
3. bikin aturan jika partikel numbuk boundary
4. bikin obstacle (lingkaran atau garis - untuk verifikasi).
5. bikin aturan jika partikel numbuk obstacle
6. bikin aturan jika partikel numbuk partikel
7. verifikasi
8. masukin gambar ke lattice
9. jadiin gambar sebagai obstacle
10. verifikasi kuantitas fisis

yg pertama:  
bikin lattice dan boundary. gw bayangin bahwa gw akan make resolusi komputer sebanyak 640 x 320 pixel. satu pixel kita bayangin aja 1 titik. nah dari sekumpulan titik-titik itu gw pilih sebagian untuk dijadiin lattice. gw bayangin lagi titik2 terpilih itu ada di semua kordinat x = 1, 9, 17, ..., 637 dan semua koordinat y = 1, 9, 17, ..., 313. jadi antar titik punya jarak masing2 8 pixel horisontal dan 8 pixel vertikal.

kalo mau nandain, bikin aja semua titik2 terpilih itu bernilai "1" dan titik2 lainnya bernilai "0".

untuk bikin boundary condition, kita tandain dulu semua titik di bagian atas dan bagian bawah pixel, berarti di semua nilai x untuk y maksimal ( = 320 ) dan y minimal ( = 1 ). semua titik2 dalam syarat ini diganti aja kondisinya, bikin jadi pake tanda - . ntar jadinya ada garis horisontal di atas dan di bawah lattice.

berikutnya gw mau bikin partikel dan kondisinya yang ada di lattice. nyatain partikel tuh ada di dalam tiap titik lattice, dengan kemungkinan 6 kondisi yang dimilikinya. 6 kondisi itu adalah 6 arah kecepatannya. dengan semua arah tersebut seperti membentuk bidang segienam sama sisi, dengan arah 1 mengarah ke sudut kanan atas segienam, dan arah 2 mengarah ke sudut kiri atas segienam, dan arah berikutnya sesuai rotasi berlawanan arah jarum jam.

untuk kondisi awal, bikin aja semua partikel memiliki arah 6, yaitu horisontal ke arah sumbu x positif.

berikutnya gw bikin pergerakan partikel di dalam lattice. gw bikin aturannya dengan gambaran bahwa partikel gerak di semua titik di dalem resolusi komputer yg gw pake, bukan cuma yang ada di dalam lattice. yg titik latticenya ntar dipake buat ngitung vektor kecepatan rata2nya aja. nah pergerakan partikel arah 1 dinyatain dengan mindahin partikel ke titik pixel di kanan atasnya. kalo ada di y maksimal, berarti partikel pindah ke x+1 dan kembali ke y minimum (ini pake syarat batas siklik). pola aturan ini bisa diterapkan untuk semua partikel di titik2 syarat batas.

setelah itu gw nyatain dengan iterasi bahwa si 'tetangga' yang bisa dikunjungin sama partikel sebagai kondisi partikel yang baru.

sampe sini gw coba untuk nampilin hasilnya dulu. jadi gw itung dulu jumlah partikel di tiap titik lattice tiap arah. trus gw itung kecepatan rata2 partikel di tiap titik lattice (selama jumlah timestep) dengan perbandingan besarnya sebagai vektor di sumbu x-y. masukin besar acuannya, untuk kondisi maksimal besar vektor kecepatannya adalah 1. nanti biar matlab yang ngitung perbandingan besar vektor kecepatan rata2 berdasarkan kondisi partikel di dalam lattice.

hasilnya ditampilin dalam koordinat kartesian x-y dengan gambar panah yang menunjukkan vektor kecepatan di tiap titik yang dinyatain sebagai lattice.

sekarang gw mau coba gimana kalo partikel nabrak boundary, trus bikin obstacle dan kondisi partikel setelah ada obstacle. gw masih belom nemu nih caranya.. kira2 gimana caranya ya??

> "the answer, my friend, is blowing in the wind."  
-bob dylan


.. bersambung