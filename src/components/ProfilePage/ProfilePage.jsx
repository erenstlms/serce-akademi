import { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Card,
  Avatar,
  Divider,
  message,
  Select,
  DatePicker,
} from "antd";
import dayjs from "dayjs";
import {
  UserOutlined,
  LockOutlined,
  IdcardOutlined,
  SaveOutlined,
  EditOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";

export const ProfilePage = () => {
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    status: "",
    registrationTime: "",
    username: "",
    password: "",
    avatar: "",
    partnerId: "",
    sessionGuid: "",
    loginTime: "",
    logoutTime: "",
  });

  useEffect(() => {
    // localden kullanıcı adı al
    const username = localStorage.getItem("currentUser");
    if (username) {
      const mockUserData = {
        status: "Aktif",
        registrationTime: dayjs("2024-01-15 10:30:00"),
        username: username,
        password: "********",
        avatar: "",
        partnerId: "PART-001",
        sessionGuid: "GUID-123456789",
        loginTime: dayjs("2024-01-20 09:15:00"),
        logoutTime: dayjs("2024-01-20 17:30:00"),
      };
      setUserData(mockUserData);
      form.setFieldsValue(mockUserData);
    }
  }, [form]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    form.setFieldsValue(userData);
  };

  const handleSave = async (values) => {
    setLoading(true);
    try {
      console.log("Güncellenecek veriler:", values);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      setUserData(values);
      setIsEditing(false);
      message.success("Profil bilgileri başarıyla güncellendi!");
    } catch (error) {
      message.error("Güncelleme sırasında bir hata oluştu!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Kullanıcı Profili
        </h1>
        <p className="text-gray-600">
          Kullanıcı hesap bilgilerini görüntüleyin
        </p>
      </div>

      <Card className="shadow-sm">
        <div className="flex items-center mb-6 gap-x-4">
          <Avatar
            size={80}
            icon={<UserOutlined />}
            className="bg-blue-500 text-white text-2xl"
          />
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-gray-800">
              {userData.username}
            </h2>
            <p className="text-gray-600">Durum: {userData.status}</p>
          </div>
          <div className="ml-auto">
            {!isEditing ? (
              <Button
                type="primary"
                icon={<EditOutlined />}
                onClick={handleEdit}
                className="flex items-center"
              >
                Düzenle
              </Button>
            ) : (
              <div className="space-x-2">
                <Button onClick={handleCancel}>İptal</Button>
                <Button
                  type="primary"
                  icon={<SaveOutlined />}
                  loading={loading}
                  onClick={() => form.submit()}
                >
                  Kaydet
                </Button>
              </div>
            )}
          </div>
        </div>

        <Divider />

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSave}
          disabled={!isEditing}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* sol taraf */}
            <div className="space-y-4">
              <Form.Item label="Durum" name="status">
                <Select
                  placeholder="Durum seçiniz"
                  disabled={!isEditing}
                  options={[
                    {
                      value: "Aktif",
                      label: (
                        <div className="flex items-center">
                          <CheckCircleOutlined className="text-green-500 mr-2" />
                          Aktif
                        </div>
                      ),
                    },
                    {
                      value: "Pasif",
                      label: (
                        <div className="flex items-center">
                          <CheckCircleOutlined className="text-red-500 mr-2" />
                          Pasif
                        </div>
                      ),
                    },
                  ]}
                  size="large"
                />
              </Form.Item>

              <Form.Item label="Kayıt Zamanı" name="registrationTime">
                <DatePicker
                  showTime={{ format: "HH:mm:ss" }}
                  format="YYYY-MM-DD HH:mm:ss"
                  placeholder="Kayıt zamanı seçiniz"
                  disabled={true}
                  className="w-full"
                  size="large"
                />
              </Form.Item>

              <Form.Item
                label="Kullanıcı Adı"
                name="username"
                rules={[
                  { required: true, message: "Kullanıcı adı gereklidir!" },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="text-gray-400" />}
                  placeholder="Kullanıcı adı"
                  disabled={!isEditing}
                  size="large"
                />
              </Form.Item>

              <Form.Item label="Şifre" name="password">
                <Input.Password
                  prefix={<LockOutlined className="text-gray-400" />}
                  placeholder="Şifre"
                  disabled={!isEditing}
                  size="large"
                />
              </Form.Item>

              <Form.Item label="Avatar" name="avatar">
                <Input
                  placeholder="Avatar URL"
                  disabled={!isEditing}
                  size="large"
                />
              </Form.Item>
            </div>

            {/* sağ taraf */}
            <div className="space-y-4">
              <Form.Item label="Partner ID" name="partnerId">
                <Input
                  prefix={<IdcardOutlined className="text-gray-400" />}
                  placeholder="Partner ID"
                  disabled={true}
                  size="large"
                />
              </Form.Item>

              <Form.Item label="Oturum GUID" name="sessionGuid">
                <Input placeholder="Oturum GUID" disabled={true} size="large" />
              </Form.Item>

              <Form.Item label="Giriş Zamanı" name="loginTime">
                <DatePicker
                  showTime={{ format: "HH:mm:ss" }}
                  format="YYYY-MM-DD HH:mm:ss"
                  placeholder="Giriş zamanı seçiniz"
                  disabled={true}
                  className="w-full"
                  size="large"
                />
              </Form.Item>

              <Form.Item label="Çıkış Zamanı" name="logoutTime">
                <DatePicker
                  showTime={{ format: "HH:mm:ss" }}
                  format="YYYY-MM-DD HH:mm:ss"
                  placeholder="Çıkış zamanı seçiniz"
                  disabled={true}
                  className="w-full"
                  size="large"
                />
              </Form.Item>
            </div>
          </div>
        </Form>
      </Card>
    </div>
  );
};
