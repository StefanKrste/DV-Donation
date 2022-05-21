import React from "react";

const Footer = () => {
    return (

        <div style={{paddingTop: '10px', margin: '3px'}}>
            <hr style={{color: 'white'}}></hr>
            <h4 className='text-light'>About us</h4>
            <a className="kontakt" href="https://github.com/StefanKrste/DV-Donation">GitHub</a>
            <img style={{float: 'right'}} src="../src/meta.png" height={40} width={40}/>
            <p style={{float: 'right', fontSize: '25px', color: 'gray'}}>Powered by </p>
            <div className={"mb-3"}>
                <a className="kontakt" href="https://github.com/StefanKrste">Stefan Krstevski</a>
                <a className="kontakt" href="https://github.com/riziMizi">Bojan Risteski</a>
                <a className="kontakt" href="https://github.com/AmraPacariz">Amra Pacariz</a>
            </div>
        </div>
    );
};

export default Footer;
