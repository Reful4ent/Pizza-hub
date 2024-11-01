import {Edit, useForm} from "@refinedev/antd";
import {IIngredient} from "../../interfaces";
import {Form, Input, InputNumber} from "antd";
import TextArea from "antd/lib/input/TextArea";

export const IngredientEdit = () => {
    const { formProps, saveButtonProps } = useForm<IIngredient>();
    return (
        <Edit
            saveButtonProps={saveButtonProps}
            title="Изменить ингредиент"
        >
            <Form {...formProps} layout="vertical">
                <Form.Item
                    label="Название"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "Введите название!"
                        }
                    ]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="Описание"
                    name="description"
                >
                    <TextArea style={{ height: 120, resize: 'none' }}/>
                </Form.Item>
                <Form.Item
                    label="Цена"
                    name="price"
                    rules={[
                        {
                            required: true,
                            message: "Введите цену!"
                        }
                    ]}
                >
                    <InputNumber min={0}/>
                </Form.Item>
                <Form.Item
                    label="Изображение - URL"
                    name="image"
                    rules={[
                        {
                            required: true,
                            message: "Введите ссылку на изображение!"
                        }
                    ]}
                >
                    <Input type="url"/>
                </Form.Item>
            </Form>
        </Edit>
    )
}