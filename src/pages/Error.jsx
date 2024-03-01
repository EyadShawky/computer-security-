import React from 'react'
import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';


const ErrorPage = () => {
  return (
    <>
     <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={<Link to={'/'}><Button className='error-button' type="primary">Back Home</Button></Link>}
  />
    </>
    
  )
}

export default ErrorPage
