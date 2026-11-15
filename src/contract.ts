import { Schema } from "effect"
import { Ipc } from "@opencode/plugin/gui"

/**
 * Values a window cannot read on its own. The desktop app exposes no home directory to windows, and Node
 * built-ins are inert placeholders there, so the main process answers this one.
 */
export const Home = Ipc.define({
  id: "opencode-footer.home",
  methods: {
    read: { output: Schema.String },
  },
})
