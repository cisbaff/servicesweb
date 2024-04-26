!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t=t||self).Stepper=e()}(this,function(){"use strict";function t(){return(t=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var s in n)Object.prototype.hasOwnProperty.call(n,s)&&(t[s]=n[s])}return t}).apply(this,arguments)}var e=window.Element.prototype.matches,n=function(t,e){return t.closest(e)},s=function(t,e){return new window.Event(t,e)},i=function(t,e){return new window.CustomEvent(t,e)};!function(){if(window.Element.prototype.matches||(e=window.Element.prototype.msMatchesSelector||window.Element.prototype.webkitMatchesSelector),window.Element.prototype.closest||(n=function(t,n){if(!document.documentElement.contains(t))return null;do{if(e.call(t,n))return t;t=t.parentElement||t.parentNode}while(null!==t&&1===t.nodeType);return null}),window.Event&&"function"==typeof window.Event||(s=function(t,e){e=e||{};var n=document.createEvent("Event");return n.initEvent(t,Boolean(e.bubbles),Boolean(e.cancelable)),n}),"function"!=typeof window.CustomEvent){var t=window.Event.prototype.preventDefault;i=function(e,n){var s=document.createEvent("CustomEvent");return n=n||{bubbles:!1,cancelable:!1,detail:null},s.initCustomEvent(e,n.bubbles,n.cancelable,n.detail),s.preventDefault=function(){this.cancelable&&(t.call(this),Object.defineProperty(this,"defaultPrevented",{get:function(){return!0}}))},s}}}();var r={ACTIVE:"active",LINEAR:"linear",BLOCK:"dstepper-block",NONE:"dstepper-none",FADE:"fade",VERTICAL:"vertical"},o="transitionend",c="bsStepper",a=function(t,e,n,s){var o=t[c];if(!o._steps[e].classList.contains(r.ACTIVE)&&!o._stepsContents[e].classList.contains(r.ACTIVE)){var a=i("show.bs-stepper",{cancelable:!0,detail:{from:o._currentIndex,to:e,indexStep:e}});t.dispatchEvent(a);var p=o._steps.filter(function(t){return t.classList.contains(r.ACTIVE)}),d=o._stepsContents.filter(function(t){return t.classList.contains(r.ACTIVE)});a.defaultPrevented||(p.length&&p[0].classList.remove(r.ACTIVE),d.length&&(d[0].classList.remove(r.ACTIVE),t.classList.contains(r.VERTICAL)||o.options.animation||d[0].classList.remove(r.BLOCK)),l(t,o._steps[e],o._steps,n),u(t,o._stepsContents[e],o._stepsContents,d,s))}},l=function(t,e,n,s){n.forEach(function(e){var n=e.querySelector(s.selectors.trigger);n.setAttribute("aria-selected","false"),t.classList.contains(r.LINEAR)&&n.setAttribute("disabled","disabled")}),e.classList.add(r.ACTIVE);var i=e.querySelector(s.selectors.trigger);i.setAttribute("aria-selected","true"),t.classList.contains(r.LINEAR)&&i.removeAttribute("disabled")},u=function(t,e,n,s,a){var l=t[c],u=n.indexOf(e),f=i("shown.bs-stepper",{cancelable:!0,detail:{from:l._currentIndex,to:u,indexStep:u}});if(e.classList.contains(r.FADE)){e.classList.remove(r.NONE);var h=p(e);e.addEventListener(o,function n(){e.classList.add(r.BLOCK),e.removeEventListener(o,n),t.dispatchEvent(f),a()}),s.length&&s[0].classList.add(r.NONE),e.classList.add(r.ACTIVE),d(e,h)}else e.classList.add(r.ACTIVE),e.classList.add(r.BLOCK),t.dispatchEvent(f),a()},p=function(t){if(!t)return 0;var e=window.getComputedStyle(t).transitionDuration;return parseFloat(e)?(e=e.split(",")[0],1e3*parseFloat(e)):0},d=function(t,e){var n=!1,i=e+5;function r(){n=!0,t.removeEventListener(o,r)}t.addEventListener(o,r),window.setTimeout(function(){n||t.dispatchEvent(s(o)),t.removeEventListener(o,r)},i)},f=function(t,e){e.animation&&t.forEach(function(t){t.classList.add(r.FADE),t.classList.add(r.NONE)})},h={linear:!0,animation:!1,selectors:{steps:".step",trigger:".step-trigger",stepper:".bs-stepper"}};return function(){function e(e,n){var s=this;void 0===n&&(n={}),this._element=e,this._currentIndex=0,this._stepsContents=[],this.options=t({},h,{},n),this.options.selectors=t({},h.selectors,{},this.options.selectors),this.options.linear&&this._element.classList.add(r.LINEAR),this._steps=[].slice.call(this._element.querySelectorAll(this.options.selectors.steps)),this._steps.filter(function(t){return t.hasAttribute("data-target")}).forEach(function(t){s._stepsContents.push(s._element.querySelector(t.getAttribute("data-target")))}),f(this._stepsContents,this.options),this._setLinkListeners(),Object.defineProperty(this._element,c,{value:this,writable:!0}),this._steps.length&&a(this._element,this._currentIndex,this.options,function(){})}var s=e.prototype;return s._setLinkListeners=function(){var t=this;this._steps.forEach(function(e){var s,i=e.querySelector(t.options.selectors.trigger);t.options.linear?(t._clickStepLinearListener=(t.options,function(t){t.preventDefault()}),i.addEventListener("click",t._clickStepLinearListener)):(t._clickStepNonLinearListener=(s=t.options,function(t){t.preventDefault();var e=n(t.target,s.selectors.steps),i=n(e,s.selectors.stepper),r=i[c],o=r._steps.indexOf(e);a(i,o,s,function(){r._currentIndex=o})}),i.addEventListener("click",t._clickStepNonLinearListener))})},s.next=function(){var t=this,e=this._currentIndex+1<=this._steps.length-1?this._currentIndex+1:this._steps.length-1;a(this._element,e,this.options,function(){t._currentIndex=e})},s.previous=function(){var t=this,e=this._currentIndex-1>=0?this._currentIndex-1:0;a(this._element,e,this.options,function(){t._currentIndex=e})},s.to=function(t){var e=this,n=t-1,s=n>=0&&n<this._steps.length?n:0;a(this._element,s,this.options,function(){e._currentIndex=s})},s.reset=function(){var t=this;a(this._element,0,this.options,function(){t._currentIndex=0})},s.destroy=function(){var t=this;this._steps.forEach(function(e){var n=e.querySelector(t.options.selectors.trigger);t.options.linear?n.removeEventListener("click",t._clickStepLinearListener):n.removeEventListener("click",t._clickStepNonLinearListener)}),this._element[c]=void 0,this._element=void 0,this._currentIndex=void 0,this._steps=void 0,this._stepsContents=void 0,this._clickStepLinearListener=void 0,this._clickStepNonLinearListener=void 0},e}()});

var stepper;
const datas = {
    'Dados do solicitante': {},
    'Dados da ocorrencia': {},
}

var tipoSolicitante = "";
var tipoParentesco = "";
var tipoFinalidade = "";
var localAtendimento = "";
var files_upload = {}
var inputs = []


function removeInputs(){
    if (inputs.length > 0){
        inputs.forEach(element=>{
            element.remove()
        })
    }
}

function addInput(input, div){
    inputs.push(input);
    div.appendChild(input);
}


function configDocs(){
    const divDocuments = document.getElementById("documentosDiv");

    if(tipoSolicitante == "Paciente"){
        const label = document.createElement("h4");
        label.innerText = "Documento de identificação com foto, RG ou CNH."
        const inputFile = document.createElement("input");
        inputFile.type = "file";
        inputFile.required = true;
        inputFile.setAttribute("data-name", "Documento de Identificação");
        inputFile.setAttribute("aria-label", "inputFile");
        addInput(label, divDocuments);
        addInput(inputFile, divDocuments);


    }else if (tipoSolicitante == "Representante"){

        if (tipoParentesco == "Pais/Demais familiares"){
            const lb1 = document.createElement("h4");
            lb1.innerText = "Documento oficial com foto de identidade do paciente";
            const inputFile1 = document.createElement("input");
            inputFile1.type = "file";
            inputFile1.required = true;
            inputFile1.setAttribute("data-name", "Documento de Identificacao do Paciente");
            inputFile1.setAttribute("aria-label", "inputFile");
            const lb2 = document.createElement("h4");
            lb2.innerText = "Documento oficial com foto do solicitante";
            const inputFile2 = document.createElement("input");
            inputFile2.type = "file";
            inputFile2.required = true;
            inputFile2.setAttribute("data-name", "Documento do Solicitante");
            inputFile2.setAttribute("aria-label", "inputFile");
 
            addInput(lb1, divDocuments);
            addInput(inputFile1, divDocuments);
            addInput(lb2, divDocuments);
            addInput(inputFile2, divDocuments);

            
        }else if (tipoParentesco == "Cônjuge ou Companheiro"){
            const lb1 = document.createElement("h4");
            lb1.innerText = "Documento de Identidade do Paciente";
            const inputFile1 = document.createElement("input");
            inputFile1.type = "file"; 
            inputFile1.required = true;
            inputFile1.setAttribute("data-name", "Documento de Identificacao do Paciente");
            inputFile1.setAttribute("aria-label", "inputFile");
            const lb2 = document.createElement("h4");
            lb2.innerText = "Documento de Identidade do Conjugue ou Companheiro";
            const inputFile2 = document.createElement("input");
            inputFile2.type = "file";
            inputFile2.required = true;
            inputFile2.setAttribute("data-name", "Documento do Conjugue ou Companheiro");
            inputFile2.setAttribute("aria-label", "inputFile");
            const lb3 = document.createElement("h4");
            lb3.innerText = "Certidão de casamento ou União estável.";
            const inputFile3 = document.createElement("input");
            inputFile3.type = "file";
            inputFile3.required = true;
            inputFile3.setAttribute("data-name", "Documento de Casamento Uniao Estavel");
            inputFile3.setAttribute("aria-label", "inputFile");

            addInput(lb1, divDocuments);
            addInput(inputFile1, divDocuments);
            addInput(lb2, divDocuments);
            addInput(inputFile2, divDocuments);
            addInput(lb3, divDocuments);
            addInput(inputFile3, divDocuments);

        }else if (tipoParentesco == "Procurador"){
            const lb1 = document.createElement("h4");
            lb1.innerText = "Documento oficial com foto de identidade do paciente";
            const inputFile1 = document.createElement("input");
            inputFile1.type = "file";
            inputFile1.required = true;
            inputFile1.setAttribute("data-name", "Documento de Identificacao do Paciente");
            inputFile1.setAttribute("aria-label", "inputFile");
            const lb2 = document.createElement("h4");
            lb2.innerText = "Documento oficial com foto do solicitante do procurador";
            const inputFile2 = document.createElement("input");
            inputFile2.type = "file";
            inputFile2.required = true;
            inputFile2.setAttribute("data-name", "Documento do Procurador");
            inputFile2.setAttribute("aria-label", "inputFile");
            const lb3 = document.createElement("h4");
            lb3.innerText = "Procuração específica outorgada pelo paciente ou responsável";
            const inputFile3 = document.createElement("input");
            inputFile3.type = "file";
            inputFile3.required = true;
            inputFile3.setAttribute("data-name", "Procuracao Outorgada Paciente ou Responsavel");
            inputFile3.setAttribute("aria-label", "inputFile");

            addInput(lb1, divDocuments);
            addInput(inputFile1, divDocuments);
            addInput(lb2, divDocuments);
            addInput(inputFile2, divDocuments);
            addInput(lb3, divDocuments);
            addInput(inputFile3, divDocuments);
        }

    }
    var inputsFile = document.querySelectorAll(`[aria-label="inputFile"]`);
    inputsFile.forEach(element=>{
        element.style.marginBottom = "15px";
        element.addEventListener("change", event=>{
            const files = event.target.files;
            const field = element.getAttribute('data-name');

            if(files.length > 0){
                files_upload[field] = files;
            }
        })
    })



}

function RadioButtons(name){
    const divR = document.getElementById("divRepresentante");
    const radioObito = document.getElementById("radioO");

    if (name == "paciente"){
        divR.style.display = "none";
        radioObito.disabled = true;
        if (radioObito.checked){
            radioObito.checked = false;
        }

    }else if (name == "representante"){
        divR.style.display = "flex";
        divR.style.justifyContent = "center";
        radioObito.disabled = false;
    }

}

function getInputsText(){
    Object.keys(datas).forEach(key=>{
        var elements = document.querySelectorAll(`[aria-label="${key}"]`);
        elements.forEach(element=>{
    
            const field = element.getAttribute('data-name');
            const value = element.value;
            const isRequired = element.hasAttribute('required');
            if (isRequired && !value){
                console.log(element, isRequired);
            }
            if(value){
                datas[key][field] = value;
            }
        })
    })
}

function configAttributes(){
    datas["Dados do solicitante"]["Requerente"] = tipoSolicitante;
    if(tipoParentesco) datas["Dados do solicitante"]["Parentesco"] = tipoParentesco;
    datas["Dados do solicitante"]["Finalidade"] = tipoFinalidade;
    datas["Dados da ocorrencia"]["Local do Atendimento"] = localAtendimento;
}

function changeState(page, state){
    const pageShow = document.getElementById(page);
    pageShow.style.display = state;
}

function request(formData){
    fetch('/crur/register', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        changeState('create', 'none');
        changeState('end', 'flex');
        const labelEnd = document.getElementById("messageEnd");
        labelEnd.innerHTML = data.message
        const link = document.getElementById("link");
        link.href = `/crur/check/${data.identifier}`
        link.innerHTML = "Visualizar Status";
        const rtn = document.getElementById("return");
        rtn.href = `/crur/`
        rtn.innerHTML = "Voltar";

      })
      .catch(error => {
        console.error('Erro:', error);
      });
}


function finalizeRequest(){
    getInputsText();
    configAttributes();
    const formData = new FormData();
    formData.append('data_json', JSON.stringify(datas))
    var count = 0;
    Object.keys(files_upload).forEach(key => {
        const fileList = files_upload[key];
        Array.from(fileList).forEach(file => {
            const name = key.replace(/ /g, '_') + '-DIV-' + file.name;
            formData.append(`file${count}`, file, name);
            count += 1;
        });
    });
    request(formData);
}

function ScrollDiv(positon){
    const div = document.getElementById('stepper-header');
    if (positon == "start"){
        div.scrollLeft = 0;
    }else if(positon == "center"){
        div.scrollLeft = (div.scrollWidth - div.clientWidth) / 2;
    }
    else{
        div.scrollLeft = div.scrollWidth - div.clientWidth;
    }
}


function CheckSteps(step){
    var next = true;
    const elements = document.querySelectorAll(`[aria-label="${Object.keys(datas)[step]}"]`);
    elements.forEach(element=>{
        const value = element.value;
        const isRequired = element.hasAttribute('required');
        if (isRequired && !value){
            element.reportValidity();
            next = false;
        }
    })
    switch(step){
        case 0:
            const radioP = document.getElementById("radioP");
            const radioR = document.getElementById("radioR");
            if(!radioP.checked && !radioR.checked){
                if(!radioP.checked) radioP.reportValidity();
                if(!radioR.checked) radioR.reportValidity();
                next = false;
                return
            }
            if (radioP.checked) tipoSolicitante = "Paciente";
            if (radioR.checked){
                tipoSolicitante = "Representante";
                var radioButtons = document.querySelectorAll('input[type="radio"][name="inlineRadioOptions"]');
                var optionsActive = false;
                radioButtons.forEach(element=>{
                    if(element.checked){
                        optionsActive = true;
                        tipoParentesco = element.value;
                    }
                })
                if(!optionsActive){
                    next = false;
                    radioButtons.forEach(element=>{
                        element.reportValidity();
                    })
                }
              
            }
            
            var radioButtons = document.querySelectorAll('input[type="radio"][name="radioFinalidade"]');
            var optionsActive = false;
            radioButtons.forEach(element=>{
                if(element.checked){
                    tipoFinalidade = element.value;
                    optionsActive = true;
                }
            })
            if (!optionsActive){
                next = false;
                radioButtons.forEach(element=>{
                    element.reportValidity();
                })
            }

            if (next){
                stepper.next();
                ScrollDiv('center');
            }
            return
        case 1:
            var radioButtons = document.querySelectorAll('input[type="radio"][name="radioAtendimento"]');
            var optionsActive = false;
            radioButtons.forEach(element=>{
                if(element.checked){
                    localAtendimento = element.value;
                    optionsActive = true;
                }
            })
            if (!optionsActive){
                next = false;
                radioButtons.forEach(element=>{
                    element.reportValidity();
                })
            }
            if(next){
                stepper.next();
                ScrollDiv('end');
                removeInputs();
                configDocs();
            }
            return
        case 2:
            var inputsFile = document.querySelectorAll(`[aria-label="inputFile"]`);
            inputsFile.forEach(element=>{
                if(!element.value){
                    next = false;
                    element.reportValidity();
                }

            })
            if(next){

                finalizeRequest();
            }

    }
}
window.addEventListener("load", function (event) {
    stepper = new Stepper(document.querySelector('.bs-stepper'));
    document.getElementById("radioP").addEventListener('change', ()=>{RadioButtons('paciente')});
    document.getElementById("radioR").addEventListener('change', ()=>{RadioButtons('representante')});


});


