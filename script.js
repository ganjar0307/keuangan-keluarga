const API_URL = 'https://script.google.com/macros/s/AKfycbwnIpfMygNCpaYOQJMnfIGUjUtuba0WLNN6iCmKbvj3Sc_vSOtAMV7ad2god2ThlcU9lQ/exec';

// ==========================
// DATA KATEGORI
// ==========================

const kategoriData={

Pengeluaran:[

'🍔 Makanan',
'🛒 Belanja',
'🏠 Rumah Tangga',
'🚗 Transportasi',
'💡 Tagihan',
'🎓 Pendidikan',
'💊 Kesehatan',
'✨ Skincare',
'🎮 Hiburan',
'💼 Operasional Kerja',
'👨‍👩‍👧 Orang Tua',
'💸 Hutang',
'💰 Saving',
'📌 Lainnya'

],

Pemasukan:[

'💼 Gaji',
'💰 Bonus',
'💵 Usaha',
'💳 Transfer',
'📥 Piutang',
'💵 Pengembalian Hutang',
'📌 Lainnya'

]

};


// ==========================
// FORMAT RUPIAH
// ==========================

function rupiah(angka){

return "Rp "+

Number(angka)

.toLocaleString(
'id-ID'
);

}



// ==========================
// TOAST
// ==========================

function toast(pesan){

let t=
document.getElementById(
'toast'
);

t.innerHTML=
pesan;

t.style.display=
'block';

setTimeout(()=>{

t.style.display=
'none';

},2000);

}



// ==========================
// UPDATE KATEGORI
// ==========================

function kategoriUpdate(){

kategori.innerHTML='';

kategoriData[

jenis.value

]

.forEach(item=>{

kategori.innerHTML+=

`<option>

${item}

</option>`;

});

}

kategoriUpdate();




// ==========================
// LOGIN
// ==========================

function login(){

let userInput=

username.value.trim();

let passInput=

password.value.trim();


if(

userInput=='' ||

passInput==''

){

toast(

'⚠ Isi username dan password'

);

return;

}



fetch(

API_URL+

'?action=login'+

'&username='+

encodeURIComponent(

userInput

)+

'&password='+

encodeURIComponent(

passInput

)

)

.then(

response=>response.json()

)

.then(data=>{

if(

data.success

){

localStorage.setItem(

'user',

userInput

);

showApp();

toast(

'✓ Login berhasil'

);

}

else{

toast(

'❌ Login gagal'

);

}

})

.catch(error=>{

console.log(error);

toast(

'❌ Server error'

);

});

}



// ==========================
// SHOW APP
// ==========================

function showApp(){

let user=

localStorage.getItem(

'user'

);


if(

!user

){

return;

}


loginBox.style.display=

'none';


app.style.display=

'block';


welcome.innerHTML=

'Halo, '+

user+

' 👋';


loadData();

}



// ==========================
// SIMPAN DATA
// ==========================

function simpan(){

saveBtn.innerHTML=

'Menyimpan...';


saveBtn.disabled=

true;


fetch(

API_URL,

{

method:'POST',

body:JSON.stringify({

tanggal:

tanggal.value,

user:

localStorage.user,

jenis:

jenis.value,

kategori:

kategori.value,

keterangan:

keterangan.value,

nominal:

nominal.value

})

}

)

.then(

response=>response.json()

)

.then(data=>{


saveBtn.innerHTML=

'Simpan';


saveBtn.disabled=

false;


toast(

'✓ Data berhasil disimpan'

);


// reset input

tanggal.value='';

keterangan.value='';

nominal.value='';

jenis.selectedIndex=0;

kategoriUpdate();


// refresh dashboard

loadData();


})

.catch(error=>{

console.log(error);

toast(

'❌ Gagal simpan'

);

});

}



// ==========================
// LOAD DATA
// ==========================

function loadData(){

let user=

localStorage.getItem(

'user'

);


fetch(

API_URL+

'?action=get'+

'&user='+

encodeURIComponent(

user

)

)

.then(

response=>response.json()

)

.then(data=>{


let pemasukan=0;

let pengeluaran=0;

let total=0;

let html='';

let kategoriRingkasan={};


data.reverse();


data.forEach(item=>{


total++;


let nominal=

Number(

item.nominal

);


if(

item.jenis==

'Pemasukan'

){

pemasukan+=

nominal;

}

else{

pengeluaran+=

nominal;

}



kategoriRingkasan[

item.kategori

]

=

(

kategoriRingkasan[

item.kategori

]

||

0

)

+

nominal;



html+=`

<div class=

"item ${item.jenis}"

>

<b>

${item.kategori}

</b>

<br>

${item.keterangan}

<br>

${rupiah(

nominal

)}

<br>

<small>

${item.tanggal}

</small>

</div>

`;



});


// dashboard

masuk.innerHTML=

rupiah(

pemasukan

);


keluar.innerHTML=

rupiah(

pengeluaran

);


saldo.innerHTML=

rupiah(

pemasukan-

pengeluaran

);


jml.innerHTML=

total;


// riwayat

riwayat.innerHTML=

html;


// laporan

let kategoriHTML='';


for(

let k

in

kategoriRingkasan

){

kategoriHTML+=`

<p>

${k}

:

${rupiah(

kategoriRingkasan[k]

)}

</p>

`;

}


kategoriLaporan.innerHTML=

kategoriHTML;


})

.catch(error=>{

console.log(error);

toast(

'Gagal memuat data'

);

});

}



// ==========================
// LOGOUT
// ==========================

function logout(){

if(

confirm(

'Yakin logout?'

)

){

localStorage.removeItem(

'user'

);

location.reload();

}

}



// otomatis login

showApp();
