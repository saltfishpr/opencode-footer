import { homedir } from "node:os"
import type { Plugin } from "@opencode/plugin/gui"
import { Home } from "./contract"

export const main: Plugin.MainSetup = (ctx) => {
  ctx.provide(Home, { read: () => homedir() })
}
