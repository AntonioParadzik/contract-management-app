import { useState, useEffect } from "react";
import { Popover, Input, Button, Flex, Form, Select, DatePicker } from "antd";
import { SearchOutlined, FilterOutlined } from "@ant-design/icons";

const { RangePicker } = DatePicker;
const { Option } = Select;

const ContractFilter = ({ onFilter, onSearch }) => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const storedContracts = JSON.parse(localStorage.getItem("contracts")) || [];
    const clients = storedContracts.map((contract) => ({
      key: contract.key,
      name: contract.client,
    }));
    const uniqueClients = clients.filter(
      (client, index, self) =>
        index === self.findIndex((t) => t.name === client.name)
    );
    setClients(uniqueClients);
  }, []);

  const applyFilters = () => {
    form
      .validateFields()
      .then((values) => {
        onFilter(values);
        setOpen(false);
      })
      .catch((errorInfo) => {
        console.log("Failed:", errorInfo);
      });
  };

  const handleClear = () => {
    form.resetFields();
    onFilter({});
  };

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  const filtersForm = (
    <Form
      form={form}
      layout="vertical"
      name="filterForm"
      onFinish={applyFilters}
    >
      <Form.Item label="Client" name="client">
        <Select placeholder="Client">
          {clients.map((client) => {
            return (
              <Option key={client.key} value={client.name}>
                {client.name}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item label="Start Time" name="startTime">
        <RangePicker />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{
            backgroundColor: "#152266",
            outline: "none",
            color: "white",
            fontWeight: "600",
            padding: "1.2rem 1rem",
          }}
        >
          Apply
        </Button>
        <Button
          onClick={handleClear}
          style={{
            backgroundColor: "white",
            outline: "none",
            color: "#152266",
            fontWeight: "600",
            padding: "1.2rem 1rem",
          }}
        >
          Clear Filters
        </Button>
      </Form.Item>
    </Form>
  );

  return (
    <div>
      <Flex align="center" justify="space-between">
        <Input
          size="large"
          placeholder="Search by Name"
          suffix=<SearchOutlined />
          onChange={(e) => onSearch(e.target.value)}
          style={{ width: "25%", margin: "1.2rem 2rem" }}
        />
        <Popover
          placement="bottomRight"
          content={filtersForm}
          title="Filter contracts"
          trigger="click"
          open={open}
          onOpenChange={handleOpenChange}
        >
          <Button
            type="primary"
            style={{
              margin: "1rem 2rem",
              backgroundColor: "#152266",
              outline: "none",
              color: "white",
              fontWeight: "600",
              padding: "1.2rem 1rem",
            }}
          >
            <FilterOutlined /> Filter
          </Button>
        </Popover>
      </Flex>
    </div>
  );
};

export default ContractFilter;
