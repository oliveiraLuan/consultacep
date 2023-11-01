import * as requestService from './request-service.js';
import Address from '../models/Address.js';

export async function findByCep(cep){
    const url  = `https://viacep.com.br/ws/${cep}/json/`;
    const json = await requestService.getJson(url);
    
    const address = new Address(json.cep, json.logradouro, null, json.localidade);
    return address;
}

export function getErrors(address){
    const errors = {};

    if(!address.number || address.number == ""){
        errors.number = "Campo número precisa ser preenchido";
    }

    if(!address.cep || address.cep == ""){
        errors.cep  = "Campo cep precisa ser preenchido";
    }

    return errors;
}