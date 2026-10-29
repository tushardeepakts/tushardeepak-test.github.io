import {
  AuthType,
  CustomActionsPosition,
  CustomActionTarget,
  EmbedEvent,
  init,
  LiveboardEmbed
} from "./tsembed.es.js";
init({
  thoughtSpotHost: "https://172.32.25.188:8443/",
  authType: AuthType.None
});
const vizs = [{
  liveboardId: "eac4a51c-9758-40f4-92dd-a276c5bdf82e"
  // vizId: 'e7d38eb2-6e17-45ee-9804-2356fa17d442'
}];
const SORT_ACTION_ID = "get-underlying-sorted";
const OUTPUT_COLUMNS = ["Revenue", "Quantity"];
const SORT_OPTIONS = [{ columnName: "Quantity", ascending: false }];
const app = document.getElementById("app");
const div = document.createElement("div");
div.classList.add("tile");
app?.appendChild(div);
const liveboardEmbed = new LiveboardEmbed(div, {
  liveboardId: vizs[0].liveboardId,
  // vizId: viz.vizId,
  fullHeight: true,
  showPreviewLoader: true,
  enableV2Shell_experimental: true,
  // Right-click menu item ON A CHART POINT — this is what gives us a
  // selected point to feed getUnderlyingDataForPoint.
  customActions: [{
    id: SORT_ACTION_ID,
    name: "Get underlying (sorted)",
    target: CustomActionTarget.VIZ,
    position: CustomActionsPosition.CONTEXTMENU
  }]
});
liveboardEmbed.on(EmbedEvent.Data, () => {
  console.log("Liveboard rendered");
});
liveboardEmbed.on(EmbedEvent.CustomAction, async (payload) => {
  if (payload.data?.id !== SORT_ACTION_ID) {
    return;
  }
  const answerService = payload.answerService;
  if (!answerService) {
    console.warn("No answerService on payload", payload);
    return;
  }
  const toArrays = (res) => res.data.columnDataLite.map(
    (col) => JSON.parse(col.dataValue)
  );
  const unsorted = await answerService.getUnderlyingDataForPoint(OUTPUT_COLUMNS);
  console.log("original", toArrays(await unsorted.fetchData(0, 100)));
  const sorted = await answerService.getUnderlyingDataForPoint(
    OUTPUT_COLUMNS,
    void 0,
    SORT_OPTIONS
  );
  console.log("sorted", toArrays(await sorted.fetchData(0, 100)));
});
liveboardEmbed.render();
