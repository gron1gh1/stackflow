/* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */

import { useActions, useActivity } from "@stackflow/react";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import React, { useRef } from "react";

import { useLazy, useStyleEffect } from "../hooks";
import type { GlobalVars } from "../theme.css";
import { globalVars } from "../theme.css";
import { compactMap } from "../utils";
import * as css from "./BottomSheet.css";

type BottomSheetProps = Partial<
  Pick<GlobalVars, "backgroundColor" | "dimBackgroundColor">
> &
  Partial<GlobalVars["bottomSheet"]> & {
    children: React.ReactNode;
  };
const BottomSheet: React.FC<BottomSheetProps> = ({
  borderRadius = "1rem",
  backgroundColor,
  dimBackgroundColor,
  children,
}) => {
  const activity = useActivity();
  const { pop } = useActions();

  const containerRef = useRef<HTMLDivElement>(null);
  const paperRef = useRef<HTMLDivElement>(null);

  useStyleEffect({
    styleName: "hide",
    refs: [containerRef],
  });
  useStyleEffect({
    styleName: "offset",
    refs: [paperRef],
  });
  useStyleEffect({
    styleName: "swipe-back",
    refs: [paperRef],
  });

  const popLock = useRef(false);

  const onDimClick = () => {
    if (popLock.current) {
      return;
    }

    pop();
    popLock.current = true;
  };
  const onPaperClick: React.MouseEventHandler = (e) => {
    e.stopPropagation();
  };

  const zIndexBase = activity.zIndex * 5 + 3;
  const zIndexPaper = activity.zIndex * 5 + 4;

  return (
    <div
      className={css.container({
        transitionState: useLazy(activity.transitionState),
      })}
      ref={containerRef}
      style={assignInlineVars(
        compactMap({
          [globalVars.bottomSheet.borderRadius]: borderRadius,
          [globalVars.backgroundColor]: backgroundColor,
          [globalVars.dimBackgroundColor]: dimBackgroundColor,
          [css.vars.zIndexes.dim]: `${zIndexBase}`,
          [css.vars.zIndexes.paper]: `${zIndexPaper}`,
          [css.vars.transitionDuration]:
            activity.transitionState === "enter-active" ||
            activity.transitionState === "exit-active"
              ? `var(--stackflow-transition-duration)`
              : "0ms",
        }),
      )}
    >
      <div className={css.dim} ref={paperRef} onClick={onDimClick}>
        <div className={css.paper} onClick={onPaperClick}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default BottomSheet;
