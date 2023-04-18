## Typ Node
### Eigenschaften
- nodeName
- nodeValue 
- textContent 
- nodeType 
- firstChild, lastChild 
- nextSibling, previousSibling 
- parentNode, parentElement
- childNodes


### Methoden
- insertBefore(newChild, refChild)
- replaceChild(newChild, oldChild)
- appendChild(newChild)
- removeChild(oldChild)
- hasChildNodes()
- contains(node)
- cloneNode(deep)

### Node Beispiele
    <div><h1 id="title">Überschrift</h1><p>Hallo</p></div>
    // Variable theDiv enthält das <div> Element (also einen Knoten)
    const name = theDiv.nodeName; // DIV
    const type = theDiv.nodeType; // 1
    const h1 = theDiv.firstChild; // <h1>−Element
    const p = theDiv.lastChild; // <p>−Element
    <div>
        <h1 id="title">Überschrift</h1>
        <p>Hallo</p>
    </div>
    theDiv.replaceChild(p, h1); // ersetzt <h1> durch <p>, somit bleibt nur <p> übrig
    theDiv.removeChild(p); // löscht <p> als Kindknoten von <div>
    let nodes = theDiv.hasChildNodes(); // false

## Typ Document
### Methoden
- **getElementById(id)**
- getElementsByTagName(tagName)
- getElementsByClassName(tagName)
- **querySelector(selector)**
- **querySelectorAll(selector)**
- createElement(tagName)
- createTextNode(data)
- createAttribute(name)


    <div id="content">
    <p class="red underline">Red and Underlined//p>
    </div>
    const content = document.getElementById("content");
    const body = document.getElementsByTagName("body")[0];
    const rU = document.getElementsByClassName("red underline");
    const pInDiv = document.querySelector("div p");
    const newDiv = document.createElement("div");
    const text = document.createTextNode("Hallo Welt!");
    const idAttr = document.createAttribute("id");

## Typ Document (HTML)
### Eigenschaften
- title
- URL
- referrer
- lastModified
- head
- body 
### Methoden
- getElementsByName(name)
- open()
- close()
- write(text)
- writeln(text)


    <form action="mailto:me@example.com">
      <input type="radio" name="favorite" value="HYP1" id="hyp"><br>
      <input type="radio" name="favorite" value="IPR" id="ipr"><br>
      <input type="radio" name="favorite" value="MET1" id="met"><br>
      <button type="submit">Senden</button>
    </form>
    const pageTitle = document.title;
    const body = document.body;
    const favorit = document.getElementsByName("favorit");
    document.open();
    document.write("<p>Hallo Welt!</p>");
    document.close();

## Typ Element
### Eigenschaften
- tagName
- className
- **classList**
- id
- **innerHTML**
- firstElementChild,
- lastElementChild
- nextElementSibling,
- previousElementSibling
### Methoden
- getAttribute(name)
- setAttribute(name, value)
- removeAttribute(name)
- hasAttribute(name)
- setAttributeNode(name)
- getAttributeNode(name)
- **add / remove()**
- getElementById(), getElementsByClassName() etc.


    const heading = document.createElement("h1");
    heading.textContent = "Überschrift";
    heading.setAttribute("id", "important");
    heading.id = "normal";
    heading.className = "blue"; // Setzt die Klasse blue
    heading.classList.add("underline");
    if (heading.hasAttribute("id") {
        heading.removeAttribute("id");
    }
    document.body.appendChild(heading);

## Typ HTML Element
### Eigenschaften
- title
- lang
- dir
- **style**
- accessKey
- tabIndex


    const divElem = document.createElement("div");
    divElem.textContent = "Hallo Welt!";
    divElem.lang = "de"; // Sprache auf Deutsch stellen
    divElem.style.marginTop = "2em"; // Oberen Rand auf 2em stellen
    document.body.appendChild(divElem);


## Subtypen von HTMLElement
### Eigenschaften
- HTMLLinkElement 
- HTMLFormElement 
- HTMLInputElement 
- HTMLImageElement etc.
### Methoden
- href, target, rel etc. action, method, name etc. name, value, size etc.
- src, alt, width, height etc. etc.


    const image = document.createElement("img");
    image.width = 256; // Breite festlegen
    image.height = 256; // Höhe festlegen
    image.src = "html5logo.png"; // Quelldatei festlegen
    image.alt = "HTML5 Logo"; // Alternativtext festlegen
    document.body.appendChild(image); // Ins Dokument hängen

## Typ Attr
### Eigenschaften
- name value

### Attr Beispiele
    const divElem = document.createElement("div");
    divElem.textContent = "An ordinary div";
    const titleAttr = document.createAttribute("title");
    titleAttr.value = "Some Container"; // Inhalt setzen
    divElem.setAttributeNode(titleAttr); // Attribut anhängen
    document.body.appendChild(divElem); // Element ins Dokument hängen

## HTML-Event-Handler
### JavaScript:

    function alertMe() {
        window.alert("Event-Handler aufgerufen!");
    }
### HTML:

    <form action="mailto:me@email.com" method="post">
      <h1>Als HTML-Event-Handler//h1>
      <p>Event-Handler durch HTML-Attribut "onclick" hinzugefügt//p>
      <button id="button1" type="button" onclick="alertMe()">Button 1</button>
    </form>


## DOM-Event-Handler
### JavaScript:

    function alertMe() {
        alert("Event-Handler aufgerufen!");
    }
    const btn2 = document.getElementById("button2");
    btn2.onclick = alertMe;
### HTML:

    btn2.onclick = function () {
    alertMe();
    alertMe();
    };
    <form action="mailto:me@email.com" method="post">
      <h1>Als DOM-Event-Handler//h1>
      <p>Event-Handler mittels JavaScript-Eigenschaft hinzugefügt</p>
      <button id="button2" type="button">Button 2</button>
    </form>


## DOM-Event-Listener
### JavaScript:
    
    function alertMe() {
        alert("Event-Listener aufgerufen!");
    }
    const btn3 = document.getElementById("button3");
    btn3.addEventListener("click", alertMe);
### HTML:

    <form action="mailto:me@email.com" method="post">
      <h1>Als DOM-Event-Listener//h1>
      <p>Event-Listener durch addEventListener() hinzugefügt</p>
      <button id="button3" type="button">Button 3</button>
    </form>


## Standardaktion stoppen
### JavaScript:

    function showURL(event) {
        const link = document.querySelector("a");
        window.alert(link.href);
        event.preventDefault();
    } 2x derselbe Aufruf.
### HTML:

    <a href="https://www.fh-ooe.at/">Ein Link//a>
    <script>
      const link = document.querySelector("a");
      link.addEventListener("click", showURL);
    </script>

## this im Event-Listener
### JavaScript:

    function showURL(event) {
      alert(this.href);
      event.preventDefault();
    }
### HTML:

    <a href="https://www.fh-ooe.at/">Ein Link//a>
    <a href="https://orf.at/">Noch ein Link//a>
    <script>
      const links = document.getElementsByTagName("a");
      links[0].addEventListener("click", showURL);
      links[1].addEventListener("click", showURL);
    </script>

## Auf’s DOM warten

    <!DOCTYPE html>
    <html lang="de">
      <head>
        <meta charset="utf-8">
        <title>Event-Listener &ndash; DOMContentLoaded-Event//title>
        <script src="domcontentloaded.js">//script>
      </head>
      <body>
        <a href="https://www.fh-ooe.at/">Ein Link//a>
        <a href="https://orf.at/">Noch ein Link//a>
      </body>
    </html>
    function showURL(event) {
      window.alert(this.href);
      event.preventDefault();
    }
    function prepareListeners() {
      const links = document.getElementsByTagName("a");
      for (let i = 0; i < links.length; i/+) {
        links[i].addEventListener("click", showURL);
      }
    }
    document.addEventListener("DOMContentLoaded", prepareListeners);
    // Alternativ auch mit dem load−Event:
    window.addEventListener("load", prepareListeners );

## Formulare validieren HTML:

    <form action="mailto:john.doe@johndoe.at" method="post" enctype="text/plain" id="dataform">
     //.
    </form>
    JavaScript:
    let hasErrors = false;
    function isValid(event) {
    // Validierung der Formularfelder und setzen von hasErrors auf true, wenn ein Fehler passiert ist
      if (hasErrors) {
        event.preventDefault();
    } }
    document.getElementById("dataform").addEventListener("submit", isValid);
