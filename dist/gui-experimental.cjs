"use strict";Object.defineProperties(exports,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}});const e=require("solid-js/web"),c=require("@opencode/plugin/gui"),d=require("effect"),s=require("solid-js"),$=require("node:os"),b=c.Ipc.define({id:"opencode-footer.home",methods:{read:{output:d.Schema.String}}}),x=t=>{t.provide(b,{read:()=>$.homedir()})};var f=e.template("<div class=opencode-footer>"),k=e.template("<span class=opencode-footer__dot>"),T=e.template('<span class="opencode-footer__text opencode-footer__name">'),m=e.template("<span class=opencode-footer__separator>·"),q=e.template('<span class="opencode-footer__text opencode-footer__path">'),F=e.template('<span class="opencode-footer__text opencode-footer__branch">'),H=e.template("<div class=opencode-footer-preview><h3 class=opencode-footer-preview__title></h3><div class=opencode-footer-preview__surface>"),L=e.template("<span class=opencode-footer-preview__empty>");const N=d.Schema.Struct({server:d.Schema.Boolean,path:d.Schema.Boolean,branch:d.Schema.Boolean,fontSize:d.Schema.Number,height:d.Schema.Number}),P=[10,11,12,13],R=[24,28,32,36],I=`
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
`;function B(t,p){return p&&(t===p||t.startsWith(`${p}/`))?`~${t.slice(p.length)}`:t}const D=c.Plugin.define({stores:{display:c.Store.global(N,{server:!0,path:!0,branch:!0,fontSize:11,height:24})},i18n:{en:{connected:"Connected",disconnected:"Disconnected","settings.title":"Footer","settings.description":"Choose what the window footer shows beside the composer.","settings.section":"Display","settings.server":"Server","settings.server.description":"The connection status dot and the server name.","settings.path":"Workspace path","settings.path.description":"The session's workspace directory, folded to ~ under your home directory.","settings.branch":"Git branch","settings.branch.description":"The current branch of the workspace repository.","settings.preview":"Preview","settings.preview.empty":"The footer is hidden while every section is off.","settings.size":"Size","settings.fontSize":"Font size","settings.fontSize.description":"Text size of the footer.","settings.height":"Height","settings.height.description":"Height of the footer bar."},zh:{connected:"已连接",disconnected:"未连接","settings.title":"页脚","settings.description":"选择窗口底部在 composer 旁显示的内容。","settings.section":"显示","settings.server":"服务器","settings.server.description":"连接状态圆点和 server 名称。","settings.path":"工作区路径","settings.path.description":"会话的工作区目录，位于用户目录下时折叠为 ~。","settings.branch":"Git 分支","settings.branch.description":"工作区仓库的当前分支。","settings.preview":"预览","settings.preview.empty":"所有段落关闭后，窗口底部不显示任何内容。","settings.size":"尺寸","settings.fontSize":"字体大小","settings.fontSize.description":"页脚文字的字号。","settings.height":"高度","settings.height.description":"页脚栏的高度。"}},setup(t){const[p,w]=s.createSignal(""),o=t.stores.display;t.main(b).read().then(w,()=>{}),c.createKeyed(()=>{const n=t.sessions.current();return n?{data:n.server.data,directory:n.directory}:void 0},n=>{n.data.location.vcs.sync({directory:n.directory}).catch(()=>{})},{equals:(n,r)=>n.data===r.data&&n.directory===r.directory});const l=()=>t.sessions.current(),h=()=>l()?.server,S=()=>{const n=l();return n?B(n.directory,p()):void 0},_=()=>{const n=l();return n?n.server.data.location.vcs.info({directory:n.directory})?.branch.current:void 0},u=()=>({height:`${o.value.height}px`,"font-size":`${o.value.fontSize}px`});t.add(c.Style,I),t.add(c.SettingsPage,{id:"opencode-footer",icon:"layout-bottom",get title(){return t.t("settings.title")},get entries(){return[{id:"server",title:t.t("settings.server"),description:t.t("settings.server.description")},{id:"path",title:t.t("settings.path"),description:t.t("settings.path.description")},{id:"branch",title:t.t("settings.branch"),description:t.t("settings.branch.description")},{id:"font-size",title:t.t("settings.fontSize"),description:t.t("settings.fontSize.description")},{id:"height",title:t.t("settings.height"),description:t.t("settings.height.description")}]},render:()=>e.createComponent(C,{})}),t.add(c.Slot,{at:"window.bottom",render:()=>e.createComponent(s.Show,{get when(){return l()},get children(){return e.createComponent(s.Show,{get when(){return o.value.server||o.value.path||o.value.branch},get children(){var n=f();return e.insert(n,e.createComponent(v,{get connected(){return h()?.connected??!1},get name(){return h()?.name??"opencode"},get path(){return S()},get branch(){return _()}})),e.effect(r=>e.style(n,u(),r)),n}})}})});function v(n){return[e.createComponent(s.Show,{get when(){return o.value.server},get children(){return[(()=>{var r=k();return e.effect(i=>{var g=n.connected?"true":"false",a=t.t(n.connected?"connected":"disconnected");return g!==i.e&&e.setAttribute(r,"data-connected",i.e=g),a!==i.t&&e.setAttribute(r,"aria-label",i.t=a),i},{e:void 0,t:void 0}),r})(),(()=>{var r=T();return e.insert(r,()=>n.name),r})()]}}),e.createComponent(s.Show,{get when(){return o.value.path},get children(){return e.createComponent(s.Show,{get when(){return n.path},children:r=>[e.createComponent(s.Show,{get when(){return o.value.server},get children(){return m()}}),(()=>{var i=q();return e.insert(i,r),i})()]})}}),e.createComponent(s.Show,{get when(){return o.value.branch},get children(){return e.createComponent(s.Show,{get when(){return n.branch},children:r=>[e.createComponent(s.Show,{get when(){return o.value.server||o.value.path},get children(){return m()}}),(()=>{var i=F();return e.insert(i,e.createComponent(t.ui.Icon,{name:"branch",size:"small"}),null),e.insert(i,r,null),i})()]})}})]}function y(){const n=()=>!o.value.server&&!o.value.path&&!o.value.branch;return(()=>{var r=H(),i=r.firstChild,g=i.nextSibling;return e.insert(i,()=>t.t("settings.preview")),e.insert(g,e.createComponent(s.Show,{get when(){return!n()},get fallback(){return(()=>{var a=L();return e.insert(a,()=>t.t("settings.preview.empty")),a})()},get children(){var a=f();return e.insert(a,e.createComponent(v,{connected:!0,name:"Local",path:"~/repos/my-app",branch:"main"})),e.effect(z=>e.style(a,u(),z)),a}})),r})()}function C(){const n=t.ui;return e.createComponent(n.SettingsLayout,{get title(){return t.t("settings.title")},get description(){return t.t("settings.description")},get children(){return[e.createComponent(y,{}),e.createComponent(n.SettingsSection,{get title(){return t.t("settings.section")},get children(){return[e.createComponent(n.SettingsRow,{id:"server",get title(){return t.t("settings.server")},get description(){return t.t("settings.server.description")},get children(){return e.createComponent(n.Switch,{get label(){return t.t("settings.server")},hideLabel:!0,get checked(){return o.value.server},onChange:r=>o.update(i=>{i.server=r})})}}),e.createComponent(n.SettingsRow,{id:"path",get title(){return t.t("settings.path")},get description(){return t.t("settings.path.description")},get children(){return e.createComponent(n.Switch,{get label(){return t.t("settings.path")},hideLabel:!0,get checked(){return o.value.path},onChange:r=>o.update(i=>{i.path=r})})}}),e.createComponent(n.SettingsRow,{id:"branch",get title(){return t.t("settings.branch")},get description(){return t.t("settings.branch.description")},get children(){return e.createComponent(n.Switch,{get label(){return t.t("settings.branch")},hideLabel:!0,get checked(){return o.value.branch},onChange:r=>o.update(i=>{i.branch=r})})}})]}}),e.createComponent(n.SettingsSection,{get title(){return t.t("settings.size")},get children(){return[e.createComponent(n.SettingsRow,{id:"font-size",get title(){return t.t("settings.fontSize")},get description(){return t.t("settings.fontSize.description")},get children(){return e.createComponent(n.Select,{get label(){return t.t("settings.fontSize")},get options(){return P.map(r=>({value:String(r),label:`${r} px`}))},get value(){return String(o.value.fontSize)},get placeholder(){return`${o.value.fontSize} px`},onChange:r=>o.update(i=>{i.fontSize=Number(r)})})}}),e.createComponent(n.SettingsRow,{id:"height",get title(){return t.t("settings.height")},get description(){return t.t("settings.height.description")},get children(){return e.createComponent(n.Select,{get label(){return t.t("settings.height")},get options(){return R.map(r=>({value:String(r),label:`${r} px`}))},get value(){return String(o.value.height)},get placeholder(){return`${o.value.height} px`},onChange:r=>o.update(i=>{i.height=Number(r)})})}})]}})]}})}},main:x});exports.default=D;
