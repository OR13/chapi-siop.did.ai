import { Home } from "./home";

import { Issuer } from "./issuer";
import { Verifier } from "./verifier";

import { ChapiWindowGet } from "./wallet/frame/get";
import { ChapiWindowStore } from "./wallet/frame/store";

export const routes = [
  { path: "/", exact: true, component: Home },
  { path: "/issuer", exact: true, component: Issuer },
  { path: "/verifier", exact: true, component: Verifier },
  { path: "/wallet/frame/get", exact: true, component: ChapiWindowGet },
  { path: "/wallet/frame/store", exact: true, component: ChapiWindowStore },
];
