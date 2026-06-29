
const API_URL='https://script.google.com/macros/s/AKfycbytsLWncsMU8G__2izyJumeaszT2lZdLem5PnoerswVco4yA4WVT7GO2jAymVJaHonT4A/exec';

let user='';

function login(){
let u=username.value;
let p=password.value;

fetch(API_URL+"?action=login&username="+u+"&password="+p)
.then(r=>r.json())
.then(data=>{
if(data.success){
localStorage.setItem("user",u);
user=u;
showApp();
}else{
alert("Login gagal");
}
});
}

function showApp(){
user=localStorage.getItem("user");
if(!user)return;
loginBox.style.display='none';
app.style.display='block';
welcome.innerHTML='Halo '+user;
loadData();
}

function simpan(){
fetch(API_URL,{
method:'POST',
body:JSON.stringify({
action:'save',
user:user,
tanggal:tanggal.value,
jenis:jenis.value,
kategori:kategori.value,
keterangan:keterangan.value,
nominal:nominal.value
})
})
.then(r=>r.json())
.then(()=>loadData());
}

function loadData(){
fetch(API_URL+"?action=get")
.then(r=>r.json())
.then(data=>{
let html='';
data.forEach(d=>{
html+=`<tr>
<td>${d.tanggal}</td>
<td>${d.user}</td>
<td>${d.jenis}</td>
<td>${d.kategori}</td>
<td>${d.nominal}</td>
</tr>`;
});
tbl.querySelector('tbody').innerHTML=html;
});
}

function logout(){
localStorage.clear();
location.reload();
}

showApp();
