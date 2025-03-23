 
    import Footer from '@/components/Footer'
    import NavBar from '@/components/NavBar'
    import UserBono from '@/components/UserBono'
    import { getBonos } from '@/lib/contenful'

    const  Page = async () => {
        const otrosDatos = await getBonos();
        
     
        
    return (
        <>
        <header>
            <NavBar/>
        </header>
        <main>
            <UserBono bonosData={otrosDatos}/>
        </main>
        <footer>
            <Footer/>
        </footer>
        </>
    )
    }

    export default Page
