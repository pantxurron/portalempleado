
// Código para generar gráficos dinámicos usando Chart.js
// Este archivo se debe vincular al HTML principal

// Función para generar el gráfico de radar para las matrices competenciales
function generarGraficoRadarCompetencias() {
    const ctx = document.getElementById('graficoRadarCompetencias').getContext('2d');

    const data = {
        labels: [
            'Competencias Administrativas',
            'Competencias de Gestión',
            'Competencias Personales',
            'Competencias Relacionales',
            'Competencias Tecnológicas'
        ],
        datasets: [{
            label: 'Nivel Actual',
            data: [3.0, 3.4, 3.2, 3.18, 2.36],
            fill: true,
            backgroundColor: 'rgba(26, 75, 132, 0.2)',
            borderColor: 'rgb(26, 75, 132)',
            pointBackgroundColor: 'rgb(26, 75, 132)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(26, 75, 132)'
        }, {
            label: 'Nivel Objetivo',
            data: [3.5, 3.8, 3.5, 3.5, 3.5],
            fill: true,
            backgroundColor: 'rgba(200, 169, 126, 0.2)',
            borderColor: 'rgb(200, 169, 126)',
            pointBackgroundColor: 'rgb(200, 169, 126)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(200, 169, 126)'
        }]
    };

    const config = {
        type: 'radar',
        data: data,
        options: {
            elements: {
                line: {
                    borderWidth: 3
                }
            },
            scales: {
                r: {
                    angleLines: {
                        display: true
                    },
                    suggestedMin: 0,
                    suggestedMax: 5
                }
            }
        }
    };

    new Chart(ctx, config);
}

// Función para generar el gráfico de barras para las fortalezas
function generarGraficoFortalezas() {
    const ctx = document.getElementById('graficoFortalezas').getContext('2d');

    const data = {
        labels: [
            'Seguridad informática',
            'Atención a usuarios',
            'Trabajo en equipo',
            'Capacidad de análisis',
            'Liderazgo'
        ],
        datasets: [{
            label: 'Puntuación',
            data: [4.0, 4.0, 4.0, 3.67, 3.67],
            backgroundColor: [
                'rgba(26, 75, 132, 0.8)',
                'rgba(26, 75, 132, 0.8)',
                'rgba(26, 75, 132, 0.8)',
                'rgba(26, 75, 132, 0.8)',
                'rgba(26, 75, 132, 0.8)'
            ],
            borderColor: [
                'rgb(26, 75, 132)',
                'rgb(26, 75, 132)',
                'rgb(26, 75, 132)',
                'rgb(26, 75, 132)',
                'rgb(26, 75, 132)'
            ],
            borderWidth: 1
        }]
    };

    const config = {
        type: 'bar',
        data: data,
        options: {
            indexAxis: 'y',
            scales: {
                x: {
                    beginAtZero: true,
                    max: 5
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Principales Fortalezas'
                }
            }
        }
    };

    new Chart(ctx, config);
}

// Función para generar el gráfico de barras para las áreas de mejora
function generarGraficoAreasMejora() {
    const ctx = document.getElementById('graficoAreasMejora').getContext('2d');

    const data = {
        labels: [
            'Gestión de tiempos',
            'Adaptación tecnológica',
            'Innovación en procesos',
            'Mejora continua',
            'Conocimiento normativo'
        ],
        datasets: [{
            label: 'Puntuación',
            data: [2.0, 2.33, 2.33, 2.33, 2.5],
            backgroundColor: [
                'rgba(200, 169, 126, 0.8)',
                'rgba(200, 169, 126, 0.8)',
                'rgba(200, 169, 126, 0.8)',
                'rgba(200, 169, 126, 0.8)',
                'rgba(200, 169, 126, 0.8)'
            ],
            borderColor: [
                'rgb(200, 169, 126)',
                'rgb(200, 169, 126)',
                'rgb(200, 169, 126)',
                'rgb(200, 169, 126)',
                'rgb(200, 169, 126)'
            ],
            borderWidth: 1
        }]
    };

    const config = {
        type: 'bar',
        data: data,
        options: {
            indexAxis: 'y',
            scales: {
                x: {
                    beginAtZero: true,
                    max: 5
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Principales Áreas de Mejora'
                }
            }
        }
    };

    new Chart(ctx, config);
}

// Función para generar el gráfico de progreso general
function generarGraficoProgresoGeneral() {
    const ctx = document.getElementById('graficoProgresoGeneral').getContext('2d');

    const data = {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        datasets: [{
            label: 'Progreso PDI',
            data: [10, 20, 30, 45, null, null, null, null, null, null, null, null],
            fill: false,
            borderColor: 'rgb(26, 75, 132)',
            tension: 0.1
        }, {
            label: 'Objetivo',
            data: [8, 16, 25, 33, 41, 50, 58, 66, 75, 83, 91, 100],
            fill: false,
            borderColor: 'rgba(200, 169, 126, 0.5)',
            borderDash: [5, 5],
            tension: 0.1
        }]
    };

    const config = {
        type: 'line',
        data: data,
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Porcentaje de progreso'
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Progreso del PDI a lo largo del tiempo'
                }
            }
        }
    };

    new Chart(ctx, config);
}

// Función para inicializar todos los gráficos
function inicializarGraficos() {
    // Verificar si Chart.js está cargado
    if (typeof Chart !== 'undefined') {
        // Inicializar gráficos si los elementos existen
        if (document.getElementById('graficoRadarCompetencias')) {
            generarGraficoRadarCompetencias();
        }

        if (document.getElementById('graficoFortalezas')) {
            generarGraficoFortalezas();
        }

        if (document.getElementById('graficoAreasMejora')) {
            generarGraficoAreasMejora();
        }

        if (document.getElementById('graficoProgresoGeneral')) {
            generarGraficoProgresoGeneral();
        }
    } else {
        console.error('Chart.js no está cargado. Los gráficos no se pueden inicializar.');
    }
}

// Inicializar gráficos cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Funcionalidad de pestañas
    document.querySelectorAll('.tabs .tab').forEach(tab => {
        tab.addEventListener('click', function() {
            // Obtener el contenedor de pestañas
            const tabsContainer = this.closest('.tabs');
            const sectionContainer = tabsContainer.closest('section');

            // Desactivar todas las pestañas en este contenedor
            tabsContainer.querySelectorAll('.tab').forEach(t => {
                t.classList.remove('active');
            });

            // Activar la pestaña seleccionada
            this.classList.add('active');

            // Obtener el índice de la pestaña
            const index = Array.from(tabsContainer.querySelectorAll('.tab')).indexOf(this);

            // Mostrar el contenido correspondiente
            const tabContents = sectionContainer.querySelectorAll('.tab-content');
            tabContents.forEach(content => {
                content.classList.remove('active');
            });

            if (tabContents[index]) {
                tabContents[index].classList.add('active');
            }
        });
    });

    // Inicializar gráficos
    inicializarGraficos();

    // Funcionalidad para notificaciones
    const setupNotifications = document.getElementById('setupNotifications');
    if (setupNotifications) {
        setupNotifications.addEventListener('click', function() {
            if ('Notification' in window) {
                Notification.requestPermission().then(function(permission) {
                    if (permission === 'granted') {
                        alert('¡Notificaciones activadas! Recibirás recordatorios sobre tus actividades del PDI.');
                    }
                });
            }
        });
    }

    // Funcionalidad para exportar datos
    const exportButtons = document.querySelectorAll('.btn-export');
    exportButtons.forEach(button => {
        button.addEventListener('click', function() {
            const section = this.getAttribute('data-export');
            alert(`Exportando datos de ${section}... Esta funcionalidad se implementará con la integración de Microsoft Power Pages.`);
        });
    });
});

// Funciones para el seguimiento del PDI
function agregarEntradaSeguimiento() {
    const competencia = document.getElementById('seguimientoCompetencia').value;
    const fecha = document.getElementById('seguimientoFecha').value;
    const avance = document.getElementById('seguimientoAvance').value;
    const evidencias = document.getElementById('seguimientoEvidencias').value;
    const obstaculos = document.getElementById('seguimientoObstaculos').value;
    const ajustes = document.getElementById('seguimientoAjustes').value;

    if (!fecha || !avance || !evidencias) {
        alert('Por favor, completa al menos la fecha, el porcentaje de avance y las evidencias.');
        return;
    }

    const tabla = document.getElementById('tablaSeguimiento').getElementsByTagName('tbody')[0];
    const nuevaFila = tabla.insertRow();

    // Insertar celdas con la información
    nuevaFila.insertCell(0).textContent = fecha;
    nuevaFila.insertCell(1).textContent = avance + '%';
    nuevaFila.insertCell(2).textContent = evidencias;
    nuevaFila.insertCell(3).textContent = obstaculos || '-';
    nuevaFila.insertCell(4).textContent = ajustes || '-';

    // Limpiar el formulario
    document.getElementById('seguimientoFecha').value = '';
    document.getElementById('seguimientoAvance').value = '';
    document.getElementById('seguimientoEvidencias').value = '';
    document.getElementById('seguimientoObstaculos').value = '';
    document.getElementById('seguimientoAjustes').value = '';

    // Actualizar el progreso visual
    actualizarProgresoVisual(competencia, avance);

    alert('Entrada de seguimiento agregada correctamente.');
}

function actualizarProgresoVisual(competencia, avance) {
    // Esta función actualizaría las barras de progreso y gráficos
    // En una implementación real, se conectaría con la base de datos
    console.log(`Actualizando progreso de ${competencia} a ${avance}%`);

    // Ejemplo: actualizar barra de progreso
    const barrasProgreso = document.querySelectorAll('.progress-fill');
    if (barrasProgreso.length > 0) {
        // Actualizar la primera barra como ejemplo
        barrasProgreso[0].style.width = avance + '%';
    }
}

// Exportar funciones para uso global
window.agregarEntradaSeguimiento = agregarEntradaSeguimiento;
