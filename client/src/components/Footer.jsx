import React from "react";

const Footer = () => {
    return (

        <div style={{paddingTop:'10px',margin:'3px'}} >
           <hr style={{color:'white'}}></hr>
            <h4 class='text-light'>About us</h4>
           
            <a className="kontakt" href="https://github.com/StefanKrste/DV-Donation">GitHub</a>
            <img style={{float:'right'}} src="../src/meta.png" height={40} width={40} />
                <p style={{float:'right',fontSize:'25px',color:'gray'}}>Powered by  </p>
           
            
            <div>
            <a className="kontakt" href="https://github.com/StefanKrste">Stefan Krstevski</a>
            <a className="kontakt" href="https://github.com/riziMizi">Bojan Risteski</a>
            <a className="kontakt" href="https://github.com/AmraPacariz">Amra Pacariz</a>
            {/* <img  style={{margin:'auto'}} src="../src/logo-eng.png" height={50} width={400} /> */}
            
             </div>

        </div>
    );
};

export default Footer;
