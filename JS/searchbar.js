let searchByUser = document.querySelector("#search-input");
let searchBtn = document.querySelector("#search");

searchByUser.addEventListener("keyup",(e)=>{
    if(e.keyCode===13){
        searchBtn.click();
    }
})

searchBtn.addEventListener("click",()=>{
    searchInput = searchByUser.value;
    let temp = validate(searchInput);
    if(temp == false){
        searchByUser.value="";
        alert("Input not valid!!");
        return;
    }
    breadCrumb.style.opacity = "0";
    breadCrumb.style['pointer-events'] = 'none';
    let arr = resources.filter(r=>{
        if(r.rType == "folder" || r.rType == "album"){
            return r.name.includes(searchInput);
        }
    })
    let arr2 = resources.filter(r=>{
        if(r.rType == "file"){
            if(r.name.includes(searchInput) ||r.content.includes(searchInput))
            return true;
        }
    })

    arr = arr.concat(arr2);

    if(arr.length == 0){
        resourcesContainer.innerHTML = `<div style='color:white;'>No Matching Results Found</div>`;
        return;
    }
    addWithArray(arr,-2);
    searchByUser.value="";
})

function validate(str){
    if(str){
        if(str.trim().length>0){
            return true;
        }
    }
    return false;
}