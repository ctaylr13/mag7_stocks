import { styled } from "@linaria/react";
import tickers from "../generated/tickers.json";
import { Button } from "./Button";
import { colors, font, spacing } from "../tokens";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.xs};
`;

const Label = styled.span`
  font-size: ${font.size.label};
  color: ${colors.textMuted};
`;

const Bar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing.sm};
`;

const Chip = styled(Button)`
  font-family: ${font.mono};
`;

const SelectedChip = styled(Chip)`
  background: ${colors.accent};
  border-color: ${colors.accent};
  color: ${colors.background};
`;

interface TickerToggleBarProps {
  visibleCodes: Set<string>;
  onToggle: (code: string) => void;
}

export const TickerToggleBar = ({ visibleCodes, onToggle }: TickerToggleBarProps) => (
  <Wrapper>
    <Label>Show Tickers</Label>
    <Bar>
      {tickers.map(({ code }) => {
        const ChipVariant = visibleCodes.has(code) ? SelectedChip : Chip;
        return (
          <ChipVariant key={code} type="button" onClick={() => onToggle(code)}>
            {code}
          </ChipVariant>
        );
      })}
    </Bar>
  </Wrapper>
);
