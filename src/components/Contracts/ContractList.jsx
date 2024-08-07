import React from "react";
import { Table } from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import "./Contracts.css";

const ContractList = ({ contracts, onDelete }) => {
  const columns = [
    {
      title: "Contract Name",
      dataIndex: "contractName",
      key: "contractName",
    },
    {
      title: "Client",
      dataIndex: "client",
      key: "client",
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
    },
    {
      title: "Contract Duration",
      dataIndex: "contractDuration",
      key: "contractDuration",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <span>
          <a onClick={() => onDelete(record.key)}>Delete</a>
        </span>
      ),
    },
  ];

  return (
    <Table
      className="contract-list"
      columns={columns}
      expandable={{
        expandedRowRender: (record) => (
          <p
            style={{
              margin: 0,
            }}
          >
            Comment: {record.comments}
          </p>
        ),

        expandIcon: ({ expanded, onExpand, record }) => (
          <a onClick={(e) => onExpand(record, e)} style={{ color: "black" }}>
            {expanded ? <UpOutlined /> : <DownOutlined />}
          </a>
        ),
      }}
      dataSource={contracts}
      size="large"
      pagination={{ hideOnSinglePage: true }}
      style={{
        margin: "2rem",
      }}
      bordered
    />
  );
};

export default ContractList;
