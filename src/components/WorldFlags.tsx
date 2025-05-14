import React from 'react'
import "./worldFlags.css"
import Image from 'next/image'
const WorldFlags = () => {
 const flags = [{src:"https://res.cloudinary.com/dc5zbh38m/image/upload/v1742308305/spain_xcufym.png",alt:"España"},
    {src:"https://res.cloudinary.com/dc5zbh38m/image/upload/v1742308305/arg_ocgjbr.png",alt:"Argentina"},
    {src:"https://res.cloudinary.com/dc5zbh38m/image/upload/v1742308304/beli_miwcl1.png",alt:"Belice"},
    {src:"https://res.cloudinary.com/dc5zbh38m/image/upload/v1742308304/aru_clavoz.png",alt:"Aruba"},
    {src:"https://res.cloudinary.com/dc5zbh38m/image/upload/v1742308302/bol_m7oux7.png",alt:"Bolivia"},
    {src:"https://res.cloudinary.com/dc5zbh38m/image/upload/v1742308301/chile_femzwe.png",alt:"Chile"},
    {src:"https://res.cloudinary.com/dc5zbh38m/image/upload/v1742308296/cr_mel813.png",alt:"Costa Rica"},
    {src:"https://res.cloudinary.com/dc5zbh38m/image/upload/v1742308295/som_shofvg.png",alt:"Panama"},
    {src:"https://res.cloudinary.com/dc5zbh38m/image/upload/v1742308295/col_wqfc9c.png",alt:"Colombia"},
    {src:"https://res.cloudinary.com/dc5zbh38m/image/upload/v1742308293/ecu_z4j8ap.png",alt:"Ecuador"},
    {src:"https://res.cloudinary.com/dc5zbh38m/image/upload/v1742308292/flag-el-salvador_tm2a3l.png",alt:"Salvador"},
    {src:"https://res.cloudinary.com/dc5zbh38m/image/upload/v1742308293/flag-mexico_exv1g3.png",alt:"Mexico"},
    {src:"https://res.cloudinary.com/dc5zbh38m/image/upload/v1742308292/flag-honduras_avrw35.png",alt:"Honduras"},
    {src:"https://res.cloudinary.com/dc5zbh38m/image/upload/v1742308287/flag-nicaragua_g0vzxu.png",alt:"Nicaragua"},
    {src:"https://res.cloudinary.com/dc5zbh38m/image/upload/v1742308287/flag-panama_vayp2i.png",alt:"Panama"},
    {src:"https://res.cloudinary.com/dc5zbh38m/image/upload/v1742308287/flag-paraguay_ieslsd.png",alt:"Paraguay"},
    {src:"https://res.cloudinary.com/dc5zbh38m/image/upload/v1742308286/flag-uruguay_clg0fi.png",alt:"Uruguay"},
    {src:"https://res.cloudinary.com/dc5zbh38m/image/upload/v1742308286/flag-peru_keau1m.png",alt:"Peru"}
 ]
  return (
    <div className='worldFlags__container'>
         <div className="linea-divisoria"/>

 <h2>Todos los que viven en los siguientes países pueden utilizar Winbet:</h2>
 <div className='worldFlags__cont'>
    {flags.map((i,index)=>{
      return  <div key={index} className='worldFlags__each'> 
        <Image src={i.src} alt={i.alt} height={80} width={80} />
        <p>{i.alt}</p>
      </div>
    })}
 </div>
    </div>
  )
}

export default WorldFlags
