import {Create, useForm} from "@refinedev/antd";
import {ICategory, IIngredient, IProduct, priceType} from "../../interfaces";
import {Form, Input, Radio, List, Select, Table, Button, Space} from "antd";
import TextArea from "antd/lib/input/TextArea";
import {useSelect} from "@refinedev/core";
import {MinusCircleOutlined, PlusCircleOutlined, PlusOutlined} from "@ant-design/icons";



//ToDo: сделать чтобы в селекте отображались названия а не ключи
export const ProductCreate = () => {
    const { formProps, saveButtonProps, form} = useForm<IProduct>();

    const { options: categoryOptions } = useSelect<ICategory>({
        resource: "categories",
        optionLabel: 'name',
        optionValue: 'id'
    })

    const { options: ingredientOptions } = useSelect<IIngredient>({
        resource: "ingredients",
        optionLabel: 'name',
        optionValue: 'id'
    })



    //const [selectedIngredients, setSelectedIngredients] = useState<number[]>([])
    //const filteredOptions = ingredientOptions.filter(ingredient => !selectedIngredients.includes(ingredient.value));

    const addIngredientsOption = [
        { label: "Добавлять", value: true },
        { label: "Не добавлять", value: false },
    ]




    return (
        <Create saveButtonProps={saveButtonProps}
                title={'Создать продукт'}
        >
            <Form {...formProps} layout="vertical">
                <Form.Item
                    label="Название"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "Введите название продукта!"
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
                    label="Категория"
                    name="category"
                    rules={[
                        {
                            required: true,
                            message: "Выберите категорию!"
                        }
                    ]}
                >
                    <Select
                        style={{ width: 120 }}
                        options={categoryOptions}
                    />
                </Form.Item>
                <Form.Item
                    label="Добавить ингредиенты к продукту"
                    name="addIngredient"
                    rules={[
                        {
                            required: true,
                            message: "Выберите может ли пользователь добавлять ингредиенты к продукту!"
                        }
                    ]}
                >
                    <Radio.Group
                        block
                        options={addIngredientsOption}
                        defaultValue="Добавлять"
                        optionType="button"
                        buttonStyle="solid"
                    />
                </Form.Item>
                <Form.Item
                    label="Ингредиенты"
                    name="ingredients"
                >
                    <Select
                        mode="multiple"
                        style={{ width: '100%' }}
                        options={ingredientOptions}
                    />
                </Form.Item>

                <Form.Item
                    label="Цена"
                >
                    <Form.List
                        name="price"
                        rules={[
                            {
                                validator(_, value){
                                    if (value && value.length > 0) {
                                        return Promise.resolve();
                                    } else {
                                        return Promise.reject(new Error('At least one item is required in the list'));
                                    }
                                }
                            }
                        ]}
                    >
                        {(fields, {add, remove}) => (
                            <>
                                {fields.map(({ key, name, ...restField }) => (
                                    <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'name']}
                                            rules={[{ required: true, message: 'Введите размерность!' }]}
                                        >
                                            <Input placeholder="Размерность" />
                                        </Form.Item>
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'price']}
                                            rules={[{ required: true, message: 'Введите цену!' }]}
                                        >
                                            <Input placeholder="Цена" />
                                        </Form.Item>
                                        <MinusCircleOutlined onClick={() => remove(name)} />
                                    </Space>
                                ))}
                                <Form.Item>
                                    <Button type="dashed" onClick={() => add()} block icon={<PlusCircleOutlined/>}>Добавить цену</Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>
                    {form.getFieldError('price') && (<p style={{color: 'red'}}>Обязательно должна быть хотя бы одна цена!</p>)}
                </Form.Item>
                <Form.Item
                    label="Изображения - URLs"
                >
                    <Form.List
                        name="imagesURL"
                        rules={[
                            {
                                validator(_, value){
                                    if (value && value.length > 0) {
                                        return Promise.resolve();
                                    } else {
                                        return Promise.reject(new Error('At least one item is required in the list'));
                                    }
                                }
                            }
                        ]}
                    >
                        {(fields, {add, remove}) => (
                            <>
                                {fields.map(({ key, name, ...restField }) => (
                                    <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'URL']}
                                            rules={[{ required: true, message: 'Введите ссылку!' }]}
                                        >
                                            <Input placeholder="URL" />
                                        </Form.Item>
                                        <MinusCircleOutlined onClick={() => remove(name)} />
                                    </Space>
                                ))}
                                <Form.Item>
                                    <Button type="dashed" onClick={() => add()} block icon={<PlusCircleOutlined/>}>Добавить ссылку</Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>
                    {form.getFieldError('imagesURL') && (<p style={{color: 'red'}}>Обязательно должна быть хотя бы одна ссылка на изображение!</p>)}
                </Form.Item>
            </Form>
        </Create>
    )
}
/*
* options={filteredOptions.map((option, i) => ({
                            label: option.label,
                            value: option.value
                        }))}
                <Form.Item
                    label="Цена"
                    name="price"
                >
                    <Table rowKey="id" dataSource={prices}>
                        <Table.Column dataIndex="name" title="Размерность"/>
                        <Table.Column dataIndex="price" title="Цена"/>
                    </Table>
                    <Button type="primary" style={{ marginTop: 20 }} >Добавить цену</Button>
                </Form.Item> */
