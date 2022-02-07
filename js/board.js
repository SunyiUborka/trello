let boards, create, Delete;

let getName = fetch(`https://api.trello.com/1/members/me/boards?key=${key}&token=${token}`, {
    method: 'GET'}).then(r => r.json()).then(d => boards = d);

document.querySelector('#board_name').value = '';

let allFetch = Promise.all([getName]);

allFetch.then(()=>show());
function show(){
    let template = document.querySelector("template").content;
    boards.forEach(item =>{
        let card = document.importNode(template, true);
        card.querySelector('.card-img').src = item.prefs.backgroundImage;
        card.querySelector('.card-title').innerHTML = item.name;
        //card.querySelector('.card').addEventListener("click", () => window.location.href = `https://api.trello.com/1/boards/${item.id}/lists?key=${key}&token=${token}`)
        card.querySelector('.delete').onclick = function(){
            fetch(`https://api.trello.com/1/boards/${item.id}?key=${key}&token=${token}`, {
                method: 'DELETE'
            }).then(()=> {
                window.location.reload()
            });
        }
        document.querySelector('.content').append(card);
    })
}


function board_create(){
    let board_name = document.querySelector('#board_name');
    
    if (board_name.value.length > 1) {
        create = fetch(`https://api.trello.com/1/boards/?key=${key}&token=${token}&name=${board_name.value}`, {
            method: 'POST'
            }).then(()=> {
                window.location.reload()
        });
            
    }else{
        alert('Adjon meg egy karaktert!!!!!444!!!!')
    }
}
//https://api.trello.com/1/boards/{id}
//https://api.trello.com/1/members/me/boards?fields=name,url&key={key}&token={token}