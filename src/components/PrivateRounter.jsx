import { Navigate } from "react-router-dom"


export default function PrivateRounter(props){
    const token = localStorage.getItem('user')
    const txtToken = JSON.parse(token)
    return txtToken ? props.children : <Navigate to='/login'></Navigate>

}