$(() => { /* remplaza la función "(document).ready(function(){})" */
    // console.log('DOM listo')
    const formulario = $('#formulario');
    const idPersonaje = $('#idPersonaje');
    const heroCharacter = $('#heroCharacter');
    const chartContainer = $("#chartContainer")

    formulario.on('submit', (e) => {
        e.preventDefault();

        //Realizar validaciones para números

        console.log(idPersonaje.val()); /* xxxx.val() ---> permite leer lo que escriba el usuario */

        let urlUno = "https://www.superheroapi.com/api.php/4905856019427443/";


        $.ajax({
            url: urlUno.concat(`/${idPersonaje.val()}`),
            type: 'GET',
            dataType: 'JSON',
            success(data) {
                console.log(data);

                heroCharacter.html("");
                heroCharacter.append(`
                <section class="row g-0">
                    <div class="col-md-4">
                        <img src= "${data.image.url}" class="img-fluid rounded-start">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">Nombre: ${data.name}</h5>
                            <p class="card-text">Conexiones:  ${data.connections['group-affiliation']}  </p>
                            <p class="card-text"><small class="text-muted">${data.biography.publisher}</small></p>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item">Ocupación: ${data.biography.occupation}</li>
                                <li class="list-group-item">Primera aparición:  ${data.biography['first-appearance']}  </li>
                                <li class="list-group-item">Altura: ${data.appearance.height[0]} - ${data.appearance.height[1]}</li>
                                <li class="list-group-item">Altura: ${data.appearance.weight[0]} - ${data.appearance.weight[1]}</li>
                                <li class="list-group-item">Alianzas: ${data.biography.alignment}</li>
                            </ul>
                        </div>
                    </div>
                </section>
                `);

                /* Gráfico */

                const options = {
                    animationEnabled: true,
                    title: {
                        text: "STATS",
                    },
                    zoomEnabled: true,
                    data: [{
                        type: "pie",
                        showLegend: true,
                        legendText: "{indexLabel}",
                        dataPoints: [{
                                y: data.powerstats.combat !== "null" ? data.powerstats.combat : 0,
                                indexLabel: "combat"
                            },
                            {
                                y: data.powerstats.power !== "null" ? data.powerstats.power : 0,
                                indexLabel: "power"
                            },
                            {
                                y: data.powerstats.durability !== "null" ? data.powerstats.durability : 0,
                                indexLabel: "durability"
                            },
                            {
                                y: data.powerstats.speed !== "null" ? data.powerstats.speed : 0,
                                indexLabel: "speed"
                            },
                            {
                                y: data.powerstats.strength !== "null" ? data.powerstats.strength : 0,
                                indexLabel: "strength"
                            },
                            {
                                y: data.powerstats.intelligence !== "null" ? data.powerstats.intelligence : 0,
                                indexLabel: "intelligence"
                            },
                        ],
                    }, ],
                };
                chartContainer.CanvasJSChart(options);
            },
            error(err) {
                console.log(err);
            },
        })
    });
})