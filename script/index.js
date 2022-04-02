var entriesData, categoriesData;
var categoriesLower = [];
const parentElement = document.getElementById('content');
const headingElement = document.getElementById('heading');
var headingContent = headingElement.innerHTML;

// https://api.publicapis.org/entries
fetch("/dataInfo/entries.json", {method: "GET"})
.then(res=>res.json())
.then(data =>{
    entriesData = data;
})
/* 
API: "AdoptAPet"
Auth: "apiKey"
Category: "Animals"
Cors: "yes"
Description: "Resource to help get pets adopted"
HTTPS: true
Link: "https://www.adoptapet.com/public/apis/pet_list.html"

*/
function button(c){
    headingElement.innerHTML = '</div>'+'<h4>'+c+'</h4></div>'+'<div class="bg-white text-black border border-2 border-dark m-2 px-3 cursor-pointer" '+
    ' onclick="'+
    'const parentElement = document.getElementById(\'content\');'+
    'const headingElement = document.getElementById(\'heading\');'+
    'parentElement.innerHTML=\'\';'+
    'categoriesData.categories.forEach((e)=> {'+
        'displayData(e);'+
    '});'+
    'headingElement.innerHTML=\'\';headingElement.innerHTML=headingContent;'+
    'search();">'+
        '<span class="h5 m-0 p-0">&#129194</span> <b>back</b>';
    parentElement.innerHTML = '';
    entriesData.entries.forEach(dt => {
        if(c ==  dt.Category){
            var cors = '<i class="h5 text-danger bi bi-x-lg"></i>';
            if(dt.Cors == 'yes'){
                cors = '<i class="h5 text-success bi bi-check-lg"></i>';
            }
            var HTPPS = '<i class="h5 text-danger bi bi-x-lg"></i>';
            console.log(dt.HTTPS)
            if(dt.HTTPS == true){
                HTPPS = '<i class="h5 text-success bi bi-check-lg"></i>';
            }
            var auth ="<div><b class=\"text-success\">No Auth</b></div>"
            if(dt.Auth == "apiKey"){
                auth='<div class="text-danger"><b>Auth: </b>API Key</div>';
            }
            parentElement.innerHTML += '<div class="overflow-auto bg-white text-black border border-2 border-dark m-2 px-3">'+
            '<b>'+dt.API+'</b>'+
            '<p class="p-0 m-0"><b>Link: </b><a target="_blank" href="'+dt.Link+'">'+dt.Link+'</a></p>'+
            '<p><b>Description: </b>'+dt.Description+'</p>'+
            '<div class="border-top border-dark border-2 justify-content-evenly align-items-center container-fluid d-flex flex-wrap">'+
                '<div><b>Cors: </b>'+cors+'</div>'+
                '<div><b>HTTPS: </b>'+HTPPS+'</div>'+
                auth
            '</div>'+
            '</div>'
        }
    });
}

function displayData(c){
    parentElement.innerHTML += 
    '<div class="bg-white text-black border border-2 border-dark m-2 px-3 cursor-pointer" '+
    'onclick="'+'button(\''+c+'\')"'+
    ' id="'+c+'">'+c+'</div>';
}

// https://api.publicapis.org/categories
fetch("/dataInfo/categories.json", {method: "GET"})
.then(res=>res.json())
.then((data)=>{
    categoriesData = data;
    categoriesData.categories.forEach((cat)=> {
        categoriesLower.push(cat);
        displayData(cat);
    });
})
.catch(e =>{
    console.log("something went wrong:\n", e)
})

function search(){
    var searchButton = document.getElementById("searchButton");
    var searchBar = document.getElementById("searchBar");

    searchButton.addEventListener("click", ()=>{
        console.log("button clicked!")
        parentElement.innerHTML ="";
        categoriesLower.forEach(e=>{
            if(e.toLowerCase().indexOf(searchBar.value.toLowerCase()) != -1) {
                var cat = e;
                displayData(cat)
            }
        })
    })
} search();