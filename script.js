const API_URL='https://script.google.com/macros/s/AKfycbw_qvloUY5sHgDqI4w_oH3P7ZGeba5iGD37UDK0lChBOETSd3iYfjbrwNrdZ4SDdZUplg/exec';

function simpan(){

saveBtn.innerHTML='Menyimpan...';
saveBtn.disabled=true;

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

.then(response=>response.json())

.then(data=>{

    // Tombol kembali normal
    saveBtn.innerHTML='Simpan';
    saveBtn.disabled=false;

    // Notifikasi berhasil
    toast('✓ Data berhasil disimpan');

    // Kosongkan form
    tanggal.value='';
    keterangan.value='';
    nominal.value='';

    jenis.selectedIndex=0;
    kategoriUpdate();

    // Refresh dashboard + riwayat
    loadData();

})

.catch(error=>{

    saveBtn.innerHTML='Simpan';
    saveBtn.disabled=false;

    toast('❌ Gagal menyimpan');

});

}



function loadData(){

fetch(API_URL+'?action=get')

.then(response=>response.json())

.then(data=>{

    let pemasukan=0;
    let pengeluaran=0;
    let totalTransaksi=0;

    let html='';
    let kategoriRingkasan={};

    data.reverse().forEach(item=>{

        totalTransaksi++;

        let nominal=Number(item.nominal);

        if(item.jenis=="Pemasukan"){
            pemasukan+=nominal;
        }else{
            pengeluaran+=nominal;
        }

        kategoriRingkasan[item.kategori] =
        (kategoriRingkasan[item.kategori] || 0)
        + nominal;

        html += `
        <div class="item ${item.jenis}">
            <b>${item.kategori}</b><br>
            ${item.keterangan}<br>
            ${rupiah(nominal)}
        </div>
        `;
    });

    // Update Dashboard
    masuk.innerHTML=rupiah(pemasukan);

    keluar.innerHTML=rupiah(pengeluaran);

    saldo.innerHTML=
    rupiah(
        pemasukan-pengeluaran
    );

    jml.innerHTML=
    totalTransaksi;


    // Update Riwayat
    riwayat.innerHTML=html;


    // Update Ringkasan Kategori
    let kategoriHTML='';

    for(let k in kategoriRingkasan){

        kategoriHTML += `
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

});

}



function toast(pesan){

let t=document.getElementById("toast");

t.innerHTML=pesan;

t.style.display='block';

setTimeout(()=>{

t.style.display='none';

},2000);

}



function rupiah(angka){

return "Rp "+
Number(angka)
.toLocaleString(
'id-ID'
);

}
