window.addEventListener('message', function(event) {
    let token = event.data.token;
    if(token) {
        localStorage.setItem('Authorization', token);
        
    }

});