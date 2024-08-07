import { Typography, Button } from "antd";
import { useState, useEffect } from "react";
import ContractFilter from "./ContractFilter";
import ContractList from "./ContractList";
import "./Contracts.css";
import { useNavigate } from "react-router-dom";
import React from "react";
import { PlusOutlined } from "@ant-design/icons";
const { Title } = Typography;

const Contracts = () => {
  const navigate = useNavigate();
  const [contracts, setContracts] = useState([]);
  const [filteredContracts, setFilteredContracts] = useState(contracts);
  const [currentFilter, setCurrentFilter] = useState({});

  useEffect(() => {
    const storedContracts = JSON.parse(localStorage.getItem("contracts")) || [];
    setContracts(storedContracts);
    setFilteredContracts(storedContracts);
  }, []);

  const handleSearch = (value) => {
    if (value === "") {
      handleFilter(currentFilter);
      setFilteredContracts(filteredContracts);
      return;
    }
    const filteredData = filteredContracts.filter((contract) =>
      contract.contractName.toLowerCase().startsWith(value.toLowerCase())
    );
    if (filteredData.length !== 0) {
      setFilteredContracts(filteredData);
    }
  };

  const handleFilter = (values) => {
    setCurrentFilter(values);
    let filteredData = contracts;

    if (values.client) {
      filteredData = filteredData.filter(
        (contract) => contract.client === values.client
      );
    }

    if (values.startTime) {
      filteredData = filteredData.filter((contract) => {
        const startTime = new Date(contract.startTime);
        const startDate = new Date(values.startTime[0]);
        const endDate = new Date(values.startTime[1]);

        return startTime >= startDate && startTime <= endDate;
      });
    }

    setFilteredContracts(filteredData);
  };

  const handleDeleteContract = (key) => {
    const updatedContracts = contracts.filter(
      (contract) => contract.key !== key
    );
    setFilteredContracts(updatedContracts);
    localStorage.setItem("contracts", JSON.stringify(updatedContracts));
  };

  const handleDeleteAllContracts = () => {
    localStorage.removeItem("contracts");
    setFilteredContracts([]);
  };
  return (
    <div className="contracts">
      <div className="contracts-header">
        <Title
          level={1}
          style={{ color: "#152266", fontWeight: "600", paddingBottom: "12px" }}
        >
          Contracts
        </Title>
        <Button
          type="primary"
          style={{
            backgroundColor: "#152266",
            outline: "none",
            color: "white",
            fontWeight: "600",
            padding: "1.2rem 1rem",
          }}
          onClick={() => navigate("/create")}
        >
          <PlusOutlined /> Create Contract
        </Button>
      </div>

      <div className="contracts-body">
        <ContractFilter onFilter={handleFilter} onSearch={handleSearch} />
        <ContractList
          contracts={filteredContracts}
          onDelete={handleDeleteContract}
          style={{ width: "200px" }}
        />
        <Button
          type="default"
          style={{
            backgroundColor: "white",
            outline: "none",
            color: "#152266",
            fontWeight: "600",
            padding: "1.2rem 1rem",
            margin: "1.2rem 2rem",
          }}
          onClick={handleDeleteAllContracts}
        >
          Delete All Contracts
        </Button>
      </div>
    </div>
  );
};

export default Contracts;
