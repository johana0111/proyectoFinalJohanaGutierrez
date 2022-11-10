let historial = []
const moneda1 = document.getElementById('desde')
const moneda2 = document.getElementById('hacia')
const cambiar = document.getElementById('intercambio')
const cantidadInicial = document.getElementById('cantidad1')
const cantidadFinal = document.getElementById('cantidad2')
const grafica1 = document.getElementById('myChart').getContext("2D")


function convertir(){
    const moneda_uno = moneda1.value;
    const moneda_dos = moneda2.value;

   fetch(`https://v6.exchangerate-api.com/v6/b10a8367f64906f967ae523a/latest/${moneda_uno}`)
   .then(res => res.json() )
   .then(data => {
       const taza = data.conversion_rates[moneda_dos];
       console.log(taza)
       cantidadFinal.value = (cantidadInicial.value * taza).toFixed(2);
       guardarHistorial(moneda_uno, moneda_dos, cantidadInicial.value, cantidadFinal.value)

    } );
    
}

moneda1.addEventListener('change', convertir);
cantidadInicial.addEventListener('input', convertir);
moneda2.addEventListener('change', convertir);
cantidadFinal.addEventListener('input', convertir);

cambiar.addEventListener('click', () =>{
    const temp = moneda1.value;
    moneda1.value = moneda2.value;
    moneda2.value = temp;
    convertir();
} );


convertir();

function guardarHistorial(moneda1, moneda2,valor1, valor2){
    
  let primerConvertido = new valorHistorial(moneda1, moneda2,valor1, valor2)
  historial.push(primerConvertido)
  console.log(historial)
  //convierto en json)
  const historialEnJson = JSON.stringify(historial)
  //agrego al local storage
  localStorage.setItem("historial", historialEnJson)
}
//Constructor del objeto moneda convertida
class valorHistorial {
  constructor(moneda1, moneda2,valor1, valor2){
  this.moneda1 = moneda1
  this.moneda2 = moneda2
  this.valor1 = valor1  
  this.valor2 = valor2
  }
}
// Utilice la libreria chartjs para representar una gráfica con las cotizaciones recientes

//comienza el array de labels
let hoy = new Date();
let dia1 = hoy.getDate()
let mes1 = hoy.getMonth()
let agnio1 = hoy.getFullYear()
let primerDia = `${dia1}/${mes1}/${agnio1}`

const ultimosSieteDias = [primerDia]

for (i = 1 ; i <=6 ; i+=1){
  let dia = (hoy.getDate())-i
  if(dia > 0){  
    let mes = (hoy.getMonth()+1)
    let agnio = (hoy.getFullYear())
    ultimosSieteDias.push(`${dia}/${mes}/${agnio}`)
  }else{
    dia = 31
    let mes = (hoy.getMonth()+1)-1
    let agnio = (hoy.getFullYear())
    ultimosSieteDias.push(`${dia}/${mes}/${agnio}`)
  }

}

//Eleccion de datos

const datos = ultimosSieteDias;
  const data = {
    labels: datos,
    datasets: [{
      label: 'Últimos 7 dias',
      backgroundColor: '#222222',
      borderColor: '#222222',
      data: [0.90154, 0.485516, 0.15842, 0.985212, 0.485100, 0.89842, 0.51516],
    }]
  };

  const config = {
    type: 'line',
    data: data,
    options: {}
  };

  const myChart = new Chart(
    document.getElementById('myChart'),
    config
  );
 

  