import { css } from '@emotion/react';
import { EuiFlexGroup, EuiFlexItem, EuiIcon, useEuiTheme } from '@elastic/eui';
import type { ComponentProps, ReactNode } from 'react';

export type NotificationSemanticColor = 'success' | 'warning' | 'danger' | 'neutral';

export function notificationStatusIconProps(color: NotificationSemanticColor): {
  type: ComponentProps<typeof EuiIcon>['type'];
  iconColor: ComponentProps<typeof EuiIcon>['color'];
} {
  switch (color) {
    case 'success':
      return { type: 'checkCircle', iconColor: 'success' };
    case 'warning':
      return { type: 'warning', iconColor: 'warning' };
    case 'danger':
      return { type: 'error', iconColor: 'danger' };
    case 'neutral':
      return { type: 'info', iconColor: 'primary' };
  }
}

const iconSlotCss = css`
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  line-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  & > svg,
  & svg {
    width: 16px;
    height: 16px;
  }
`;

/** 16×16 semantic glyph for toasts / callouts (also composed inside `NotificationTitleBox`). */
export function NotificationStatusIcon({ color }: { color: NotificationSemanticColor }) {
  const { type, iconColor } = notificationStatusIconProps(color);
  return <EuiIcon aria-hidden type={type} color={iconColor} css={iconSlotCss} />;
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
        <NotificationStatusIcon color={color} />
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
