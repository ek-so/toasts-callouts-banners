import { useState } from 'react';
import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiPanel,
  EuiSpacer,
  EuiTab,
  EuiTabs,
  EuiText,
  useEuiTheme,
} from '@elastic/eui';

import { Callout } from './components/Callout';
import { Toast } from './components/Toast';

type TopicTab = 'toasts' | 'callouts' | 'banners';

function TopicPanel({ topic }: { topic: TopicTab }) {
  switch (topic) {
    case 'toasts':
      return (
        <EuiFlexGroup
          direction="column"
          gutterSize="m"
          alignItems="stretch"
          css={{ maxWidth: '100%' }}
        >
          <EuiFlexItem grow={false}>
            <Toast color="neutral" title="Neutral toast">
              Life is a canvas, and you are the artist. Paint your dreams with vibrant colors
              and bold strokes.
            </Toast>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <Toast color="success" title="Success toast">
              Adventure awaits around every corner, inviting you to explore the unknown. Take a
              leap of faith and let curiosity guide you.
            </Toast>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <Toast color="warning" title="Warning toast">
              The sun rises on a new day, bringing fresh opportunities and endless potential.
            </Toast>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <Toast color="danger" title="Danger toast">
              In a world of endless possibilities, creativity knows no bounds. Embrace the journey
              of discovery and let your imagination soar.
            </Toast>
          </EuiFlexItem>
        </EuiFlexGroup>
      );
    case 'callouts':
      return (
        <EuiFlexGroup
          direction="column"
          gutterSize="m"
          alignItems="stretch"
          css={{ maxWidth: '100%' }}
        >
          <EuiFlexItem grow={false}>
            <Callout color="neutral" title="Neutral callout">
              Life is a canvas, and you are the artist. Paint your dreams with vibrant colors and
              bold strokes.
            </Callout>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <Callout color="success" title="Success callout">
              Adventure awaits around every corner, inviting you to explore the unknown. Take a leap
              of faith and let curiosity guide you.
            </Callout>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <Callout color="warning" title="Warning callout">
              The sun rises on a new day, bringing fresh opportunities and endless potential.
            </Callout>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <Callout color="danger" title="Danger callout">
              In a world of endless possibilities, creativity knows no bounds. Embrace the journey
              of discovery and let your imagination soar.
            </Callout>
          </EuiFlexItem>
        </EuiFlexGroup>
      );
    case 'banners':
      return (
        <EuiText>
          <p>
            <strong>Banners</strong> — prominent full-width messages at the top (or bottom) of
            a view, for announcements, outages, or policy notices.
          </p>
        </EuiText>
      );
    default:
      return null;
  }
}

export function App() {
  const { euiTheme } = useEuiTheme();
  const [selectedTab, setSelectedTab] = useState<TopicTab>('toasts');

  return (
    <div
      css={{
        minHeight: '100vh',
        boxSizing: 'border-box',
        backgroundColor: euiTheme.colors.emptyShade,
        color: euiTheme.colors.text,
      }}
    >
      <div
        css={{
          maxWidth: 960,
          margin: '0 auto',
          padding: euiTheme.size.l,
        }}
      >
        <EuiTabs expand bottomBorder>
          <EuiTab
            isSelected={selectedTab === 'toasts'}
            onClick={() => setSelectedTab('toasts')}
          >
            Toasts
          </EuiTab>
          <EuiTab
            isSelected={selectedTab === 'callouts'}
            onClick={() => setSelectedTab('callouts')}
          >
            Callouts
          </EuiTab>
          <EuiTab
            isSelected={selectedTab === 'banners'}
            onClick={() => setSelectedTab('banners')}
          >
            Banners
          </EuiTab>
        </EuiTabs>

        <EuiSpacer size="l" />

        <EuiPanel paddingSize="l" hasBorder hasShadow={false}>
          <TopicPanel topic={selectedTab} />
        </EuiPanel>
      </div>
    </div>
  );
}
