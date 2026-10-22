import {
  AppEmbed,
  AuthType,
  EmbedEvent,
  init,
  Page
} from "./tsembed.es.js";
init({
  thoughtSpotHost: "https://172.32.90.211:8443/",
  authType: AuthType.None
});
const app = document.getElementById("app");
const div = document.createElement("div");
div.classList.add("tile");
app?.appendChild(div);
const appEmbed = new AppEmbed(div, {
  pageId: Page.Home,
  showPrimaryNavbar: true,
  // SCAL-301123: hide the "Customize homepage" button via the standard
  // hiddenActions mechanism.
  hiddenActions: [],
  disabledActions: []
  // disabledActionReason: 'This action is disabled for this embed',
});
appEmbed.on(EmbedEvent.Load, () => {
  console.log("AppEmbed loaded");
});
appEmbed.render();
