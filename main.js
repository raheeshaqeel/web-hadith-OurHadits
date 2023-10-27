const output = document.getElementById("output");
var url="https://api.hadith.gading.dev/books"
const coverbook = ['/images/dawud.jpg',
'/images/ahmad.png',
'/images/bukhari.jpg',
'/images/darimi.jpeg',
'/images/majah.jpg',
'/images/malik.jpg',
'/images/muslim.jpg',
'/images/nasai.jpg',
'/images/tirmidzi.jpg'];

function getListhadist() {
    axios
        .get(url)
        .then(function (res) {
            var hadts = res.data.data
                .map((h, index) => {
                    return `
                    
                        <div class="card-hadist ">
                        <img src="${coverbook[index]}" alt="Cover Book" />
                            <h2>${h.name}</h2>
                            <p>jumlah hadits: <b>${h.available}</b></p>
                           
                            <a class="btn btn-secondary w-100" href="/hadits/${h.id}.html">klik disini</a>
                        </div>`;
                })
                .join("");

            output.innerHTML = hadts;
            // console.log(hadts);
        })
        .catch(function (error) {
            console.log(error);
        });
}

// untuk isi hadits
const outputhadits=document.getElementById("output-hadits")

// untuk hapus html
var currentURL = window.location.href;
var filename = currentURL.split('/').pop();
var fileNameWithoutExtension = filename.replace(/\.html$/, '');


function gethaditsbyid(){
axios.get(`${url}/${fileNameWithoutExtension}?range=1-300`).then(function(res){
    var gethadits= res.data.data.hadiths.map((hadits) => {
        return`
        <div class="card ">
            <h2 class="card-header bg-success-subtle">Hadits no:${hadits.number}</h2>            
            <p class="fs-3 text-end justify p-2">${hadits.arab}<p>
            <p class="text-justify p-2">${hadits.id}</p>
        </div>`;

    }).join("")

    outputhadits.innerHTML = gethadits;
});
}

// Search-hadits
// function btnSearch(){
//     const search = document.getElementById("search-hadits").value
//     const outputSearch =document.getElementById("output-search")

//     axios.get(`${url}/${fileNameWithoutExtension}/${search}`)
//     .then(function(res){
//         var getSearch = res.data.data.contents;

//         outputSearch.innerHTML = `
//         <p>${getSearch.arab}</p>
//         <p>${getSearch.id}</p>
//         `;
//         console.log(getSearch);
//     })
// }

function btnSearch(){
    const search = document.getElementById("search-hadits").value
    const judulPencarian = document.getElementById("judul-pencarian")
    const hasilPencarian = document.getElementById("output-search")

    axios.get(`${url}/${fileNameWithoutExtension}?range=1-300`).then(function(res){
        var getSearch = res.data.data.hadiths.filter((fill) => {
            return fill.id.toLowerCase().includes(search.toLowerCase())
        })

        if(search.length > 0){
            judulPencarian.innerHTML = `Pencarian Hadits: <b>${search}</b>`
    
            hasilPencarian.innerHTML = getSearch.map((hasil) =>{
                return`
                <div class="card d-flex flex-column gap-4 mx-4 my-4">
                <h2 class="card-header bg-success-subtle">Hadits no:${hasil.number}</h2>            
                <p class="fs-3 text-end justify p-2">${hasil.arab}<p>
                <p class="text-justify p-2">${hasil.id}</p>
            </div>
                `
            })
            .join("")    
        } else if (search == ""){
            judulPencarian.innerHTML = "";
            hasilPencarian.innerHTML = "Hadith Not Found"
        }
        
    })
}