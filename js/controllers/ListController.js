function State(){
    this.list_section = null;
}

export function init(){
    state.list_section = document.getElementById("list-address");
}

const state = new State();

export function createCard(Address){
    const div = document.createElement("div");
    div.classList.add("list-item");

    const h3 = document.createElement("h3");
    h3.innerHTML = Address.city;

    const pstreet = document.createElement("p");
    pstreet.classList.add("list-item-street");
    pstreet.innerHTML = `${Address.street}, ${Address.number}`;

    const pcep = document.createElement("p");
    pcep.classList.add("list-item-cep");
    pcep.innerHTML = Address.cep;

    div.appendChild(h3);
    div.appendChild(pstreet);
    div.appendChild(pcep);

    state.list_section.appendChild(div);
}