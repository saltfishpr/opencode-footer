import { createKeyed, Plugin, Slot, Style } from "@opencode/plugin/gui"
import { createSignal, Show } from "solid-js"
import { Home } from "./contract"
import { main } from "./main"

const STYLE = `
  .opencode-footer {
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
    /*
     * The composer dock above ends with a 12px inset, but the window edge reads as extra space below the
     * text, so a slightly smaller bottom inset keeps the text visually centered.
     */
    padding: 0 12px 8px;
    font-size: 11px;
    line-height: 16px;
    color: var(--v2-text-text-faint);
  }
  .opencode-footer__dot {
    flex: none;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--v2-text-text-faint);
  }
  .opencode-footer__dot[data-connected="true"] {
    background: var(--v2-state-fg-success);
  }
  .opencode-footer__text {
    min-width: 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .opencode-footer__name {
    color: var(--v2-text-text-muted);
  }
  .opencode-footer__path {
    max-width: 36vw;
  }
  .opencode-footer__branch {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    color: var(--v2-text-text-weak);
  }
  .opencode-footer__separator {
    flex: none;
    color: var(--v2-text-text-faint);
    opacity: 0.6;
  }
`

function abbreviate(path: string, home: string) {
  return home && (path === home || path.startsWith(`${home}/`)) ? `~${path.slice(home.length)}` : path
}

export default Plugin.define({
  i18n: {
    en: { connected: "Connected", disconnected: "Disconnected" },
    zh: { connected: "已连接", disconnected: "未连接" },
  },
  setup(ctx) {
    const [home, setHome] = createSignal("")

    void ctx.main(Home).read().then(setHome, () => {})

    // The app syncs the routed location's VCS data on its own; this covers a session whose location has not
    // loaded yet, and a window that mounts after the app has already switched branches.
    createKeyed(
      () => {
        const session = ctx.sessions.current()
        return session ? { data: session.server.data, directory: session.directory } : undefined
      },
      (key) => void key.data.location.vcs.sync({ directory: key.directory }).catch(() => {}),
      { equals: (previous, next) => previous.data === next.data && previous.directory === next.directory },
    )

    const session = () => ctx.sessions.current()
    const server = () => session()?.server
    const directory = () => {
      const current = session()
      return current ? abbreviate(current.directory, home()) : undefined
    }
    const branch = () => {
      const current = session()
      return current
        ? current.server.data.location.vcs.info({ directory: current.directory })?.branch.current
        : undefined
    }

    ctx.add(Style, STYLE)
    ctx.add(Slot, {
      at: "window.bottom",
      // Home and a new session already show the project, branch, and directory beside the composer.
      render: () => (
        <Show when={session()}>
          <div class="opencode-footer">
            <span
              class="opencode-footer__dot"
              data-connected={server()?.connected ? "true" : "false"}
              aria-label={ctx.t(server()?.connected ? "connected" : "disconnected")}
            />
            <span class="opencode-footer__text opencode-footer__name">{server()?.name ?? "opencode"}</span>
            <Show when={directory()}>
              {(path) => (
                <>
                  <span class="opencode-footer__separator">·</span>
                  <span class="opencode-footer__text opencode-footer__path">{path()}</span>
                </>
              )}
            </Show>
            <Show when={branch()}>
              {(name) => (
                <>
                  <span class="opencode-footer__separator">·</span>
                  <span class="opencode-footer__text opencode-footer__branch">
                    <ctx.ui.Icon name="branch" size="small" />
                    {name()}
                  </span>
                </>
              )}
            </Show>
          </div>
        </Show>
      ),
    })
  },
  main,
})
