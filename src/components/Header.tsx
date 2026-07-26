import { styled } from "@linaria/react";
import { ThemeToggle } from "./ThemeToggle";
import type { Theme } from "../hooks/useTheme";
import { colors, font, spacing } from "../tokens";

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: start;
`;

const TitleBlock = styled.div`
  grid-column: 2;
  text-align: center;
`;

const ToggleSlot = styled.div`
  grid-column: 3;
  display: flex;
  justify-content: flex-end;
`;

const Title = styled.h1`
  font-size: ${font.size.title};
`;

const Subtitle = styled.p`
  padding-top: ${spacing.xs};
  color: ${colors.textMuted};
  font-size: ${font.size.subtitle};
`;

interface HeaderProps {
  start: string;
  end: string;
  theme: Theme;
  onToggleTheme: () => void;
}

export const Header = ({ start, end, theme, onToggleTheme }: HeaderProps) => (
  <Row>
    <TitleBlock>
      <Title>MAG7 Interactive Return Viewer</Title>
      <Subtitle>
        Daily returns from {start} to {end}
      </Subtitle>
    </TitleBlock>
    <ToggleSlot>
      <ThemeToggle theme={theme} onToggle={onToggleTheme} />
    </ToggleSlot>
  </Row>
);
