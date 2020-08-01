import { Home } from "./home";
import { ChapiWindowGet } from "./chapi/window-get";
import { ChapiWindowStore } from "./chapi/window-store";
import { Issuer } from "./issuer";
import { Verifier } from "./verifier";

export const routes = [
  { path: "/", exact: true, component: Home },
  { path: "/issuer", exact: true, component: Issuer },
  { path: "/verifier", exact: true, component: Verifier },
  { path: "/chapi/window-get", exact: true, component: ChapiWindowGet },
  { path: "/chapi/window-store", exact: true, component: ChapiWindowStore },
];
