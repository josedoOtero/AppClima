document.addEventListener("DOMContentLoaded", function() {
    let formularioCiudad = document.querySelector("#formularioTiempo");
    let listaDias = document.querySelector("#dias");
    let contenedorClima = document.querySelector("#clima");


    formularioCiudad.addEventListener("submit", event => {
        event.preventDefault();
        const apiKey = 'c1e99c27c1664dfda29112745251308';
        ciudad = formularioCiudad.ciudad.value;

        const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${ciudad}&days=3&lang=es`;
        listaDias.innerHTML = ``

        fetch(url)
        .then(response => response.json())
            .then(data => {
                console.log(data);

                data.forecast.forecastday.forEach((climaDia) => {
                    const icono = `https:${climaDia.day.condition.icon}`;
                    listaDias.innerHTML += `<div class="dias_elem col-3 contenedor-principal border rounded m-4 shadow-lg p-3">
                                                <strong>${climaDia.date}</strong><br><hr>
                                                 <img src="${icono}" alt="${climaDia.day.condition.text}">
                                                <p>${climaDia.day.avgtemp_c} °C</p>
                                            </div>`;
                })

                document.getElementById("dias").classList.remove("d-none");
            })
    })
})