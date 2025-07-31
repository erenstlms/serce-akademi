import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  DownOutlined,
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
  BookOutlined,
  TeamOutlined,
  AppstoreOutlined,
  ShopOutlined,
  UserAddOutlined,
  CalendarOutlined,
  BankOutlined,
  BookOutlined as BookIcon,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { ProfilePage } from "../../components/ProfilePage/ProfilePage";

export const HomePage = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();

  // menü datası
  const menuItems = [
    {
      key: "temel",
      icon: <SettingOutlined />,
      label: <span className="font-bold text-base text-gray-800">Temel</span>,
      children: [
        {
          key: "tanimlar",
          icon: <BookOutlined />,
          label: (
            <span className="font-semibold text-sm text-gray-700">
              Tanımlar
            </span>
          ),
          children: [
            {
              key: "kullanicilar",
              icon: <TeamOutlined />,
              label: (
                <span className="font-normal text-xs text-gray-600">
                  Kullanıcılar
                </span>
              ),
            },
          ],
        },
      ],
    },
    {
      key: "egitim-yonetimi",
      icon: <AppstoreOutlined />,
      label: (
        <span className="font-bold text-base text-gray-800">
          Eğitim Yönetimi
        </span>
      ),
      children: [
        {
          key: "islemler",
          icon: <ShopOutlined />,
          label: (
            <span className="font-semibold text-sm text-gray-700">
              İşlemler
            </span>
          ),
          children: [
            {
              key: "sube",
              icon: <BankOutlined />,
              label: (
                <span className="font-normal text-xs text-gray-600">Şube</span>
              ),
            },
            {
              key: "ogrenci",
              icon: <UserAddOutlined />,
              label: (
                <span className="font-normal text-xs text-gray-600">
                  Öğrenci
                </span>
              ),
            },
          ],
        },
        {
          key: "genel",
          icon: <CalendarOutlined />,
          label: (
            <span className="font-semibold text-sm text-gray-700">Genel</span>
          ),
          children: [
            {
              key: "yillik-planlar",
              icon: <CalendarOutlined />,
              label: (
                <span className="font-normal text-xs text-gray-600">
                  Yıllık Planlar
                </span>
              ),
            },
            {
              key: "subeler",
              icon: <BankOutlined />,
              label: (
                <span className="font-normal text-xs text-gray-600">
                  Şubeler
                </span>
              ),
            },
          ],
        },
        {
          key: "ogretmen",
          icon: <TeamOutlined />,
          label: (
            <span className="font-semibold text-sm text-gray-700">
              Öğretmen
            </span>
          ),
          children: [
            {
              key: "dersler",
              icon: <BookIcon />,
              label: (
                <span className="font-normal text-xs text-gray-600">
                  Dersler
                </span>
              ),
            },
            {
              key: "yardim",
              icon: <QuestionCircleOutlined />,
              label: (
                <span className="font-normal text-xs text-gray-600">
                  Yardım (S.S.S)
                </span>
              ),
            },
          ],
        },
      ],
    },
  ];

  useEffect(() => {
    // localden kullanıcı adını al
    const user = localStorage.getItem("currentUser");
    if (user) {
      setCurrentUser(user);
    } else {
      // kullanıcı giriş yapmamışsa login sayfasına yönlendir
      navigate("/login");
    }
  }, [navigate]);

  // dropdown menü dışına tıklandığında kapat
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showUserMenu && !event.target.closest(".user-menu-container")) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showUserMenu]);

  const handleMenuItemClick = ({ key }) => {
    setSelectedMenuItem(key);
  };

  const handleUserMenuToggle = () => {
    setShowUserMenu(!showUserMenu);
  };

  const handleProfileClick = () => {
    setSelectedMenuItem("Profilim");
    setShowUserMenu(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  // kullanıcı giriş yapmamışsa loading göster
  if (!currentUser) {
    return (
      <div className="flex h-screen items-center justify-center">
        Yükleniyor...
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* sol taraf */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-4 border-b border-gray-200">
          <div className="flex justify-center">
            <img
              src="/serce-akademi-logo.png"
              alt="Serce Akademi Logo"
              className="h-12 cursor-pointer transition-transform duration-500 ease-in-out hover:scale-105"
            />
          </div>
        </div>
        <nav className="mt-4">
          <Menu
            mode="inline"
            items={menuItems}
            onClick={handleMenuItemClick}
            className="border-0"
            style={{ backgroundColor: "transparent" }}
          />
        </nav>
      </div>

      {/* içerik alanı */}
      <div className="flex-1 flex flex-col">
        {/* header */}
        <header className="bg-white shadow-sm border-b border-gray-200 h-20 flex items-center px-4">
          <div className="flex items-center justify-between w-full">
            <h1 className="text-xl font-semibold text-gray-800">Header</h1>
            <div className="flex items-center space-x-4">
              {/* kullanıcı avatar ve menü */}
              <div className="relative user-menu-container">
                <div
                  className="flex items-center space-x-3 cursor-pointer p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  onClick={handleUserMenuToggle}
                >
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {currentUser.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-gray-700 font-medium">
                    {currentUser}
                  </span>
                  <DownOutlined
                    className={`text-gray-500 transition-transform text-base ${
                      showUserMenu ? "rotate-180" : ""
                    }`}
                  />
                </div>

                {/* dropdown menü */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                    <button
                      onClick={handleProfileClick}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors items-center cursor-pointer"
                    >
                      <UserOutlined className="mr-2 text-sm" />
                      Profilim
                    </button>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors items-center cursor-pointer"
                    >
                      <LogoutOutlined className="mr-2 text-sm" />
                      Oturumu Kapat
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* alt içerik kısmı */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="bg-white rounded-lg shadow-sm p-6 min-h-full">
            {/* seçilen menü öğesine göre içerik buraya gelecek */}
            {selectedMenuItem === "Profilim" ? (
              <ProfilePage />
            ) : selectedMenuItem === "kullanicilar" ? (
              <div>
                <h2 className="text-lg font-medium text-gray-800 mb-4">
                  Kullanıcılar
                </h2>
                <p className="text-gray-600">
                  Kullanıcı yönetimi sayfası içeriği burada gösterilecek.
                </p>
              </div>
            ) : selectedMenuItem === "sube" ? (
              <div>
                <h2 className="text-lg font-medium text-gray-800 mb-4">
                  Şube İşlemleri
                </h2>
                <p className="text-gray-600">
                  Şube yönetimi işlemleri burada gösterilecek.
                </p>
              </div>
            ) : selectedMenuItem === "ogrenci" ? (
              <div>
                <h2 className="text-lg font-medium text-gray-800 mb-4">
                  Öğrenci İşlemleri
                </h2>
                <p className="text-gray-600">
                  Öğrenci yönetimi işlemleri burada gösterilecek.
                </p>
              </div>
            ) : selectedMenuItem === "yillik-planlar" ? (
              <div>
                <h2 className="text-lg font-medium text-gray-800 mb-4">
                  Yıllık Planlar
                </h2>
                <p className="text-gray-600">
                  Yıllık eğitim planları burada gösterilecek.
                </p>
              </div>
            ) : selectedMenuItem === "subeler" ? (
              <div>
                <h2 className="text-lg font-medium text-gray-800 mb-4">
                  Şubeler
                </h2>
                <p className="text-gray-600">
                  Şube listesi ve yönetimi burada gösterilecek.
                </p>
              </div>
            ) : selectedMenuItem === "dersler" ? (
              <div>
                <h2 className="text-lg font-medium text-gray-800 mb-4">
                  Dersler
                </h2>
                <p className="text-gray-600">
                  Ders yönetimi ve planlaması burada gösterilecek.
                </p>
              </div>
            ) : selectedMenuItem === "yardim" ? (
              <div>
                <h2 className="text-lg font-medium text-gray-800 mb-4">
                  Yardım (S.S.S)
                </h2>
                <p className="text-gray-600">
                  Sık sorulan sorular ve yardım içerikleri burada gösterilecek.
                </p>
              </div>
            ) : selectedMenuItem ? (
              <div>
                <h2 className="text-lg font-medium text-gray-800 mb-4">
                  {selectedMenuItem}
                </h2>
                <p className="text-gray-600">
                  Bu alan seçilen menü öğesine göre içerik gösterecek.
                </p>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-12">
                <p>Lütfen sol menüden bir seçenek seçiniz.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};
