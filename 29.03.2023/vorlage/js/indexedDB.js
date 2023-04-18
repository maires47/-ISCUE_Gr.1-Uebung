// Beispiel für IndexedDB
// Öffnen der Datenbank mit dem Namen "gameResult" und der Version 1
let request = indexedDB.open("gameResult", 1);
let db;

// Wenn die Datenbank erfolgreich geöffnet wurde
request.onsuccess = function(event) {
    db = event.target.result;
    console.log("Die Datenbank wurde erfolgreich geöffnet.");
    displayQuestions();
};

// Wenn die Datenbank erfolgreich erstellt wurde
request.onupgradeneeded = function(event) {
    db = event.target.result;
    console.log("Die Datenbank wurde erfolgreich erstellt.");

    // Erstellen eines Objektspeichers mit dem Namen "questions"
    let objectStore = db.createObjectStore("questions", { keyPath: "questionNr" });
    objectStore.createIndex("answer", "answer", { unique: false });
};

// Wenn ein Fehler beim Öffnen der Datenbank aufgetreten ist
request.onerror = function(event) {
    console.log("Fehler beim Öffnen der Datenbank aufgetreten: " + event.target.errorCode);
};

// Funktion zum Hinzufügen eines Eintrags in die indexedDB-Datenbank
function addQuestion(questionNr, question, answer, userResult) {
    let transaction = db.transaction(["questions"], "readwrite");
    let objectStore = transaction.objectStore("questions");
    let request = objectStore.add({
        questionNr: questionNr,
        question: question,
        answer: answer,
        user: userResult
    });

    request.onsuccess = function(event) {
        console.log("Der Eintrag wurde erfolgreich hinzugefügt.");
    };

    request.onerror = function(event) {
        console.log("Fehler beim Hinzufügen des Eintrags aufgetreten: " + event.target.errorCode);
    };
}

// Funktion zum Löschen der gesamten indexedDB-Datenbank
function deleteDatabase() {
    let deleteRequest = indexedDB.deleteDatabase("gameResult");
    indexedDB.deleteDatabase("gameresult");
    deleteRequest.onsuccess = function(event) {
        console.log("Die Datenbank wurde erfolgreich gelöscht.");
    };

    deleteRequest.onerror = function(event) {
        console.log("Fehler beim Löschen der Datenbank aufgetreten: " + event.target.errorCode);
    };
}

// Funktion zum Anzeigen aller Einträge in der indexedDB-Datenbank
function displayQuestions() {
    let transaction = db.transaction(["questions"], "readonly");
    let objectStore = transaction.objectStore("questions");
    let request = objectStore.getAll();

    request.onsuccess = function(event) {
        let questions = event.target.result;
        let table = document.getElementById("gameResult");
        let tbody = document.createElement("tbody");

        for (let i = 0; i < questions.length; i++) {
            let row = tbody.insertRow();
            let questionNrCell = row.insertCell();
            let questionCell = row.insertCell();
            let answerCell = row.insertCell();
            let userCell = row.insertCell();

            questionNrCell.textContent = questions[i].questionNr;
            questionCell.textContent = questions[i].question;
            answerCell.textContent = questions[i].answer;
            userCell.textContent = questions[i].user;
        }

        table.appendChild(tbody);
    };

    request.onerror = function(event) {
        console.log("Fehler beim Abrufen der Einträge aufgetreten: " + event.target.errorCode);
    };
}

