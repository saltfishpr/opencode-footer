"use strict";Object.defineProperties(exports,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}});const e=require("solid-js/web"),c=require("@opencode/plugin/gui"),p=require("effect"),s=require("solid-js"),C=require("node:os"),f=c.Ipc.define({id:"opencode-footer.home",methods:{read:{output:p.Schema.String}}}),$=t=>{t.provide(f,{read:()=>C.homedir()})};var v=e.template("<div class=opencode-footer>"),x=e.template("<span class=opencode-footer__dot>"),k=e.template('<span class="opencode-footer__text opencode-footer__name">'),m=e.template("<span class=opencode-footer__separator>·"),T=e.template('<span class="opencode-footer__text opencode-footer__path">'),q=e.template('<span class="opencode-footer__text opencode-footer__branch">'),L=e.template("<div class=opencode-footer-preview><div class=opencode-footer-preview__surface>"),z=e.template("<span class=opencode-footer-preview__empty>");const F=p.Schema.Struct({server:p.Schema.Boolean,path:p.Schema.Boolean,branch:p.Schema.Boolean}),P=`
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
  .opencode-footer-preview {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 12px;
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
`;function B(t,d){return d&&(t===d||t.startsWith(`${d}/`))?`~${t.slice(d.length)}`:t}const D=c.Plugin.define({stores:{display:c.Store.global(F,{server:!0,path:!0,branch:!0})},i18n:{en:{connected:"Connected",disconnected:"Disconnected","settings.title":"Footer","settings.description":"Choose what the window footer shows beside the composer.","settings.section":"Display","settings.server":"Server","settings.server.description":"The connection status dot and the server name.","settings.path":"Workspace path","settings.path.description":"The session's workspace directory, folded to ~ under your home directory.","settings.branch":"Git branch","settings.branch.description":"The current branch of the workspace repository.","settings.preview.empty":"The footer is hidden while every section is off."},zh:{connected:"已连接",disconnected:"未连接","settings.title":"页脚","settings.description":"选择窗口底部在 composer 旁显示的内容。","settings.section":"显示","settings.server":"服务器","settings.server.description":"连接状态圆点和 server 名称。","settings.path":"工作区路径","settings.path.description":"会话的工作区目录，位于用户目录下时折叠为 ~。","settings.branch":"Git 分支","settings.branch.description":"工作区仓库的当前分支。","settings.preview.empty":"所有段落关闭后，窗口底部不显示任何内容。"}},setup(t){const[d,w]=s.createSignal(""),i=t.stores.display;t.main(f).read().then(w,()=>{}),c.createKeyed(()=>{const r=t.sessions.current();return r?{data:r.server.data,directory:r.directory}:void 0},r=>{r.data.location.vcs.sync({directory:r.directory}).catch(()=>{})},{equals:(r,n)=>r.data===n.data&&r.directory===n.directory});const l=()=>t.sessions.current(),h=()=>l()?.server,_=()=>{const r=l();return r?B(r.directory,d()):void 0},b=()=>{const r=l();return r?r.server.data.location.vcs.info({directory:r.directory})?.branch.current:void 0};t.add(c.Style,P),t.add(c.SettingsPage,{id:"opencode-footer",icon:"layout-bottom",get title(){return t.t("settings.title")},get entries(){return[{id:"server",title:t.t("settings.server"),description:t.t("settings.server.description")},{id:"path",title:t.t("settings.path"),description:t.t("settings.path.description")},{id:"branch",title:t.t("settings.branch"),description:t.t("settings.branch.description")}]},render:()=>e.createComponent(S,{})}),t.add(c.Slot,{at:"window.bottom",render:()=>e.createComponent(s.Show,{get when(){return l()},get children(){return e.createComponent(s.Show,{get when(){return i.value.server||i.value.path||i.value.branch},get children(){var r=v();return e.insert(r,e.createComponent(u,{get connected(){return h()?.connected??!1},get name(){return h()?.name??"opencode"},get path(){return _()},get branch(){return b()}})),r}})}})});function u(r){return[e.createComponent(s.Show,{get when(){return i.value.server},get children(){return[(()=>{var n=x();return e.effect(o=>{var a=r.connected?"true":"false",g=t.t(r.connected?"connected":"disconnected");return a!==o.e&&e.setAttribute(n,"data-connected",o.e=a),g!==o.t&&e.setAttribute(n,"aria-label",o.t=g),o},{e:void 0,t:void 0}),n})(),(()=>{var n=k();return e.insert(n,()=>r.name),n})()]}}),e.createComponent(s.Show,{get when(){return i.value.path},get children(){return e.createComponent(s.Show,{get when(){return r.path},children:n=>[e.createComponent(s.Show,{get when(){return i.value.server},get children(){return m()}}),(()=>{var o=T();return e.insert(o,n),o})()]})}}),e.createComponent(s.Show,{get when(){return i.value.branch},get children(){return e.createComponent(s.Show,{get when(){return r.branch},children:n=>[e.createComponent(s.Show,{get when(){return i.value.server||i.value.path},get children(){return m()}}),(()=>{var o=q();return e.insert(o,e.createComponent(t.ui.Icon,{name:"branch",size:"small"}),null),e.insert(o,n,null),o})()]})}})]}function y(){const r=()=>!i.value.server&&!i.value.path&&!i.value.branch;return(()=>{var n=L(),o=n.firstChild;return e.insert(o,e.createComponent(s.Show,{get when(){return!r()},get fallback(){return(()=>{var a=z();return e.insert(a,()=>t.t("settings.preview.empty")),a})()},get children(){var a=v();return e.insert(a,e.createComponent(u,{connected:!0,name:"Local",path:"~/repos/my-app",branch:"main"})),a}})),n})()}function S(){const r=t.ui;return e.createComponent(r.SettingsLayout,{get title(){return t.t("settings.title")},get description(){return t.t("settings.description")},get children(){return e.createComponent(r.SettingsSection,{get title(){return t.t("settings.section")},get footer(){return e.createComponent(y,{})},get children(){return[e.createComponent(r.SettingsRow,{id:"server",get title(){return t.t("settings.server")},get description(){return t.t("settings.server.description")},get children(){return e.createComponent(r.Switch,{get label(){return t.t("settings.server")},hideLabel:!0,get checked(){return i.value.server},onChange:n=>i.update(o=>{o.server=n})})}}),e.createComponent(r.SettingsRow,{id:"path",get title(){return t.t("settings.path")},get description(){return t.t("settings.path.description")},get children(){return e.createComponent(r.Switch,{get label(){return t.t("settings.path")},hideLabel:!0,get checked(){return i.value.path},onChange:n=>i.update(o=>{o.path=n})})}}),e.createComponent(r.SettingsRow,{id:"branch",get title(){return t.t("settings.branch")},get description(){return t.t("settings.branch.description")},get children(){return e.createComponent(r.Switch,{get label(){return t.t("settings.branch")},hideLabel:!0,get checked(){return i.value.branch},onChange:n=>i.update(o=>{o.branch=n})})}})]}})}})}},main:$});exports.default=D;
