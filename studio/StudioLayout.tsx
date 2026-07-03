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
          justify-content: center !important;
          text-align: center !important;
        }
        [data-ui="Button"]:has(svg[data-sanity-icon="translate"]):hover,
        button:has(svg[data-sanity-icon="translate"]):hover {
          background-color: #15803d !important;
        }
        /* Hide the default inner content (translate icon + "Showing all" text) */
        [data-ui="Button"]:has(svg[data-sanity-icon="translate"]) > *,
        button:has(svg[data-sanity-icon="translate"]) > * {
          display: none !important;
        }
        /* Centered custom label */
        [data-ui="Button"]:has(svg[data-sanity-icon="translate"])::after,
        button:has(svg[data-sanity-icon="translate"])::after {
          content: "Alege limba de editare";
          display: block;
          width: 100%;
          text-align: center;
          color: #ffffff;
          font-size: 13px;
          font-weight: 500;
          white-space: nowrap;
        }
      `}</style>
      {props.renderDefault(props)}
    </Fragment>
  );
}
