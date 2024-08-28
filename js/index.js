let nombreTienda = '';
let precioVentaUnitario = 0;
let costoUnitario = 0;
let unidadesVendidas = 0;
let otrosGastos = 0;
let meses = 12;

// Borrar datos
function borrarDatos() {
    document.getElementById('nombreTienda').value = '';
    document.getElementById('precioVenta').value = '';
    document.getElementById('costoUnitario').value = '';
    document.getElementById('unidadesVendidas').value = '';
    document.getElementById('otrosGastos').value = '';
    document.getElementById('resultadoTexto').textContent = '';

    localStorage.removeItem('datosTienda'); 

}

// Guardar datos en Storage
function guardarDatosEnStorage() {
    const datos = {
        nombreTienda: nombreTienda,
        precioVentaUnitario: precioVentaUnitario,
        costoUnitario: costoUnitario,
        unidadesVendidas: unidadesVendidas,
        otrosGastos: otrosGastos
    };
    localStorage.setItem('datosTienda', JSON.stringify(datos));
}


// Márgen mensual
function margenMensual(precioVentaUnitario, costoUnitario, unidadesVendidas, otrosGastos, meses) {
    let margenes = [];
    for (let mes = 1; mes <= meses; mes++) {
        let margen = ((precioVentaUnitario - costoUnitario) * unidadesVendidas) - otrosGastos;
        margenes.push({ mes: mes, margen: margen });
    }
    return margenes;
}

// Punto de equilibrio
function calcularPuntoEquilibrio(precioVentaUnitario, costoUnitario, otrosGastos) {
    let puntoEquilibrio = otrosGastos / (precioVentaUnitario - costoUnitario);
    return Math.ceil(puntoEquilibrio); 
}

// Mostrar resultados
function mostrarResultados(margenes) {
    let resultadoTexto = '';
    margenes.forEach(function(margen) {
        resultadoTexto += `Mes ${margen.mes}: Margen de ganancia = ${margen.margen.toFixed(2)}\n`;
    });
    return resultadoTexto;
}

// Buscar margen de un mes específico
function buscarMargenPorMes(margenes, mes) {
    return margenes.find(function(margen) {
        return margen.mes === mes;
    });
}

// Asignar valores desde HTML
function obtenerDatosDelFormulario() {
    nombreTienda = document.getElementById('nombreTienda').value;
    precioVentaUnitario = parseFloat(document.getElementById('precioVenta').value);
    costoUnitario = parseFloat(document.getElementById('costoUnitario').value);
    unidadesVendidas = parseInt(document.getElementById('unidadesVendidas').value);
    otrosGastos = parseFloat(document.getElementById('otrosGastos').value);

    guardarDatosEnStorage();
}

// Calcular y mostrar resultados
function calcularYMostrarResultados() {
    obtenerDatosDelFormulario();

    let margenes = margenMensual(precioVentaUnitario, costoUnitario, unidadesVendidas, otrosGastos, meses);
    let resultadosTexto = mostrarResultados(margenes);

    // Mostrar el resultado filtrado en pantalla
    document.getElementById('resultadoTexto').textContent = resultadosTexto;

    // Punto de equilibrio
    let puntoEquilibrio = calcularPuntoEquilibrio(precioVentaUnitario, costoUnitario, otrosGastos);
    console.log("El punto de equilibrio es: " + puntoEquilibrio + " unidades.");

    // Búsqueda
    let margenMes3 = buscarMargenPorMes(margenes, 3);
    console.log("Margen del mes 3:", margenMes3);
}

// Modo oscuro
let toggle=document.getElementById('toggle');
let label_toggle=document.getElementById('label_toggle');
toggle.addEventListener('change',(event)=>{
    let checked=event.target.checked;
    document.body.classList.toggle('dark');
    if(checked==true){
        label_toggle.innerHTML='<i class="fa-solid fa-sun"></i>';
        label_toggle.style.color="yellow";
    }else{
        label_toggle.innerHTML='<i class="fa-solid fa-moon"></i>';
        label_toggle.style.color="brown";
    }
})

// Llamo a la función para recuperar datos cuando la página se carga
document.addEventListener('DOMContentLoaded', recuperarDatosDeStorage);
