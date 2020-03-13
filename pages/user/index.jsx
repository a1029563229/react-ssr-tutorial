import React from "react";
import { Descriptions, Avatar } from 'antd';
import Router from "next/router";
import fetch from "isomorphic-fetch";

const User = ({ userInfo }) => {
  if (!userInfo) return null;

  const { nickname, avatarUrl, gender, city } = userInfo;
  return (
    <section style={{ padding: 20 }}>
      <Descriptions title={`欢迎你 ${nickname}`}>
        <Descriptions.Item label="用户头像"><Avatar src={avatarUrl} /></Descriptions.Item>
        <Descriptions.Item label="用户昵称">{nickname}</Descriptions.Item>
        <Descriptions.Item label="用户性别">{gender ? "男" : "女"}</Descriptions.Item>
        <Descriptions.Item label="所在地">{city}</Descriptions.Item>
      </Descriptions>
    </section>
  )
}

// 获取用户信息
const getUserInfo = async (ctx) => {
  return fetch("http://dev-api.jt-gmall.com/member", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    // graphql 的查询风格
    body: JSON.stringify({ query: `{ getUserInfo { nickname avatarUrl city gender } }` })
  }).then(res => res.json());
}

// 重定向函数
const redirect = ({ req, res }, path) => {
  // 如果包含 req 信息则表示代码运行在服务端
  if (req) {
    res.writeHead(302, { Location: path });
    res.end();
  } else {
    // 客户端跳转方式
    Router.push(path);
  }
};

User.getInitialProps = async ctx => {
  const result = await getUserInfo(ctx);
  const { errors, data } = result;
  if (errors.length > 0 || errors[0].message.startsWith("401")) {
    return redirect(ctx, '/login');
  }

  return { userInfo: data.getUserInfo };
}

export default User;