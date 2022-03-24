(function(){
    let sidebarBtn = document.querySelector(".sidebar-btn");
    let sidebarContainer = document.querySelector(".sidebar-container");
    let isSideBarOpen = true;
    sidebarBtn.addEventListener("click", toggleSideBar);
    
    toggleSideBar();
    
    function toggleSideBar() {
        if (isSideBarOpen) {
            sidebarContainer.classList.toggle("active");
            sidebarBtn.innerHTML="&#10005;"
            sidebarBtn.style.fontSize = "2rem";
            sidebarBtn.style.top = "3rem";
        } else {
            sidebarContainer.classList.toggle("active");
            sidebarBtn.innerHTML="&equiv;"
            sidebarBtn.style.fontSize = "3rem";
            sidebarBtn.style.top = "2rem";
        }
        isSideBarOpen = !isSideBarOpen;
    }
})();

let rootSBtn = document.querySelector(".root-list");
let folderSBtn = document.querySelector(".folder-list");
let fileSBtn = document.querySelector(".file-list");
let albumSBtn = document.querySelector(".album-list");
rootSBtn.addEventListener("click",()=>{
    addWithArray(resources,-1);
    breadCrumb.style.opacity = "1";
    breadCrumb.style['pointer-events'] = 'all';
    breadCrumb.innerHTML ="";
    let temp = `<a class="path" id="-1">Home</a>`
    breadCrumb.innerHTML = temp;
    let tempRoot = breadCrumb.querySelector("a");
    tempRoot.addEventListener("click",navigateBreadCrumb);
})

folderSBtn.addEventListener("click",()=>{
    let onlyFoldersArray = resources.filter(r=>r.rType == "folder");
    breadCrumb.style.opacity = "0";
    breadCrumb.style['pointer-events'] = 'none';
    if(onlyFoldersArray.length == 0){
        resourcesContainer.innerHTML = `<div style='color:white;'>No Folders Found</div>`;
        return;
    }
    addWithArray(onlyFoldersArray,-2);
})

fileSBtn.addEventListener("click",()=>{
    let onlyFilesArray = resources.filter(r=>r.rType == "file");
    breadCrumb.style.opacity = "0";
    breadCrumb.style['pointer-events'] = 'none';
    if(onlyFilesArray.length == 0){
        resourcesContainer.innerHTML = `<div style='color:white;'>No Files Found</div>`;
        return;
    }
    addWithArray(onlyFilesArray,-2);
})


albumSBtn.addEventListener("click",()=>{
    let onlyAlbumsArray = resources.filter(r=>r.rType == "album");
    breadCrumb.style.opacity = "0";
    breadCrumb.style['pointer-events'] = 'none';
    if(onlyAlbumsArray.length == 0){
        resourcesContainer.innerHTML = `<div style='color:white;'>No Albums Found</div>`;
        return;
    }
    addWithArray(onlyAlbumsArray,-2);
})