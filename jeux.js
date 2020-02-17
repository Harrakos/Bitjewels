var partie = false;
var premClique = false;
var joyauxSelec1 = null;
var joyauxSelec2 = null;

tabImage = ["Images/diamant.png","Images/cristaux.png","Images/emeraude.png","Images/perle.png","Images/pierre.png","Images/rubis.png","Images/saphir.png","Images/violet.png"]



var tabjoyaux = new Array();
for(var i=0; i<9; i++)
  tabjoyaux[i] = new Array()


class Joyaux {
  constructor(image, posx, posy,id) {
    this.image = image;
    this.posx = posx;
    this.posy = posy;
    this.id = id;
  }
}

function generate_table() {
    var contain = document.getElementById("contain");
    var tbl = document.getElementsByTagName("table")[0];
    var tblBody = document.getElementsByTagName("tbody")[0];
    
    if (partie) {
      tbl.removeChild(tblBody);
      tblBody = document.createElement("tbody");
    }
    var cpt = 0;
    for (var i = 0; i < 8; i++) {
      var row = document.createElement("tr");
      for (var j = 0; j < 8; j++) {
        var cell = document.createElement("td");
        var cellImg = document.createElement("img");
        nbrRandom = Math.round(Math.random()*7);
        cellImg.src = tabImage[nbrRandom];
        joyaux = new Joyaux(tabImage[nbrRandom],i,j,cpt);
        tabjoyaux[i][j] = joyaux;

        cellImg.setAttribute("id",cpt);
        cellImg.setAttribute("class","animable");
        cellImg.setAttribute("onclick","choix(this)");
        cpt = cpt + 1;

        cell.appendChild(cellImg);
        row.appendChild(cell);
      }
      tblBody.appendChild(row);
    }
    tbl.appendChild(tblBody);
    contain.appendChild(tbl);

    tbl.setAttribute("border", "2");
    tbl.setAttribute("align","center");

    cassageLigne();
    
    partie = true;
  }

  function choix(element){
    if(joyauxSelec1 == null){
      joyauxSelec1 = tabjoyaux[parseInt(element.id/8)][parseInt(element.id%8)];
    }else{
      joyauxSelec2 = tabjoyaux[parseInt(element.id/8)][parseInt(element.id%8)];

      if(((joyauxSelec2.posx == joyauxSelec1.posx-1 && joyauxSelec2.posy == joyauxSelec1.posy ) || (joyauxSelec2.posx == joyauxSelec1.posx+1 && joyauxSelec2.posy == joyauxSelec1.posy ) || (joyauxSelec2.posy == joyauxSelec1.posy-1 && joyauxSelec2.posx == joyauxSelec1.posx )|| (joyauxSelec2.posy == joyauxSelec1.posy+1 && joyauxSelec2.posx == joyauxSelec1.posx))){
        document.getElementById(joyauxSelec1.id).src = joyauxSelec2.image;
        document.getElementById(joyauxSelec2.id).src = joyauxSelec1.image;

        imagetamp = joyauxSelec1.image;
        joyauxSelec1.image = joyauxSelec2.image;
        joyauxSelec2.image = imagetamp;
        
        joyauxSelec1 = null;
        joyauxSelec2 = null;

        cassageLigne();       
    }  
  }
}

function cassageLigne(){

  tailleLigne = 0;
  joyauxAv = null ;
  joyauxAc = new Joyaux("",-1,-1,-1);;


// pour les lignes horizontales
    for (let i = 0; i < 8; i++) {
      tailleLigne = 0;
      joyauxAc = new Joyaux("",-1,-1,-1);;
      for (let j = 0; j < 8; j++) {
        joyauxAv =  joyauxAc;
        joyauxAc = tabjoyaux[i][j];
        // si les deux images sont identiques
        if (joyauxAv.image == joyauxAc.image && (joyauxAv.image != "" || joyauxAc.image != "")){
          tailleLigne += 1;
        }else if(tailleLigne > 1){
          pos = joyauxAv.id
          for (let x = 0; x <= tailleLigne; x++) {
            document.getElementById(pos-x).src = ""; 
            tabjoyaux[parseInt(pos/8)][parseInt((pos%8)-x)].image = "";

          }
          tailleLigne = 0;
        }else if (joyauxAv.image != joyauxAc.image && (joyauxAv.image != "" || joyauxAc.image != "")){
          tailleLigne = 0;
          }
        if(j==7 && tailleLigne > 1 ){
          pos = joyauxAv.id
          for (let x = -1; x < tailleLigne; x++) {
            document.getElementById(pos-x).src = ""; 
            tabjoyaux[parseInt(pos/8)][parseInt((pos%8)-x)].image = "";

          }
        }       
      }
    }
    // pour les lignes verticales
    for (let i = 0; i < 8; i++) {
      tailleLigne = 0;
      joyauxAc = new Joyaux("",-1,-1,-1);
      for (let j = 0; j < 8; j++) {
        joyauxAv =  joyauxAc;
        joyauxAc = tabjoyaux[j][i];
        if (joyauxAv.image == joyauxAc.image && (joyauxAv.image != "" || joyauxAc.image != "")){
          tailleLigne += 1;
        }else if(tailleLigne > 1){
          pos = joyauxAv.id
          for (let x = 0; x <= tailleLigne; x++) {
            document.getElementById(pos-x*8).src = ""; 
            tabjoyaux[parseInt(pos/8)-x][parseInt((pos%8))].image = "";

          }
          tailleLigne = 0;
        }else if (joyauxAv.image != joyauxAc.image && (joyauxAv.image != "" || joyauxAc.image != "")){
          tailleLigne = 0;
          }   
        if(j==7 && tailleLigne > 1 ){
          pos = joyauxAv.id
          for (let x = -1; x < tailleLigne; x++) {
            document.getElementById(pos-x*8).src = ""; 
  
            tabjoyaux[parseInt(pos/8)-x][parseInt((pos%8))].image = "";
          }
      }
    }
  }
 descenteBlock()
}

function descenteBlock(){
  descente = true;
  while(descente){  
    descente = false;
    for (let i = 1; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
         if(tabjoyaux[i][j].image == ""){
            myMove1(document.getElementById(i*8+j-8),i,j);
            tabjoyaux[i][j].image = tabjoyaux[i-1][j].image;
            tabjoyaux[i-1][j].image = "";
            } 
          }      
        }
      }
    }
  function myMove1(elem,i,j) {
  var pos = 0;
  var id = setInterval(frame, 5);
  function frame() {    
    if (pos == 90) {      
      document.getElementById(i*8+j).src = tabjoyaux[i][j].image;
      document.getElementById(i*8+j-8).src = "";
      descenteBlock();
      elem.style.top = 0 + 'px'; 
      if (i-1 == 0){
        nbrRandom = Math.round(Math.random()*7);
        tabjoyaux[0][j].image = tabImage[nbrRandom];
        console.log(tabImage[nbrRandom])
        document.getElementById(j).src = tabjoyaux[0][j].image;
        cassageLigne();
      }
      clearInterval(id);
    } else {
      pos++; 
      elem.style.top = pos + 'px'; 
    }
  }
}