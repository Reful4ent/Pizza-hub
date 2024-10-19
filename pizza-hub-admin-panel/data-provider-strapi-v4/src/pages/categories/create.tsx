import { Create, useForm } from "@refinedev/antd";

import { Form, Input, Radio } from "antd";

import type { ICategory } from "../../interfaces";

export const CategoryCreate = () => {
  const { formProps, saveButtonProps } = useForm<ICategory>();

  return (
    <Create
        saveButtonProps={saveButtonProps}
        title="Создать категорию"
    >
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Название"
          name="name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Create>
  );
};
