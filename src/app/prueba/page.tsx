import Image from "next/image";
import Link from "next/link";
import "./prueba.css";
import NavBar from "@/components/NavBar";

export default function Article() {
  return (
    <div className="article">
      <header className="article__header">
       <NavBar/> 
        <nav className="article__nav">
          <div className="article__breadcrumbs">
            <Link href="/" className="article__breadcrumb-link">
              Blog
            </Link>
            <span className="article__breadcrumb-separator">&gt;</span>
            <Link href="/environment" className="article__breadcrumb-link">
              Post
            </Link>
          </div>
          <div className="article__actions">
            <button className="article__follow-btn">
              <Image
                src="/placeholder.svg?height=16&width=16"
                alt="Follow icon"
                width={16}
                height={16}
              />
              Follow us
            </button>
          </div>
        </nav>
        
        <h1 style={{padding:"10px"}} className="article__title">Turkey's hidden alpine wonderland</h1>

        <div style={{padding:"10px"}} className="article__meta">
          <span className="article__author">Por xxxx Team</span>
          <span className="article__date">Published on April 23, 2023</span>
        </div>

        <div style={{padding:"10px"}} className="article__share">
          <span className="article__share-label">Compartir:</span>
          <div className="article__share-buttons">
            <button className="article__share-btn article__share-btn--facebook">
              Facebook
            </button>
            <button className="article__share-btn article__share-btn--twitter">
              Twitter
            </button>
            <button className="article__share-btn article__share-btn--email">
              Email
            </button>
          </div>
        </div>
      </header>

      <div className="article__content">
        <div className="article__main">
          <figure className="article__figure">
            <Image
              src="/placeholder.svg?height=16&width=16"
              alt="Turkey's alpine landscape with mountains and clouds"
              width={800}
              height={450}
              className="article__image"
            />
            <figcaption className="article__caption">
              Beautiful alpine landscape in Turkey's mountains
            </figcaption>
          </figure>

          <div className="article__text">
            <p className="article__paragraph">
              El matched betting es una estrategia en la que colocas apuestas
              opuestas para eliminar el riesgo y garantizar un beneficio de las
              ofertas de bonificación de los operadores. Con las ofertas 2UP,
              puedes aprovechar el pago anticipado para crear una oportunidad de
              ganancias adicionales. El proceso comienza colocando una apuesta a
              favor en un operador que ofrezca una promoción 2UP, apostando a
              que un equipo ganará. Al mismo tiempo, colocas una apuesta en
              contra en una casa de apuestas, como Betfair, apostando a que el
              mismo equipo no ganará. Si tu equipo se adelanta 2-0, el operador
              paga tu apuesta a favor como una victoria de inmediato. Si luego
              ese equipo no gana el partido (por ejemplo, empata o pierde), tu
              apuesta en contra también gana, lo que significa que obtienes un
              beneficio por ambos lados. Este método te permite asegurar
              ganancias garantizadas con los cálculos y estrategia adecuados. El
              matched betting es una estrategia en la que colocas apuestas
              opuestas para eliminar el riesgo y garantizar un beneficio de las
              ofertas de bonificación de los operadores. Con las ofertas 2UP,
              puedes aprovechar el pago anticipado para crear una oportunidad de
              ganancias adicionales. El proceso comienza colocando una apuesta a
              favor en un operador que ofrezca una promoción 2UP, apostando a
              que un equipo ganará. Al mismo tiempo, colocas una apuesta en
              contra en una casa de apuestas, como Betfair, apostando a que el
              mismo equipo no ganará. Si tu equipo se adelanta 2-0, el operador
              paga tu apuesta a favor como una victoria de inmediato. Si luego
              ese equipo no gana el partido (por ejemplo, empata o pierde), tu
              apuesta en contra también gana, lo que significa que obtienes un
              beneficio por ambos lados. Este método te permite asegurar
              ganancias garantizadas con los cálculos y estrategia adecuados. El
              matched betting es una estrategia en la que colocas apuestas
              opuestas para eliminar el riesgo y garantizar un beneficio de las
              ofertas de bonificación de los operadores. Con las ofertas 2UP,
              puedes aprovechar el pago anticipado para crear una oportunidad de
              ganancias adicionales. El proceso comienza colocando una apuesta a
              favor en un operador que ofrezca una promoción 2UP, apostando a
              que un equipo ganará. Al mismo tiempo, colocas una apuesta en
              contra en una casa de apuestas, como Betfair, apostando a que el
              mismo equipo no ganará. Si tu equipo se adelanta 2-0, el operador
              paga tu apuesta a favor como una victoria de inmediato. Si luego
              ese equipo no gana el partido (por ejemplo, empata o pierde), tu
              apuesta en contra también gana, lo que significa que obtienes un
              beneficio por ambos lados. Este método te permite asegurar
              ganancias garantizadas con los cálculos y estrategia adecuados.
            </p>
          </div>
        </div>

        <aside className="article__sidebar">
          <section className="article__popular">
            <h2 className="article__sidebar-title">Posts Relacionados</h2>

            <div className="article__popular-items">
              <article className="article__popular-item">
                <Image
                  src="/placeholder.svg?height=80&width=120"
                  alt="News thumbnail"
                  width={120}
                  height={80}
                  className="article__popular-image"
                />
                <h3 className="article__popular-title">
                  <Link href="#" className="article__popular-link">
                    Meet the new kids in the system
                  </Link>
                </h3>
                <p className="article__popular-excerpt">
                  How new tech startups are changing the landscape for business
                  and consumers
                </p>
              </article>

             
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
