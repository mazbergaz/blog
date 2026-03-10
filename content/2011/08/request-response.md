# Request - Response

dengan hormat,  
Bergas Bimo Branarto - 8:47 PM Kamis, 18 Agustus 2011

respons.  
pengen dapet respons? kirim request lah.

anggeplah kita punya beberapa parameter untuk dijadiin request. kita lempar lah request ini ke sebuah sistem.

kalo sistemnya adalah engine transaksi keuangan bisa jadi responsnya cuma berupa kode '00' jika berhasil atau '06' jika gagal.

kalo sistemnya adalah halaman website, responsnya adalah tampilnya halaman yang dipanggil.

kalo sistemnya adalah orang, bisa jadi responsnya adalah kalimat 'ga tau..' atau mungkin malah '......' (alias dicuekin).

yah, bisa macem2 bentuk respons. tergantung kaya gimana requestnya dan kaya gimana kelakuan sistem yang diharapkan utk ngerespons.

dengan adanya respons, kita jadi kenal sama sistemnya, dan kita tau gimana harus bertindak (utk ngerawat sistemnya, atau utk manfaatin sistemnya, atau untuk mbenerin sistemnya, atau apa pun lah).

dulu dosen gw bilang: "kalo mau kenal sama suatu sistem, kasih lah gangguan ke sistem itu dan liat responsnya". kira2 mirip lah, anggep aja tiap request adalah gangguan bagi internal sistem itu. maksudnya, misalnya si sistem lagi bengong, atau lagi diem (lembam lah pokoknya), trus kita kasih pertanyaan atau perintah, itu kan gangguan untuk ke-diem-annya, dia jadi mesti njawab atau mesti nyuekin, atau mesti ngerjain perintahnya.. gangguan lah.

apapun responsnya, kalo ga sesuai keinginan, yaudah itu lah dia. (cukup tau aja lah..), kalo sesuai keinginan yaudah alhamdulillah.

tapi yang pasti, tiap sistem butuh gangguan (atau request) biar dinamis.  
dan eksternal butuh mengganggu untuk bisa ngenal sistem itu (dari responsnya).

tapi jangan lupa juga, request-response kan bentuk komunikasi. yang namanya komunikasi pasti nyediain tempat untuk adanya kesalahpahaman. sistem salah nangkep maksud request (jadi responsnya ga sesuai harapan). atau justru requestnya yang salah sehingga respons yang diinginkan pun ga tercapai. atau bisa jadi requestnya bener, responsnya bener, tapi si pemberi request yang salah nangkep arti responsnya (salah nerjemahin).

semua itu bisa terjadi, siap2 aja.

di luar dari segala tetek bengek dan suka duka dalam merequest dan merespons, jelas request ga bisa gitu aja dilakukan.

misalnya, kita ga bisa langsung nge-request ke servernya fesbuk untuk nampilin foto orang tertentu yang kita pengen (dengan langsung ngeklik alamat url-nya foto itu). minimal kita mesti login dulu. setelah login, profil kita juga mesti 'diijinin' untuk ngeliat foto2 itu dari si empunya foto.

atau yang lebih simpelnya lagi, bahkan untuk bisa login di fesbuk kita mesti buka dulu koneksi internetnya. kegiatan 'login' juga adalah merupakan request ke sistem aplikasi web.

perlu ada session yang dibuka sebelom kita ngerequest. dan perlu ada request yang dilempar sebelom kita dapet respons.

tenang aja, kita ga perlu berasal dari halaman http untuk bisa ngelempar request dan nerima respons dari halaman http. yang penting kita nyiapin akses untuk komunikasinya aja. kita buka aja koneksinya, trus alirin datanya.

kita ga perlu jadi pangeran utk bisa ngegodain (ngerequest) seorang puteri cantik. dan kita juga ga perlu jadi pangeran untuk bisa dibentak2 (respons) sama si puteri cantik tadi. kita cuma perlu berada di tempat yang dia lewatin, atau tau nomer telponnya (atau bahkan ym/fbnya :D).

kita bisa berasal dari mana aja. kita bisa jadi siapa pun diri kita sebenernya.

kalo kita adalah class java, sebagai client, yang penting kita open HttpUrlConnectionnya, kita printStream parameter2nya, dan post ke url-nya server yang kita inginkan, dan siapin HttpUrlConnection utk nerima respons dari server itu. kalo koneksi berhasil terbuat, kita akan dapet respons pertama kode '201', kalo dicuekin (mungkin karena salah alamat) kita akan dapet respons kode '404'. dan kalo kita berhasil konek tapi ga dibolehin ngakses dia, kita akan tetep dapet respons, yaitu kode '401' atau '403'.

kita bisa cegat si puteri di tempat dia beraktivitas, setelah dia lewat di tempat kita, kita bisa buka sessionnya dengan bilang 'eh..', kalo dia nengok berarti connection/session is created (bisa dilanjutkan dengan mengirim request). kalo ga nengok, tendang aja kakinya dan bilang 'sori..' kalo dia senyum trus ngajak kita kenalan berarti responsnya = transaction success. kalo dia cemberut jangan kecil hati, paling ga dia udah ngerespons request kita (minimal itu artinya koneksi/sessionnya udah kebuka).

kalo dirasa responsnya masih kurang untuk kita ngecek apakah sessionnya udah kebuka, angkat aja roknya. dan session (plus rok!) pasti terbuka, dengan request pertama adalah ngangkat rok, dan respons pertamanya adalah tamparan.

berhasil! session terbuka, kita uda ngerequest dan udah dapet respons. dengan demikian urusan selanjutnya bisa jadi lebih mudah, tinggal disesuaikan aja requestnya untuk dapetin respons yang diinginkan.

hal yang menyenangkan dalam pihak Client: kita bisa agresif dan kreatif dalam memberi request dan bisa leluasa menerjemahkan responsnya.

dengan mengingat kesenangan itu,  
dengan mengingat bahwa interaksi tidak lebih dari sekedar request dan respons,  

lets just make a move for a session.