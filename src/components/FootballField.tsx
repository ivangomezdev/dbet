import Image from "next/image"
import "./footballfield.css"

export default function FootballField() {
  return (
    <div className="football-field-container">
          <h2 className="logos-title">Gente que habla de matched betting:</h2>
      {/* Campo de fútbol */}
      <div className="football-field">
        {/* Líneas del campo */}
        <div className="field-line center-circle"></div>
        <div className="field-line center-spot"></div>
        <div className="field-line halfway-line"></div>

        {/* Áreas */}
        <div className="field-line penalty-area-left"></div>
        <div className="field-line penalty-area-right"></div>
        <div className="field-line goal-area-left"></div>
        <div className="field-line goal-area-right"></div>
        <div className="field-line penalty-spot-left"></div>
        <div className="field-line penalty-spot-right"></div>
        <div className="field-line penalty-arc-left"></div>
        <div className="field-line penalty-arc-right"></div>

        {/* Porterías */}
        <div className="goal goal-left">
          <div className="goal-post goal-post-left"></div>
          <div className="goal-post goal-post-right"></div>
         
          <div className="goal-net"></div>
        </div>

        <div className="goal goal-right">
          <div className="goal-post goal-post-left"></div>
          <div className="goal-post goal-post-right"></div>
    
          <div className="goal-net"></div>
        </div>

        {/* Esquinas */}
        <div className="field-line corner corner-top-left"></div>
        <div className="field-line corner corner-top-right"></div>
        <div className="field-line corner corner-bottom-left"></div>
        <div className="field-line corner corner-bottom-right"></div>

        {/* Sección de logotipos dentro del campo */}
        <div className="logos-section">


          <div className="logos-grid">
            <div className="logo-row">
              <div className="logo-item">
                <Image
                  src="https://res.cloudinary.com/dc5zbh38m/image/upload/v1742340938/wiki-removebg-preview_gjnlrv.png"
                  alt="Wikipedia"
                  width={150}
                  height={60}
                  className="logo"
                />
              </div>
              <div className="logo-item">
                <Image
                  src="https://res.cloudinary.com/dc5zbh38m/image/upload/v1742340929/milenio-removebg-preview_upp6na.png"
                  alt="Milenio 2020"
                  width={150}
                  height={60}
                  className="logo"
                />
              </div>
              <div className="logo-item">
                <Image
                  src="https://res.cloudinary.com/dc5zbh38m/image/upload/v1742340936/ecg_k9aog7.jpg"
                  alt="El Correo Gallego"
                  width={150}
                  height={60}
                  className="logo"
                />
              </div>
            </div>

            <div className="logo-row">
              <div className="logo-item">
                <Image src="https://res.cloudinary.com/dc5zbh38m/image/upload/v1742340926/epdv-removebg-preview_voyihe.png" alt="EPdV" width={150} height={60} className="logo" />
              </div>
              <div className="logo-item">
                <Image
                  src="https://res.cloudinary.com/dc5zbh38m/image/upload/v1742340930/apuestasigualadas.com-logo_dmvxuw.png"
                  alt="ApuestasIgualadas.com"
                  width={150}
                  height={60}
                  className="logo"
                />
              </div>
              <div className="logo-item">
                <Image
                  src="https://res.cloudinary.com/dc5zbh38m/image/upload/v1742340928/michollo-removebg-preview_fcmhox.png"
                  alt="Michollo"
                  width={150}
                  height={60}
                  className="logo"
                />
              </div>
            </div>

            <div className="logo-row">
              <div className="logo-item">
                <Image
                  src="https://res.cloudinary.com/dc5zbh38m/image/upload/v1742340927/telegraph-logo_rqmo7h.png"
                  alt="The Telegraph"
                  width={150}
                  height={60}
                  className="logo"
                />
              </div>
              <div className="logo-item">
                <Image
                  src="https://res.cloudinary.com/dc5zbh38m/image/upload/v1742340926/huffington-post-logo-removebg-preview_pb605a.png"
                  alt="The Huffington Post"
                  width={150}
                  height={60}
                  className="logo"
                />
              </div>
              <div className="logo-item">
                <Image
                  src="https://res.cloudinary.com/dc5zbh38m/image/upload/v1742340921/guardian-logo-removebg-preview_wcwcqd.png"
                  alt="The Guardian"
                  width={150}
                  height={60}
                  className="logo"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
