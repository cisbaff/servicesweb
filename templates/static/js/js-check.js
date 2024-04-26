

function searchResponse(){
    const input = document.getElementById("inputCPF");
    location.href = `/crur/response/${input.value}`;
}

function searchCheck(){
    const input = document.getElementById("inputCPF");
    location.href = `/crur/check/${input.value}`;

}

window.addEventListener("load", function (event) {

})