import { styled } from "@linaria/react";
import { colors, font, radius, spacing } from "../tokens";

const Wrapper = styled.div`
  display: flex;
  gap: ${spacing.md};
  align-items: center;
  padding-bottom: ${spacing.lg};
  font-size: ${font.size.label};
  color: ${colors.textMuted};
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: ${spacing.xs};
`;

const Input = styled.input`
  background: ${colors.surface};
  border: 1px solid ${colors.border};
  border-radius: ${radius.md};
  padding: 0.375rem ${spacing.sm};
  color: ${colors.text};
`;

interface DateRangePickerProps {
  start: string;
  end: string;
  onChange: (start: string, end: string) => void;
}

export const DateRangePicker = ({ start, end, onChange }: DateRangePickerProps) => (
  <Wrapper>
    <Label>
      Start
      <Input type="date" value={start} max={end} onChange={(e) => onChange(e.target.value, end)} />
    </Label>
    <Label>
      End
      <Input type="date" value={end} min={start} onChange={(e) => onChange(start, e.target.value)} />
    </Label>
  </Wrapper>
);
