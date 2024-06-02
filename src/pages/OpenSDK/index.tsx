import { PageContainer } from '@ant-design/pro-components';
import React, { useState, useEffect } from 'react';
import { Card, Table, Button, message } from 'antd';
import { useModel } from 'umi';
import {getSignByIdUsingGet, resetUserSignUsingPost} from "@/services/ershi-api-backend/userController";

const OpenSDK: React.FC = () => {
  // 全局状态
  const { initialState } = useModel('@@initialState');

  const [keys, setKeys] = useState([
    { key: '1', accessKey: '', secreteKey: '' },
  ]);
  const [loading, setLoading] = useState(false);

  // 表格列定义
  const columns = [
    {
      title: 'Access Key',
      dataIndex: 'accessKey',
      key: 'accessKey',
    },
    {
      title: 'Secrete Key',
      dataIndex: 'secreteKey',
      key: 'secreteKey',
    },
  ];

  // 获取当前登录用户的 AK 和 SK
  const fetchUserSign = async () => {
    setLoading(true);
    try {
      const res = await getSignByIdUsingGet({
        userId: initialState?.loginUser?.id,
      });
      const { accessKey, secreteKey } = res?.data ?? {};
      setKeys([
        { key: '1', accessKey, secreteKey },
      ]);
    } catch (error: any) {
      message.error('获取密钥失败, ' + error.message);
    }
    setLoading(false);
  };

  // 重置 AK 和 SK 的函数
  const resetKeys = async () => {
    setLoading(true);
    try {
      const res = await resetUserSignUsingPost({
        userId: initialState?.loginUser?.id,
      });
      if (res?.data) {
        message.success('密钥已重置');
        fetchUserSign();  // 重置成功后重新获取 AK 和 SK
      } else {
        message.error('密钥重置失败');
      }
    } catch (error: any) {
      message.error('密钥重置失败, ' + error.message);
    }
    setLoading(false);
  };

  // 在组件挂载时自动调用 fetchUserSign 函数
  useEffect(() => {
    fetchUserSign();
  }, []);

  return (
    <PageContainer>
      <Card>
        <Table
          dataSource={keys}
          columns={columns}
          pagination={false}
          rowKey="key"
          loading={loading}
        />
        <Button type="primary" onClick={resetKeys} style={{ marginTop: '16px' }}>
          重置 Access Key / Secrete Key
        </Button>
      </Card>
    </PageContainer>
  );
};

export default OpenSDK;
