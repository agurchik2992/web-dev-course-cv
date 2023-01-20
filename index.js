const work = [],
    education = [];

    const WORK_KEY = "WORK",
        EDU_KEY = "EDUCATION";

const showForm = () => {
    document.querySelector(".formWrapper").classList.remove("none")
};

const handleClickOnTheBlur = (event) => {
    if(event.target.className === "formWrapper" || event.target.className === "cancel large"){
    document.querySelector(".formWrapper").classList.add("none")
    }
};

const handleSelectChanged = (event) => {
    const value = event.target.value
    if(value == "work"){
        document.querySelector("#expDescription").classList.remove("none")
    }else if(value === "education"){
        document.querySelector("#expDescription").classList.add("none")
    }else{
        console.error("Unknow Exp Type")
    }
};

const handlefornSubmit = (event) => {
    event.preventDefault();
    console.log(event.target.value)
    const data = {
        title : event.target.title.value,
        subtitle : event.target.subtitle.value,
        expType : event.target.expType.value,
        expDescription : event.target.expDescription.value,
    };

    renderExpOnThePage(data);

    if(data.expType === "work"){
        work.push(data);
        saveToLocalStorage(WORK_KEY, work)
    }
    
    else if(data.expType === "education"){
        education.push(data);
        saveToLocalStorage(EDU_KEY, education)
    }
    
    else{
        console.error("Unknow type")
    }

    event.target.title.value = ""
    event.target.subtitle.value = ""
    event.target.expType.value = ""
    event.target.expDescription.value = ""

    document.querySelector(".formWrapper").classList.add("none")
    
};

const saveToLocalStorage = (key, data) =>{
    window.localStorage.setItem(key, JSON.stringify(data))
};

const loadFromLocalStorage = () => {
    const workStr = window.localStorage.getItem(WORK_KEY);
    if(workStr){
    const workObj = JSON.parse(workStr)
    work.push(...workObj)
    }

    const eduStr = window.localStorage.getItem(EDU_KEY);
    if(eduStr){
    const eduObj = JSON.parse(eduStr)
    education.push(...eduObj)
    }
    
};

const renderExpOnThePage = (data) => {
    if(data.expType === "work"){
        const parent = document.querySelector(".work_exp")
        const child = document.querySelector(".exp")
        const newChild = child.cloneNode(true)
        newChild.querySelector(".medium").textContent = data.title
        newChild.querySelector(".altText").textContent = data.subtitle
        newChild.querySelector(".x-small").textContent = data.expDescription

        parent.appendChild(newChild);
    }
    
    else if(data.expType === "education"){
        const parent = document.querySelector(".education")
        const child = document.querySelector(".edu")
        const newChild = child.cloneNode(true)
        newChild.querySelector(".medium").textContent = data.title
        newChild.querySelector(".altText").textContent = data.subtitle

        parent.appendChild(newChild);
    }
    
    else{
        console.error("Unknow type")
    }
};

loadFromLocalStorage();

for(let job of work){
    renderExpOnThePage(job)
}

for(let edu of education){
    renderExpOnThePage(job)
}