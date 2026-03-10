# Some of These Days Thoughts

dengan hormat,  
Bergas Bimo Branarto - 10:15 PM Minggu, 07 Juli 2013

beberapa pikiran beberapa hari (atau beberapa minggu) ini. ada beberapa pikiran yang ga berkaitan dengan yang lain, mungkin sbnrnya postingan ini bisa dibagi2 jadi beberapa posting pendek (subpost), tapi males ah ngepost banyak2. gabungin aja lah ya.

## chat server application
dimulai dari ngulik2 oracle communications instant messaging server - kita singkat aja namanya jadi ocims. dia salah satu produknya oracle yang nanganin real-time communication, 'saingannya' oracle beehive (mungkin beehive udah tenar duluan). standar dan teknologi protocol yang diusung: xmpp, singkatnya si ocims ini adalah server buat chatting.

kalo kita chatting di ym misalnya, kita ngetik di aplikasi (desktop/web) nya ym, ngeliat presence (siapa aja yg online/offline), dll. semua aktivitas yg kita lakukan di aplikasi tersebut akan dikirim ke server chatnya yahoo. utk diterusin lagi ke setiap pemilik akun ym yg lagi online, secara realtime. misalnya kita ngechat temen kita, yg kita ketik dikirim ke server, trus server akan nerusin informasi tadi ke aplikasinya temen kita (baca: client). trus nongol deh message kita di sana.

technically, bukan server yang akan nerusin info tadi ke client. tapi tiap client naro listener di server, utk nerima message yang ditujukan ke dirinya, dan dibawa ke aplikasi kliennya.

itu artinya, server ga akan berguna kalo ga ada kliennya. aplikasi apa yang bisa jadi clientnya?

itu lah asiknya xmpp (atau jabber). selain teknologi, dia juga adalah sebuah standar. dengan adanya sebuah standar, beberapa provider (server) bisa menerima client dari berbagai aplikasi. sekarang google, facebook, yahoo pada pake xmpp utk instant messagingnya, dan utk bisa mengakses mereka (bahkan pada saat bersamaan) kita bisa menggunakan aplikasi seperti pidgin/adium dan kalo ga salah ym versi baru juga support utk login ke im-nya facebook..

kalo demikian, logikanya, setelah gw setup ocims, gw bisa konek pake pidgin dan adium. dan bener aja, memang bisa konek, login, ngliat presence, kirim2an message, juga kirim2an file. sukses.

## chat client application
oke, kita bisa konek pake adium. tapi main goalnya apa sih sebenernya? ternyata si klien itu lagi pengen integrasiin fitur chat ke aplikasi portalnya. portalnya dia pake oracle juga. jadi yang harus dilakukan berikutnya adalah masang chat client di sebuah aplikasi web. si aplikasi web ini nantinya akan di-embed ke halaman portal.

pidgin bisa di-embed ke aplikasi web ngga? gw ngga tau. gimana caranya?
coba googling2, nemu beberapa web chat app pake javascript, misalnya yg ini: http://opkode.com/media/blog/converse.js-xmpp-instant-messaging-with-javascript. wah bagus nih, coba ah. ternyata eh ternyata, browser punya kebijakan [same origin policy](http://en.wikipedia.org/wiki/Same_origin_policy), silakan baca juga [HTTP access control](https://developer.mozilla.org/en-US/docs/HTTP/Access_control_CORS?redirectlocale=en-US&redirectslug=HTTP_access_control). jadinya koneksi xmpp harus 'dialihkan' melalui http, memanfaatkan [BOSH](http://en.wikipedia.org/wiki/BOSH).

so, terkait dengan aplikasi client ini, ada 2 opsi: 
1) pake javascript yg udah ada, trus setup bosh di ocims, atau 
2) ga perlu setup bosh, tapi bikin aplikasi xmpp client pake java, utk di-embed ke web app. 

opsi (1) keliatannya butuh effort yang lebih banyak utk ngertiin dulu apa itu bosh, dan gimana cara kerja bosh sbnrnya, dan gimana hubungan teknis bosh dan xmpp server. jadi karena dikejar waktu, opsi (2) lah yg dipake.

harusnya kalo pake javascript aplikasinya bisa jauh lebih ringan daripada aplikasi webapp java. terkait dengan masalah server processing. kalo pake java framework, misalnya jsf atau adf atau yg lain, komponen2 direndernya oleh server, dengan kata lain, server harus melakukan juga fungsi tambahan selain processing data, kalo concurrent usernya banyak mungkin akan kerasa beratnya.

tapi apa mau dikata, waktu lah yang akhirnya mengerucutkan pilihan. webapp pun dibuat pake framework oracle adf (mempermudah integrasi dengan oracle webcenter portal, udah ada pluginnya di IDE jdeveloper) dan xmpp client diimplementasi menggunakan [smack api](http://www.igniterealtime.org/projects/smack/).

kondisi saat ini, xmpp client sudah berhasil dijalankan (terpisah dengan framework adf). tetapi saat diintegrasikan dengan framework adf, masih tersangkut masalah terkait dengan mekanisme page rendering dan data control yang dimiliki sama adf. curhatan soal ini dibahas dikit di subpost life barrier di bawah.

## review soap vs rest webservices
sebenernya ini dimulai dari case umum: gw pengen aplikasi gw dijadiin soa-based, utk integrasinya pake webservice. pertanyaannya: mendingan mana, webservice RESTful atau SOAP?

untuk bagian ini, bisa langsung menuju http://blog.nostratech.com/2013/07/membandingkan-soap-dan-rest-webservice.html.
di situ ada overview sekilas, dilanjutin dengan komparasinya. disertakan juga link2 referensi kalo mau baca2 lebih lanjut. silakan.

## life barrier
ini tentang sudut pandang.

semua hal yang dilakukan tiap orang, berasal dari sudut pandang orang tersebut terhadap objek yang dikenai pekerjaannya. hal-hal kecil yang dilakukan berulang-ulang dan akhirnya membentuk kebiasaan. karena telah terbiasa, akhirnya orang tersebut menjadi yakin dalam menjalaninya. entah salah atau benar, tapi keyakinan pada apa yang dilakukan (atau apa yang dituju) itulah yang memunculkan keberanian (menghadapi konsekuensinya) dan makin memperkuat karakter tiap orang, yang tentunya berbeda satu sama lain. sudut pandangnya berbeda.

misalnya seorang programmer. anggaplah dia programmer java. terbiasa menggunakan library2 opensource dalam proses developmentnya. karena yang digunakan adalah library, maka logika programming yang dia terapkan pun berdasarkan logikanya. logika dan arsitekturnya adalah rancangan logika sang programmer.

tiba-tiba pada suatu hari, programmer tersebut diminta untuk melakukan development softwarenya menggunakan framework ([bukan library](http://stackoverflow.com/questions/148747/what-is-the-difference-between-a-framework-and-a-library)) milik vendor tertentu. library mengacu pada reusable functions, framework mengacu pada reusable behaviors. behaviors berarti tingkah laku, dan tingkah laku terkait dengan logika si pembuatnya, terkait lagi dengan sudut pandang pembuatnya.

adalah sebuah kesalahan fatal bagi seorang programmer untuk ngotot membawakan logikanya di tengah framework yang dia gunakan. karena dalam banyak kasus, logika sang programmer tidak sejalan dengan logika pembuat framework. dan pemanfaatan framework itu pun jadinya bukan best practice nya framework itu. dan bug2 yang tidak perlu pun bermunculan, dan usaha2 fixingnya pun bisa jadi malah memperparah keadaan. dan mungkin solusi terakhir yang bisa dilakukan adalah rework. mengikuti logika pembuatnya.

konteks yang sama bisa juga diterapkan dalam logika beragama. ketika seseorang telah menjalani hari2nya dengan keyakinan yang berasal dari logikanya sendiri, selama bertahun-tahun. dan kemudian berusaha mengenal suatu agama dan/atau kepercayaan (mendekati keyakinan melalui sudut pandang tertentu) tetapi dengan membawa logikanya dalam (berusaha) memahami kepercayaan itu.

agama, artinya [aturan](http://blog.umy.ac.id/agamruhulb/filsafat/falsafah-agama/), untuk membuat jadi teratur. mengatur behavior tertentu, bisa dianalogikan sebagai framework tiap orang sebagai programmer yang memprogram kehidupannya, untuk mengenal framework, harus dilepaskan dulu logika pribadinya. ikuti alur dan mekanisme frameworknya.

dan, yah… ga mudah untuk melepas logika bawaan. karena artinya sudut pandangnya harus diubah. tetapi untuk mengenal sebuah framework/agama, sudut pandang harus diubah mengikuti framework/agama-nya. walaupun ga mudah.