import "./App.css";
import "antd/dist/antd.css";
import React, { useState } from "react";
import { Form, Button, Checkbox, DatePicker, Input, Select, Alert } from "antd";
import { Describe } from "./Describe";

function App() {
  const [dateBth, setDataBith] = useState();

  function onChange(date, dateString) {
    let nowDayMs = new Date().getTime();
    let useDay = Date.parse(dateString);
    let fullYearUser = Math.trunc((nowDayMs - useDay) / (86400000 * 365));
    setDataBith(fullYearUser);
  }
  return (
    <div className="App">
      <div className="header">
        <Form
          autoComplete="off"
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 14 }}
          className="form"
          onFinish={(value) => {
            console.log({ value });
          }}
          onFinishFailed={(error) => {
            console.log({ error });
          }}
        >
          <Form.Item
            hasFeedback
            name="firstName"
            label="First Name"
            rules={[
              { required: true, message: "Please enter your first name" },
              { whitespace: true },
              { min: 3 },
            ]}
          >
            <Input placeholder="Type your First name" />
          </Form.Item>
          <Form.Item
            hasFeedback
            name="lastName"
            label="Last Name"
            rules={[
              { required: true, message: "Please enter your last name" },
              { min: 3 },
              { whitespace: true },
            ]}
          >
            <Input placeholder="Type your Last name" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            hasFeedback
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input placeholder="Type your Email" />
          </Form.Item>
          <Form.Item
            name="confirmEmail"
            label="Confirm Email"
            hasFeedback
            dependencies={["email"]}
            rules={[
              { required: true },

              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("email") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    "The two email that you entered does not match"
                  );
                },
              }),
            ]}
          >
            <Input placeholder="Confirm Email" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
              },
              { min: 8 },
              {
                pattern: /(?=.*[A-Z])/g,
                message: "Minimum one uppercase letter",
              },
              {
                pattern: /(?=.*[0-9])/g,
                message: "Minimum one number",
              },
              {
                pattern: /(?=.*[^\w\s])/g,
                message: "Minimum one special character",
              },
            ]}
            hasFeedback
          >
            <Input.Password placeholder="Type your password" />
          </Form.Item>
          <Describe />
          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            dependencies={["password"]}
            rules={[
              {
                required: true,
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    "The two passwords that you entered does not match."
                  );
                },
              }),
            ]}
            hasFeedback
          >
            <Input.Password placeholder="Confirm your password" />
          </Form.Item>

          <Form.Item
            name="gender"
            label="Gender"
            requiredMark="optional"
            hasFeedback
          >
            <Select placeholder="Select your Gender">
              <Select.Option value="female">Female</Select.Option>
              <Select.Option value="male">Male</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item name="dateOFbirth" label="Date of Birth" hasFeedback>
            <DatePicker
              onChange={(date, dateString) => onChange(date, dateString)}
              style={{ width: "100%" }}
              picker="data"
              placeholder="Date of Birth"
              rules={[{ required: true, message: "Please provide your Birth" }]}
            />
          </Form.Item>
          {dateBth < 18 ? (<Alert message="Age needs to be 18 or older" type="error" /> ) : ("")}

          <Form.Item
            name="agreement"
            valuePropName="checked"
            wrapperCol={{ span: 24 }}
            hasFeedback
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(
                        new Error(
                          "To proceed, you need to agree with our terms and conditions"
                        )
                      ),
              },
            ]}>
            <Checkbox> Agree to our Terms and Conditions</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ span: 24 }}>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default App;
