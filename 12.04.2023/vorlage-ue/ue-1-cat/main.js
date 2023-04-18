function displayAllCatFacts() {
    const catsContainer = document.querySelector('#cats');
    const factsURL = 'https://cat-fact.herokuapp.com/facts';

    fetch(factsURL)
        .then(response => response.json())
        .then(data => {
            const factElement = data.map(fact => {
                const newDiv = document.createElement('section');
                const factElement = document.createElement('p');
                factElement.innerHTML = fact.text;
                //console.table(fact);
                //console.log(fact.text);
                newDiv.appendChild(factElement);
                return newDiv;
            });
            console.log(factElement);
            factElement.forEach(factElement => catsContainer.appendChild(factElement));
        })
        .catch(error => console.error(error));
}

// Funktionsaufruf, um die Fakten anzuzeigen
displayAllCatFacts();



// Firefox: https://cat-fact.herokuapp.com/facts
