const cat = {
    name: "Garfield",
    breed: "Hauskatze",
    age: 13,
    showCat: function() {
        document.querySelector("#objectOutput").innerHTML = 
        `Name:${this.name} gehört zur Rasse ${this.breed} <br>
        Alter: ${this.age}<br><hr>`;
        console.log(cat);
        //alternative statt ``-> "Name:"+this.name+" gehört zur Rasse "+this.breed+" <br> Alter: "+this.age+"<br><hr>
    }
};

document.querySelector("#catObject").addEventListener("click", function() {
    cat.showCat();
});

//Allgemeine Funktionen
let allcat = [];
const months = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
const weeks = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"];

function validateform(){
    let input = [];
    input[0] = document.querySelector("#name").value;
    input[1] = document.querySelector("#breed").value;
    input[2] = Number(document.querySelector("#age").value).toFixed(2);
    input[3] = new Date(document.querySelector("#birth").value);
    if(
        (input[0] == null || input[0] == "") &&
        (input[1] == null || input[1] == "") &&
        (input[2] == null || input[2] == "") &&
        (input[3] == null || input[3] == "")  
    ) {
        alert("Bitte füllen Sie alle Felder aus");
        return false;
    }
    return input;        
}

function show(value){
    document.querySelector("#output").innerHTML +=
    `<p>Name: ${value.name}<br>
    Rasse: ${value.breed}<br>
    Alter: ${value.age}<br>
    Geboren Jahr: ${value.birth.getFullYear()}<br>
    Geboren Monat: ${months[value.birth.getMonth()]}<br>
    Geboren Wochentag: ${weeks[value.birth.getDay()]}<br>
    Button: ${value.button}<br><br/>
    Zeichenlänge Name: ${value.name.length}<br>
    Zeichen auf einer Random Position: ${value.name.charAt(Math.floor(Math.random() * value.name.length))}</p>`;
}

function showAllCats(){
    document.querySelector("#output").innerHTML = "";
    //Sort array by age
    allcat.sort((minAge, maxAge) => minAge.age - maxAge.age);
    // get youngest and oldest cat
    showAge(allcat);
    //Show cats
    for (const thisCat of allcat){
        thisCat.showCat();
    }    
}

function showAge(allcat){
    let maxAgeValue = -Number.MAX_VALUE;
    let minAgeValue = Number.MAX_VALUE;
    allcat.forEach((cat) => {
        if(cat.age > maxAgeValue){
            maxAgeValue = cat.age;
        }
        if(cat.age < minAgeValue){
            minAgeValue = cat.age;
        }
    });
    document.querySelector("#outputAge").innerHTML =
    `<p>Älteste Katze: ${maxAgeValue}<br>
    Jüngste Katze: ${minAgeValue}</p>`;
}

//Objekte mit Konstruktor
function CatConstructor(name, breed, age, birth, button){
    this.name = name;
    this.breed = breed;
    this.age = age;
    this.birth = birth;
    this.button = button;
    this.showCat = function(){
        show(this);
    }
}

document.querySelector("#newCatConstructor").addEventListener("click", function(){
    let returnValues = validateform();
    if (returnValues != false){
        allcat[allcat.length] = new CatConstructor(returnValues[0], returnValues[1], returnValues[2], returnValues[3], "Constructor");
    };
    showAllCats();
});

    



