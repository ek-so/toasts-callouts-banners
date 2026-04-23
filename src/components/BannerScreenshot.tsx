import { css } from '@emotion/react';
import { useEuiTheme } from '@elastic/eui';
import type { ComponentPropsWithoutRef } from 'react';

function assetSrc(file: string): string {
  const publicPath =
    typeof __webpack_public_path__ === 'string' && __webpack_public_path__ !== ''
      ? __webpack_public_path__
      : '/';
  const base = publicPath.endsWith('/') ? publicPath : `${publicPath}/`;
  return `${base}banners/${file}`;
}

export function BannerScreenshot({
  children,
  ...rest
}: ComponentPropsWithoutRef<'div'>) {
  const { euiTheme } = useEuiTheme();
  const width = `${euiTheme.base * 20}px`;
  const minHeight = `${euiTheme.base * 10}px`;

  return (
    <div
      {...rest}
      css={css`
        position: relative;
        width: ${width};
        min-height: ${minHeight};
        align-self: stretch;
        flex-shrink: 0;
        overflow: hidden;
        border-radius: ${euiTheme.border.width.thin};
        box-sizing: border-box;
        background-image: url(${assetSrc('screenshot.png')}), url(${assetSrc('screenshot-bg.png')});
        background-size: contain, cover;
        background-position: center, center;
        background-repeat: no-repeat, no-repeat;
        background-origin: content-box, padding-box;
        background-clip: content-box, border-box;
        padding: 20px 30px;
        line-height: 0;
      `}
    >
      {children}
    </div>
  );
}
