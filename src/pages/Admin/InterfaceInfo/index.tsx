import CreateModal from '@/pages/Admin/InterfaceInfo/components/CreateModal';
import UpdateModal from '@/pages/Admin/InterfaceInfo/components/UpdateModal';
import {
  addInterfaceInfoUsingPost,
  deleteInterfaceInfoUsingPost,
  listInterfaceInfoVoByPageUsingPost,
  offlineInterfaceInfoUsingPost,
  onlineInterfaceInfoUsingPost,
  updateInterfaceInfoUsingPost,
} from '@/services/ershi-api-backend/interfaceInfoController';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import {
  FooterToolbar,
  ModalForm,
  PageContainer,
  ProDescriptions,
  ProFormText,
  ProFormTextArea,
  ProTable,
} from '@ant-design/pro-components';
import '@umijs/max';
import { Button, Drawer, message } from 'antd';
import { SortOrder } from 'antd/lib/table/interface';
import React, { useRef, useState } from 'react';

const InterfaceInfo: React.FC = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.InterfaceInfoUpdateRequest>();
  const [recordState, setrecord] = useState<API.RuleListItem[]>([]);

  /**
   * @en-US Add node
   * @zh-CN 添加节点
   * @param fields
   */
  const handleAdd = async (fields: API.InterfaceInfoAddRequest) => {
    const hide = message.loading('正在添加');
    try {
      const res = await addInterfaceInfoUsingPost({
        ...fields,
      });
      hide();
      if (res.code === 0) {
        message.success('创建成功');
      }
      actionRef.current?.reload();
      handleModalOpen(false);
      return true;
    } catch (error: any) {
      hide();
      message.error('创建失败! ' + error.message);
      return false;
    }
  };

  /**
   * @en-US Update node
   * @zh-CN 更新节点
   *
   * @param fields
   */
  const handleUpdate = async (fields: API.InterfaceInfoUpdateRequest) => {
    // 如果没有选中行，则直接返回
    if (!currentRow) {
      return;
    }

    const hide = message.loading('接口修改中');
    try {
      const res = await updateInterfaceInfoUsingPost({
        id: currentRow.id,
        ...fields,
      });
      hide();
      if (res.code === 0) {
        message.success('接口修改成功');
      }
      actionRef.current?.reload();
      return true;
    } catch (error) {
      hide();
      message.error('接口修改失败');
      return false;
    }
  };

  /**
   *  Delete node
   * @zh-CN 删除节点
   *
   * @param record
   */
  const handleRemove = async (record: API.DeleteRequest) => {
    const hide = message.loading('正在删除');
    if (!record) return true;
    try {
      const res = await deleteInterfaceInfoUsingPost({
        id: record.id,
      });
      hide();
      if (res.code === 0) {
        message.success('接口删除成功');
      }
      actionRef.current?.reload();
      return true;
    } catch (error: any) {
      hide();
      message.error('接口删除失败, ' + error.message);
      return false;
    }
  };

  /**
   *  Delete node
   * @zh-CN 上线接口
   *
   * @param record
   */
  const handleOnline = async (record: API.IdRequest) => {
    const hide = message.loading('正在上线');
    if (!record) return true;
    try {
      const res = await onlineInterfaceInfoUsingPost({
        id: record.id,
      });
      hide();
      if (res.code === 0) {
        message.success('接口上线成功');
      }
      actionRef.current?.reload();
      return true;
    } catch (error: any) {
      hide();
      message.error('接口上线失败, ' + error.message);
      return false;
    }
  };

  /**
   *  Delete node
   * @zh-CN 下线接口
   *
   * @param record
   */
  const handleOFFline = async (record: API.IdRequest) => {
    const hide = message.loading('正在上线');
    if (!record) return true;
    try {
      const res = await offlineInterfaceInfoUsingPost({
        id: record.id,
      });
      hide();
      if (res.code === 0) {
        message.success('接口下线成功');
      }
      actionRef.current?.reload();
      return true;
    } catch (error: any) {
      hide();
      message.error('接口上线失败, ' + error.message);
      return false;
    }
  };

  const columns: ProColumns<API.InterfaceInfo>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      valueType: 'index',
    },
    {
      title: '接口名称',
      dataIndex: 'name',
      valueType: 'text',
      formItemProps: {
        rules: [
          {
            required: true,
          },
        ],
      },
    },
    {
      title: '描述',
      dataIndex: 'description',
      valueType: 'textarea',
      formItemProps: {
        rules: [
          {
            required: true,
          },
        ],
      },
    },
    {
      title: '请求方法',
      dataIndex: 'method',
      valueType: 'text',
      formItemProps: {
        rules: [
          {
            required: true,
          },
        ],
      },
    },
    {
      title: '请求参数',
      dataIndex: 'requestParams',
      valueType: 'jsonCode',
      formItemProps: {},
    },
    {
      title: '请求参数示例',
      dataIndex: 'requestParamsExample',
      valueType: 'jsonCode',
      formItemProps: {},
    },
    {
      title: '接口主机',
      dataIndex: 'host',
      valueType: 'text',
      formItemProps: {
        rules: [
          {
            required: true,
          },
        ],
      },
    },
    {
      title: '接口地址',
      dataIndex: 'url',
      valueType: 'text',
      formItemProps: {
        rules: [
          {
            required: true,
          },
        ],
      },
    },
    {
      title: '请求头',
      dataIndex: 'requestHeader',
      valueType: 'textarea',
      formItemProps: {
        rules: [
          {
            required: true,
          },
        ],
      },
    },
    {
      title: '响应头',
      dataIndex: 'responseHeader',
      valueType: 'textarea',
      formItemProps: {
        rules: [
          {
            required: true,
          },
        ],
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      hideInForm: true,
      valueEnum: {
        0: {
          text: '关闭',
          status: 'Default',
        },
        1: {
          text: '开启',
          status: 'Processing',
        },
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInForm: true,
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      valueType: 'dateTime',
      hideInForm: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <Button
          type={'link'}
          key="config"
          onClick={() => {
            handleUpdateModalOpen(true);
            setCurrentRow(record);
          }}
        >
          修改
        </Button>,
        record.status === 0 ? (
          <Button
            type={'link'}
            key="config"
            onClick={() => {
              handleOnline(record);
            }}
          >
            上线
          </Button>
        ) : null,
        record.status === 1 ? (
          <Button
            // type="text"
            type={'link'}
            danger
            key="online"
            onClick={() => {
              handleOFFline(record);
            }}
          >
            下线
          </Button>
        ) : null,
        <Button
          type={'link'}
          danger
          key="offline"
          onClick={() => {
            handleRemove(record);
          }}
        >
          删除
        </Button>,
      ],
    },
  ];
  return (
    <PageContainer>
      <ProTable<API.RuleListItem, API.PageParams>
        headerTitle={'查询表格'}
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalOpen(true);
            }}
          >
            <PlusOutlined /> 创建接口
          </Button>,
        ]}
        // 请求接口列表
        request={async (
          params,
          sort: Record<string, SortOrder>,
          filter: Record<string, (string | number)[] | null>,
        ) => {
          const res: any = await listInterfaceInfoVoByPageUsingPost({
            ...params,
          });
          if (res?.data) {
            return {
              data: res.data.records || [],
              success: true,
              total: res?.data.total || 0,
            };
          } else {
            return {
              data: [],
              success: false,
              total: 0,
            };
          }
        }}
        columns={columns}
        rowSelection={{
          onChange: (_, record) => {
            setrecord(record);
          },
        }}
      />
      {recordState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择{' '}
              <a
                style={{
                  fontWeight: 600,
                }}
              >
                {recordState.length}
              </a>{' '}
              项 &nbsp;&nbsp;
              <span>
                服务调用次数总计 {recordState.reduce((pre, item) => pre + item.callNo!, 0)} 万
              </span>
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(recordState);
              setrecord([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量删除
          </Button>
          <Button type="primary">批量审批</Button>
        </FooterToolbar>
      )}
      <ModalForm
        title={'新建规则'}
        width="400px"
        open={createModalOpen}
        onOpenChange={handleModalOpen}
        onFinish={async (value) => {
          const success = await handleAdd(value as API.InterfaceInfoAddRequest);
          if (success) {
            handleModalOpen(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProFormText
          rules={[
            {
              required: true,
              message: '规则名称为必填项',
            },
          ]}
          width="md"
          name="name"
        />
        <ProFormTextArea width="md" name="desc" />
      </ModalForm>
      <UpdateModal
        columns={columns}
        onSubmit={async (value) => {
          console.log('id = ', value.id);
          const success = await handleUpdate(value);
          if (success) {
            handleUpdateModalOpen(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalOpen(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        visible={updateModalOpen}
        values={currentRow || {}}
      />
      <CreateModal
        columns={columns}
        onCancel={() => {
          handleModalOpen(false);
        }}
        onSubmit={(values) => {
          handleAdd(values);
        }}
        visible={createModalOpen}
      />
      <Drawer
        width={600}
        open={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.name && (
          <ProDescriptions<API.RuleListItem>
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.name,
            }}
            columns={columns as ProDescriptionsItemProps<API.RuleListItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};
export default InterfaceInfo;
