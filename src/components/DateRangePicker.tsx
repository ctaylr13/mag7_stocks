import { styled } from "@linaria/react";
import { colors, font, radius, spacing } from "../tokens";

const Wrapper = styled.div`
  display: flex;
  gap: ${spacing.md};
  align-items: center;
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

interface DateFieldProps {
  label: string;
  value: string;
  constraint: { min?: string; max?: string };
  onChange: (value: string) => void;
}

const DateField = ({ label, value, constraint, onChange }: DateFieldProps) => (
  <Label>
    {label}
    <Input type="date" value={value} {...constraint} onChange={(e) => onChange(e.target.value)} />
  </Label>
);

interface DateRangePickerProps {
  start: string;
  end: string;
  onChange: (start: string, end: string) => void;
}

export const DateRangePicker = ({ start, end, onChange }: DateRangePickerProps) => (
  <Wrapper>
    <DateField
      label="Start"
      value={start}
      constraint={{ max: end }}
      onChange={(value) => onChange(value, end)}
    />
    <DateField
      label="End"
      value={end}
      constraint={{ min: start }}
      onChange={(value) => onChange(start, value)}
    />
  </Wrapper>
);
