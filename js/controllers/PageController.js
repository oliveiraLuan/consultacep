import * as modalController from './ModalController.js';

export function init(){
    const contactlink = document.querySelector(".contact-link");
    const btnClose = document.querySelector("#btn-contact");

    contactlink.addEventListener('click', handleContactLinkClick);
    btnClose.addEventListener('click', handleBtnCloseClick);
}

function handleContactLinkClick(event){
    event.preventDefault();
    modalController.showModal();
}

function handleBtnCloseClick(event){
    event.preventDefault();
    modalController.closeModal();
}