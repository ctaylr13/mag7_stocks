import { styled } from "@linaria/react";
import { Button } from "./Button";
import { colors, spacing } from "../tokens";

export type View = "grid" | "table";

const Row = styled.div`
  display: flex;
  gap: ${spacing.xs};
`;

const SelectedButton = styled(Button)`
  background: ${colors.accent};
  border-color: ${colors.accent};
  color: ${colors.background};
`;

const VIEWS: { value: View; label: string }[] = [
  { value: "grid", label: "Grid" },
  { value: "table", label: "Table" },
];

interface ViewToggleProps {
  view: View;
  onChange: (view: View) => void;
}

export const ViewToggle = ({ view, onChange }: ViewToggleProps) => (
  <Row>
    {VIEWS.map((option) => {
      const ButtonVariant = view === option.value ? SelectedButton : Button;
      return (
        <ButtonVariant key={option.value} type="button" onClick={() => onChange(option.value)}>
          {option.label}
        </ButtonVariant>
      );
    })}
  </Row>
);
