const API_URL='https://script.google.com/macros/s/AKfycbw_qvloUY5sHgDqI4w_oH3P7ZGeba5iGD37UDK0lChBOETSd3iYfjbrwNrdZ4SDdZUplg/exec';

const kategoriData={
Pengeluaran:['🍔 Makanan','🛒 Belanja','🚗 Transportasi','💡 Tagihan'],
Pemasukan:['💼 Gaji','💰 Bonus','💳 Transfer']
};

function kategoriUpdate(){
kategori.innerHTML='';

kategoriData[jenis.value].forEach(item=>{
kategori.innerHTML += `<option>${item}</option>`;
});
}

kategoriUpdate();

function login(){

fetch(
API_URL+
'?action=login&username='+
username.value+
'&password='+
password.value
)

.then(r=>r.json())
.then(data=>{

if(data.success){
localStorage.user=username.value;
showApp();
}else{
alert('Login gagal');
}

});

}

function showApp(){

let user=localStorage.user;

if(!user) return;

loginBox.style.display='none';
app.style.display='block';

welcome.innerHTML='Halo '+user+' 👋';

loadData();

}

function simpan(){

fetch(API_URL,{
method:'POST',
body:JSON.stringify({
tanggal:tanggal.value,
user:localStorage.user,
jenis:jenis.value,
kategori:kategori.value,
keterangan:keterangan.value,
nominal:nominal.value
})
})

.then(r=>r.json())
.then(()=>{
loadData();
});

}

showApp();
