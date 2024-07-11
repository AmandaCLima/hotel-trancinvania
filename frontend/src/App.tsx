import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "./app/home/pages/homepage";
import { MeuPerfil } from "./app/home/pages/perfil";
import { Avaliacoes } from "./app/home/pages/avaliacoes";
import LoginClient from "./app/auth/pages/client/login";
import LoginHotelier from "./app/auth/pages/hotelier/login";
import { ListadeDesejos } from "./app/home/pages/lista-de-desejos";

const router = createBrowserRouter([
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "/client/login",
    Component: LoginClient,
  },
  {
    path: "/hotelier/login",
    Component: LoginHotelier,
  },
  {
    path: "/perfil/meu-perfil",
    Component: MeuPerfil,
  },
  {
    path: "/perfil/meu-perfil/avaliacoes",
    Component: Avaliacoes,
  },
  {
    path: "/perfil/meu-perfil/lista-de-desejos",
    Component: ListadeDesejos,
  },
  /*{
    path: "/register/client",
    Component: ClientRegister,
  },*/
  /*{
    path: "/register/hotelier",
    Component: HotelierRegister,
  },*/
]);

export default function App() {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}
