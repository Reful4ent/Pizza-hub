import {
    DeleteButton,
    EditButton,
    List,
    useTable
} from "@refinedev/antd";

import {ICategory, IIngredient} from "../../interfaces";
import {Space, Table} from "antd";



export const IngredientList = () => {
    const { tableProps } = useTable<IIngredient>()


    return (
        <List title="Ингредиенты">
            <Table
                {...tableProps}
                rowKey="id"
            >
                <Table.Column dataIndex='id' title='ID' />
                <Table.Column dataIndex='name' title='Название'/>
                <Table.Column dataIndex='description' title='Описание' />
                <Table.Column dataIndex='price' title='Цена'/>
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
    )
}