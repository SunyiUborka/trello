let boards, valami;

let getName = fetch(`https://api.trello.com/1/members/me/boards?key=${key}&token=${token}`, {
    method: 'GET',
    headers:
        {
            'Accept': 'application/json'
        }}).then(r => r.json()).then(d => boards = d);

let allFetch = Promise.all([getName]);

allFetch.then(()=>show());
function show(){
    let template = document.querySelector("template").content;
    boards.forEach(item =>{
        let card = document.importNode(template, true);
        card.querySelector('.card-img').src = item.prefs.backgroundImage;
        card.querySelector('.card-title').innerHTML = item.name;
        card.querySelector('.card').addEventListener("click", () => window.location.href = `https://api.trello.com/1/boards/${item.id}/lists?key=${key}&token=${token}`)
        document.querySelector('.content').append(card);
    })
}

//https://api.trello.com/1/boards/{id}
//https://api.trello.com/1/members/me/boards?fields=name,url&key={key}&token={token}