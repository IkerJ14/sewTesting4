class Memoria{
    constructor(){

        this.cartasJson = [
            {
                element: "RedBull",
                source: "https://upload.wikimedia.org/wikipedia/de/c/c4/Red_Bull_Racing_logo.svg"
            },
            {
                element: "McLaren",
                source: "https://upload.wikimedia.org/wikipedia/en/6/66/McLaren_Racing_logo.svg"
            },
            {
                element: "Alpine",
                source: "https://upload.wikimedia.org/wikipedia/fr/b/b7/Alpine_F1_Team_2021_Logo.svg"
            },
            {
                element: "AstonMartin",
                source: "https://upload.wikimedia.org/wikipedia/fr/7/72/Aston_Martin_Aramco_Cognizant_F1.svg"
            },
            {
                element: "Ferrari",
                source: "https://upload.wikimedia.org/wikipedia/de/c/c0/Scuderia_Ferrari_Logo.svg"
            },
            {
                element: "Mercedes",
                source: "https://upload.wikimedia.org/wikipedia/commons/f/fb/Mercedes_AMG_Petronas_F1_Logo.svg"
            }
        ]

        this.hasFlippedCard = false

        this.lockBoard = false

        this.firstCard= null

        this.secondCard = null

    }


    createElements() {
        for (let i = 0; i < this.cartasJson.length; i++) {
            var elemento = this.cartasJson[i];
            document.write("<article data-element = '" + elemento.element + "'" + ">");
            document.write("<h3>Tarjeta de memoria</h3>");
            document.write("<img src= " + elemento.source +" alt =" + elemento.element +  ">");
            document.write("</article>\n");
            document.write("<article data-element = '" + elemento.element + "'"  + ">");
            document.write("<h3>Tarjeta de memoria</h3>");
            document.write("<img src= " + elemento.source +" alt =" + elemento.element +">");
            document.write("</article>\n");
            
        }
    }

    addEventListeners(){
        console.log('añadidos event listeners');
        const articles = document.getElementsByTagName("article");

        for (let i = 0; i < articles.length; i++) {
            console.log('entra');
            articles[i].onclick = function() {
                console.log("acciona");
                setTimeout(2000);
                board.flipCard(articles[i]);
                //this.flipCard.bind(articles[i], this);
            } 
        }
    }

    unflipCards(){

        this.lockBoard = true;

        setTimeout(() => {
            this.firstCard.classList.remove('flip');
            this.secondCard.classList.remove('flip');
            this.resetBoard();
        }, 1000);

        
    }

    resetBoard(){
        this.firstCard = null;
        this.secondCard = null;
        this.hasFlippedCard = false;
        this.lockBoard = false;
    }

    checkForMatch(){

        var car1 = this.firstCard.getAttribute('data-element');
        var car2 = this.secondCard.getAttribute('data-element');


        if(car1 === car2){
            console.log('son inguales');
            this.diableCards();
        }else{
            console.log('son diferentes')
            this.unflipCards();
        }

    }

    diableCards(){
        console.log("Entra disableCards");
        this.firstCard.setAttribute('data-state', 'revealed');
        this.secondCard.setAttribute('data-state', 'revealed');
        this.resetBoard();
    }

    flipCard(card){
        console.log('gira carta');
        if(card.getAttribute('data-state') === "revealed"){
            console.log("revelada");
            return;
        }else if(this.lockBoard == true){
             return;
        }else if(this.firstCard == card){
             return;
        }

        console.log('se añade flip');
        card.classList.add('flip');

        if(!this.hasFlippedCard){
            this.hasFlippedCard = true;
            this.firstCard = card;
            console.log(this.firstCard);
       }else{
            this.secondCard = card;
            console.log(this.secondCard);
            setTimeout(3000)
            this.checkForMatch();
       }
    }

    shuffleElements(){

    }

    

    

    
}

var board = new Memoria();