import { css } from '@emotion/react';
import { EuiFlexGroup, EuiFlexItem, useEuiTheme } from '@elastic/eui';
import type { ReactNode } from 'react';

export type NotificationSemanticColor = 'success' | 'warning' | 'danger' | 'neutral';

/** Art in `public/notification-icons/` (served as `/notification-icons/*.svg`); copied to `dist/notification-icons/` on `yarn build`. */
export function notificationStatusIconSrc(color: NotificationSemanticColor): string {
  const file =
    color === 'success'
      ? 'success'
      : color === 'warning'
        ? 'warning'
        : color === 'danger'
          ? 'error'
          : 'info';
  const publicPath =
    typeof __webpack_public_path__ === 'string' && __webpack_public_path__ !== ''
      ? __webpack_public_path__
      : '/';
  const base = publicPath.endsWith('/') ? publicPath : `${publicPath}/`;
  return `${base}notification-icons/${file}.svg`;
}

function iconSlotCssFor(slotPx: 16 | 20) {
  return css`
    width: ${slotPx}px;
    height: ${slotPx}px;
    flex-shrink: 0;
    line-height: 0;
    display: block;
    object-fit: contain;
  `;
}

/** Status artwork; `slotPx` **20** for M callout / toast title row, default **16** for size-`s` callout. */
export function NotificationStatusIcon({
  color,
  slotPx = 16,
}: {
  color: NotificationSemanticColor;
  slotPx?: 16 | 20;
}) {
  return (
    <img
      alt=""
      src={notificationStatusIconSrc(color)}
      css={iconSlotCssFor(slotPx)}
      draggable={false}
    />
  );
}

/**
 * Title row only: semantic status icon + title (`children`), so body copy can sit below at full text width.
 */
export function NotificationTitleBox({
  color,
  children,
}: {
  color: NotificationSemanticColor;
  children: ReactNode;
}) {
  const { euiTheme } = useEuiTheme();
  return (
    <EuiFlexGroup
      responsive={false}
      gutterSize="none"
      alignItems="center"
      justifyContent="flexStart"
      css={css`
        min-width: 0;
        column-gap: calc(${euiTheme.size.base} * 0.25);
      `}
    >
      <EuiFlexItem grow={false}>
        <NotificationStatusIcon color={color} slotPx={20} />
      </EuiFlexItem>
      <EuiFlexItem
        grow
        css={{
          minWidth: 0,
        }}
      >
        {children}
      </EuiFlexItem>
    </EuiFlexGroup>
  );
}
