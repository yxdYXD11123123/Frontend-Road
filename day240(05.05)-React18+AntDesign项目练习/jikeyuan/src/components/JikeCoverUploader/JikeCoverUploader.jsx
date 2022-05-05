import React, { useState, useRef, memo } from "react";
import { Upload, Radio, Form } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

function JikeCoverUploader({ value = {}, onChange }) {
  console.log("JikeCoverUploader", value);

  // 封面类型
  const [type, setType] = useState(value.type || 1);

  // 默认的文件列表
  function getDefaultFileList() {
    // 获取 cover 中默认图片列表
    return (
      // 整理成 文件列表数据
      value.images?.map((item, index) => {
        return {
          uid: index,
          status: "done",
          url: item,
        };
      }) || []
    );
  }

  // 缓存图片列表
  const fileListRef = useRef(getDefaultFileList());

  // 根据 封面类型 更新上传类型
  const getNewFileList = (type) => {
    let newFileList;
    switch (type) {
      case 0:
        newFileList = [];
        break;
      case 1:
        newFileList = [...fileListRef.current.slice(-1)];
        break;
      case 3:
        newFileList = [...fileListRef.current.slice(-3)];
        break;
      default:
        break;
    }
    return newFileList;
  };

  // 上传列表信息（根据上传类型初始化数据）
  const [images, setImages] = useState(getNewFileList(value.type || 1));

  const triggerChange = (changedValue) => {
    onChange?.({
      type,
      images,
      ...value,
      ...changedValue,
    });
  };

  // 图片列表改变
  const onImagesChange = ({ fileList }) => {
    // 缓存已上传的图片列表
    fileListRef.current = fileList.map((item) => {
      // 上传成功的地址 设为 预览图片的地址
      if (item.response && item.response.message === "OK") {
        item.thumbUrl = item.response.data.url;
      }
      return item;
    });

    const newList = getNewFileList(type);
    // 更新上传列表
    setImages(newList);
    // 更新
    triggerChange({
      images: newList,
    });
  };

  // 类型选择改变
  const onTypeChange = (e) => {
    const newType = e.target.value;
    const newList = getNewFileList(newType);
    setImages(newList);
    setType(newType);
    triggerChange({
      type: newType,
      images: newList,
    });
  };

  return (
    <>
      <Form.Item>
        <Radio.Group onChange={onTypeChange} value={type}>
          <Radio value={0}>无图 </Radio>
          <Radio value={1}>单图</Radio>
          <Radio value={3}>三图</Radio>
        </Radio.Group>
      </Form.Item>
      <Upload
        action="/api/upload"
        listType="picture-card"
        name="image"
        fileList={images}
        onChange={onImagesChange}
        maxCount={3}
      >
        {type === 0 ? null : (
          <div>
            <PlusOutlined />
          </div>
        )}
      </Upload>
    </>
  );
}

JikeCoverUploader.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.object,
};

export default memo(JikeCoverUploader);
