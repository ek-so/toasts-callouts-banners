import { css } from '@emotion/react';
import {
  EuiButton,
  EuiButtonEmpty,
  EuiButtonIcon,
  EuiFlexGroup,
  EuiFlexItem,
  EuiText,
  EuiTitle,
  useEuiTheme,
} from '@elastic/eui';
import type { ReactNode } from 'react';

export type CalloutColor = 'success' | 'warning' | 'danger' | 'neutral';

export type CalloutProps = {
  title: ReactNode;
  children?: ReactNode;
  color?: CalloutColor;
  primaryLabel?: ReactNode;
  secondaryLabel?: ReactNode;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  onDismiss?: () => void;
  className?: string;
};

/** `neutral` uses primary base background / border tokens. */
function calloutBackground(
  euiTheme: ReturnType<typeof useEuiTheme>['euiTheme'],
  color: CalloutColor
): string {
  switch (color) {
    case 'neutral':
      return euiTheme.colors.backgroundBasePrimary;
    case 'success':
      return euiTheme.colors.backgroundBaseSuccess;
    case 'warning':
      return euiTheme.colors.backgroundBaseWarning;
    case 'danger':
      return euiTheme.colors.backgroundBaseDanger;
  }
}

function calloutBorder(
  euiTheme: ReturnType<typeof useEuiTheme>['euiTheme'],
  color: CalloutColor
): string {
  switch (color) {
    case 'neutral':
      return euiTheme.colors.borderBasePrimary;
    case 'success':
      return euiTheme.colors.borderBaseSuccess;
    case 'warning':
      return euiTheme.colors.borderBaseWarning;
    case 'danger':
      return euiTheme.colors.borderBaseDanger;
  }
}

function calloutLeftAccent(
  euiTheme: ReturnType<typeof useEuiTheme>['euiTheme'],
  color: CalloutColor
): string {
  switch (color) {
    case 'neutral':
      return euiTheme.colors.borderStrongPrimary;
    case 'success':
      return euiTheme.colors.borderStrongSuccess;
    case 'warning':
      return euiTheme.colors.borderStrongWarning;
    case 'danger':
      return euiTheme.colors.borderStrongDanger;
  }
}

function buttonColor(color: CalloutColor): 'primary' | 'success' | 'warning' | 'danger' {
  switch (color) {
    case 'neutral':
      return 'primary';
    case 'success':
      return 'success';
    case 'warning':
      return 'warning';
    case 'danger':
      return 'danger';
  }
}

/** Callout: `backgroundBase*`, thin `borderBase*` on three sides, 3px left stripe (`::after`, TL/BL radius only). */
export function Callout({
  title,
  children,
  color = 'success',
  primaryLabel = 'Primary',
  secondaryLabel = 'Secondary',
  onPrimaryClick,
  onSecondaryClick,
  onDismiss,
  className,
}: CalloutProps) {
  const { euiTheme } = useEuiTheme();
  const bg = calloutBackground(euiTheme, color);
  const edge = calloutBorder(euiTheme, color);
  const leftAccent = calloutLeftAccent(euiTheme, color);
  const btnColor = buttonColor(color);
  const corner = euiTheme.size.xxs;
  const thin = euiTheme.border.width.thin;
  const leftStripe = '3px';

  const rootCss = css`
    position: relative;
    box-sizing: border-box;
    width: 100%;
    max-width: 100%;
    min-width: 0;
    border-radius: ${corner};
    overflow: hidden;
    background-color: ${bg};
    border-top: ${thin} solid ${edge};
    border-right: ${thin} solid ${edge};
    border-bottom: ${thin} solid ${edge};
    border-left: none;
    padding: ${euiTheme.size.base} ${euiTheme.size.xxl} ${euiTheme.size.base} ${euiTheme.size.l};
    word-break: break-word;

    &::after {
      content: '';
      position: absolute;
      z-index: 0;
      left: 0;
      top: 0;
      bottom: 0;
      width: ${leftStripe};
      background-color: ${leftAccent};
      border-top-left-radius: ${corner};
      border-bottom-left-radius: ${corner};
      pointer-events: none;
    }
  `;

  const closeCss = css`
    position: absolute;
    z-index: 2;
    top: ${euiTheme.size.base};
    right: ${euiTheme.size.base};
  `;

  return (
    <div
      className={className}
      css={rootCss}
      role="status"
      aria-live="polite"
      data-test-subj="callout"
    >
      <span css={closeCss}>
        <EuiButtonIcon
          iconType="cross"
          color="text"
          size="xs"
          display="empty"
          aria-label="Dismiss notification"
          onClick={() => onDismiss?.()}
        />
      </span>

      <div
        css={css`
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: stretch;
          gap: ${euiTheme.size.m};
        `}
      >
        <EuiFlexGroup direction="column" gutterSize="xs" responsive={false}>
          <EuiTitle size="xs">
            <h4>{title}</h4>
          </EuiTitle>
          {children ? <EuiText size="s">{children}</EuiText> : null}
        </EuiFlexGroup>

        <span
          css={css`
            align-self: flex-start;
            display: inline-block;
            max-width: 100%;
          `}
        >
          <EuiFlexGroup
            responsive={false}
            gutterSize="s"
            alignItems="center"
            justifyContent="flexStart"
            wrap
          >
            <EuiFlexItem grow={false} css={{ minWidth: 0, maxWidth: '100%' }}>
              <span
                css={css`
                  display: inline-flex;
                  max-width: 100%;
                  flex: 0 1 auto;
                `}
              >
                <EuiButton
                  size="s"
                  color={btnColor}
                  fill={false}
                  fullWidth={false}
                  minWidth={false}
                  onClick={onPrimaryClick}
                >
                  {primaryLabel}
                </EuiButton>
              </span>
            </EuiFlexItem>
            <EuiFlexItem grow={false} css={{ minWidth: 0, flexShrink: 0 }}>
              <span
                css={css`
                  display: inline-flex;
                  flex: 0 0 auto;
                  max-width: 100%;
                `}
              >
                <EuiButtonEmpty size="s" color={btnColor} onClick={onSecondaryClick}>
                  {secondaryLabel}
                </EuiButtonEmpty>
              </span>
            </EuiFlexItem>
          </EuiFlexGroup>
        </span>
      </div>
    </div>
  );
}
