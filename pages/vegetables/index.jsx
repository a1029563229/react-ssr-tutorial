import React, { useState, useEffect } from "react";
import { Table, Avatar } from "antd";
import fetch from "isomorphic-fetch";
import WithError from '../../components/WithError';

const { Column } = Table;
const Vegetables = ({ vegetableList }) => {
  if (!vegetableList) return null;

  const fetchHandler = async page => {
    if (page !== pageInfo.current) {
      const result = await fetchVegetable(page, 10);
      const { vegetableList } = result.data;
      setData(() => vegetableList.items);
      setPageInfo(() => ({
        current: vegetableList.page,
        pageSize: vegetableList.pageSize,
        total: vegetableList.total,
        onChange: fetchHandler
      }));
    }
  }
  // 设置页码信息
  const [pageInfo, setPageInfo] = useState({
    current: vegetableList.page,
    pageSize: vegetableList.pageSize,
    total: vegetableList.total,
    onChange: fetchHandler
  });
  // 设置列表信息
  const [data, setData] = useState(() => vegetableList.items);

  return <section style={{ padding: 20 }}>
    <Table rowKey="_id" dataSource={data} pagination={pageInfo} >
      <Column dataIndex="poster" render={text => <Avatar src={text} />} />
      <Column dataIndex="name" />
      <Column dataIndex="price" render={text => <>￥ {text}</>} />
    </Table>
  </section>
}

const fetchVegetable = (page, pageSize) => {
  return fetch("http://dev-api.jt-gmall.com/mall", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    // graphql 的查询风格
    body: JSON.stringify({ query: `{ vegetableList (page: ${page}, pageSize: ${pageSize}) { page, pageSize, total, items { _id, name, poster, price } } }` })
  }).then(res => res.json());
}

Vegetables.getInitialProps = async ctx => {
  const result = await fetchVegetable(1, 10);

  // 将查询结果返回，绑定在 props 上
  return result;
}

export default WithError()(Vegetables);