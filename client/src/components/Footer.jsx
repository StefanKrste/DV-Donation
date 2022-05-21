import React from "react";

const Footer = () => {
    return (
        <div className="m-3" >
     
            <h3 className="kontakt">About us</h3>
            <a className="kontakt" href="https://github.com/StefanKrste/DV-Donation">GitHub</a>
            <img style={{float:'right'}} src="../src/meta.png" height={40} width={40} />
                <p style={{float:'right',fontSize:'25px',color:'gray'}}>Powered by  </p>
           
            
            <div>
            <a className="kontakt" href="https://github.com/StefanKrste">Stefan Krstevski</a>
            <a className="kontakt" href="https://github.com/riziMizi">Bojan Risteski</a>
            <a className="kontakt" href="https://github.com/AmraPacariz">Amra Pacariz</a>
            
             </div>

        </div>
    );
};

export default Footer;
