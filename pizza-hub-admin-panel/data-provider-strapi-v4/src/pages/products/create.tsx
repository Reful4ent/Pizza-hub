import {Create, useForm} from "@refinedev/antd";
import {ICategory, IIngredient, IProduct} from "../../interfaces";
import {Form, Input, Radio, List, Select} from "antd";
import TextArea from "antd/lib/input/TextArea";
import {BaseOption, useList, useSelect} from "@refinedev/core";
import {useState} from "react";


//ToDo: сделать чтобы в селекте отображались названия а не ключи
export const ProductCreate = () => {
    const { formProps, saveButtonProps } = useForm<IProduct>();

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
            </Form>
        </Create>
    )
}
/*
* options={filteredOptions.map((option, i) => ({
                            label: option.label,
                            value: option.value
                        }))}*/
