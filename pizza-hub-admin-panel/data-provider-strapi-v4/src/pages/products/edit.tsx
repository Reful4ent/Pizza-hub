import {Edit, useForm, useTable} from "@refinedev/antd";
import {Button, Form, Input, Radio, Select, Space, Spin} from "antd";
import {ICategory, IIngredient, IProduct} from "../../interfaces";
import TextArea from "antd/lib/input/TextArea";
import {useSelect} from "@refinedev/core";
import {MinusCircleOutlined, PlusCircleOutlined} from "@ant-design/icons";




export const ProductEdit = () => {
    const { formProps, saveButtonProps, formLoading,form } = useForm<IProduct>({
        meta: {
            populate: ['category','price','ingredients','imagesURL']
        }
    });



    const { options: categoryOptions } = useSelect<ICategory>({
        resource: "categories",
        optionLabel: 'name',
        optionValue: 'id',
    })

    const { options: ingredientOptions } = useSelect<IIngredient>({
        resource: "ingredients",
        optionLabel: 'name',
        optionValue: 'id'
    })

    const addIngredientsOption = [
        { label: "Добавлять", value: true },
        { label: "Не добавлять", value: false },
    ]


    if (formLoading) return <Spin />



    return (
       <Edit
           saveButtonProps={saveButtonProps}
           title="Изменить продукт"
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
                   name={["category",'id']}
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
                       optionType="button"
                       buttonStyle="solid"
                   />
               </Form.Item>
               <Form.Item
                   label="Ингредиенты"
                   name='ingredients'
                   getValueProps={(ingredients?: { id: string }[]) => {
                       return { value: ingredients?.map((ingredient) => ingredient.id) };
                   }}
                   getValueFromEvent={(args: string[]) => {
                       return args.map((item) => ({
                           id: item,
                       }));
                   }}
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
                                           <Input placeholder="URL"/>
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
       </Edit>
    )
}
