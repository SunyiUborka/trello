let boards, create, Delete;

let getName = fetch(`https://api.trello.com/1/members/me/boards?key=${key}&token=${token}`, {
    method: 'GET'}).then(r => r.json()).then(d => boards = d);

let allFetch = Promise.all([getName]);

allFetch.then(()=>show());
function show(){
    let template = document.querySelector("template").content;
    boards.forEach(item =>{
        let card = document.importNode(template, true);
        if (item.prefs.backgroundColor == null){
            card.querySelector('.card-img').src = item.prefs.backgroundImage;
        }else card.querySelector('.card-img').style.backgroundColor = item.prefs.backgroundColor;
        card.querySelector('.card-title').innerHTML = item.name;
        card.querySelector('.card-title').addEventListener('click', ()=> window.location.href = `board.html?id=${item.id}`);
        card.querySelector('#boardDelete').onclick = ()=>{boardDelete(item)}
        card.querySelector('#boardRename').onclick = ()=>{boardRename(item)}
        document.querySelector('.content').append(card);
    })
}
/**
 * 
 * @param {Array} item 
 */
function boardDelete(item) {
    if (confirm('ár jú súr öbáut det?')){
        fetch(`https://api.trello.com/1/boards/${item.id}?key=${key}&token=${token}`, {
            method: 'DELETE'
        }).then(()=> {Reload()});
    }
}

function boardRename(item) {
    let name = prompt('Új név');
    if (name != null){
        fetch(`https://api.trello.com/1/boards/${item.id}?key=${key}&token=${token}`,{
            headers: {
            'Content-Type': 'application/json',
            },
            method: 'PUT',
            body: JSON.stringify({name: `${name}`})
        }).then(()=>{Reload()})
    }
}

function boardCreate(){
    let boardName = document.querySelector('#boardName');
    
    if (boardName.value.length > 1) {
        create = fetch(`https://api.trello.com/1/boards/?key=${key}&token=${token}&name=${boardName.value}`, {
            method: 'POST'
            }).then(()=> {Reload()});      
    }else{
        alert('Adjon meg egy karaktert!!!!!444!!!!')
    }
}

function Reload() {
    window.location.reload();
}