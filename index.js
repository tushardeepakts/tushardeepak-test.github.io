import {
  AuthType,
  CustomActionsPosition,
  CustomActionTarget,
  EmbedEvent,
  init,
  SearchEmbed
} from "./tsembed.es.js";
init({
  thoughtSpotHost: "http://localhost:5001/",
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
    },
    // SCAL-332719 menuIndex: open the "More" (...) menu and check that
    //   - "Index 1" is the 1st item of the whole menu
    //   - "Index 3" is the 3rd item, counting native actions and "Index 1"
    //   - "Index 3 (tie)" is the 4th item, right after "Index 3"
    //   - "Index 99 (out of range)" and "Index 0 (invalid)" stay with the
    //     custom actions, ahead of "A No Index" and "B No Index"
    //   - none of the positions count the PRIMARY buttons above
    {
      id: "menu-index-3",
      name: "Index 3",
      position: CustomActionsPosition.MENU,
      target: CustomActionTarget.ANSWER,
      menuIndex: 3
    },
    {
      id: "menu-index-1",
      name: "Index 1",
      position: CustomActionsPosition.MENU,
      target: CustomActionTarget.ANSWER,
      menuIndex: 1
    },
    {
      id: "menu-index-3-tie",
      name: "Index 3 (tie)",
      position: CustomActionsPosition.MENU,
      target: CustomActionTarget.ANSWER,
      menuIndex: 3
    },
    {
      id: "menu-index-99",
      name: "Index 99 (out of range)",
      position: CustomActionsPosition.MENU,
      target: CustomActionTarget.ANSWER,
      menuIndex: 99
    },
    {
      id: "menu-index-0",
      name: "Index 0 (invalid)",
      position: CustomActionsPosition.MENU,
      target: CustomActionTarget.ANSWER,
      menuIndex: 0
    },
    {
      id: "menu-no-index-b",
      name: "B No Index",
      position: CustomActionsPosition.MENU,
      target: CustomActionTarget.ANSWER
    },
    {
      id: "menu-no-index-a",
      name: "A No Index",
      position: CustomActionsPosition.MENU,
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
