var userInput;

let resourceMainTemplate = document.querySelector(".resources-template");
let breadCrumbMainTemplate = document.querySelector(".breadcrumb-template");
let breadCrumb = document.querySelector(".bread-crumb-container");
let resourcesContainer = document.querySelector(".resources-container");

let resources = [];
let cfid = -1;
let id = -1;
let resourceTypeToBeAdded = -1;
// 1 -> Folder, 2 -> File, 3 -> Album
let typeOfInput = -1;
// 1 -> new resource, 2 -> edit Name, 3 -> img link


let addFolderBtn = document.querySelector("#add-folder");
let addFileBtn = document.querySelector("#add-file");
let addAlbumBtn = document.querySelector("#add-album");

breadCrumb.style.opacity = "1";


addFolderBtn.addEventListener("click", () => {
    resourceTypeToBeAdded = 1;
    typeOfInput = 1;
    if (breadCrumb.style.opacity == 0) {
        alert("Navigate to home (from sidebar). Can not create a folder here!!!");
        return;
    }
    takeUserInput();
});
addFileBtn.addEventListener("click", () => {
    resourceTypeToBeAdded = 2;
    typeOfInput = 1;
    if (breadCrumb.style.opacity == 0) {
        alert("Navigate to home (from sidebar). Can not create a file here!!!");
        return;
    }
    takeUserInput();
});
addAlbumBtn.addEventListener("click", () => {
    resourceTypeToBeAdded = 3;
    typeOfInput = 1;
    if (breadCrumb.style.opacity == 0) {
        alert("Navigate to home (from sidebar). Can not create an album here!!!");
        return;
    }
    takeUserInput();
});

function addResource() {
    if (userInput == false || userInput == null) {
        return;
    }

    let currRType;
    if (resourceTypeToBeAdded == 1) {
        currRType = "folder";
    } else if (resourceTypeToBeAdded == 2) {
        currRType = "file";
    } else if (resourceTypeToBeAdded == 3) {
        currRType = "album";
    }

    let nameExists = resources.filter(r => r.pid == cfid).filter(r => r.rType == currRType).some(f => f.name == userInput);
    if (nameExists) {
        alert("Name already exists");
        return;
    }
    id++;

    if (currRType == "folder") {
        resources.push({
            pid: cfid,
            id: id,
            name: userInput,
            rType: currRType
        });
    } else if (currRType == "file") {
        resources.push({
            pid: cfid,
            id: id,
            name: userInput,
            rType: currRType,
            styleBold: false,
            styleItalic: false,
            styleUnderline: false,
            styleBgColor: "#ffffff",
            styleFgColor: "#000000",
            styleFontFam: "serif",
            styleFontSize: "14pt",
            content: "This is new file",
            containerColor: "#122434"
        });
    } else if (currRType == "album") {
        resources.push({
            pid: cfid,
            id: id,
            name: userInput,
            rType: currRType,
        });
    }
    addResourceToView(userInput, id, cfid, currRType);
    saveToLocalStorage();
}
function addResourceToView(name, id, pid, rType) {
    let resourceTemplate = resourceMainTemplate.content.querySelector(".resource-box");
    let resourceBoxDiv = document.importNode(resourceTemplate, true);
    let rName = resourceBoxDiv.querySelector("[action='set-name']");
    rName.innerText = name;
    resourceBoxDiv.setAttribute("id", id);
    resourceBoxDiv.setAttribute("pid", pid);
    resourceBoxDiv.setAttribute("rType", rType);

    // Setting mini-menu open close functionality
    let menuBtn = resourceBoxDiv.querySelector(".three-dots");
    let menu = resourceBoxDiv.querySelector(".mini-menu");
    let menuClosed = true;
    function toggleMenuDisplay() {
        if (menuClosed) {
            menu.style.display = "flex";
        } else {
            menu.style.display = "none";
        }
        menuClosed = !menuClosed;
    }
    menuBtn.addEventListener("click", toggleMenuDisplay);
    menuBtn.parentNode.addEventListener("mouseleave", function () {
        menu.style.display = "none";
        menuClosed = true;
    })


    //Setting image scr

    let img = resourceBoxDiv.querySelector("[action='set-img-src']");
    if (rType == "folder") {
        img.src = "./Images/folder-icon.svg"
    } else if (rType == "file") {
        img.src = "./Images/text-file-icon.svg"
    } else if (rType == "album") {
        img.src = "./Images/album-icon.svg"
    }


    let viewBtn = resourceBoxDiv.querySelector("[action='view']");
    let renameBtn = resourceBoxDiv.querySelector("[action='rename']");
    let deleteBtn = resourceBoxDiv.querySelector("[action='delete']");

    renameBtn.addEventListener("click", renameRes);
    img.addEventListener("click", viewRes.bind(img, 2));
    viewBtn.addEventListener("click", viewRes.bind(viewBtn, 4));
    deleteBtn.addEventListener("click", deleteRes.bind(deleteBtn));

    img.addEventListener('contextmenu', function (e) {
        e.preventDefault();
        document.querySelector("#main-context-menu").classList.remove("active");
        menuBtn.click();
    });
    resourceBoxDiv.addEventListener("mouseleave", function () {
        menu.style.display = "none";
        menuClosed = true;
    })

    resourcesContainer.appendChild(resourceBoxDiv);
}

function renameRes() {
    typeOfInput = 2;
    takeUserInput(this.parentNode.parentNode.parentNode.parentNode);
}
function renameResHelper(resBox) {
    if (userInput == false || userInput == null) {
        return;
    }
    let currentName = resBox.querySelector(".resource-name");
    let tempId = parseInt(resBox.getAttribute("id"));
    let rType = resBox.getAttribute("rType");

    let nameExists = resources.filter(r => r.pid == cfid).filter(r => r.rType == rType).some(f => f.name == userInput);
    if (nameExists) {
        alert("Name already exists");
        return;
    }

    let resInArray = resources.find(r => r.id == tempId);
    resInArray.name = userInput;
    currentName.innerText = userInput;
    saveToLocalStorage();
}

function viewRes(x) {
    let resBox;
    if (x == 2) {
        resBox = this.parentNode.parentNode;
    } else if (x == 4) {
        resBox = this.parentNode.parentNode.parentNode.parentNode;
    }

    let id = parseInt(resBox.getAttribute("id"));
    let pid = parseInt(resBox.getAttribute("pid"));
    let rType = resBox.getAttribute("rType");
    if (breadCrumb.style.opacity == 0) {
        makeBreadCrumb(pid);
        addWithArray(resources, pid);
        return;
    }
    else if (rType == "folder") {
        cfid = id;
        let temp = resources.filter(r => r.pid == id);
        addWithArray(temp, cfid);
        makeBreadCrumb(cfid);
    }
    else if (rType == "file") {
        let file = resources.find(r => r.id == id);
        openTextApp(file);
    }
    else if (rType == "album") {
        albumViewer(resBox);
    }

}

function deleteRes() {
    let res = this.parentNode.parentNode.parentNode.parentNode;
    let idToBeDelete = parseInt(res.getAttribute("id"));
    let rType = res.getAttribute("rType");
    let resBox = res.querySelector(".resource-name");
    let resName = resBox.innerText;
    let result = confirm(`Are you sure you want to delete ${resName} permanently ?`);

    if (result == false) {
        return;
    }

    if (rType == "album") {
        let containsImages = images.some(f => f.pid == idToBeDelete);
        if (containsImages == true) {
            alert("Can't delete, contains images");
            return;
        }
    }

    let containsSomething = resources.some(f => f.pid == idToBeDelete);
    if (containsSomething == true) {
        alert("Can't delete, contains other document");
        return;
    }

    let indexInArray = resources.findIndex(f => f.id == idToBeDelete);
    resources.splice(indexInArray, 1);
    resourcesContainer.removeChild(res);
    saveToLocalStorage();
}

function addWithArray(arr, pid) {
    resourcesContainer.innerHTML = "";
    if (pid == -2) {
        arr.forEach(r => {
            addResourceToView(r.name, r.id, r.pid, r.rType);
        });
        return;
    }
    arr.filter(r => r.pid == pid).forEach(r => {
        addResourceToView(r.name, r.id, r.pid, r.rType);
    });
}

function takeUserInput(resBox) {
    userInput = false;
    let popup = document.querySelector(".pop-up-input");
    let input = document.querySelector("#pop-up-input-content");
    let overlay = document.querySelector("#overlay");
    let inputEntered = document.querySelector("#pop-up-input-ok");
    let closePop = document.querySelector("#pop-up-input-cancel");

    inputEntered.addEventListener("click", getInput);
    popup.addEventListener("keyup", (e) => {
        if (e.keyCode === 13) {
            e.preventDefault();
            inputEntered.click();
        }
        if (e.keyCode === 27) {
            e.preventDefault();
            closePop.click();
        }
    });
    closePop.addEventListener("click", closePopup);
    overlay.addEventListener("click", closePopup);

    function openPopup() {
        popup.classList.add("active");
        overlay.classList.add("active");
    }

    function getInput() {
        userInput = input.value;
        if (userInput) {
            userInput = userInput.trim();
            if (userInput) {
                if (userInput.length > 15) {
                    alert("Name cannot be more than 16 characters");
                    closePopup();
                    return;
                }
                input.value = "";
                if (typeOfInput == 1) {
                    addResource();
                } else if (typeOfInput == 2) {
                    renameResHelper(resBox);
                }
            }
        }
        closePopup();
        return;
    }

    function closePopup() {
        popup.classList.remove("active");
        overlay.classList.remove("active");
        inputEntered.removeEventListener("click", getInput);
        closePop.removeEventListener("click", closePopup);
        overlay.removeEventListener("click", closePopup);
        return;

    }
    openPopup();
}
function saveToLocalStorage() {
    let resourcesString = JSON.stringify(resources);
    localStorage.setItem("resources", resourcesString);
}

function loadFromLocalStorage() {
    resourcesString = localStorage.getItem("resources");
    if (resourcesString) {
        resources = JSON.parse(resourcesString);
        resources.forEach(r => {
            if (r.id > id) {
                id = r.id;
            }
        })
        addWithArray(resources, -1);
    }
}
loadFromLocalStorage();



let tempArr = []
function getParents(tid) {
    if (tid == -1) {
        return;
    } else {
        let ele = resources.find(r => r.id == tid);
        parId = ele.pid;
        eleName = ele.name;
        tempArr.push({
            name: eleName,
            id: tid
        })
        getParents(parId);
    }
}
function makeBreadCrumb(tempId) {
    tempArr = [];
    getParents(tempId);
    breadCrumb.style.opacity = "1";
    breadCrumb.style['pointer-events'] = 'all';
    breadCrumb.innerHTML = "";
    let temp = `<a class="path" id="-1">Home</a>`
    breadCrumb.innerHTML = temp;
    let tempRoot = breadCrumb.querySelector("a");
    tempRoot.addEventListener("click", navigateBreadCrumb);
    tempArr = tempArr.reverse();
    breadCrumbTemplate = breadCrumbMainTemplate.content.querySelector(".img-path");
    tempArr.forEach(e => {
        let pathContainer = document.importNode(breadCrumbTemplate, true);
        let path = pathContainer.querySelector(".path");
        pathContainer.setAttribute("id", e.id);
        pathContainer.addEventListener("click", navigateBreadCrumb);
        path.innerText = e.name;
        breadCrumb.appendChild(pathContainer);
    })
}
function navigateBreadCrumb() {
    cfid = parseInt(this.getAttribute("id"));
    addWithArray(resources, cfid);
    while (this.nextSibling) {
        this.parentNode.removeChild(this.nextSibling);
    }
}


const contextAddFolder = document.querySelector("#cm-add-folder");
const contextAddFile = document.querySelector("#cm-add-file");
const contextAddAlbum = document.querySelector("#cm-add-album");
const contextChangeBg = document.querySelector("#cm-change-bg");
const changeBgBtn = document.querySelector("#hidden-upload-btn");
const resetBg = document.querySelector("#cm-reset-bg");

contextAddFolder.addEventListener("click", () => { addFolderBtn.click() });
contextAddFile.addEventListener("click", () => { addFileBtn.click() });
contextAddAlbum.addEventListener("click", () => { addAlbumBtn.click() });
contextChangeBg.addEventListener("click", () => { changeBgBtn.click() });
changeBgBtn.addEventListener("change", (e) => {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
        let uploadedImg = reader.result;
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundImage = `url(${uploadedImg})`;
        document.querySelector(".search-bar-container").style.backgroundImage = "none";
        document.querySelector(".search-bar-container").style.backgroundColor = "rgba(19,19,19,.507)";
        let bgImgObj = { imgSrc: uploadedImg };
        localStorage.setItem("bgUserSrc", JSON.stringify(bgImgObj));
    })
    if(!e.target.files[0].name.split(".").includes("jpg"||"jpeg"||"png")) return;
    reader.readAsDataURL(e.target.files[0]);
})
resetBg.addEventListener("click", () => {
    document.body.style.backgroundImage = `none`;
    document.body.style.backgroundColor = "#202124";
    document.querySelector(".search-bar-container").style.backgroundImage = "linear-gradient(90deg, black 0%, #202124 100%)";
    if (localStorage.getItem("bgUserSrc") !== null) {
        localStorage.removeItem("bgUserSrc");
    }
})


function loadBgFromLocalStorage() {
    let bgUserSrc = localStorage.getItem("bgUserSrc");
    if (bgUserSrc) {
        let bgImg = JSON.parse(bgUserSrc);
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundImage = `url(${bgImg.imgSrc})`;
        document.querySelector(".search-bar-container").style.backgroundImage = "none";
        document.querySelector(".search-bar-container").style.backgroundColor = "rgba(19,19,19,.507)";
        breadCrumb.style.backgroundColor = "black";
    }
}
loadBgFromLocalStorage();


document.body.addEventListener('contextmenu', function (e) {
    e.preventDefault();
    if (e.target.classList[0] === "r-img") return;
    if (e.target.classList[0] === "main-btns") return;
    if (e.target.classList[0] === "sidebar-btn") return;
    for (let i = 0; i < e.composedPath().length; i++) {
        if (e.composedPath()[i].classList?.length > 0) {
            const arr = Array.from(e.composedPath()[i].classList);
            if (arr.includes("search-bar-container")||arr.includes("sidebar-container")) {
                return;
            }
        }
    }
    const overlay = document.querySelector("#overlay");
    if(overlay.classList.contains("active")) return;

    
    const mainContext = document.querySelector("#main-context-menu");
    mainContext.style.top = e.pageY + "px";
    mainContext.style.left = (e.pageX) + "px";
    mainContext.classList.add("active");
});
window.addEventListener("click", () => {
    document.querySelector("#main-context-menu").classList.remove("active");
})



