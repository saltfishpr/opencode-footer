# OpenCode Footer

OpenCode Desktop 插件，在窗口底部左侧显示当前会话的连接状态、工作区路径和 Git 分支。

```
● Local · ~/repos/opencode-tokenspeed · main
```

## 展示内容

| 位置 | 内容 | 来源 |
| --- | --- | --- |
| 圆点 | 绿色表示 server 已连接，灰色表示未连接 | 当前会话的 server；无会话时用本地 server |
| server name | 当前 server 的显示名称 | `ServerRef.name` |
| pwd | 会话工作区根目录的绝对路径，位于 `$HOME` 下时折叠为 `~` | `MountedSession.directory` |
| 分支 | 当前 Git 分支，前面带分支图标 | server 同步的 VCS 数据 |

- 首页和新建会话页不显示：这些页面在 composer 旁已经展示项目、路径和分支。
- 非 Git 仓库或分支尚未加载时隐藏分支段。
- 路径过长时显示省略号。

## 安装

把插件目录的绝对路径加入全局 `~/.config/opencode/opencode.json`：

```json
{
  "$schema": "https://opencode.ai/config.json",
  "plugins": ["/Users/saltfishpr/repos/opencode-footer"]
}
```

保存后自动加载，无需重启。Settings → Extensions → Plugins 中可以单独停用它的 GUI。

## 构建

```sh
pnpm install
pnpm typecheck
pnpm build   # 生成 dist/gui-experimental.cjs
pnpm dev     # 监听变更并重新构建，Desktop 中的界面随之刷新
```

## 限制

- 需要 OpenCode Desktop 2.3.0 或更高版本；GUI 插件 API 目前仍标记为 experimental。
- 分支来自 server 的同步 VCS 数据，仓库外的 `git switch` 依赖 server 推送 `vcs.branch.updated`；若分支未及时更新，切换一次会话即可触发重新同步。
- 插件只覆盖 GUI，不包含 server 或 TUI 部分。
