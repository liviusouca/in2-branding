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
          color: #ffffff !important;
          border-radius: 7px !important;
        }
        [data-ui="Button"]:has(svg[data-sanity-icon="translate"]) svg,
        button:has(svg[data-sanity-icon="translate"]) svg {
          color: #ffffff !important;
        }
        [data-ui="Button"]:has(svg[data-sanity-icon="translate"]):hover,
        button:has(svg[data-sanity-icon="translate"]):hover {
          background-color: #15803d !important;
        }
        /* Hide the default "Showing all / Showing: …" text */
        [data-ui="Button"]:has(svg[data-sanity-icon="translate"]) [data-ui="Text"],
        button:has(svg[data-sanity-icon="translate"]) [data-ui="Text"] {
          display: none !important;
        }
        /* Add custom label */
        [data-ui="Button"]:has(svg[data-sanity-icon="translate"])::after,
        button:has(svg[data-sanity-icon="translate"])::after {
          content: "Alege limba de editare";
          color: #ffffff;
          font-size: 13px;
          font-weight: 500;
          white-space: nowrap;
          margin-left: 6px;
        }
      `}</style>
      {props.renderDefault(props)}
    </Fragment>
  );
}
