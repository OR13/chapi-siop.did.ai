import { Home } from "./home";

import { Issuer } from "./issuer";
import { Verifier } from "./verifier";

import { WalletFrameGet } from "./wallet/frame/get";
import { WalletFrameStore } from "./wallet/frame/store";

import { WalletProxyGet } from "./wallet/proxy/get";
import { WalletProxyStore } from "./wallet/proxy/store";

export const routes = [
  { path: "/", exact: true, component: Home },
  { path: "/issuer", exact: true, component: Issuer },
  { path: "/verifier", exact: true, component: Verifier },
  { path: "/wallet/frame/get", exact: true, component: WalletFrameGet },
  { path: "/wallet/frame/store", exact: true, component: WalletFrameStore },
  { path: "/wallet/proxy/get", exact: true, component: WalletFrameGet },
  { path: "/wallet/proxy/store", exact: true, component: WalletProxyStore },
];
