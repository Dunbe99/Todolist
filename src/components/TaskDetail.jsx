import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom/dist/umd/react-router-dom.development"
import axios from "axios"
import { Card, Button } from "antd"
import "../index.css"
import notFound from '../assets/notFound.jpg'


export default function TaskDetail(){
    const param = useParams()
    const [detail,setDetail] = useState({})
    const nav = useNavigate()
    useEffect(()=>{
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `https://backoffice.nodemy.vn/api/tasks/${param.taskId}`,
            
          };
          
          axios.request(config)
          .then((response) => {
            setDetail(response?.data?.data)
        
            
          })
          .catch((error) => {
            console.log(error);
          });
          
    },[])
    const status = detail?.attributes?.complete
    const date = detail?.attributes?.date
    console.log(detail);
    const newDate = new Date(date)
    const dateFormat = `${newDate.getDate()}-${newDate.getMonth() + 1}-${newDate.getFullYear()}`;
    const myTask =   <Card 
            title = { detail?.id}
            bordered = {true}
            style={{
              width: 500,
              fontSize: '30px',
              boxShadow: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px',
              backgroundColor: 'rgb(179, 179, 164);',
              margin: '100px auto',
            }}
          >
            <p>Name : {detail?.attributes?.title}</p>
            <p>Status : <span className={status ? 'done' : 'notDone' }>{status ? `Done`  : `Not done`  }</span>  </p>
      
            <p>Deadline : {dateFormat}</p>  
            <div className="btn">
                <Button type="primary" className="success"  onClick={()=>{nav(`/update/${detail?.id}`)}}>Update</Button>
                <Button type="primary" danger onClick={()=>{nav(`/delete/${detail?.id}`)}}>Delete</Button>
                <Button type="primary" onClick={()=>{nav('/')}}>Home</Button>
            </div>

        </Card>
        const img404 = <img src={notFound} alt=""  className="img404"/>

    return <>
          {detail.id ? myTask : img404}
    </>
}