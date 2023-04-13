/* TODO: inserite il codice JavaScript necessario a completare il MHW! */

const boxes= document.querySelectorAll('.choice-grid div');
//oggetto
const risposteMap=new Map();

for (const box of boxes){
    box.addEventListener('click', selezione);
}

function selezione(event){
    const container = event.currentTarget;
    const Click = container.querySelector('.checkbox');
    Click.src = "images/checked.png";
    container.classList.remove('noChoice');
    container.classList.add('Choice');
    risposteMap.set(container.dataset.questionId,container.dataset.choiceId);
    console.log(risposteMap);
   
    /*console.log('cliccato');*/



    const other_answers = container.parentNode.querySelectorAll('div');

    for (let ans of other_answers){
        if (ans.dataset.choiceId != container.dataset.choiceId){
            ans.classList.add('noChoice');
            ans.classList.remove('Choice');
            const noClick = ans.querySelector('.checkbox');
            noClick.src = "images/unchecked.png";
        }
        
    }
    if(risposteMap.size===3 ){
        for (const x of boxes){
            /*console.log('ciao');*/
            x.removeEventListener('click', selezione);
        }
        stamparisposta();
    }
}

//stampa risposte
function stamparisposta() {
    const article= document.querySelector("article");
    const div=document.createElement('div');
    const h1=document.createElement('h1');
    const p=document.createElement('p');
    const bottone = document.createElement("button");

    

    bottone.classList.add("bottone");
    bottone.addEventListener("click", ricomincia);
    bottone.textContent= "Ricomincia il quiz";

    
    const ris= personalita();
    //console.log('uscito dalla funzione ' + ris);
    let Array_aaa= Array.from(risposteMap.values());

    if (ris==0){
        console.log('il primo elemento scelto è ' + Array_aaa[0]);
        h1.textContent=RESULTS_MAP[Array_aaa[0]]["title"];
        p.textContent=RESULTS_MAP[Array_aaa[0]]["contents"];
    }else{
        h1.textContent=RESULTS_MAP[ris]["title"];
        p.textContent=RESULTS_MAP[ris]["contents"];
    }
    div.appendChild(h1);
    div.appendChild(p);
    div.appendChild(bottone);
    article.appendChild(div);

    h1.style.margin= "0px";
    div.style.padding= "20px";
    div.style.marginBottom= "20px";
    document.getElementById("test").style.marginBottom= "40px";
}

function ricomincia(){
    //console.log("Ricominciamooo");
    risposteMap.clear();
    //console.log('size: ' + risposteMap.size);    
    const boxes= document.querySelectorAll('.choice-grid div');
    const article= document.querySelector("article");

    for (const box of boxes){     
        box.classList.remove('noChoice');
        box.classList.remove('Choice');
        const noClick = box.querySelector('.checkbox');
        noClick.src = "images/unchecked.png";
        box.addEventListener('click', selezione);
        
    }
    article.removeChild(article.lastElementChild);
        
}

function personalita(){
let Array_aaa= Array.from(risposteMap.values());
//Array_a= Array.from(risposteMap.values());
//console.log('arrsssssssssay:' + Array_aaa);
//console.log('0: ' + Array_aaa[0]);
let j=0;
for (let j=0; j<Array_aaa.length;){
    for (let i=j+1; i<Array_aaa.length; i++){
    if (Array_aaa[j]==Array_aaa[i] ){
        return Array_aaa[j];
        //se ne trova uno uguale al primo elemento lo ritorna.
    }
    } 
    j++;
    for (let i=j+1; i<Array_aaa.length;i++){
    if (Array_aaa[j]== Array_aaa[i]){
        return Array_aaa[j];
    }
        
    }
    return 0;
}

}

