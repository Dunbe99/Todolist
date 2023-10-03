import { Link } from 'react-router-dom'
import './Header.css'
import { BellOutlined   } from '@ant-design/icons'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import '../index.css'
import { useSelector } from 'react-redux';
import { Badge, Dropdown } from 'antd';
export default function Header(){
    const user = useSelector(stateTong => stateTong.user.value)
    const refInput = useRef()
    const [search,setSearch] = useState([])
    const [inputvalue,setInputvalue]=useState('')
    const [taskUncomplete, setTaskUncomplete] = useState(0)
    const refresh = useSelector(stateTong => stateTong.noti.value)
    console.log(refresh);
    //call API Task Uncomplete
    useEffect(()=>{
        axios.get(`https://backoffice.nodemy.vn/api/tasks?pagination[page]=1&pagination[pageSize]=5&filters[complete][$eq]=false`)
        .then((response)=>{
            console.log(response?.data?.meta?.pagination?.total);
            const totalUncomplete = response?.data?.meta?.pagination?.total
            setTaskUncomplete(totalUncomplete)
        })
        .catch((err)=>{
            console.log(err);
        })
    },[refresh])

    //call API search
    function debounce(e){
           setInputvalue(e.target.value)

    }
    useEffect(()=>{
       let a =setTimeout(() => {
        if(inputvalue !== ''){
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `https://backoffice.nodemy.vn/api/tasks?pagination[page]=1&pagination[pageSize]=5&filters[title][$contains]=${inputvalue}`,
           
              };
              axios.request(config)
              .then((response) => {
                console.log(response.data.data);
                setSearch(response?.data?.data)
                
              })
              .catch((error) => {
                console.log(err);
              });
   
            }else{
                setSearch([]) 
            }
       }, 1000);
        return ()=>{ clearTimeout(a);
    }
            },[inputvalue])

    return <>
        {
                 search.map((item)=>{
                    return <h1 key={item.id} onClick={()=>{setInputvalue('')}} className='result' ><Link to={`/${item.id}`}>{item?.attributes?.title}</Link></h1>
               })
        }

        <div className='test'>
            <div>
                <Link to = "/">List Tasks</Link>
            </div>
            <div>
                    <input type="search" ref={refInput} value={inputvalue} onChange={debounce}  className='ipSearch' placeholder='Search task here...'/>
            </div>
            <div>
                <Link to = "/add">Create new task</Link>
            </div>
            <div>
                <Badge count={taskUncomplete} overflowCount={1000000}><BellOutlined className='bell'  style={{fontSize:'40px', color: 'white'}}/></Badge>
                
            </div>
            <div>
                <h2>Hello <span style={{fontStyle:'italic',backgroundColor:'#DF678C', color:'#3D155F',fontWeight:'bold'}}>--{user?.username}--</span></h2>
                <Link to = "/logout">Log out</Link>
            </div>
        </div>
    </>
}