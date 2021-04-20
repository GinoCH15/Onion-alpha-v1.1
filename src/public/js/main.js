

$(window).bind('load', function () {
  setTimeout(function () {
    $('.page-loader').addClass('loaded');
  }, 100);
});
document.addEventListener("click", function(event) {
  if (event.target.classList.contains("navbar-toggler-icon")) {
    document.getElementById("navbarResponsive").classList.toggle("show");
  } else if (event.target.classList.contains("nav-link")) {
    document.getElementById("navbarResponsive").classList.remove("show");
  }
});

//Alerts 

$(document).ready(() => {

  let message = JSON.parse( document.getElementById("message").getAttribute("data") );
  //const computeMsgTime = (msg) => (msg.length > 50 ? 5000 : 2500);
  const position = 'center';
  
  if (message.success){
    for (let index = 0; index < message.success.length; index++) {
      Swal.fire({
      position: position,
      icon: 'success',
      title: message.success[index],
      showConfirmButton: false,
      timer: 4000
    })
  }
  } 
  if (message.info){
    for (let index = 0; index < message.info.length; index++) {
      Swal.fire({
        position: position,
        icon: 'info',
        title: message.info[index],
        showConfirmButton: false,
        timer: 5000
      })
    }
  } 
  if (message.errors){
    for (let index = 0; index < message.errors.length; index++) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: message.errors[index] || "Error",
        showConfirmButton: false,
        timer: 4000
      })
    }
  }
  if(document.getElementById("flag")){
    let flagLogin = document.getElementById("flag").getAttribute("data-flag")
    if(flagLogin==1){
      document.getElementById("sign-in").style.display = "none";
      document.getElementById("sign-up").style.display = "block";
    }
  }
});
function confirmDelete(message,name,href){
  Swal.fire({
    title: message,
    text: name,
    showCancelButton: true,
    confirmButtonText: 'Confirmar',
  }).then((result) => {
    if (result.isConfirmed) {
      return (window.location = href);
    }
  })
}

function badForm(message){
  Swal.fire({
    position: 'center',
    icon: 'error',
    title: message,
    showConfirmButton: false,
    timer: 3500
  })
}

function confirmReturn(message,name,href){
  Swal.fire({
    title: message,
    text: name,
    showCancelButton: true,
    confirmButtonText: 'Confirmar',
    cancelButtonText: 'Cancelar',
  }).then((result) => {
    if (result.isConfirmed) {
      return (window.location = href);
    }
  })
}

