// lib1.js
// http://localhost/pwasd25/index.html?n=2&d=5

const params = new URLSearchParams(window.location.search);
const n = params.get('n');
const d = params.get('d');

class Quickchart {
    constructor(n, d) {
        this.n = n;
        this.d = d;
    }

    crearCadunos() {
        let cadunos = "";
        const numD = parseInt(this.d, 10);
        if (!isNaN(numD) && numD > 0) {
            for (let i = 0; i < numD; i++) {
                cadunos += "1,";
            }
            return cadunos.slice(0, -1);
        }
        return "";
    }

    crearCadenasN() {
        let cadenasN = "";
        const numN = parseInt(this.n, 10);
        const numD = parseInt(this.d, 10);
        if (!isNaN(numN) && numD > 0) {
            for (let i = 0; i < numN; i++) {
                cadenasN += "1/" + numD + "|";
            }
            return cadenasN.slice(0, -1);
        }
        return "1/" + numD;
    }

    generarSrcImg() {
        let cadunos = this.crearCadunos();
        let cadenasN = this.crearCadenasN();
        if (cadunos && cadenasN) {
            let url = "https://quickchart.io/chart?cht=p3&chd=t:" + cadunos
                + "&chs=500x250&chl=" + cadenasN;
            return url;
        }
        return "";
    }
}

let q = new Quickchart(n, d);
const srcUrl = q.generarSrcImg();
const contenidoDiv = document.getElementById("contenido");

if (srcUrl) {
    contenidoDiv.innerHTML = '<img src="' + srcUrl + '" />';
} else {
    contenidoDiv.innerHTML = '<h1>null</h1>';
}