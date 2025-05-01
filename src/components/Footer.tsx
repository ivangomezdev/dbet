import React from "react";
import "./footer.css"

const Footer = () => {
  return (
    <>
    <div className="footer">

    <div className="footer-container">
      <div className="footer-content">
        <div className="footer-links">
          <span>© Copyright 2016-2025 NinjaBet</span>
          <span className="separator">|</span>
          <a href="/privacy-policy">Privacy Policy</a>
          <span className="separator">|</span>
          <a href="/cookie-policy">Cookie Policy</a>
          <span className="separator">|</span>
          <a href="/cookie-preferences">Actualiza tus preferencias de seguimiento</a>
          <span className="separator">|</span>
        </div>

        <div className="footer-links">
          <a href="/terms">T&C</a>
          <span className="separator">|</span>
          <a href="/about">QUIENES SOMOS</a>
          <span className="separator">|</span>
          <a href="/contact">ESCRÍBENOS</a>
          <span className="separator">|</span>
          <a href="/affiliates">AFILIADOS</a>
        </div>

       
      </div>

      <div className="social-contact">
        <div className="social-icons">
          <a href="https://facebook.com" className="social-icon">
            <span className="icon">f</span>
          </a>
          <a href="https://instagram.com" className="social-icon">
            <span className="icon">
              <svg viewBox="0 0 24 24" width="16" height="16">
                <path
                  fill="currentColor"
                  d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"
                />
              </svg>
            </span>
          </a>
          <a href="https://telegram.com" className="social-icon">
            <span className="icon">
              <svg viewBox="0 0 24 24" width="16" height="16">
                <path
                  fill="currentColor"
                  d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-1.97 9.269c-.145.658-.537.818-1.084.51l-3-2.21-1.446 1.394c-.16.16-.295.295-.603.295l.213-3.053 5.56-5.023c.242-.213-.054-.332-.373-.119L8.48 13.278l-2.96-.924c-.643-.204-.657-.643.137-.953l11.59-4.46c.536-.197 1.006.128.832.83z"
                />
              </svg>
            </span>
          </a>
        </div>

        <button className="contact-button">
          <svg viewBox="0 0 24 24" width="24" height="24" className="chat-icon">
            <path
              fill="currentColor"
              d="M12 2C6.486 2 2 6.486 2 12c0 1.486.343 2.893.958 4.151L2 22l5.849-.958C9.107 21.657 10.514 22 12 22c5.514 0 10-4.486 10-10S17.514 2 12 2zm0 18c-1.341 0-2.642-.289-3.851-.834l-3.102.516.516-3.102C5.289 14.642 5 13.341 5 12c0-3.86 3.14-7 7-7s7 3.14 7 7-3.14 7-7 7z"
            />
          </svg>
          Contáctanos
        </button>
      </div>
    </div>
    </div>
  </>
  );
};

export default Footer;
