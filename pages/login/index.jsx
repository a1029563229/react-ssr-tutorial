import React from "react";
import { Button } from "antd";
import Router from "next/router";
import fetch from "isomorphic-fetch";

const Login = () => {
  const login = async () => {
    const result = await fetch("http://dev-api.jt-gmall.com/member", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query: `{ loginQuickly { token } }` })
    }).then(res => res.json());

    // 打印登录结果
    console.log(JSON.stringify(result, null, 2));
    console.log(result);
  }
  
  return (
    <section style={{ padding: 20 }}>
      <Button type="primary" onClick={login}>一键登录</Button>
    </section>
  )
}

export default Login;