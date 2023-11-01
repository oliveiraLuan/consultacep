function State(){
    this.modalcontact = null;
    this.btnclose = null;
}

const state = new State();

export function init(){
    state.modalcontact = document.querySelector("#modal-contact");
    state.btnclose = document.querySelector("#btn-contact");    

    state.modalcontact.addEventListener('click', handleModalContactClick);
}

export function showModal(){
    state.modalcontact.classList.add("active");
}

export function closeModal(){
    state.modalcontact.classList.remove("active");
}

function handleModalContactClick(event){
    if(this === event.target){
        closeModal();
    }
}