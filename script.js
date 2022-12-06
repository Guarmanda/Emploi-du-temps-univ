
function setCookie(cname, cvalue, exsecond) {
    const d = new Date();
    d.setTime(d.getTime() + (exsecond*1000));
    let expires = "expires="+ d.toUTCString();
    if(exsecond == -1){
        let date = new Date();
        date.setFullYear(date.getFullYear() + 1);
        let now_utc = date.toUTCString();
        expires = "expires="+now_utc;
    }
    document.cookie = cname + "=" + cvalue + "; " + expires + "; SameSite=Strict; path=/";
    console.log(cname + "=" + cvalue + "; " + expires + "; SameSite=Strict; path=/");
    location.reload();
  }

  function creerBoutonDropDown(nom){
    return '<button type="button" class="m-1 btn btn-danger dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">\
        '+nom+'\
    </button>\
    <ul class="dropdown-menu">'
  }
  function creerSousMenu(nom, id){
    return '<li><a class="dropdown-item" href="#" onclick="setCookie(\'idRessource\', '+id+', -1)">'+nom+'</a></li>'
  }

  function gcd (a, b) {
    return (b == 0) ? a : gcd (b, a%b);
}