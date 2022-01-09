(function(){
    let btnaddFolder = document.querySelector("#addFolder");
    let btnaddTextFolder = document.querySelector("#addTextFolder");
    let divbreadcrumb = document.querySelector("#breadcrumb");
    let divContainer = document.querySelector("#container");
    let templates = document.querySelector("#templates");

    let resources = [];
   let cfid = -1;
 
    btnaddFolder.addEventListener("click" , addFolder);
    btnaddTextFolder.addEventListener("click", addTextFile);
 
    function addFolder(){
        let rname = prompt("Enter folder name");
        let rid = resources.length;
        let pid = cfid;
  
        
        addFolderHTML(rname,rid , pid);
        // persist
        // save 
        resources.push({
            rid:rid,
            rname:rname,
            pid:cfid
        });
        //
        saveToStorage(); 
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
    function addFolderHTML(rname, rid , pid){
        let divFolderTemplate = templates.content.querySelector(".folder");
        let divFolder = document.importNode(divFolderTemplate, true);
    
            let divName = divFolder.querySelector("[purpose='name']");
            let spanRename = divFolder.querySelector("[action='rename']");
            let spanDelete = divFolder.querySelector("[action='delete']");
            let spanView = divFolder.querySelector("[action='view']");
       
    
            spanRename.addEventListener("click", renameFolder);
            spanDelete.addEventListener("click", deleatFolder);
            spanView.addEventListener("click", viewFolder);
               divName.innerHTML = rname;
               divFolder.setAttribute("rid", rid);
               divFolder.setAttribute("pid", pid);
        
        divContainer.appendChild(divFolder);
       }
    function saveToStorage(){
        let rjson = JSON.stringify(resources);
        localStorage.setItem("data", rjson);
    }
    function loadFromStorage(){
 
    }
    loadFromStorage();

})();