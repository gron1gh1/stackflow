import {
  createGlobalTheme,
  createGlobalThemeContract,
  createTheme,
} from "@vanilla-extract/css";
import type { MapLeafNodes } from "@vanilla-extract/private";

export const globalVars = createGlobalThemeContract(
  {
    backgroundColor: "background-color",
    dimBackgroundColor: "dim-background-color",
    appBar: {
      borderColor: "app-bar-border-color",
      borderSize: "app-bar-border-size",
      height: "app-bar-height",
      iconColor: "app-bar-icon-color",
      textColor: "app-bar-text-color",
    },
    bottomSheet: {
      borderRadius: "bottom-sheet-border-radius",
    },
    modal: {
      borderRadius: "bottom-sheet-border-radius",
    },
  },
  (value) => `stackflow-basic-ui-${value}`,
);

type InferVars<T> = T extends MapLeafNodes<infer U, any> ? U : never;
export type GlobalVars = InferVars<typeof globalVars>;

const defaultVars = {
  backgroundColor: "#fff",
  dimBackgroundColor: "rgba(0, 0, 0, 0.15)",
  appBar: {
    borderColor: "rgba(0, 0, 0, 0.07)",
    borderSize: "1px",
    height: "3.5rem",
    iconColor: "#212124",
    textColor: "#212124",
  },
  bottomSheet: {
    borderRadius: "1rem",
  },
  modal: {
    borderRadius: "1rem",
  },
};

const cupertinoVars = {
  ...defaultVars,
  appBar: {
    ...defaultVars.appBar,
    height: "2.75rem",
    borderSize: "0.5px",
  },
};

const root = ":root";
export const rootAndroid = ":root[data-stackflow-basic-ui-theme=android]";
export const rootCupertino = ":root[data-stackflow-basic-ui-theme=cupertino]";

createGlobalTheme(`${root}, ${rootAndroid}`, globalVars, {
  ...defaultVars,
});
createGlobalTheme(rootCupertino, globalVars, {
  ...cupertinoVars,
});

export const android = createTheme(globalVars, {
  ...defaultVars,
});
export const cupertino = createTheme(globalVars, {
  ...cupertinoVars,
});
