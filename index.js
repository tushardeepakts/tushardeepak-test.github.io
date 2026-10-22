import {
  AuthType,
  CustomActionsPosition,
  CustomActionTarget,
  EmbedEvent,
  init,
  SearchEmbed
} from "./tsembed.es.js";
init({
  thoughtSpotHost: "https://172.32.90.211:8443/",
  authType: AuthType.None
});
const app = document.getElementById("app");
const div = document.createElement("div");
div.classList.add("tile");
app?.appendChild(div);
const searchEmbed = new SearchEmbed(div, {
  // SCAL-324479: up to 2 PRIMARY custom actions per target are allowed.
  // The 3rd PRIMARY action below should be dropped with a console warning.
  customActions: [
    {
      id: "primary-action-1",
      name: "Primary Action 1",
      position: CustomActionsPosition.PRIMARY,
      target: CustomActionTarget.ANSWER
    },
    {
      id: "primary-action-2",
      name: "Primary Action 2",
      position: CustomActionsPosition.PRIMARY,
      target: CustomActionTarget.ANSWER
    },
    {
      id: "primary-action-3",
      name: "Primary Action 3 (should be dropped)",
      position: CustomActionsPosition.PRIMARY,
      target: CustomActionTarget.ANSWER
    }
  ]
});
searchEmbed.on(EmbedEvent.Load, () => {
  console.log("SearchEmbed loaded");
});
searchEmbed.on(EmbedEvent.CustomAction, (payload) => {
  console.log("Custom action clicked:", payload);
});
searchEmbed.render();
