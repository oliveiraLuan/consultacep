import Address from '../models/Address.js';
import * as addressService from '../services/address-service.js';
import * as listController from './ListController.js';

function State(){
    this.address = new Address();

    this.inputCep = null;
    this.inputStreet = null;
    this.inputNumber = null;
    this.inputCity = null;

    this.btnSave = null;
    this.btnClear = null;

    this.errorCep = null;
    this.errorNumber = null;
}


const state = new State();

export function init(){
    state.inputCep = document.forms.newAddress.cep;
    state.inputStreet = document.forms.newAddress.street;
    state.inputNumber = document.forms.newAddress.number;
    state.inputCity = document.forms.newAddress.city;

    state.btnSave = document.forms.newAddress.btnSave;
    state.btnClear = document.forms.newAddress.btnClear;

    state.errorCep = document.querySelector('[data-error="cep"]');
    state.errorNumber = document.querySelector('[data-error="number"]');

    state.inputNumber.addEventListener('change', handleInputNumberChange);
    state.inputNumber.addEventListener('keyup', handleInputNumberKeyUp);

    state.inputCep.addEventListener('change', handleInputCepChange);
    state.inputCep.addEventListener('change', handleInputNumberChange);

    state.btnClear.addEventListener('click', handleBtnClearClick);
    state.btnSave.addEventListener('click', handleBtnSaveClick);
}

async function handleBtnSaveClick(event){
    event.preventDefault();

    const errors = addressService.getErrors(state.address);

    const errorsKeys = Object.keys(errors);

    if(errorsKeys.length > 0){
        errorsKeys.forEach(key => {
            setFormError(key, "O campo deve ser preenchido");
        });
    } else {
        listController.createCard(state.address);
        clearForm();
    }
}

function handleInputNumberKeyUp(event){
    state.address.number = event.target.value;
}

function handleBtnClearClick(event){
    event.preventDefault();
    clearForm();
}

function clearForm(){
    state.inputCep.value = "";
    state.inputStreet.value = "";
    state.inputNumber.value = "";
    state.inputCity.value = "";

    setFormError("cep", "");
    setFormError("number", "");

    state.address = new Address();
}

function handleInputNumberChange(event){
    if(event.target.value == ""){
        setFormError("number", "Campo do número precisa estar preenchido");
    } else {
        setFormError("number", "");
    }
}

async function handleInputCepChange(event){
    try{
        const cep = event.target.value;

        const address = await addressService.findByCep(cep);

        state.inputStreet.value = address.street;
        state.inputCity.value = address.city;
        state.inputNumber.focus();

        state.address = address;

        setFormError("cep", "");
    } 
    catch (e){
        state.inputStreet.value = "";
        state.inputCity.value = "";
        setFormError("cep", "Informe um cep válido");
    }
}

function setFormError(key, value){
    const element = document.querySelector(`[data-error=${key}]`);
    element.innerHTML = value;
}