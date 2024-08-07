import {
  Button,
  Form,
  Typography,
  Input,
  Select,
  DatePicker,
  message,
} from "antd";
import "./CreateContract.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const CreateContract = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const storedClients = JSON.parse(localStorage.getItem("clients")) || [];
    setClients(storedClients);
    const handleClientsUpdate = (event) => {
      setClients(event.detail);
    };

    window.addEventListener("clientsUpdated", handleClientsUpdate);

    return () => {
      window.removeEventListener("clientsUpdated", handleClientsUpdate);
    };
  }, []);

  const onFinish = (values) => {
    const formattedValues = {
      ...values,
      key: Date.now(),
      startTime: values.startTime.format("YYYY-MM-DD"),
    };
    const storedContracts = JSON.parse(localStorage.getItem("contracts")) || [];
    const updatedContracts = [...storedContracts, formattedValues];
    localStorage.setItem("contracts", JSON.stringify(updatedContracts));

    message.success("Contract created successfully!");
    navigate(-1);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.error("Failed to submit the form. Please check the fields.");
  };

  return (
    <div className="create-contract">
      <div className="create-contract-block">
        <div className="create-contract-header">
          <Button
            type="link"
            style={{
              margin: "1rem 0 0 1.2rem",
              color: "#152266",
              outline: "none",
            }}
            onClick={() => navigate(-1)}
          >
            &lt; Go Back to Contracts
          </Button>
          <Title
            level={1}
            style={{
              color: "#152266",
              fontWeight: "600",
              textAlign: "center",
              margin: "0",
            }}
          >
            Create Contract
          </Title>
          <Title
            level={4}
            style={{
              color: "#bcbcbc",
              fontWeight: "600",
              textAlign: "center",
              margin: "0.5rem 0 1.5rem 0",
            }}
          >
            Create the contract terms with this form
          </Title>
        </div>
        <div className="create-contract-form">
          <Form
            layout="vertical"
            name="contractForm"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            style={{ width: "50%", margin: "0 auto" }}
          >
            <Form.Item
              label="Contract Name (Reference)"
              name="contractName"
              rules={[
                { required: true, message: "Please enter the contract name!" },
              ]}
              style={{ marginBottom: "0.5rem" }}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Select Customer/Client"
              name="client"
              rules={[
                { required: true, message: "Please select a customer/client!" },
              ]}
              style={{ marginBottom: "0.5rem" }}
            >
              <Select placeholder="Select a customer/client">
                {clients.map((client) => {
                  return (
                    <Option key={client.key} value={client.name}>
                      {client.name}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item
              label="Contract Start Time"
              name="startTime"
              rules={[
                {
                  required: true,
                  message: "Please enter the contract start time!",
                },
              ]}
              style={{ marginBottom: "0.5rem" }}
            >
              <DatePicker />
            </Form.Item>
            <Form.Item
              label="Contract Duration "
              name="contractDuration"
              rules={[
                {
                  required: true,
                  message: "Please enter the contract duration!",
                },
              ]}
              style={{ marginBottom: "0.5rem" }}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Comments (Content and Value of the Contract)"
              name="comments"
              rules={[{ required: true, message: "Please enter comments!" }]}
              style={{ marginBottom: "0.5rem" }}
            >
              <TextArea rows={4} />
            </Form.Item>
            <Form.Item style={{ textAlign: "center", marginTop: "1.5rem" }}>
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
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default CreateContract;
