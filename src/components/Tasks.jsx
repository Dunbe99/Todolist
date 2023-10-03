import { useEffect, useState } from "react";
import axios from "axios";
import { Avatar, List, Skeleton, Pagination } from 'antd';
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setNoti } from "../redux/notiSlice";


export default function Tasks(){
  const [tasks,setTasks] = useState([])
  const [loading, setLoading] = useState(false);
  const dispatchTask = useDispatch()
  const [pageInfo, setPageInfo] = useState({
    total : 10,
    pageSize : 10,
    currentPage : 1
  })

  useEffect(()=>{    
    setLoading(true);
    setTimeout(()=>{  
          let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `https://backoffice.nodemy.vn/api/tasks?pagination[page]=${pageInfo.currentPage}&pagination[pageSize]=${pageInfo.pageSize}&sort[0]=id:desc`,
          };
        
          axios.request(config)
            .then((response) => {
              const noti = response?.data?.data?.attributes?.complete
              setTasks(response?.data?.data);
              setLoading(false);
              setPageInfo({
                ...pageInfo,
                total: response?.data?.meta?.pagination?.total,
              });
              dispatchTask(setNoti(noti))
            })
            .catch((error) => {
              console.log(error);
        });},2000)
  },[pageInfo.currentPage,pageInfo.pageSize])
      return <>
            <Skeleton loading={loading}>
                
                <List
                  style={{marginLeft:'100px'}}
                  itemLayout="horizontal"
                  dataSource={tasks}
                  renderItem={(item, index) => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
                          title={<Link to={`/${item.id}`}> <h2>Task ID :  {item.id}</h2> </Link>}
                          description={item?.attributes?.title}
                        />
                      </List.Item>
                  )}
              />
              <Pagination style={{textAlign:'center',fontSize: '25px'}} total={pageInfo.total} current={pageInfo.currentPage} pageSize={pageInfo.pageSize} 
                onChange={(trang,soTrang)=>{
                  setPageInfo({
                    ...pageInfo,
                    pageSize : soTrang,
                    currentPage: trang
                  })
                }} />      
            </Skeleton>  
           
            

      </>

}