import { Bar, Line, Pie } from 'react-chartjs-2'
import '../Config'
import { useEffect, useRef, useState } from 'react'
import styles from '../styles/Dashboard.module.sass'
import { GoogleGenerativeAI } from '@google/generative-ai'
import video from '../VIDEOS-Tutorial/titulografico.mp4'
import video2 from '../VIDEOS-Tutorial/labels.mp4'
import video3 from '../VIDEOS-Tutorial/datasets.mp4'
import { useDispatch, useSelector } from 'react-redux'
import { disableguid } from '../Redux/Guideline'
import banner from '../Assets/background.png'
import axios from 'axios'
import Modal from '../Componentes/Modal'
import { Link } from 'react-router-dom'


const apikey = import.meta.env.VITE_APIGOOGLE

function Dashboard() {

    const [render, setrender] = useState(false)

    const [type, settypegrafico] = useState(false)
    const [datagrafico, setdatagrafico] = useState({
        titulo: '',
        labels: '',
        dataset: '',
        datasettitulo: '',
        dataset2: '',
        dataset2titulo: '',
        type: '',
        corbarra: ''
    })

    const [datagraficopie, setdatagraficopie] = useState('')
    const [corgrafico, setcorgrafico] = useState('')
    const [corgrafico2, setcorgrafico2] = useState('')
    const dispatch = useDispatch()

    async function getdata(e) {
        e.preventDefault()
        
        dispatch(disableguid())

        const labels = e.target[1].value
        const labelstoarray = labels.trim().split(' ').filter(word => word !== '')
        const dataset = e.target[3].value
        const dataset2 = e.target[6].value
        const datasettoarray = dataset.trim().split(' ').filter(word => word !== '')
        const datasettoarray2 = dataset2.trim().split(' ').filter(word => word !== '')

        setdatagrafico({
            type: type,
            titulo: e.target[0].value,
            labels: labelstoarray,
            dataset: datasettoarray,
            datasettitulo: e.target[4].value,
            dataset2: datasettoarray2,
            dataset2titulo: e.target[7].value,

            corbarra: corgrafico,
            corbarra2: corgrafico2
        })

        setdatagraficopie({

            titulografico: labelstoarray,
            dataset: datasettoarray,
            titulodataset: e.target[4].value 
            
        })

        setrender(true)
    }

    const typegrafico = (type) => {
        settypegrafico(type.target.value)

    }

    const corbarra = (cor) => {
        if (cor.target.value !== 'Cor da barra') {
            setcorgrafico(cor.target.value)
        }

    }
    const corbarra2 = (cor2) => {
        if (cor2.target.value !== 'Cor da barra') {
            setcorgrafico2(cor2.target.value)
        }
    }

    const [iacontent, setiacontent] = useState('')

    useEffect(() => {
        if (render) {
            const GenAI = new GoogleGenerativeAI(apikey)

            const estatisticaAi = async () => {

                const Model = GenAI.getGenerativeModel({ model: 'gemini-1.5-pro' })
                const objetostr = JSON.stringify(datagrafico)

                const prompt = `TRAGA UM RELATORIO GERAL DO GRAFICO, POREM DE FORMA RESUMIDA ${objetostr}`
                try {

                    const result = await Model.generateContent(prompt);
                    const responseAi = await result.response;
                    const text = responseAi.text();
                    setiacontent(text)
                } catch (error) {
                    console.log('erro ocorreu');
                }
            }
            estatisticaAi()
        }



    }, [render, datagrafico])

    useEffect(() => {

        if (render) {
            axios.post('http://localhost:3000/Graficos', datagrafico)
                .catch(Errorlog => {
                    console.log(Errorlog);
                })
        }

    }, [datagrafico, render])

    const data = {
        labels: datagrafico.labels,
        datasets: [
            {
                label: datagrafico.datasettitulo,
                data: datagrafico.dataset,
                borderWidth: 2,
                borderColor: corgrafico,
                backgroundColor: corgrafico
            },
            {
                label: datagrafico.dataset2titulo,
                data: datagrafico.dataset2,
                borderWidth: 2,
                borderColor: corgrafico2,
                backgroundColor: corgrafico2
            }
        ]

    }

    const options = {
        plugins: {
            resposive: true,
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
                text: datagrafico.titulo,

                font: {
                    size: 25,
                    family: 'Poppins'



                },
                color: 'green'
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

    const labeldataset2 = useRef(null)
    const inputopcional = useRef(null)
    const titulodataset2 = useRef(null)
    const titulodografico = useRef(null)
    const inputtitulografico = useRef(null)
    const inputopt = useRef(null)
    const dataset1 = useRef(null)

    const teste = (event) => {
        if (event.target.value === 'Pie' && inputopt.current.value === 'Pie') {
            if (labeldataset2) {

                labeldataset2.current.removeAttribute('required');
                inputopcional.current.removeAttribute('required');
                titulodataset2.current.removeAttribute('required');
                titulodografico.current.removeAttribute('required');
                inputtitulografico.current.removeAttribute('required');
                dataset1.current.removeAttribute('required');

                labeldataset2.current.style.display = 'none'
                inputopcional.current.style.display = 'none'
                titulodataset2.current.style.display = 'none'
                titulodografico.current.style.display = 'none'
                inputtitulografico.current.style.display = 'none'
                dataset1.current.style.display = 'none'
            }
        } else {
            if (event.target.value === 'bar' || event.target.value === 'line') {

                titulodografico.current.setAttribute('required', '');
                inputtitulografico.current.setAttribute('required', '');
                dataset1.current.setAttribute('required', '');
               
                dataset1.current.style.display = 'block'
                labeldataset2.current.style.display = 'block'
                inputopcional.current.style.display = 'block'
                titulodataset2.current.style.display = 'block'
                titulodografico.current.style.display = 'block'
                inputtitulografico.current.style.display = 'block'
            }
        }

    }

    
    const datapie = {
        labels: datagraficopie.titulografico,
        datasets: [{
            label: datagraficopie.titulodataset,
            data: datagraficopie.dataset,
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

    const optionsdatepie = {
        plugins: {
            resposive: true,
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
                text: datagraficopie.titulodataset,

                font: {
                    size: 15,
                    family: 'Verdana'
                },
                color: 'black'
            }
        }
    }
    let chartcomponenet

    if (datagrafico.type === 'line') {
        chartcomponenet = <Line data={data} options={options} ></Line>

    } else if (datagrafico.type === 'bar' || datagrafico.type === 'Pie') {
        if (datagrafico.type === 'bar') {
            chartcomponenet = <Bar data={data} options={options} ></Bar>
        } else {
            chartcomponenet = <Pie data={datapie} options={optionsdatepie} ></Pie>
        }

    } else {
        chartcomponenet = <div></div>

    }

    const [controlldivs, setControlldivs] = useState({
        div1: false,
        div2: false,
        div3: false
    });

    const [viewtutor, setviewtutor] = useState(false)

    const statusguid = useSelector((state) => state.modalandguide.viewguidline.view)
    const nameuser = useSelector((state) => state.modalandguide.nameuser.nomedousuario)

    function tooglediv(divindex) {

        if (statusguid === false) return

        setviewtutor(true)

        if (divindex === 'div1') {
            setControlldivs(prevstate => ({
                ...prevstate,
                div1: true,
                div2: false,
                div3: false
            }))

        } else if (divindex === 'div2') {
            setControlldivs(prevstate => ({
                ...prevstate,
                div1: false,
                div2: true,
                div3: false
            }))
        } else {
            setControlldivs(prevstate => ({
                ...prevstate,
                div1: false,
                div2: false,
                div3: true
            }))
        }

    }

    function hiddendiv() {

        setviewtutor(false)
        setControlldivs(prevstate => ({
            ...prevstate,
            div1: false,
            div2: false,
            div3: false
        }))
    }

    return (


        <div className={styles.Dashboard} style={{ backgroundColor: viewtutor === true || nameuser.length === 0 ? 'rgb(0,0,0,0.3)' : 'white' }}>

            {controlldivs.div1 && (
                <div className={styles.div1tutorial} >

                    <video autoPlay muted loop={true} className={styles.videocontainer} >
                        <source src={video} type="video/mp4" />
                        seu navegador nao suporta o elemento de video
                    </video>

                </div>
            )}

            {controlldivs.div2 && (
                <div className={styles.div2tutorial}>
                    <video autoPlay muted loop={true} className={styles.videocontainer}>
                        <source src={video2} type="video/mp4" />
                        seu navegador nao suporta o elemento de video
                    </video>

                </div>
            )}

            {controlldivs.div3 && (
                <div className={styles.div3tutorial}>
                    <video autoPlay muted loop={true} className={styles.videocontainer}>
                        <source src={video3} type="video/mp4" />
                        seu navegador nao suporta o elemento de video
                    </video>

                </div>
            )}

            <div className={styles.Titlepage}>
                <img src={banner} alt="" style={{ userSelect: 'none' }} />
            </div>


            <div className={styles.generateform}>
                <div className={styles.titulogenerate}>
                    <h2>{nameuser.length === 0 ? 'Configuração do Grafico' : `Bem Vindo(A): ${nameuser}`}</h2>
                </div>
                <div className={styles.divform}>
                    <form onSubmit={getdata} onChange={teste} >
                        <label htmlFor="teste" ref={titulodografico}>Titulo do Grafico</label>
                        <input type="text" placeholder='Insira o Titulo do Grafico' required ref={inputtitulografico} onClick={() => tooglediv('div1')} />
                        <label htmlFor="">Labels</label>
                        <input type="text" id="" placeholder='EX: JANEIRO FEVEREIRO MARÇO' required onClick={() => tooglediv('div2')} />
                        <label htmlFor="vlw" ref={dataset1}> Datasets
                            <select name="" id="" onChange={corbarra} style={{ position: 'relative', margin: '10px' }}>
                                <option value="">Cor da barra</option>
                                <option value="black">Preto</option>
                                <option value="red">Vermelho</option>
                                <option value="blue">Azul</option>
                                <option value="yellow">Amarelo</option>
                                <option value="green">Verde</option>
                            </select>
                        </label>
                        <input type="text" name="" id="" placeholder='APENAS NUMEROS EX: 33 22 100' required onClick={() => tooglediv('div3')} />
                        <input type="text" required placeholder='insira o titulo do Dataset 1' /> <br />
                        <label htmlFor="vlw" ref={labeldataset2}> Datasets 2
                            <select name="" id="" onChange={corbarra2} style={{ position: 'relative', margin: '10px' }}>
                                <option value="">Cor da barra</option>
                                <option value="black">Preto</option>
                                <option value="red">Vermelho</option>
                                <option value="blue">Azul</option>
                                <option value="yellow">Amarelo</option>
                                <option value="green">Verde</option>
                            </select>
                        </label>
                        <input type="text" name="" id="" placeholder='APENAS NUMEROS EX: 33 200' ref={inputopcional} onClick={() => hiddendiv()} />
                        <input type="text" placeholder='insira o titulo do Dataset 2' ref={titulodataset2} onClick={() => hiddendiv()} /> <br />
                        <div className={styles.select}>
                            <span>Tipo do Grafico: </span>
                            <select name="" id="type do grafico" onChange={typegrafico} onClick={() => hiddendiv()}>
                                <option value="">Selecione</option>
                                <option value="line">Line</option>
                                <option value="bar">Bar</option>
                                <option value="Pie" ref={inputopt}>Pie</option>
                            </select>
                        </div>
                        <button type="submit">Render Grafico</button>
                        {render && (
                            <button style={{ backgroundColor: '#536179' }}><Link to="/MeusGraficos" target='_blank'>Biblioteca</Link></button>
                        )}
                    </form>
                </div>

            </div>
            <div className={type === 'Pie' ? styles.cocozin : styles.containerrender} >
           
                {render ? (
                    <div className={styles.graficorenderizado}>
                        {chartcomponenet}
                    </div>

                ) : (
                    <div className={styles.rendergrafico}>
                        <div className={styles.loading}>
                            <span>Seu grafico Sera Renderizado Aqui...</span>
                        </div>
                    </div>
                )}
            </div>
            <div className={type === 'Pie' ? styles.statusresponsive : styles.status}>
                <div className={styles.statuslayoult}>
                    <span>IA analytics </span>
                </div>
                <div className={styles.statusinfo}>

                    {iacontent.length > 0 ? (
                        <p>{iacontent}</p>
                    ) : (
                        <img src="https://cdn.dribbble.com/users/600626/screenshots/2944614/loading_12.gif" alt="" />
                    )}
                </div>

            </div>
            <Modal />



        </div>

    )

}

export default Dashboard
