 
    "use client"
    import Footer from '@/components/Footer'
    import NavBar from '@/components/NavBar'
    import UserBono from '@/components/UserBono'
    import { getBonos } from '@/lib/contenful'
    import "./bonos.css"
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/navigation'
    const  Page = async () => {
        const otrosDatos = await getBonos();
        
       const [cookies] = useCookies(["token"]); // Leer las cookies
       const router = useRouter();
       
         //MiddleWare para asegurar la ruta
         useEffect(() => {
           if (!cookies.token) {
             router.push("/auth/register");
           }
         }, [cookies.token, router]);
        
    return (
        <>
        <header>
            <NavBar/>
        </header>
        <main className='bonos__content'>
            <UserBono bonosData={otrosDatos}/>
        </main>
        <footer>
            <Footer/>
        </footer>
        </>
    )
    }

    export default Page
