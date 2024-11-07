
import {
    Button, Col,
    ColorPicker,
    ConfigProvider,
    Form,
    FormProps,
    Input, Row,
    Select,
    Spin
} from "antd";
import {IButtonType, IConfig} from "../../interfaces";
import {useApiUrl, useCustom, useSelect} from "@refinedev/core";
import axios from "axios";
import {useState} from "react";



export const ConfigEdit = () => {
    const apiUrl = useApiUrl();
    const [form] = Form.useForm();
    const buttonType = Form.useWatch('productButtonType',form) ?? {}
    const [colorStandardProductButton, setColorStandardProductButton] = useState()
    const [colorHoverStandardProductButton, setColorHoverStandardProductButton] = useState()
    const [colorBoxShadowStandardProductButton, setColorBoxShadowStandardProductButton] = useState()



    const { options: buttonTypeOptions } = useSelect<IButtonType>({
        resource: "button-types",
        optionLabel: 'type',
        optionValue: 'id',
    })

    const { data, isLoading } = useCustom<IConfig>({
        url: `${apiUrl}/config?populate=*&`,
        method: "get",
    })

    if (isLoading) return <Spin />


    let configData= {
        name: data?.data?.data?.attributes.name,
        iconUrl: data?.data?.data?.attributes.iconUrl,
        contactPhoneNumber: data?.data?.data?.attributes.contactPhoneNumber,
        contactEmail: data?.data?.data?.attributes.contactEmail,
        productButtonType: {
            id: data?.data?.data?.attributes.productButtonType.data.id,
            type: data?.data?.data?.attributes.productButtonType.data.attributes.type,
        },
        colorStandardProductButton: data?.data?.data?.attributes.colorStandardProductButton,
        colorHoverStandardProductButton: data?.data?.data?.attributes.colorHoverStandardProductButton,
        colorBoxShadowStandardProductButton: data?.data?.data?.attributes.colorBoxShadowStandardProductButton
    }


    const onFinish: FormProps<IConfig>['onFinish'] = async (values) => {
        await axios.put(
            `${apiUrl}/config`,
            {
                data: {
                    name: values.name,
                    iconUrl: values.iconUrl,
                    contactPhoneNumber: values.contactPhoneNumber,
                    contactEmail: values.contactEmail,
                    productButtonType: values.productButtonType,
                    colorStandardProductButton: colorStandardProductButton,
                    colorHoverStandardProductButton: colorHoverStandardProductButton,
                    colorBoxShadowStandardProductButton: colorBoxShadowStandardProductButton
                }
            }
        )
    };



    return (
        <>
            <Form
                initialValues={configData}
                layout="vertical"
                onFinish={onFinish}
                form={form}
                style={{backgroundColor: "#fff", padding: 20, borderRadius: 10}}
            >
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

                <Form.Item
                    label="Иконка - URL"
                    name="iconUrl"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Номер телефона"
                    name="contactPhoneNumber"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Контактная почта"
                    name="contactEmail"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item>
                    <Row>
                        <Col span={12}>
                            <Form.Item
                                label="Настройка стандартной карточки товара"
                                style={{fontWeight: "bold"}}
                            >
                                <Form.Item
                                    label="Тип кнопки на стандартной карточке товара"
                                    name={["productButtonType",'id']}
                                    style={{fontWeight: "normal"}}
                                >
                                    <Select options={buttonTypeOptions}/>
                                </Form.Item>

                                <Form.Item
                                    label="Цвет кнопки"
                                    name="colorStandardProductButton"
                                    style={{fontWeight: "normal"}}
                                >
                                    <ColorPicker
                                        format="hex"
                                        onChange={(_,hex)=> setColorStandardProductButton(hex)}
                                    />
                                </Form.Item>

                                <Form.Item
                                    label="Цвет кнопки при наведении"
                                    name="colorHoverStandardProductButton"
                                    style={{fontWeight: "normal"}}
                                >
                                    <ColorPicker
                                        format="hex"
                                        onChange={(_,hex)=> setColorHoverStandardProductButton(hex)}
                                    />
                                </Form.Item>

                                <Form.Item
                                    label="Цвет тени на карточке товара"
                                    name="colorBoxShadowStandardProductButton"
                                    style={{fontWeight: "normal"}}
                                >
                                    <ColorPicker
                                        format="hex"
                                        onChange={(_,hex)=> setColorBoxShadowStandardProductButton(hex)}
                                    />
                                </Form.Item>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item style={{width: '100%', display: "flex", justifyContent: "center"}}>
                                <div
                                    style={{
                                        boxShadow: `0px 0px 49px 9px ${colorBoxShadowStandardProductButton ?? configData.colorBoxShadowStandardProductButton}`,
                                        width: "322px",
                                        height: "552px",
                                        padding: "25px",
                                        border: "1px solid #00000026",
                                        borderRadius: "0.5rem",
                                        display: "flex",
                                        flexDirection: "column",
                                        marginTop: "60px"
                                    }}
                                >
                                    <div
                                        style={{
                                            width: "100%",
                                            height: "55%",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <img
                                            style={{
                                                width: "100%",
                                                height: "168.75px",
                                                alignSelf: "center",
                                                marginBottom: "10px",
                                            }}
                                            src="https://storage.yandexcloud.net/pjproduction/images/catalog/thumbs/cart/63461818fed6eacd388278095682489d.webp"
                                            alt="Пицца"
                                        />
                                    </div>
                                    <div
                                        style={{
                                            width: "100%",
                                            height: "45%",
                                            display: "flex",
                                            flexDirection: "column",
                                        }}
                                    >
                                        <p
                                            className="line-clamp-1"
                                            style={{
                                                marginBottom: "5px",
                                                fontWeight: "500",
                                                fontSize: "22px",
                                            }}
                                        >
                                            Nunc sodales pulvinar neque, ut placerat est laoreet nec.
                                            Etiam finibus porttitor varius. Duis placerat magna neque, eu maximus tortor molestie quis.
                                            Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                                            Fusce at tellus rhoncus, vehicula lacus rutrum, maximus orci.
                                        </p>

                                        <p
                                            className="line-clamp-4 text-[#616773]"
                                            style={{
                                                marginBottom: "5px",
                                            }}
                                        >
                                            Nunc sodales pulvinar neque, ut placerat est laoreet nec.
                                            Etiam finibus porttitor varius. Duis placerat magna neque, eu maximus tortor molestie quis.
                                            Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                                            Fusce at tellus rhoncus, vehicula lacus rutrum, maximus orci.
                                        </p>

                                        <p
                                            style={{
                                                marginBottom: "5px",
                                                fontWeight: "600",
                                                fontSize: "18px",
                                            }}
                                        >
                                            Цена: 180 ₽
                                        </p>
                                        <ConfigProvider
                                            theme={{
                                                components: {
                                                    Button: {
                                                        defaultBg: colorStandardProductButton ?? configData.colorStandardProductButton,
                                                        defaultColor: '#fff',
                                                        defaultActiveColor: colorHoverStandardProductButton ?? configData.colorHoverStandardProductButton,
                                                        colorPrimary: colorStandardProductButton ?? configData.colorStandardProductButton,
                                                        colorPrimaryHover: colorHoverStandardProductButton ?? configData.colorHoverStandardProductButton,
                                                        colorPrimaryActive: colorHoverStandardProductButton ?? configData.colorHoverStandardProductButton,
                                                        textTextColor: colorStandardProductButton ?? configData.colorStandardProductButton,
                                                        textTextHoverColor: colorHoverStandardProductButton ?? configData.colorHoverStandardProductButton,
                                                    }
                                                },
                                            }}
                                        >
                                            <Button
                                                className="rounded-lg font-semibold"
                                                style={{height: "25%"}}
                                                type={buttonTypeOptions[buttonType?.id - 1]?.label ?? 'default'}
                                            >
                                                Тестовая кнопка
                                            </Button>
                                        </ConfigProvider>
                                    </div>
                                </div>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">Сохранить</Button>
                </Form.Item>
            </Form>
        </>
    )
}