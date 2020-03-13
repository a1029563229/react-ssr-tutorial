import App from 'next/app';
import React from 'react';
import { Menu } from 'antd';
import Link from 'next/link';
import 'antd/dist/antd.css';

export default class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render() {
    const { Component, pageProps } = this.props
    return <>
      <Menu mode="horizontal">
          <Menu.Item key="vegetables"><Link href="/vegetables"><a>实时菜价</a></Link></Menu.Item>
          <Menu.Item key="user"><Link href="/user"><a>个人中心</a></Link></Menu.Item>
      </Menu>
      <Component {...pageProps} />
    </>
  }
}