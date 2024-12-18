import { Edit, useForm } from "@refinedev/antd";

import { Form, Input } from "antd";

import type { ICategory } from "../../interfaces";

export const CategoryEdit = () => {
  const { formProps, saveButtonProps } = useForm<ICategory>();

  return (
    <Edit
        saveButtonProps={saveButtonProps}
        title="Изменить категорию"
    >
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Название"
          name="name"
          rules={[
            {
              required: true,
              message: "Введите название!"
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Edit>
  );
};
