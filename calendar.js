/**
 * Définis les infos à afficher dans un event. Sinon, certaines infos manquent: 
 * par défaut, fullcalendar affiche seulement le titre de l'event et ses heures de début/fin
 * @param {*} arg Un objet d'event FullCalendar
 * @returns un tableau d'éléments DOM, 4 div avec les infos de l'event
 */
function extraireInfosEvent(arg){
    divdate = document.createElement('div')
    divdate.style.color = "black";
    divtitre = document.createElement('div')
    divtitre.style.color = "black";
    divloc = document.createElement('div')
    divloc.style.color = "black";
    divdesc = document.createElement('div')
    divdesc.style.color = "black";
    //"LOCATION" et "DESCRIPTION" sont des extendedProps pour fullcalendar, il ne les gère pas par défaut
   divloc.innerHTML = arg.event.extendedProps.location
   divdesc.innerHTML = arg.event.extendedProps.description.replace(/\(Exported.*/, '');   
   //rend l'heure de début et de fin de l'event lisible
   var start = arg.event.start.toLocaleDateString(navigator.language, { // you can use undefined as first argument
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
   }).replace(/\d{1,2}[\-|\.|\/]\d{1,2}[\-|\.|\/]\d{2,4}/g, "");   
   var end = arg.event.end.toLocaleDateString(navigator.language, { // you can use undefined as first argument
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
    }).replace(/\d{1,2}[\-|\.|\/]\d{1,2}[\-|\.|\/]\d{2,4}/g, "");     
   divdate.innerHTML = start+ " - "+end
   divtitre.innerHTML = arg.event.title
   return [ divdate, divloc, divtitre, divdesc ];
}

//Paramétrage d'un calendrier fullcalendar
var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
      //On veux la vue de la semaine, pas du mois
      initialView: 'timeGridWeek',
      //On désactive cette case inutile au dessus
      allDaySlot: false,
      locale: 'fr',
      firstDay: 6,
      //j'aime bien bootstrap mais d'autres thèmes sont dispo
      themeSystem: 'bootstrap5',
      //on va commencer à 8h et finir à 20, le batiment d'info est censé fermer à 20
      slotMinTime: '08:00:00',
      slotMaxTime: '20:00:00',
      events: {
            //la partie complexe: l'event sera sous forme ics, le fichier ics sera récupéré
            //par une requête en php trouvée sur stackoverflow, à partir d'un lien de l'univ
            url: './getcalendar.php?',
            format: 'ics'
      },
      //responsivité
      aspectRatio: screen.width/screen.height,
      //les weekends prennent de la place d'affichage pour rien
      weekends: false,
      //je sais pas si ça marche bien mais l'affichage est censé être mieux avec ça
      expandRows: true,
      //une barre rouge pour voir ou on en est de la journée
      nowIndicator: true,
      //cette balise permet d'éditer le contenu des évenements, utile car fullcalendar 
      //n'affiche pas toutes les infos par défaut
      eventContent: function (arg) {          
        arrayOfDomNodes = extraireInfosEvent(arg);
        return { domNodes: arrayOfDomNodes }
      },
      eventClassNames: function(arg) {

          if(arg.event.title.includes("TD")){
          return ['td']
          }
          else if(arg.event.title.includes("TP")){
          return ['tp']
          }
          else if(arg.event.title.includes("AAG")){
          return ['aag']
          }
          else if(arg.event.title.includes("Examen") || arg.event.title.includes("CT") || arg.event.title.includes("CC")){
          return ['exam']
          }
          else {
          return ['cours']
          }

      }
    });
    //eeeet on affiche le calendrier
    calendar.render();

//création des boutons de sélection du calendrier.
//le chiffre, c'est l'id de l'emploi du temps de l'université, enregistré dans un cookie 
//puis inséré dans le lien qui récupère le calendrier
var l1 = creerBoutonDropDown("L1") 
+ creerSousMenu("TDA - TP1", 620)
+ creerSousMenu("TDA - TP2", 629)
+ creerSousMenu("TDB - TP3", 641)
+ creerSousMenu("TDB - TP4", 644)
+ creerSousMenu("TDC - TP5", 647)
+ creerSousMenu("TDC - TP6", 771) + "</ul>"
var l2 = creerBoutonDropDown("L2") 
+ creerSousMenu("TDA - TP1", 899)
+ creerSousMenu("TDA - TP2", 1070)
+ creerSousMenu("TDB - TP3", 1543)
+ creerSousMenu("TDB - TP4", 237)
+ creerSousMenu("TDC - TP5", 3072) + "</ul>"
var l3 = creerBoutonDropDown("L3") 
+ creerSousMenu("TDA - TP1", 405)
+ creerSousMenu("TDA - TP2", 406)
+ creerSousMenu("TDB - TP3", 4525)
+ creerSousMenu("TDB - TP4", 5121) + "</ul>"
var m1 = creerBoutonDropDown("M1") 
+ creerSousMenu("Alternants", 1189)
+ creerSousMenu("Initiaux", 1733) + "</ul>"
var m2 = creerBoutonDropDown("M2") 
+ creerSousMenu("Groupe B", 2891)
+ creerSousMenu("Groupe A", 2903) + "</ul>"
document.getElementsByClassName("fc-toolbar-chunk")[1].innerHTML = l1+l2+l3+m1+m2;

//on refait la responsivité, juste au cas ou
calendar.setOption('aspectRatio',screen.width/screen.height);

window.addEventListener('resize', function(){
    calendar.setOption('aspectRatio',screen.width/screen.height);
});
