let token, key, auth;

if (localStorage.getItem("auth")){
    auth = JSON.parse(localStorage.getItem("auth"))
    token = auth[0].token;
    key = auth[0].key;
}

function loginValidate() {
    token = document.querySelector('#apiToken').value.trim();
    key = document.querySelector('#apiKey').value.trim();
    if (token == '' ||key == ''){
        alert("Az egyik mező üres!")
        return  false;
    }else if (token.length != 64 || key.length != 32){
        alert("Nem megfelelő formátum")
        return  false;
    }else login()

}

function login() {
    localStorage.setItem('auth', JSON.stringify(Array.from([{key:key, token:token}])));
}
function logout(){
    localStorage.clear();
}