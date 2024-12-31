import axios from 'axios';
import { useEffect, useState } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2'; 
import { useSelector } from 'react-redux';
import styles from './../styles/Meusgraficos.module.sass'

function Renderlistgrafico() {
    const [datagrafico, setdatagrafico] = useState([]);
    const [graficobar, setgraficobar] = useState([]);
    const [graficoline, setgraficoline] = useState([]);
    const [graficopie,setgraficopie] = useState([])

    const nomeuser = useSelector((state)=> state.modalandguide.nameuser.nomedousuario)

    useEffect(() => {
        async function getgrafico() {
            try {
                const result = await axios.get('http://localhost:3000/Graficos');
                const listgrafico = result.data;
                setdatagrafico(listgrafico);
            } catch (error) {
                console.error('Erro ao buscar os dados: ', error);
            }
        }
        getgrafico();
    }, []);

    useEffect(() => {
        if (datagrafico.length > 0) {
            const graficobar = datagrafico.filter((el) => el.type === 'bar');
            const graficoline = datagrafico.filter((el) => el.type === 'line');
            const graficopie = datagrafico.filter((el)=>el.type === 'Pie')
            setgraficobar(graficobar);
            setgraficoline(graficoline);
            setgraficopie(graficopie)
        }
    }, [datagrafico]);



    function graficorender(grafico) {
        const data = {
            labels: grafico.labels,
            datasets: [
                {
                    label: grafico.datasettitulo,
                    data: grafico.dataset,
                    borderWidth: 2,
                    backgroundColor: grafico.corbarra
                },
                {
                    label: grafico.dataset2titulo,
                    data: grafico.dataset2,
                    borderWidth: 2,
                    backgroundColor: grafico.corbarra2
                }
            ]

        }

      

        return data
    }

    function optionsgraficofunction(options) {

        const optionsgrafico = {
            plugins: {
                responsive: true,
                maintainAspectRatio: true,
                legend: {
                    position: 'left',
                    labels: {
                        font: {
                            size: 15,
                        },
                        color: 'black'

                    }
                },
                title: {
                    display: true,
                    text: options.titulo,

                    font: {
                        size: 15,
                        family: 'Verdana'


                    },
                    color: 'black'
                }
            },
            scales: {
                x: {
                    ticks: {
                        font: {
                            size: 15
                        }
                    }
                },
                y: {
                    ticks: {
                        font: {
                            size: 15
                        }
                    }
                }
            }


        }
        return optionsgrafico
    }

     
     function graficorenderpie(grafico){
        const datapie = {
            labels: grafico.labels,
            datasets: [{
                data: grafico.dataset,
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)',
                    'rgb(194, 117, 23)',
                    'rgb(23, 194, 60)',
                    'rgb(33, 44, 46)',
                    'rgb(154, 27, 27)',
                    'rgb(125, 127, 192)',
                    'rgb(140, 58, 153)',
                    'rgb(43, 0, 123)',
                    'rgb(219, 228, 230)',
                    'rgb(111, 123, 123)'
    
                    
                ],
                hoverOffset: 4
            }]
        };

        return datapie
     }

     function graficopieoptions(options){
       
        
        const optionsdatepie = {
            plugins: {
                responsive: true,
                legend: {
                    position: 'left',
                    labels: {
                        font: {
                            size: 15,
                        },
                        color: 'black'
                    }
                },
                title: {
                    display: true,
                    text: options.datasettitulo,
    
                    font: {
                        size: 15,
                        family: 'Verdana'
                    },
                    color: 'black'
                }
            }
        }

        return optionsdatepie
     }

    


    return (


        <div>
            <div className={styles.menuitens} >
                <div className="lengthgraficobar" style={{position: 'absolute', display: 'inline-flex'}}>
                    <p style={{ fontSize: '17px', color: 'white', margin: '20px' }}>Total de grafico de Barra: {graficobar.length}</p>
                    <p style={{ fontSize: '17px', color: 'white', margin: '20px' }}>Total de grafico de linha: {graficoline.length}</p>
                    <p style={{ fontSize: '17px', color: 'white', margin: '20px' }}>Total de grafico de Pizza: {graficopie.length}</p>
                    <p style={{ fontSize: '17px', color: 'white', margin: '20px' }}>Criador do Grafico: {nomeuser}</p>
                    
                </div>
            </div>

            {graficobar.length > 0 && (
                graficobar.map((el, index) => (
                    <div key={index} className={styles.divrendergraficos}>
                        <Bar data={graficorender(el)} options={optionsgraficofunction(el)}>

                        </Bar>
                    </div>
                ))
            )}
            {graficoline.length > 0 && (
                graficoline.map((el, index) => (
                    <div key={index} className={styles.divrendergraficos}>
                        <Line data={graficorender(el)} options={optionsgraficofunction(el)}></Line>
                    </div>
                ))
            )}
            {graficopie.length > 0 && (
                graficopie.map((el, index) => (
                    <div key={index} className={styles.divrendergraficos}>
                        <Pie data={graficorenderpie(el)} options={graficopieoptions(el)}></Pie>
                    </div>
                ))
            )}

        </div>
    )
}

export default Renderlistgrafico;
