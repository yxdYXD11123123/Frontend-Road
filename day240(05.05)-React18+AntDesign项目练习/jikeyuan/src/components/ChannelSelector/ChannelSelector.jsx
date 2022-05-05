import React, { useState, useEffect } from "react";
import { Form, Select } from "antd";
import { getChannels } from "@/api";
const { Option } = Select;

function ChannelSelector() {
  // 获取所有频道列表
  const { channels } = useChannels();
  return (
    <Form.Item name="channel_id" noStyle>
      <Select placeholder="请选择文章频道">
        {channels.map((channel) => (
          <Option key={channel.id} value={channel.id}>
            {channel.name}
          </Option>
        ))}
      </Select>
    </Form.Item>
  );
}

function useChannels() {
  // 所有频道
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    getAllChannels();
  }, []);

  // 获取全部频道
  const getAllChannels = async () => {
    const res = await getChannels();
    setChannels(res.data.channels);
  };

  return {
    channels,
  };
}

export default ChannelSelector;
