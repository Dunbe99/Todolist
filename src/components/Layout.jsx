import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom/dist/umd/react-router-dom.development";

export default function Layout(){
    return<>
        <Header></Header>
             <Outlet></Outlet>
        <Footer></Footer>
    </>
    
}