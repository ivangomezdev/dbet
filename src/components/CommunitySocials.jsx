import "./CommunitySocials.css"

function CommunitySocials() {
  return (
    <div className="community-socials">
      <div className="community-socials__container">
        <div className="community-socials__chat-section">
          <div className="community-socials__chat-messages">
            <div className="community-socials__message community-socials__message--todd">
              <div className="community-socials__avatar community-socials__avatar--todd">
                <img src="https://res.cloudinary.com/dllkefj8m/image/upload/v1745436600/pedro_jo_yj7otc.jpg" alt="Todd avatar" />
              </div>
              <div className="community-socials__message-content">
                <div className="community-socials__user-info">
                  <span className="community-socials__username community-socials__username--todd">Todd Unctious</span>
                  <span className="community-socials__timestamp">Yesterday at 14:41</span>
                </div>
                <p className="community-socials__text">
                  Morning. The offers shown on your dashboard are the ones we recommend beginning with.
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
                  <span className="community-socials__username">Ed Munroe</span>
                  <span className="community-socials__timestamp">Yesterday at 18:20</span>
                </div>
                <p className="community-socials__text">
                  That's probably a good idea to keep track of total profit, I'll do that right
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
                  <span className="community-socials__timestamp">Today at 3:33 AM</span>
                </div>
                <p className="community-socials__text">
                  Woohoo exactly 1 week ago i signed up for profit duel, and just now i hit $1k profit
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
            Contamos con una gran comunidad de miembros de ProfitDuel que siempre comparten consejos y trucos, y siempre
            hacen y responden preguntas. Únete a las comunidades y haz cualquier pregunta que tengas.
          </p>
          <div className="community-socials__buttons">
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

