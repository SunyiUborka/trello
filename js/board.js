let lists, cards;

let boardId = window.location.search.split('=')[1];

let getLists = fetch(`https:api.trello.com/1/boards/${boardId}/lists?key=${key}&token=${token}`, {
    method: 'get'}).then(r => r.json()).then(d => lists = d);
let getCards = fetch(`https://api.trello.com/1/boards/${boardId}/cards?key=${key}&token=${token}`, {
    method: 'GET'}).then(r=> r.json()).then(d=> cards = d);

let listall = Promise.all([getLists, getCards]);
listall.then(()=>show());

function show() {
    let templist = document.querySelectorAll("template")[0].content;
    let tempcard = document.querySelectorAll("template")[1].content;

    lists.forEach(item => {
        let list = document.importNode(templist, true);
        list.querySelector('.card-title').innerHTML = item.name;
        list.querySelector('#cardCreate').onclick = ()=>{cardCreate(item)}
        if (cards){
            cards.forEach(card=>{
                if (card.idList == item.id){
                    let cardtemp = document.importNode(tempcard, true);
                    cardtemp.querySelector('h6').innerHTML = card.name;
                    cardtemp.querySelector('p').innerText = card.desc;
                    cardtemp.querySelector('#cardDesc').onclick = ()=>{cardDesc(card)}
                    cardtemp.querySelector('#cardDelete').onclick = ()=>{cardDelete(card)};
                    cardtemp.querySelector('#cardRename').onclick = ()=>{cardRename(card)};
                    list.querySelector('.list-group').append(cardtemp);
                }
            })
        }
        list.querySelector('#listDelete').onclick = ()=>{listDelete(item)};
        list.querySelector('#listRename').onclick = ()=>{listRename(item)}
        document.querySelector('.content').append(list);
    });
    document.querySelector('#listCreate').onclick = ()=>{listCreate()};
}
/**
 * @param  {Array} item
 */
function listDelete(item) {
    if(confirm('ár jú súr öbáut det?')){
        fetch(`https://api.trello.com/1/lists/${item.id}?key=${key}&token=${token}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },       
            body: JSON.stringify({closed: true})
        }).then(()=> {window.location.reload()});
    }
}

function listRename(item) {
    let new_name = prompt('új lista név!')
    if (new_name != null){
        fetch(`https://api.trello.com/1/lists/${item.id}?key=${key}&token=${token}`,{
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'PUT',
            body: JSON.stringify({name: `${new_name}`})
        }).then(()=>{
               window.location.reload()
        })
    }
}

function listCreate() {
    let newlistname = prompt('Új lista név!');
    if(newlistname){
        fetch(`https://api.trello.com/1/lists?name=${newlistname}&idBoard=${boardId}&key=${key}&token=${token}`, {
            method: 'POST'
        }).then(()=>{window.location.reload()})
    }    
}

function cardCreate(item) {
    let name = prompt('Új kártya');
    if(name){
        fetch(`https://api.trello.com/1/cards?idList=${item.id}&key=${key}&token=${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name:`${name}`})
        }).then(()=>{window.location.reload()})
    }
}

function cardDesc(card) {
    let desc = prompt('Leírás');
    if(desc){
        fetch(`https://api.trello.com/1/cards/${card.id}?key=${key}&token=${token}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'PUT',
            body: JSON.stringify({desc: `${desc}`})
        }).then(()=>{window.location.reload()})}      
}

function cardDelete(card) {
    if(confirm('ár jú súr öbáut det?')){
        fetch(`https://api.trello.com/1/cards/${card.id}?key=${key}&token=${token}`, {
            method: 'DELETE'
        }).then(()=>{window.location.reload()})
    }
}

function cardRename(card){
    let name = prompt('Kártya új neve');
    if(name){
        fetch(`https://api.trello.com/1/cards/${card.id}?key=${key}&token=${token}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'PUT',
            body: JSON.stringify({name: `${name}`})
        }).then(()=>{window.location.reload()})
    } 
}
