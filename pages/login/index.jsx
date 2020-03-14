import React from "react";
import { Button } from "antd";
import Router from "next/router";
import fetch from "isomorphic-fetch";
import cookie from 'js-cookie';

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
    const { token } = result.data.loginQuickly;
    cookie.set("token", token);
    Router.push("/user");
  }

  return (
    <section style={{ padding: 20 }}>
      <Button type="primary" onClick={login}>一键登录</Button>
    </section>
  )
}

export default Login;