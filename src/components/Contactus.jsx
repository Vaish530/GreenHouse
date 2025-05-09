import SocialMedia from "../data/SocialMedia"
import "../styles/contactus.css"
import { Link } from "react-router-dom"
import ContactForm from "./ContactForm"
export default function ContactUs() {


   return  (
    <div className="social-page">
       {SocialMedia.map((social,index) => (
         <div className="social-container" key={index}>

           <p>contact us on  : {social.Phoneno}</p>
           <p> email us on :{social.email}</p>
           <p>PlantMarket Residence : {social.PlantMarketresidence}</p>
           <p>Follow us on social media:</p>
           <ul className="social-list">
             {Object.entries(social.SocialMedia).map(([platform, link]) => (
               <li key={platform}>
                 <a href={link} target="_blank" rel="noopener noreferrer">
                   {platform}
                 </a>
               </li>

             ))}
           </ul>
           <Link to="/inquiries"> <p className="link-to-inquiry">click here to fill  inquiry form for more help </p> </Link>
         </div>

       ))}
     </div>
   );
}