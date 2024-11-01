import {
  GitHubBanner,
  Refine,
  type AuthProvider,
  Authenticated,
} from "@refinedev/core";
import {
  useNotificationProvider,
  ThemedLayoutV2,
  ErrorComponent,
  AuthPage,
  RefineThemes,
} from "@refinedev/antd";
import { DataProvider, AuthHelper } from "@refinedev/strapi-v4";
import routerProvider, {
  CatchAllNavigate,
  NavigateToResource,
  UnsavedChangesNotifier,
  DocumentTitleHandler,
} from "@refinedev/react-router-v6";
import axios from "axios";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import "@refinedev/antd/dist/reset.css";
import {
  CategoryList,
  CategoryCreate,
  CategoryEdit,
} from "../src/pages/categories";

import {
  IngredientList,
  IngredientCreate,
  IngredientEdit,
} from "./pages/ingredients";

import { TOKEN_KEY, API_URL } from "./constants";
import { ConfigProvider, App as AntdApp } from "antd";
import {
  ProductCreate, ProductEdit,
  ProductList
} from "./pages/products";
import {ConfigEdit} from "./pages/config/edit";
import './index.css'


const App: React.FC = () => {
  const axiosInstance = axios.create();
  const strapiAuthHelper = AuthHelper(`${API_URL}`);

  const authProvider: AuthProvider = {
    login: async ({ email, password }) => {
      try {
        const { data, status } = await strapiAuthHelper.login(email, password);
        if (status === 200) {
          localStorage.setItem(TOKEN_KEY, data.jwt);

          // set header axios instance
          axiosInstance.defaults.headers.common["Authorization"] =
            `Bearer ${data.jwt}`;

          return {
            success: true,
            redirectTo: "/",
          };
        }
      } catch (error: any) {
        const errorObj = error?.response?.data?.message?.[0]?.messages?.[0];
        return {
          success: false,
          error: {
            message: errorObj?.message || "Login failed",
            name: errorObj?.id || "Invalid email or password",
          },
        };
      }

      return {
        success: false,
        error: {
          message: "Login failed",
          name: "Invalid email or password",
        },
      };
    },
    logout: async () => {
      localStorage.removeItem(TOKEN_KEY);
      return {
        success: true,
        redirectTo: "/login",
      };
    },
    onError: async (error) => {
      if (error.response?.status === 401) {
        return {
          logout: true,
        };
      }

      return { error };
    },
    check: async () => {
      const token = localStorage.getItem(TOKEN_KEY);
      if (token) {
        axiosInstance.defaults.headers.common["Authorization"] =
          `Bearer ${token}`;
        return {
          authenticated: true,
        };
      }

      return {
        authenticated: false,
        error: {
          message: "Authentication failed",
          name: "Token not found",
        },
        logout: true,
        redirectTo: "/login",
      };
    },
    getPermissions: async () => null,
    getIdentity: async () => {
      const token = localStorage.getItem(TOKEN_KEY);
      if (!token) {
        return null;
      }

      const { data, status } = await strapiAuthHelper.me(token);
      if (status === 200) {
        const { id, username, email } = data;
        return {
          id,
          username,
          email,
        };
      }

      return null;
    },
  };

  return (
    <BrowserRouter>
      <ConfigProvider theme={RefineThemes.Blue}>
        <AntdApp>
          <Refine
            authProvider={authProvider}
            dataProvider={DataProvider(`${API_URL}`, axiosInstance)}
            routerProvider={routerProvider}
            resources={[
              {
                name: "categories",
                list: "/categories",
                create: "/categories/create",
                edit: "/categories/edit/:id",
              },
              {
                name: "ingredients",
                list: "/ingredients",
                create: "/ingredients/create",
                edit: "/ingredients/edit/:id",
              },
              {
                name: "products",
                list: "/products",
                create: "/products/create",
                edit: "/products/edit/:id",
              },
              {
                name: "config",
                list: '/config',
              }
            ]}
            notificationProvider={useNotificationProvider}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
            }}
          >
            <Routes>
              <Route
                element={
                  <Authenticated
                    key="authenticated-routes"
                    fallback={<CatchAllNavigate to="/login" />}
                  >
                    <ThemedLayoutV2>
                      <Outlet />
                    </ThemedLayoutV2>
                  </Authenticated>
                }
              >
                <Route
                  index
                  element={<NavigateToResource resource="categories" />}
                />

                <Route path="/categories">
                  <Route index element={<CategoryList />} />
                  <Route path="create" element={<CategoryCreate />} />
                  <Route path="edit/:id" element={<CategoryEdit />} />
                </Route>

                <Route path="/ingredients">
                  <Route index element={<IngredientList/>}/>
                  <Route path="create" element={<IngredientCreate/>}/>
                  <Route path="edit/:id" element={<IngredientEdit/>}/>
                </Route>

                <Route path="/products">
                  <Route index element={<ProductList/>}/>
                  <Route path="create" element={<ProductCreate/>}/>
                  <Route path="edit/:id" element={<ProductEdit/>}/>
                </Route>

                <Route path="/config">
                  <Route index element={<ConfigEdit/>}/>
                </Route>
              </Route>

              <Route
                element={
                  <Authenticated key="auth-pages" fallback={<Outlet />}>
                    <NavigateToResource resource="categories" />
                  </Authenticated>
                }
              >
                <Route
                  path="/login"
                  element={
                    <AuthPage
                      type="login"
                      formProps={{
                        initialValues: {
                          email: "dima2323fr3@gmail.com",
                          password: "201132",
                        },
                      }}
                    />
                  }
                />
              </Route>

              <Route
                element={
                  <Authenticated key="catch-all">
                    <ThemedLayoutV2>
                      <Outlet />
                    </ThemedLayoutV2>
                  </Authenticated>
                }
              >
                <Route path="*" element={<ErrorComponent />} />
              </Route>
            </Routes>
            <UnsavedChangesNotifier />
            <DocumentTitleHandler />
          </Refine>
        </AntdApp>
      </ConfigProvider>
    </BrowserRouter>
  );
};

export default App;
