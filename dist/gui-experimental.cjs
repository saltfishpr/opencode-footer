"use strict";Object.defineProperties(exports,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}});const t=require("solid-js/web"),s=require("@opencode/plugin/gui"),i=require("solid-js"),x=require("effect"),g=require("node:os"),f=s.Ipc.define({id:"opencode-footer.home",methods:{read:{output:x.Schema.String}}}),w=o=>{o.provide(f,{read:()=>g.homedir()})};var b=t.template('<div class=opencode-footer><span class=opencode-footer__dot></span><span class="opencode-footer__text opencode-footer__name">'),u=t.template("<span class=opencode-footer__separator>·"),y=t.template('<span class="opencode-footer__text opencode-footer__path">'),S=t.template('<span class="opencode-footer__text opencode-footer__branch">');const $=`
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
`;function q(o,c){return c&&(o===c||o.startsWith(`${c}/`))?`~${o.slice(c.length)}`:o}const C=s.Plugin.define({i18n:{en:{connected:"Connected",disconnected:"Disconnected"},zh:{connected:"已连接",disconnected:"未连接"}},setup(o){const[c,v]=i.createSignal("");o.main(f).read().then(v,()=>{}),s.createKeyed(()=>{const e=o.sessions.current();return e?{data:e.server.data,directory:e.directory}:void 0},e=>{e.data.location.vcs.sync({directory:e.directory}).catch(()=>{})},{equals:(e,a)=>e.data===a.data&&e.directory===a.directory});const d=()=>o.sessions.current(),l=()=>d()?.server,_=()=>{const e=d();return e?q(e.directory,c()):void 0},h=()=>{const e=d();return e?e.server.data.location.vcs.info({directory:e.directory})?.branch.current:void 0};o.add(s.Style,$),o.add(s.Slot,{at:"window.bottom",render:()=>t.createComponent(i.Show,{get when(){return d()},get children(){var e=b(),a=e.firstChild,m=a.nextSibling;return t.insert(m,()=>l()?.name??"opencode"),t.insert(e,t.createComponent(i.Show,{get when(){return _()},children:n=>[u(),(()=>{var r=y();return t.insert(r,n),r})()]}),null),t.insert(e,t.createComponent(i.Show,{get when(){return h()},children:n=>[u(),(()=>{var r=S();return t.insert(r,t.createComponent(o.ui.Icon,{name:"branch",size:"small"}),null),t.insert(r,n,null),r})()]}),null),t.effect(n=>{var r=l()?.connected?"true":"false",p=o.t(l()?.connected?"connected":"disconnected");return r!==n.e&&t.setAttribute(a,"data-connected",n.e=r),p!==n.t&&t.setAttribute(a,"aria-label",n.t=p),n},{e:void 0,t:void 0}),e}})})},main:w});exports.default=C;
