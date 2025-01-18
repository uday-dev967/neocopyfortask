function login(){
    var userName = document.getElementById('userName').value;
    localStorage.setItem('userName',userName);
}