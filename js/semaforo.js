class Semaforo{
    constructor(){
        this.levels = [0.2, 0.5 , 0.8];
        this.lights = 4;
        this.unload_moment = null;
        this.clic_moment = null;
        this.difficulty = this.levels[Math.floor(Math.random() * 3)];


        console.log('entras');
        this.createStructure();
    }

    createStructure(){

    const secondSection = document.querySelectorAll('main')[0];


    // Crear el encabezado <h2>
    const h2 = document.createElement("h2");
    h2.textContent = "Semáforo";
    secondSection.appendChild(h2); // Añadir el h2 al segundo section

    // Crear los divs de luces
    for (let i = 0; i < this.lights; i++) {
        console.log('un div');
        const div = document.createElement("div");
        secondSection.appendChild(div); // Añadir el div al segundo section
    }

    // Crear los botones
    const button1 = document.createElement("button");
    button1.textContent = "Botón 1";
    button1.onclick = this.initSequence.bind(this);
    secondSection.appendChild(button1); 


    const button2 = document.createElement("button");
    button2.textContent = "Botón 2";
    button2.disabled = true;
    button2.onclick = this.stopReaction.bind(this);
    secondSection.appendChild(button2);



    
    }

    endSequence(){

        const main = document.getElementsByTagName('main')[0];
        main.classList.replace('load', 'unload');

        const button2 = document.getElementsByTagName('button')[1];
        button2.disabled = false
    }

    initSequence(){
        const main = document.getElementsByTagName('main')[0];
    
        main.classList.add('load');

        const button1 = document.getElementsByTagName('button')[0];
        button1.disabled = true

        console.log('llega');
        setTimeout(()=>{
            this.unload_moment = new Date();
            this.endSequence();
        }, 2500);
    }

    stopReaction(){
        this.clic_moment = new Date();

        var diff =  this.clic_moment.getMilliseconds() - this.unload_moment.getMilliseconds() + this.clic_moment.getSeconds() * 1000 - this.unload_moment.getSeconds() * 1000 ;

        const parrafos = document.querySelectorAll('main p');
        const main = document.querySelectorAll('main')[0];
        console.log("llega parrafos");
        console.log(parrafos);

        /**Si ya hay un valor sacado */
        if(parrafos.length == 1){
            const parrafoValor = parrafos[0];
            parrafoValor.textContent = diff;
        }else{ /**si es la primera vez que lo hace */
            const p1 = document.createElement("p");
            p1.textContent = diff;

            main.appendChild(p1);
        }

        main.classList.remove('unload');

        const buttons = document.querySelectorAll('button');

        buttons[0].disabled = false;
        buttons[1].disabled = true;

        this.clic_moment = null;
        this.unload_moment = null;

        /**Comprobamos si ya se ha creado un formulario */

        var forms = document.getElementsByTagName("form");

        if(forms.length == 0){
            this.createRecordForm();
        }else{
            this.updateRecordForm();
        }
    }
    

    updateRecordForm(){
        const parrafo = document.querySelectorAll('main p')[0]
        var forms = document.getElementsByTagName("form")[0];

        var parrafoTiempo = forms.querySelectorAll("p")[3];

        var inputTiempo = parrafoTiempo.querySelectorAll("input")[0];

        inputTiempo.value = parrafo.textContent;
    }

    createRecordForm(){
        var form = document.createElement("form");

        form.setAttribute("action", "#");
        form.setAttribute("method", "post");
        form.setAttribute("name", "records");

        /**Input de nombre */

        var pNombre = document.createElement("p");
        var inputNombre = document.createElement("input");

        inputNombre.setAttribute("type", "text");
        inputNombre.setAttribute("name", "nombre");

        pNombre.textContent = "Nombre: ";
        pNombre.appendChild(inputNombre);


        /**Input de apellidos */

        var pApellidos = document.createElement("p");
        var inputApellidos = document.createElement("input");

        inputApellidos.setAttribute("type", "text");
        inputApellidos.setAttribute("name", "apellidos");

        pApellidos.textContent = "Apellidos: ";
        pApellidos.appendChild(inputApellidos);


        /**Input de dificultad */

        var pDifficulty = document.createElement("p");
        var inputDifficulty = document.createElement("input");

        inputDifficulty.setAttribute("type", "text");
        inputDifficulty.setAttribute("name", "dificultad");
        inputDifficulty.toggleAttribute("readonly", true);
        inputDifficulty.value = this.difficulty;

        pDifficulty.textContent = "Dificultad: ";
        pDifficulty.appendChild(inputDifficulty);

        /**Input de tiempo */

        const parrafo = document.querySelectorAll('main p')[0];

        var pTiempo = document.createElement("p");
        var inputTiempo = document.createElement("input");

        inputTiempo.setAttribute("type", "text");
        inputTiempo.setAttribute("name", "tiempo");
        inputTiempo.toggleAttribute("readonly", true);
        inputTiempo.value =  parrafo.textContent;

        pTiempo.textContent = "Tiempo: ";
        pTiempo.appendChild(inputTiempo);

        /**Input de submit */

        var submit = document.createElement("input");
        submit.setAttribute("type", "submit");
        submit.setAttribute("value", "Registrar");
        submit.setAttribute("id", submit);

        var label = document.createElement("label");
        label.setAttribute("for", "submit");
        label.textContent = "Enviar: ";

        label.appendChild(submit);

        /**Encabezado de la seccion*/

        var h2 = document.createElement("h2");
        h2.textContent = "Guardar Record";

        /**Añadimos los parrafos al formulario */
        form.appendChild(pNombre);
        form.appendChild(pApellidos);
        form.appendChild(pDifficulty);
        form.appendChild(pTiempo);


        form.appendChild(label);

        var newSection = document.createElement("section");

        newSection.appendChild(h2);
        newSection.appendChild(form);

        var body = document.getElementsByTagName("body")[0];

        body.appendChild(newSection);
    }
}