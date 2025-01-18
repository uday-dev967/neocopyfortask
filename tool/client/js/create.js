function handleFileSelect(evt) {
    document.getElementById("upload-file-btn").style.display = "none";
    var file = evt.target.files;
    if(file[0].type == 'image/jpeg' || file[0].type == 'image/png' || file[0].type == 'application/pdf'){
        document.getElementById("upload-image-div").style.display = "block";
        readURL(this);
        document.getElementById('upload-file-name').innerHTML = file[0].name;
    }else{
        alert('Please upload valid type');
    }
}
document.getElementById('upload-file').addEventListener('change', handleFileSelect, false);

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('upload-file-image').src = e.target.result;
        };

        reader.readAsDataURL(input.files[0]);
    }
}
