import {useEffect, useState} from "react";

import {
  List,
  useTable,
  EditButton,
  DateField,
  DeleteButton,
} from "@refinedev/antd";

import { Table, Space, Form, Radio } from "antd";

import { ICategory } from "../../interfaces";
import {useApiUrl} from "@refinedev/core";


export const CategoryList = () => {
  const { tableProps } = useTable<ICategory>();



    return (
    <List title="Категории">
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="ID" />
        <Table.Column dataIndex="name" title="Название" />
        <Table.Column<ICategory>
          title="Действия"
          dataIndex="actions"
          render={(_, record) => (
            <Space>
              <EditButton size="small" hideText recordItemId={record.id} />
              <DeleteButton size="small" hideText recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
