import { createKeyed, Plugin, SettingsPage, Slot, Store, Style } from "@opencode/plugin/gui"
import { Schema } from "effect"
import { createSignal, Show } from "solid-js"
import { Home } from "./contract"
import { main } from "./main"

const Display = Schema.Struct({
  server: Schema.Boolean,
  path: Schema.Boolean,
  branch: Schema.Boolean,
  fontSize: Schema.Number,
  height: Schema.Number,
})

const FONT_SIZES = [10, 11, 12, 13]
const HEIGHTS = [24, 28, 32, 36]

const STYLE = `
  .opencode-footer {
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
    box-sizing: border-box;
    /*
     * The composer dock above ends with a 12px inset against the window edge. Keeping the bottom inset
     * 8px larger than the top gap makes the text read as visually centered.
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
  .opencode-footer-preview {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .opencode-footer-preview__title {
    margin: 0;
    padding: 0;
    font-size: 13px;
    font-weight: 530;
    line-height: var(--line-height-compact);
    color: var(--v2-text-text-base);
  }
  .opencode-footer-preview__surface {
    padding: 8px 12px;
    border: 1px solid color-mix(in oklab, currentColor 12%, transparent);
    border-radius: 8px;
  }
  .opencode-footer-preview__surface .opencode-footer {
    padding: 0;
  }
  .opencode-footer-preview__empty {
    font-size: 11px;
    line-height: 16px;
    color: var(--v2-text-text-faint);
  }
`

function abbreviate(path: string, home: string) {
  return home && (path === home || path.startsWith(`${home}/`)) ? `~${path.slice(home.length)}` : path
}

export default Plugin.define({
  stores: {
    display: Store.global(Display, { server: true, path: true, branch: true, fontSize: 11, height: 24 }),
  },
  i18n: {
    en: {
      connected: "Connected",
      disconnected: "Disconnected",
      "settings.title": "Footer",
      "settings.description": "Choose what the window footer shows beside the composer.",
      "settings.section": "Display",
      "settings.server": "Server",
      "settings.server.description": "The connection status dot and the server name.",
      "settings.path": "Workspace path",
      "settings.path.description": "The session's workspace directory, folded to ~ under your home directory.",
      "settings.branch": "Git branch",
      "settings.branch.description": "The current branch of the workspace repository.",
      "settings.preview": "Preview",
      "settings.preview.empty": "The footer is hidden while every section is off.",
      "settings.size": "Size",
      "settings.fontSize": "Font size",
      "settings.fontSize.description": "Text size of the footer.",
      "settings.height": "Height",
      "settings.height.description": "Height of the footer bar.",
    },
    zh: {
      connected: "已连接",
      disconnected: "未连接",
      "settings.title": "页脚",
      "settings.description": "选择窗口底部在 composer 旁显示的内容。",
      "settings.section": "显示",
      "settings.server": "服务器",
      "settings.server.description": "连接状态圆点和 server 名称。",
      "settings.path": "工作区路径",
      "settings.path.description": "会话的工作区目录，位于用户目录下时折叠为 ~。",
      "settings.branch": "Git 分支",
      "settings.branch.description": "工作区仓库的当前分支。",
      "settings.preview": "预览",
      "settings.preview.empty": "所有段落关闭后，窗口底部不显示任何内容。",
      "settings.size": "尺寸",
      "settings.fontSize": "字体大小",
      "settings.fontSize.description": "页脚文字的字号。",
      "settings.height": "高度",
      "settings.height.description": "页脚栏的高度。",
    },
  },
  setup(ctx) {
    const [home, setHome] = createSignal("")
    const display = ctx.stores.display

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
    const footerStyle = () => ({
      height: `${display.value.height}px`,
      "font-size": `${display.value.fontSize}px`,
    })

    ctx.add(Style, STYLE)
    ctx.add(SettingsPage, {
      id: "opencode-footer",
      icon: "layout-bottom",
      get title() {
        return ctx.t("settings.title")
      },
      get entries() {
        return [
          { id: "server", title: ctx.t("settings.server"), description: ctx.t("settings.server.description") },
          { id: "path", title: ctx.t("settings.path"), description: ctx.t("settings.path.description") },
          { id: "branch", title: ctx.t("settings.branch"), description: ctx.t("settings.branch.description") },
          { id: "font-size", title: ctx.t("settings.fontSize"), description: ctx.t("settings.fontSize.description") },
          { id: "height", title: ctx.t("settings.height"), description: ctx.t("settings.height.description") },
        ]
      },
      render: () => <FooterSettings />,
    })
    ctx.add(Slot, {
      at: "window.bottom",
      // Home and a new session already show the project, branch, and directory beside the composer.
      render: () => (
        <Show when={session()}>
          <Show when={display.value.server || display.value.path || display.value.branch}>
            <div class="opencode-footer" style={footerStyle()}>
              <FooterContent
                connected={server()?.connected ?? false}
                name={server()?.name ?? "opencode"}
                path={directory()}
                branch={branch()}
              />
            </div>
          </Show>
        </Show>
      ),
    })

    function FooterContent(props: {
      connected: boolean
      name: string
      path: string | undefined
      branch: string | undefined
    }) {
      return (
        <>
          <Show when={display.value.server}>
            <span
              class="opencode-footer__dot"
              data-connected={props.connected ? "true" : "false"}
              aria-label={ctx.t(props.connected ? "connected" : "disconnected")}
            />
            <span class="opencode-footer__text opencode-footer__name">{props.name}</span>
          </Show>
          <Show when={display.value.path}>
            <Show when={props.path}>
              {(path) => (
                <>
                  <Show when={display.value.server}>
                    <span class="opencode-footer__separator">·</span>
                  </Show>
                  <span class="opencode-footer__text opencode-footer__path">{path()}</span>
                </>
              )}
            </Show>
          </Show>
          <Show when={display.value.branch}>
            <Show when={props.branch}>
              {(name) => (
                <>
                  <Show when={display.value.server || display.value.path}>
                    <span class="opencode-footer__separator">·</span>
                  </Show>
                  <span class="opencode-footer__text opencode-footer__branch">
                    <ctx.ui.Icon name="branch" size="small" />
                    {name()}
                  </span>
                </>
              )}
            </Show>
          </Show>
        </>
      )
    }

    function FooterPreview() {
      const empty = () => !display.value.server && !display.value.path && !display.value.branch

      return (
        <div class="opencode-footer-preview">
          <h3 class="opencode-footer-preview__title">{ctx.t("settings.preview")}</h3>
          <div class="opencode-footer-preview__surface">
            <Show
              when={!empty()}
              fallback={<span class="opencode-footer-preview__empty">{ctx.t("settings.preview.empty")}</span>}
            >
              <div class="opencode-footer" style={footerStyle()}>
                <FooterContent connected name="Local" path="~/repos/my-app" branch="main" />
              </div>
            </Show>
          </div>
        </div>
      )
    }

    function FooterSettings() {
      const ui = ctx.ui
      return (
        <ui.SettingsLayout title={ctx.t("settings.title")} description={ctx.t("settings.description")}>
          <FooterPreview />
          <ui.SettingsSection title={ctx.t("settings.section")}>
            <ui.SettingsRow
              id="server"
              title={ctx.t("settings.server")}
              description={ctx.t("settings.server.description")}
            >
              <ui.Switch
                label={ctx.t("settings.server")}
                hideLabel
                checked={display.value.server}
                onChange={(checked) =>
                  display.update((draft) => {
                    draft.server = checked
                  })
                }
              />
            </ui.SettingsRow>
            <ui.SettingsRow id="path" title={ctx.t("settings.path")} description={ctx.t("settings.path.description")}>
              <ui.Switch
                label={ctx.t("settings.path")}
                hideLabel
                checked={display.value.path}
                onChange={(checked) =>
                  display.update((draft) => {
                    draft.path = checked
                  })
                }
              />
            </ui.SettingsRow>
            <ui.SettingsRow
              id="branch"
              title={ctx.t("settings.branch")}
              description={ctx.t("settings.branch.description")}
            >
              <ui.Switch
                label={ctx.t("settings.branch")}
                hideLabel
                checked={display.value.branch}
                onChange={(checked) =>
                  display.update((draft) => {
                    draft.branch = checked
                  })
                }
              />
            </ui.SettingsRow>
          </ui.SettingsSection>
          <ui.SettingsSection title={ctx.t("settings.size")}>
            <ui.SettingsRow
              id="font-size"
              title={ctx.t("settings.fontSize")}
              description={ctx.t("settings.fontSize.description")}
            >
              <ui.Select
                label={ctx.t("settings.fontSize")}
                options={FONT_SIZES.map((size) => ({ value: String(size), label: `${size} px` }))}
                value={String(display.value.fontSize)}
                placeholder={`${display.value.fontSize} px`}
                onChange={(value) =>
                  display.update((draft) => {
                    draft.fontSize = Number(value)
                  })
                }
              />
            </ui.SettingsRow>
            <ui.SettingsRow id="height" title={ctx.t("settings.height")} description={ctx.t("settings.height.description")}>
              <ui.Select
                label={ctx.t("settings.height")}
                options={HEIGHTS.map((height) => ({ value: String(height), label: `${height} px` }))}
                value={String(display.value.height)}
                placeholder={`${display.value.height} px`}
                onChange={(value) =>
                  display.update((draft) => {
                    draft.height = Number(value)
                  })
                }
              />
            </ui.SettingsRow>
          </ui.SettingsSection>
        </ui.SettingsLayout>
      )
    }
  },
  main,
})
