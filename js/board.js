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
        document.querySelector('.content').append(list);
    });
}
