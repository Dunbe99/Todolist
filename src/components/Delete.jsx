import { useParams } from "react-router-dom/dist/umd/react-router-dom.development"
import axios from "axios";
import { Navigate } from "react-router-dom";
import { message } from 'antd';

export default function Delete(){
    const [messageApi, contextHolder] = message.useMessage();
    const deleteParam = useParams()
    let config = {
        method: 'delete',
        maxBodyLength: Infinity,
        url: `https://backoffice.nodemy.vn/api/tasks/${deleteParam.taskId}`,
        headers: { 
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTksImlhdCI6MTY4NDkxOTE2MiwiZXhwIjoxNjg3NTExMTYyfQ.xaLb0DKaXMcIqwXAXJqPqA3cijAaRAotmUiouVmByMo'
        }
      };
      
      axios.request(config)
      .then((response) => {
        console.log(response.data.data);
        messageApi.open({
          type: 'success',
          content: 'Delete success!',
        });
        alert('Delete success')
      })
      .catch((error) => {
        console.log(error);
        // alert('Delete failed')
      });
      return <>
        {contextHolder}
        <Navigate to='/'></Navigate>
      </>
      
}