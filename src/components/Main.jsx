
import "../styles/Main.css";
import {useNavigate} from "react-router-dom";
export default function Main()
{
const navigate=useNavigate();

  return (
      <div>
       <video className="video-fix" src="/images/plantholding.mp4" type="video/mp4" autoPlay loop muted></video>
       <div className='video-text'>
       <h1> The Green House 🌱</h1>
       <i>House where you find life!....</i>
       </div>
         <button onClick={()=>navigate ("./products")}  className="btn" ><i>Explore</i></button>  
      </div> 
  )
}