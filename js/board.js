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
        list.querySelector('#newcard').onclick = ()=>{
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
        if (cards){
            cards.forEach(card=>{
                if (card.idList == item.id){
                    let cardtemp = document.importNode(tempcard, true);
                    cardtemp.querySelector('h6').innerHTML = card.name;
                    cardtemp.querySelector('p').innerText = card.desc;
                    cardtemp.querySelector('#desc').onclick = ()=>{
                        let desc = prompt('Leírás')
                        if(desc){
                            fetch(`https://api.trello.com/1/cards/${card.id}?key=${key}&token=${token}`, {
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            method: 'PUT',
                            body: JSON.stringify({desc: `${desc}`})
                        }).then(()=>{window.location.reload()})
                        }      
                    }
                    cardtemp.querySelector('#delete').onclick = ()=>{
                        fetch(`https://api.trello.com/1/cards/${card.id}?key=${key}&token=${token}`, {
                            method: 'DELETE'
                        }).then(()=>{
                            window.location.reload()
                        })
                    };
                    cardtemp.querySelector('#rename').onclick = ()=>{
                        let name = prompt('Kártya új neve') || card.name
                        fetch(`https://api.trello.com/1/cards/${card.id}?key=${key}&token=${token}`, {
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            method: 'PUT',
                            body: JSON.stringify({name: `${name}`})
                        }).then(()=>{window.location.reload()})
                    }
                    list.querySelector('.list-group').append(cardtemp);
                }
            })
        }
        list.querySelector('#list_remove').onclick = function () {
            if(confirm('ár jú súr öbáut det?')){
                fetch(`https://api.trello.com/1/lists/${item.id}?key=${key}&token=${token}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                  },       
                body: JSON.stringify({closed: true})}).then(()=> {window.location.reload()});
            }
        };

        list.querySelector('#list_update').onclick = function (){
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
        document.querySelector('.content').append(list);
    });
    document.querySelector('#newList').onclick = function (){
        let newlistname = prompt('Új lista név!');
        if(newlistname){
        fetch(`https://api.trello.com/1/lists?name=${newlistname}&idBoard=${boardId}&key=${key}&token=${token}`, {
        method: 'POST'
        }).then(()=>{window.location.reload()})
        }    
    }
}