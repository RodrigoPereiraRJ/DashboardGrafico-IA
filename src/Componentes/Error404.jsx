import error404img from '../Assets/ERROR404.webp'
function Error(){
    return(
        <div style={{display: 'flex', justifyContent: 'center'}}> 
            <img src={error404img} alt="" style={{width: '700px'}}/>
        </div>
    )

}

export default Error