# Jalur Pengiriman

dengan hormat,  
Bergas Bimo Branarto - 9:33 PM Minggu, 01 April 2012

bayangin sebuah kondisi dimana manusia ga bisa bicara langsung dengan tuhannya. mungkin karena jauhnya jarak antara keduanya, atau mungkin karena ada frekuensi yang tertutup antara keduanya sehingga suara yang satu tidak dapat diterima dan diolah oleh yang lainnya. atau mungkin karena perbedaan bahasa sehingga komunikasi tidak dapat diterima dengan baik oleh salah satu pihak, yang ada adalah kesalahpahaman..

ah, apa pun penyebabnya, semua kemungkinan itu akhirnya menghasilkan satu akibat yang sama: yaitu sang manusia ga bisa bicara langsung dengan tuhannya.

manusia mengucap doa. bisa dalam hati, bisa teriak, bisa berupa tulisan, bisa berupa gambar, bisa berbahasa indonesia, bisa berbahasa inggris, bisa berbahasa zimbabwe, bisa berupa apa pun.

seandainya tuhan punya satu bahasa tertentu, yang ga bisa dibayangkan apalagi didefinisikan oleh manusia, mungkin manusia cuman bisa me-label-i bahasa itu sebagai 'bahasa ilahi'. atau seandainya tuhan memiliki frekuensi tertentu untuk menerima segala bentuk komunikasi, dan frekuensi tersebut bahkan belum diketahui eksistensinya oleh manusia. dan seperti biasa, manusia lalu cuma bisa melabelinya sebagai 'frekuensi ilahi' dan seandainya-seandainya yang lain.

manusia ngucap doa, menyatakan kepasrahan, meminta ampun, meminta petunjuk. manusia meminta. manusia mengharapkan 'jawaban' dari tuhannya. kadang kala jawaban itu dirasa tak kunjung datang.

padahal mungkin aja jawaban itu sudah datang beberapa waktu sebelumnya. cuman manusianya aja yang ga bisa nerima atau ngolah jawaban itu. ketidakterhubungan bahasa manusia dengan bahasa ilahi, atau frekuensi manusia dengan frekuensi ilahi.ketersampaian informasi yang tidak kesampaian (halah, ruwet!)..

---

bayangin tuhannya manusia tadi memiliki singgasana di sebuah negri di balik sebuah gunung yang sangat tinggi, yang ga bisa dipanjat oleh manusia, ga bisa dilewatin oleh manusia.

dan malaikat lah yang bisa menjadi perantara antara bahasa manusia dengan bahasa ilahi.

mungkin salah satu solusinya adalah manusia tadi menitipkan doanya ke awan, tepat di atas puncak gunung tinggi yang memisahkannya dengan tuhannya. dan salah satu malaikat di singgasana ilahi akan mengambil doa tersebut dari awan, menerjemahkannya ke bahasa ilahi, dan menyampaikannya ke sang tuhan.

dan mungkin dengan demikian tuhan pun akan dengan leluasa mengolah doa tadi, dan memberikan jawaban, sebuah petunjuk yang diharapkan oleh si manusia. malaikat tadi kemudian akan meletakkan jawaban tuhan tadi ke awan.

dan kemudian mungkin saja ada sesosok malaikat lain, yang bertempat di sisi luar gunung, berada di sisi yang sama dengan si manusia, menyamar sebagai manusia, mengambil jawaban tadi di awan dan menyampaikan ke si manusia dengan bahasa yang dimengerti oleh si manusia.

yah, malaikat ini bisa aja menjelma sebagai seorang bapak, ibu, kakak, adik, teman, guru, atau siapa pun yang bisa menyampaikan pesan tadi dengan baik kepada si manusia. dan akhirnya si manusia itu pun menerima response dari tuhan atas doanya tadi.

dan kehidupannya terus mengalir sebagaimana adanya.
sebuah jalur pengiriman antar dunia. dunia manusia dan dunia ilahi. melalui perantara para malaikat dan standar bahasa yang dimiliki oleh para malaikat itu (yang memang diciptakan demikian oleh sang tuhan tadi).

jalur pengiriman.

---

si subjek meletakkan langsung sebuah pesan di awan. dan dengan seenaknya (bener2 seenaknya) gw istilahkan sebagai 'pelayanan awan', cloud service, atau mungkin dalam konteks informasi, lebih banyak dikenal orang sebagai web service.

pesan yang diletakkan itu adalah sebuah representasi dari apa yang disampaikan oleh subjek. Representational State Transfer, enaknya sih kita singkat aja sebagai REST.

bisa aja pesan itu berupa sekumpulan data request, dalam format tertentu. langsung dikirimkan oleh user melalui protokol HTTP ke alamat (url) tertentu yang terhubung dengan internet. kenapa HTTP? karena hampir semua komputer sekarang memiliki webbrowser, dan semua webbrowser bisa mengolah informasi yang dikirim melalui protokol HTTP.

sesuatu bertugas mengubah data-data yang terkirim tadi ke dalam format xml. kenapa xml? karena xml itu udah jadi sebuah standar bersama mengenai bentuk kemasan data, tujuannya untuk mempermudah pengiriman data antar device.

lalu ada sebuah object yang kita buat untuk mengambil data dari cloud tadi, asiknya sih kita sebut sebagai 'requestClient'. nah si requestClient ini ngambil data berformat xml tadi dan memasukkan nilai2nya ke dalam atribut objek tertentu. object ini kemudian dikirim ke sebuah class lain untuk diproses, dan mengembalikan data-data ke dalam object lain sebagai response.

object requestClient mengambil lagi object response tadi dan mengirimkannya ke webservice untuk response. di sini bisa kita sebut bahwa object requestClient bertindak sebagai 'malaikat dari singgasana ilahi'..

kemudian kita buat sebuah object, misalnya namanya 'responseClient' yang tugasnya adalah ngambil data dari url response tadi dan mengirimkannya kembali ke user. karena kita ga tau pasti si user nge-request dan minta responsenya dalam device apa, asiknya sih kita buat dulu sebuah class 'Adapter' yang tugasnya utk nyesuaiin bahasa/format yang diinginkan oleh user. dan di sini bisa kita anggep Adapter adalah 'jelmaan malaikat yang menerjemahkan bahasa ilahi kepada kita'..

hmm  
apaan tuh?

---

jadi ada framework, namanya [RESTLet](http://www.restlet.org/documentation/2.0/tutorial). dia bisa dipake untuk bikin web service tanpa menggunakan SOAP (simple object access protocol). kalo pake SOAP,  ruginya: interoperabilitasnya lebih rendah.

dengan pake sistem REST, interoperabilitas lebih tinggi karena bisa diakses dengan apa aja, selama pengirimannya lewat protocol HTTP. tapi kayanya sih bakal lebih rumit utk ngurusin securitynya (ga tau juga sih, gw belom nyobain securitynya).

dalam RESTLet, web service dinyatakan sebagai sebuah 'resource' dari objek yang mau disimpen di alamat (url) tertentu. dan resource ini diarahkan oleh sebuah terminal/router. dan karena ini adalah aplikasi server, maka pastinja mesti didaptarin tuh terminalnya di web.xml.

---

seandainya bayangan tentang komunikasi antara manusia-malaikat-tuhan emang gitu adanya,
dan seandainya komunikasi make internet sebagai toolnya,
mungkin RESTLet adalah salah satu framework yang bisa digunakan untuk jalur pengiriman informasi(doa/jawaban)nya..