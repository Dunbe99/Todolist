import {  useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom/dist/umd/react-router-dom.development";
import { Button, Form, Input,Switch,DatePicker, message} from 'antd';
import "../index.css"
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

export default function Update(){
  
    const dateFormat = 'YYYY/MM/DD';
    const nav = useNavigate()
    const updateParam = useParams()
    const [task,setTask] = useState({})
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const onFinish = (values) => {
                console.log('Success:', values);
                let date = values.date.format('YYYY-MM-DD')
                let data = JSON.stringify({
                    "data": {
                    ...values,
                    date
                    }
                });

                let config = {
                    method: 'put',
                    maxBodyLength: Infinity,
                    url: `https://backoffice.nodemy.vn/api/tasks/${updateParam.taskId}`,
                    headers: { 
                      'Content-Type': 'application/json', 
                      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTksImlhdCI6MTY4NDkxOTE2MiwiZXhwIjoxNjg3NTExMTYyfQ.xaLb0DKaXMcIqwXAXJqPqA3cijAaRAotmUiouVmByMo'
                    },
                data : data
                  };
                  
                  axios.request(config)
                  .then((response) => {
                    setTask(response?.data?.data)
                    const dataTask = response?.data?.data?.attributes
                    form.setFieldsValue({
                        title: dataTask.title,
                        date: dayjs(dataTask.date, dateFormat),
                        complete: dataTask.complete,
                    })
                    messageApi.open({
                      type: 'success',
                      content: 'Update success !',
                    });
                  })
                  .catch((error) => {
                    console.log(error);
                    messageApi.open({
                      type: 'error',
                      content: 'Update failed !',
                    });
                  });
      };
      const onFinishFailed = (errorInfo) => {
          console.log('Failed:', errorInfo);
        };
      const configDeadline = {
          rules: [
            {
              type: 'object',
              required: true,
              message: 'Please select time!',
            },
          ],
      };


      return (
            <>
                {contextHolder}
                <Form form={form}
                  className="Form"
                  name="updateForm"
                  labelCol={{
                    span: 8,
                  }}
                  wrapperCol={{
                    span: 16,
                  }}
                  style={{
                    maxWidth: 600,
                    fontSize: '50px',
                  }}
    
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                >
                  <Form.Item style={{textAlign: 'center'}}> <h1 style={{color:' rgb(63, 232, 63)'}}>Update task {updateParam.taskId}</h1> </Form.Item>
                  <Form.Item
                    label="TaskName "
                    name="title"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your task',
                      },
                    ]}
                  >
                    <Input placeholder="What's your task today?" />
                  </Form.Item>
            
                  <Form.Item name="date" label="Deadline" {...configDeadline}>
                    <DatePicker format={dateFormat} />
                  </Form.Item>
            
                  <Form.Item label="Status " name="complete" valuePropName="checked">
                      <Switch
                          checkedChildren='Done'
                          unCheckedChildren='Not done'
                          defaultChecked={false}
                          
                      />
                  </Form.Item>
                    
                  <Form.Item
                    wrapperCol={{
                      offset: 8,
                      span: 16,
                    }}
                  >
                    <Button style={{backgroundColor:' rgb(63, 232, 63)', color: 'white', margin:'20px'}}  htmlType="submit">
                      Update
                    </Button>
                    <Button type="primary" onClick={()=>{nav('/')}}>Home</Button>
                  </Form.Item>
                </Form>
            
            </>
          )
  
  }
  