import { Home } from "./home";
import { ChapiWindowGet } from "./chapi/window-get";
import { ChapiWindowStore } from "./chapi/window-store";

export const routes = [
  { path: "/", exact: true, component: Home },
  { path: "/chapi/window-get", exact: true, component: ChapiWindowGet },
  { path: "/chapi/window-store", exact: true, component: ChapiWindowStore },
];
