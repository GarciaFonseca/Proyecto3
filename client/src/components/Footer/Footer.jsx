import React from "react";

const Footer = () => {
  return (
    <div className="footer">
      <div className="container-footer">
        <div className="divfooter">
          <img
            className="logo-footer"
            src={process.env.PUBLIC_URL + "/img/LOGO_BLANCO.png"}
            alt=""
          />
        </div>
        
          {/* <li className='text-footer' href="#home">Nosotros</li> */}
          <li className="text-footer" href="#home">
          4 norte 1001. Entre la 12 y 10 oriente, San Andrés Cholula
          </li>
          <li className="text-footer" href="#home">
            d.fonsecadesigner@gmail.com
          </li>
          <li className="text-footer" href="#home">
            641 80 94 92
          </li>

      </div>
    </div>
  );
};

export default Footer;
