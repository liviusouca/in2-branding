import { Fragment } from 'react';
import type { LayoutProps } from 'sanity';

// Injects global CSS. Highlights the language-filter button (the one with the
// translate icon) in green and relabels it to "Alege limba de editare".
export function StudioLayout(props: LayoutProps) {
  return (
    <Fragment>
      <style>{`
        [data-ui="Button"]:has(svg[data-sanity-icon="translate"]),
        button:has(svg[data-sanity-icon="translate"]) {
          background-color: #16a34a !important;
          border-radius: 7px !important;
          position: relative !important;
          min-width: 200px !important;
        }
        [data-ui="Button"]:has(svg[data-sanity-icon="translate"]):hover,
        button:has(svg[data-sanity-icon="translate"]):hover {
          background-color: #15803d !important;
        }
        /* Make original text + icon invisible but keep the button's size intact */
        [data-ui="Button"]:has(svg[data-sanity-icon="translate"]) [data-ui="Text"],
        button:has(svg[data-sanity-icon="translate"]) [data-ui="Text"] {
          visibility: hidden !important;
        }
        [data-ui="Button"]:has(svg[data-sanity-icon="translate"]) svg[data-sanity-icon="translate"],
        button:has(svg[data-sanity-icon="translate"]) svg[data-sanity-icon="translate"] {
          opacity: 0 !important;
        }
        /* Custom centered label overlaid on the button */
        [data-ui="Button"]:has(svg[data-sanity-icon="translate"])::after,
        button:has(svg[data-sanity-icon="translate"])::after {
          content: "Alege limba de editare";
          position: absolute;
          left: 0;
          right: 0;
          text-align: center;
          color: #ffffff;
          font-size: 13px;
          font-weight: 500;
          white-space: nowrap;
          pointer-events: none;
        }
      `}</style>
      {props.renderDefault(props)}
    </Fragment>
  );
}
