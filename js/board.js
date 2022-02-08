let boardId = window.location.search.split('=')[1];
console.log(boardId)

let lists;

let getLists = fetch(`https:api.trello.com/1/boards/${boardId}/lists?key=${key}&token=${token} `, {
    method: 'get'}).then(r => r.json()).then(d => lists = d);


    let listall = Promise.all([getLists]);
    listall.then(()=>show());
function show() {
    let template = document.querySelector("template").content;
    lists.forEach(item => {
        let list = document.importNode(template, true);
        list.querySelector('.card-title').innerHTML = item.name;
        ist.querySelector('#Delete').onclick = function () {
            fetch(`https://api.trello.com/1/lists/${item.id}?key=${key}&token=${token}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                  },       
                body: JSON.stringify({closed: true})
            }).then(()=> {
                window.location.reload()
        });
        };

        list.querySelector('#update').onclick = function (){
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
}
