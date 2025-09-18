document.addEventListener("DOMContentLoaded", function() {
    let formularioCiudad = document.querySelector("#formularioTiempo");
    let listaDias = document.querySelector("#dias");
    let contenedorClima = document.querySelector("#clima");
    let contenedorZona = document.querySelector("#zona");


    formularioCiudad.addEventListener("submit", event => {
        event.preventDefault();
        const apiKey = 'c1e99c27c1664dfda29112745251308';
        ciudad = formularioCiudad.ciudad.value;

        const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${ciudad}&days=3&lang=es`;
        listaDias.innerHTML = ``
        contenedorClima.innerHTML = '';
        contenedorZona.innerHTML = '';

        fetch(url)
        .then(response => response.json())
            .then(data => {
                console.log(data);

                /*crear lista de dias*/
                data.forecast.forecastday.forEach((climaDia, index) => {
                    const icono = `https:${climaDia.day.condition.icon}`;
                    listaDias.innerHTML += `
                         <div data-index="${index}" class="dias_elem col-3 contenedor-principal border rounded m-4 shadow-lg p-3">
                         <strong>${climaDia.date}</strong><br><hr>
                        <img src="${icono}" alt="${climaDia.day.condition.text}">
                        <p>${climaDia.day.avgtemp_c} °C</p>
                        </div>`;
                });

                /*crear informacion zona*/
                contenedorZona.classList.remove("d-none");
                contenedorZona.innerHTML = `
                                                <h3>Datos de zona:</h3> <br>
                                                <p class="mb-1"><strong>País:</strong> ${data.location.country}</p>
                                                <p class="mb-1"><strong>Comunidad:</strong> ${data.location.region}</p>
                                                <p class="mb-1"><strong>Nombre:</strong> ${data.location.name}</p>
                                                <hr>
                                                <p class="mb-0"><strong>Longitud:</strong> ${data.location.lon} &nbsp; 
                                                <strong>Latitud:</strong> ${data.location.lat}</p>
`;


                document.getElementById("dias").classList.remove("d-none");

                listaDias.querySelectorAll(".dias_elem").forEach(elem => {
                    elem.addEventListener("click", (event) => {
                        /*marcar el dia selecionado*/
                        listaDias.querySelectorAll(".dias_elem").forEach(dia => {
                            dia.classList.remove("selecionado");
                        });

                        elem.classList.add("selecionado");

                        /*crear informacion del dia*/
                        contenedorClima.classList.remove("d-none");

                        const index = event.currentTarget.getAttribute("data-index");
                        const diaClima = data.forecast.forecastday[index];
                        console.log(diaClima);

                        let tablaHTML = `

                                    <h3>Datos de Clima:</h3> <br>
                                    
                                    <table class=" table-hover tabla-clima col-10 m-auto">
                                        <thead class="">
                                            <tr>
                                                <th class="p-2">Hora</th>
                                                <th class="p-2">Temperatura</th>
                                                <th class="p-2">Clima</th>
                                                <th class="p-2">Viento</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                `;

                        for (let cont = 0; cont < 24; cont++) {
                            tablaHTML += `
                                    <tr class="border">
                                        <td class="p-2">${cont}:00</td>
                                        <td class="p-2">${diaClima.hour[cont].temp_c} °C</td>
                                        <td class="p-2"><img src="${diaClima.hour[cont].condition.icon}" alt="icono clima"></td>
                                        <td class="p-2">${diaClima.hour[cont].wind_kph} K/H</td>
                                    </tr>
                                `;
                                                    }

                                                    tablaHTML += `
                                    </tbody>
                                </table>
                            `;

                        contenedorClima.innerHTML = tablaHTML;


                    });
                });
            })
    })
})