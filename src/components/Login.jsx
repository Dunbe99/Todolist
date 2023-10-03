import { Button, Checkbox, Form, Input, message } from 'antd';
import {SmileOutlined, EyeOutlined   } from '@ant-design/icons'
import axios from 'axios';
import './Login.css'
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';

export default function Login(){
    const dispatch = useDispatch()
    const [messageApi, contextHolder] = message.useMessage();
    const navLogin = useNavigate()
    const onFinish = (values) => {
        console.log('Success:', values);
        let data = JSON.stringify({
            ...values
          });
          
          let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://backoffice.nodemy.vn/api/auth/local',
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
          };
          
          axios.request(config)
          .then((response) => {
            const user = response?.data?.user
            console.log(JSON.stringify(response.data));
            localStorage.setItem('user', JSON.stringify(response.data))
            dispatch(setUser(user))
            navLogin('/')
          })
          .catch((error) => {
            console.log(error);
            messageApi.open({
                type: 'error',
                content: 'sai tên đăng nhập hoặc mật khẩu',
              });
          });
          
      };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

    return <>
        {contextHolder}
         <Form className='loginForm'
                name="basic"
                labelCol={{
                span: 8,
                }}
                wrapperCol={{
                span: 16,
                }}
                style={{
                maxWidth: 400,
                height: 600,
                }}
                initialValues={{
                remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >

                <Form.Item style={{color: 'white'}}> <h1>LOGIN</h1> </Form.Item>
                <Form.Item
                label=""
                name="identifier"
                rules={[
                    {
                    required: true,
                    message: 'Please input your username!',
                    },{
                        min : 6,
                        message: '6 kí tự trở lên'
                    },
                ]}
                >
                <Input prefix={<SmileOutlined />} style={{width:'300px'}} placeholder='Username'/>
                </Form.Item>

                <Form.Item
                label=""
                name="password"
                rules={[
                    {
                    required: true,
                    message: 'Please input your password!',
                    },{
                      min : 6,
                      message: '6 kí tự trở lên'
                  }
                ]}
                >
                <Input.Password prefix={<EyeOutlined />} style={{width:'300px'}} placeholder='Password' />
                </Form.Item>

                <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
                >
                {/* <Checkbox>Remember me</Checkbox> */}
                </Form.Item>

                <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
  </Form>
    </>
}