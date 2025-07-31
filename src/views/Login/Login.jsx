import { Form, Input, Button, Select } from "antd";
import US from "country-flag-icons/react/3x2/US";
import TR from "country-flag-icons/react/3x2/TR";
import FR from "country-flag-icons/react/3x2/FR";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

export const LoginPage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("TR");
  const navigate = useNavigate();

  useEffect(() => {
    // sayfa ilk açıldığında localden bak yoksa tr seçili olsun
    const stored = localStorage.getItem("selectedLanguage");
    if (stored) {
      setSelectedLanguage(stored);
    } else {
      localStorage.setItem("selectedLanguage", "TR");
    }
  }, []);

  const handleFlagClick = (code) => {
    setSelectedLanguage(code);
    localStorage.setItem("selectedLanguage", code);
  };

  const onSuccess = (values) => {
    console.log("form values:", values);
    // burda validasyon yapılır ve api çağrısı yapılır.
    // kullanıcı adını locale kaydet
    localStorage.setItem("currentUser", values.username);
    navigate("/home");
  };

  const onError = (errorInfo) => {
    console.log("hatalı:", errorInfo);
  };

  const onSchoolChange = (value) => {
    console.log(`seçilen ${value}`);
  };
  const onSchoolSearch = (value) => {
    console.log("arama:", value);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="w-full max-w-sm p-8 pt-16 bg-white rounded-3xl shadow-lg">
        <div className="flex justify-center mb-6">
          <a
            href="https://serceakademi.com/a/tr/anasayfa.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/serce-akademi-logo.png"
              alt="Serce Akademi Logo"
              className="h-24 cursor-pointer transition-transform duration-500 ease-in-out hover:scale-105"
            />
          </a>
        </div>
        <div className="flex justify-center gap-3 mb-6">
          <TR
            title="Türkiye"
            onClick={() => handleFlagClick("TR")}
            className={`w-8 h-6 rounded overflow-hidden shadow transition-opacity duration-200 cursor-pointer ${
              selectedLanguage === "TR"
                ? "opacity-100"
                : "opacity-50 hover:opacity-100"
            }`}
          />
          <US
            title="United States"
            onClick={() => handleFlagClick("US")}
            className={`w-8 h-6 rounded overflow-hidden shadow transition-opacity duration-200 cursor-pointer ${
              selectedLanguage === "US"
                ? "opacity-100"
                : "opacity-50 hover:opacity-100"
            }`}
          />
          <FR
            title="France"
            onClick={() => handleFlagClick("FR")}
            className={`w-8 h-6 rounded overflow-hidden shadow transition-opacity duration-200 cursor-pointer ${
              selectedLanguage === "FR"
                ? "opacity-100"
                : "opacity-50 hover:opacity-100"
            }`}
          />
        </div>
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onSuccess}
          onFinishFailed={onError}
          layout="vertical"
        >
          <Form.Item label="Okul" name="school">
            <Select
              showSearch
              placeholder="Okulunuzu arayınız"
              optionFilterProp="label"
              onChange={onSchoolChange}
              onSearch={onSchoolSearch}
              size="large"
            />
          </Form.Item>
          <Form.Item
            label="Kullanıcı Adı"
            name="username"
            rules={[
              { required: true, message: "Lütfen kullanıcı adınızı giriniz!" },
            ]}
          >
            <Input className="h-10" />
          </Form.Item>

          <Form.Item
            label="Şifre"
            name="password"
            rules={[{ required: true, message: "Lütfen şifrenizi giriniz!" }]}
          >
            <Input.Password className="h-10" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              className="h-10 text-base mt-2 size-large transition-transform duration-200 ease-in-out hover:-translate-y-0.5"
              size="large"
            >
              Giriş Yap
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
