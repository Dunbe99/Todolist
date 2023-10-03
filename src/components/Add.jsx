import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";
import { Button, Form, Input,Switch,DatePicker, message} from 'antd';
import "../index.css"


export default function Add(){
  const nav = useNavigate()
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
                method: 'post',
                maxBodyLength: Infinity,
                url: 'https://backoffice.nodemy.vn/api/tasks',
                headers: { 
                  'Content-Type': 'application/json', 
                  'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTksImlhdCI6MTY4NDkxOTE2MiwiZXhwIjoxNjg3NTExMTYyfQ.xaLb0DKaXMcIqwXAXJqPqA3cijAaRAotmUiouVmByMo'
                },
                data : data
              };
              
              axios.request(config)
              .then((response) => {
                console.log(response.data.data);
                messageApi.open({
                  type: 'success',
                  content: 'Add success !',
                });
              })
              .catch((error) => {
                console.log(error);
                messageApi.open({
                  type: 'error',
                  content: 'Add failed !',
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
          
          <Form
            className="Form"
            name="addForm"
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
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >

            <Form.Item style={{textAlign: 'center'}} > <h1>What's your task today ? </h1> </Form.Item>
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
              <Input placeholder="Task title" />
            </Form.Item>
      
            <Form.Item name="date" label="Deadline" {...configDeadline}>
              <DatePicker />
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
              <Button type="primary" htmlType="submit" style={{margin: '20px'}}>
                Add
              </Button>
              <Button type="primary" onClick={()=>{nav('/')}}>Home</Button>
            </Form.Item>
          </Form>
          
          </>
        )

}

