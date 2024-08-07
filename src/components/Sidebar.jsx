import React, { useState, useEffect } from "react";
import { Typography, Button, Collapse, List, Modal, Input, Flex } from "antd";
import { DeleteOutlined, UserOutlined, AuditOutlined } from "@ant-design/icons";
import VirtualList from "rc-virtual-list";
import "../App.css";

const { Title } = Typography;
const { Panel } = Collapse;

const itemHeight = 43.2;
const maxHeight = 430;

const Sidebar = () => {
  const [clients, setClients] = useState([]);
  const [clientName, setClientName] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const storedClients = JSON.parse(localStorage.getItem("clients")) || [];
    setClients(storedClients);
  }, []);

  const saveClientsToStorage = (clients) => {
    localStorage.setItem("clients", JSON.stringify(clients));
    window.dispatchEvent(
      new CustomEvent("clientsUpdated", { detail: clients })
    );
  };

  const handleDelete = (key) => {
    const updatedClients = clients.filter((client) => client.key !== key);
    setClients(updatedClients);
    saveClientsToStorage(updatedClients);
  };

  const handleAddClient = () => {
    const newClient = { key: Date.now(), name: clientName };
    const updatedClients = [...clients, newClient];
    setClients(updatedClients);
    saveClientsToStorage(updatedClients);
    setClientName("");
    setIsModalVisible(false);
  };
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOk = () => {
    handleAddClient();
  };

  const listHeight = Math.min(clients.length * itemHeight, maxHeight);

  return (
    <div className="sidebar">
      <div className="sidebar-clients">
        <Flex gap="middle">
          <AuditOutlined style={{ fontSize: "34px", color: "#ffd300" }} />
          <Title level={2} style={{ color: "white", marginBottom: "2rem" }}>
            Contract Management
          </Title>
        </Flex>

        <Collapse
          defaultActiveKey={["1"]}
          className="clients-collapse"
          bordered={false}
          expandIcon={() => (
            <UserOutlined
              style={{ color: "white", fontSize: "1.2rem", paddingTop: "6px" }}
            />
          )}
        >
          <Panel header="Clients" key="1" style={{ fontSize: "1.2rem" }}>
            <VirtualList
              data={clients}
              height={listHeight}
              itemHeight={itemHeight}
              itemKey="key"
            >
              {(client) => (
                <List.Item className="client-item">
                  <List.Item.Meta
                    title={client.name}
                    style={{ fontSize: "0.85rem", color: "white" }}
                  />
                  <DeleteOutlined
                    onClick={() => handleDelete(client.key)}
                    style={{ color: "white" }}
                  />
                </List.Item>
              )}
            </VirtualList>
          </Panel>
        </Collapse>
      </div>
      <Button
        type="primary"
        style={{
          backgroundColor: "white",
          outline: "none",
          color: "#152266",
          fontWeight: "600",
          padding: "1.2rem 1rem",
        }}
        onClick={showModal}
      >
        Add Client
      </Button>
      <Modal
        title="Add Client"
        open={isModalVisible}
        onCancel={handleCancel}
        onOk={handleOk}
        width={300}
      >
        <Input
          placeholder="Client Name"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
        />
      </Modal>
    </div>
  );
};

export default Sidebar;
