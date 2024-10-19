import {DeleteButton, EditButton, List, useTable} from "@refinedev/antd";
import {ICategory, IProduct} from "../../interfaces";
import {Space, Table, Tag} from "antd";

export const ProductList = () => {
    const { tableProps } = useTable<IProduct>({
        meta: {
            populate: ['category','price','ingredients']
        }
    });




    return (
        <List title="Продукты">
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="id" title="ID" />
                <Table.Column dataIndex="name" title="Название"/>
                <Table.Column dataIndex="description" title="Описание"/>
                <Table.Column<IProduct>
                    dataIndex="category"
                    title="Категория"
                    render={(_, record) => (
                        <Tag color="green">{record?.category?.name || "Нет"}</Tag>
                    )}
                />

                <Table.Column<IProduct>
                    dataIndex="actions"
                    title="Действия"
                    render={(_,record) => (
                        <Space>
                            <EditButton size="small" hideText recordItemId={record.id} />
                            <DeleteButton size="small" hideText recordItemId={record.id} />
                        </Space>
                    )}
                />
            </Table>
        </List>
    )
}