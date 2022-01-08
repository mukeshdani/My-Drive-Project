(function(){
    let btnaddFolder = document.querySelector("#addFolder");
    let btnaddTextFolder = document.querySelector("#addTextFolder");
    let divbreadcrumb = document.querySelector("#breadcrumb");
    let divContainer = document.querySelector("#container");
    let templates = document.querySelector("#templates");
 
    btnaddFolder.addEventListener("click" , addFolder);
    btnaddTextFolder.addEventListener("click", addTextFile);
 
    function addFolder(){
        let fname = prompt("Enter folder name");
    let divFolderTemplate = templates.content.querySelector(".folder");
    let divFolder = document.importNode(divFolderTemplate, true);

    let divName = divFolder.querySelector("[purpose=name]");
    divName.innerHTML = fname;
    
    divContainer.appendChild(divFolder);
    }
 
    function addTextFile(){
        let tfname = prompt("Enter File Name ");
        console.log(tfname);
    }


    function deleatFolder(){

    }
    function addTextFolder(){
 
    }
    function renameFolder(){
 
    }
    function renameTextFile(){
 
    }
    function viewFolder(){
 
    }
    function viewTextFile(){
 
    }
    function saveToStorage(){
 
    }
    function loadFromStorage(){
 
    }
    loadFromStorage();

})();