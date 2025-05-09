import "./CommunitySocials.css"

function CommunitySocials() {
  return (
    <div className="community-socials">
      <div className="community-socials__container">
        <div className="community-socials__chat-section">
          <div className="community-socials__chat-messages">
            <div className="community-socials__message community-socials__message--todd">
              <div className="community-socials__avatar community-socials__avatar--todd">
                <img src="https://res.cloudinary.com/dllkefj8m/image/upload/v1746812685/relax_gekbas.jpg" alt="Todd avatar" />
              </div>
              <div className="community-socials__message-content">
                <div className="community-socials__user-info">
                  <span className="community-socials__username community-socials__username--todd">Marcelo Gomez</span>
                  <span className="community-socials__timestamp">2025/04 18:45</span>
                </div>
                <p className="community-socials__text">
                  La pagina cumple con lo que promete. excelente forma de generar sin riesgo. 
                </p>
              </div>
            </div>

            <div className="community-socials__heart-emoji">❤️</div>

            <div className="community-socials__message community-socials__message--ed">
              <div className="community-socials__avatar community-socials__avatar--ed">
                <img src="https://res.cloudinary.com/dllkefj8m/image/upload/v1745271331/samples/landscapes/beach-boat.jpg" alt="Ed avatar" />
              </div>
              <div className="community-socials__message-content">
                <div className="community-socials__user-info">
                  <span className="community-socials__username">Martin Delavecchia</span>
                  <span className="community-socials__timestamp">2025/04 22:11</span>
                </div>
                <p className="community-socials__text">
                 El servicio de autoBet es genial, la membresia se paga sola.
                </p>
              </div>
            </div>

            <div className="community-socials__thumbs-up">👍</div>

            <div className="community-socials__message community-socials__message--arsenal">
              <div className="community-socials__avatar community-socials__avatar--arsenal">
                <img src="https://res.cloudinary.com/dllkefj8m/image/upload/v1745271331/samples/people/boy-snow-hoodie.jpg" alt="Arsenal avatar" />
              </div>
              <div className="community-socials__message-content">
                <div className="community-socials__user-info">
                  <span className="community-socials__username">arsenalfcjun14</span>
                  <span className="community-socials__timestamp">2025/05 13:01</span>
                </div>
                <p className="community-socials__text">
                 Los bonos de bienvenida son brutales, 766 eur de ganancias en 1 mes, Recomendadisimos.
                </p>
              </div>
            </div>
          </div>

          <div className="community-socials__discord-logo">
            <img src="https://res.cloudinary.com/dllkefj8m/image/upload/v1745956343/discord-logo-icon-social-media-icon-free-png_oxhfsh.webp" alt="Discord logo" />
          </div>
        </div>

        <div className="community-socials__content">
          <h2 className="community-socials__title">ÚNETE A NUESTRA COMUNIDAD SOCIAL ACTIVA</h2>
          <p className="community-socials__description">
            Contamos con una gran comunidad de miembros de WinBet que siempre comparten consejos y trucos, y siempre
            hacen y responden preguntas. Únete a las comunidades y haz cualquier pregunta que tengas.
          </p>
          <div style={{display:"none"}} className="community-socials__buttons">
            <a style={{display:"flex",alignItems:"center",gap:"10px"}} href="#" className="community-socials__button community-socials__button--facebook">
            <img style={{width:"30px"}} src="https://res.cloudinary.com/dllkefj8m/image/upload/v1745956662/fb_olc2jp.png"/> Facebook
            </a>
            <div >
            <a style={{display:"flex",alignItems:"center",gap:"10px"}} href="#" className="community-socials__button community-socials__button--discord">
            <img style={{width:"30px"}} src="https://res.cloudinary.com/dllkefj8m/image/upload/v1745956343/discord-logo-icon-social-media-icon-free-png_oxhfsh.webp"/> Discord
           
            </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommunitySocials

