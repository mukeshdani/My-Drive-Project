function openTextApp(file) {
    let overlay = document.querySelector("#overlay");
    let textApp = document.querySelector(".pop-up-text-app");
    overlay.addEventListener("click", closePopup);

    function openPopup() {
        overlay.classList.add("active");
        textApp.classList.add("active");
    }
    function closePopup() {
        overlay.removeEventListener("click", closePopup);
        boldBtn.removeEventListener("click", makeBold);
        italicBtn.removeEventListener("click", makeItalic);
        underlineBtn.removeEventListener("click", makeUnderLine);
        bgCol.removeEventListener("change", changeBG);
        fgCol.removeEventListener("change", changeFG);
        fontFamBtn.removeEventListener("change", changeFont);
        fontSizeBtn.removeEventListener("change", changeFontSize);
        appColorBtn.removeEventListener("change", changeAppColor);
        saveBtn.removeEventListener("click", saveStyle);
        overlay.classList.remove("active");
        textApp.classList.remove("active");
    }

    let title = textApp.querySelector(".text-app-title");
    let closeBtn = textApp.querySelector(".text-app-close-btn");
    let boldBtn = textApp.querySelector("[action='bold']");
    let italicBtn = textApp.querySelector("[action='italic']");
    let underlineBtn = textApp.querySelector("[action='underline']");
    let saveBtn = textApp.querySelector("[action='save']");
    let bgCol = textApp.querySelector("[purpose='bg-color']");
    let fgCol = textApp.querySelector("[purpose='fg-color']");
    let fontFamBtn = textApp.querySelector("[purpose='font-family']");
    let fontSizeBtn = textApp.querySelector("[purpose='font-size']");
    let appColorBtn = textApp.querySelector("[ purpose='file-color']")
    let downloadBtn = textApp.querySelector("[action='download']");

    let textarea = textApp.querySelector(".text-app-textarea");

    closeBtn.addEventListener("click", closePopup);


    textApp.style.backgroundColor = file.containerColor;

    title.innerText = file.name;

    let isbold = !file.styleBold;
    let isitalic = !file.styleItalic;
    let isunderline = !file.styleUnderline;
    let bgColor = file.styleBgColor;
    let fgColor = file.styleFgColor
    let fontFamily = file.styleFontFam;
    let fontSize = file.styleFontSize;
    let appColor = file.containerColor;
    textarea.value = file.content;

    bgCol.value = file.styleBgColor;
    fgColor.value = file.styleFgColor;
    fontFamBtn.value = file.styleFontFam;
    fontSizeBtn.value = file.styleFontSize;

    appColorBtn.value = file.containerColor;


    makeBold();
    makeItalic();
    makeUnderLine();
    textarea.style.backgroundColor = bgColor;
    textarea.style.color = fgColor;
    textarea.style.fontFamily = fontFamily;
    textarea.style.fontSize = fontSize;

    boldBtn.addEventListener("click", makeBold);
    italicBtn.addEventListener("click", makeItalic);
    underlineBtn.addEventListener("click", makeUnderLine);
    bgCol.addEventListener("change", changeBG);
    fgCol.addEventListener("change", changeFG);
    fontFamBtn.addEventListener("change", changeFont);
    fontSizeBtn.addEventListener("change", changeFontSize);
    appColorBtn.addEventListener("change", changeAppColor);

    function makeBold() {
        if (isbold == false) {
            boldBtn.classList.add("active");
            textarea.style.fontWeight = "bold";
        }
        else {
            boldBtn.classList.remove("active");
            textarea.style.fontWeight = "normal";
        }
        isbold = !isbold;
    }
    function makeItalic() {
        if (isitalic == false) {
            italicBtn.classList.add("active");
            textarea.style.fontStyle = "italic";
        }
        else {
            italicBtn.classList.remove("active");
            textarea.style.fontStyle = "normal";
        }
        isitalic = !isitalic;
    }
    function makeUnderLine() {
        if (isunderline == false) {
            underlineBtn.classList.add("active");
            textarea.style.textDecoration = "underline";
        }
        else {
            underlineBtn.classList.remove("active");
            textarea.style.textDecoration = "none";
        }
        isunderline = !isunderline;
    }
    function changeBG() {
        bgColor = this.value;
        textarea.style.backgroundColor = bgColor;
    }
    function changeFG() {
        fgColor = this.value;
        textarea.style.color = fgColor;
    }
    function changeFont() {
        fontFamily = this.value;
        textarea.style.fontFamily = fontFamily;
    }
    function changeFontSize() {
        fontSize = this.value;
        textarea.style.fontSize = fontSize;
    }
    function changeAppColor(){
        appColor = this.value;
        textApp.style.backgroundColor = appColor;
    }


    downloadBtn.addEventListener("click",()=>{
        let fileString = file.content;
        let encodedData = encodeURIComponent(fileString);
        let a = document.createElement("a");
        a.download = file.name+".txt";
        a.href = "data:text/plain; charset=utf-8," + encodedData;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    })

    saveBtn.addEventListener("click", saveStyle);
    function saveStyle() {
        let removeOldFile = resources.findIndex(r => r.id == file.id);
        resources.splice(removeOldFile, 1);
        file.styleBold = isbold;
        file.styleItalic = isitalic;
        file.styleUnderline = isunderline;
        file.styleBgColor = bgColor;
        file.styleFgColor = fgColor;
        file.styleFontFam = fontFamily;
        file.styleFontSize = fontSize;
        file.content = textarea.value;
        file.containerColor = appColor;
        resources.push(file);
        saveToLocalStorage();
    }

    openPopup();

}