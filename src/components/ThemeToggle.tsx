import { styled } from "@linaria/react";
import { Moon, Sun } from "lucide-react";
import type { Theme } from "../hooks/useTheme";
import { colors, font, radius, spacing } from "../tokens";

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: ${spacing.xs};
  background: ${colors.surface};
  border: 1px solid ${colors.border};
  border-radius: ${radius.md};
  padding: ${spacing.xs} ${spacing.sm};
  color: ${colors.text};
  font-size: ${font.size.label};
  cursor: pointer;
`;

const ICON_SIZE = 14;

interface ThemeToggleProps {
  theme: Theme;
  onToggle: () => void;
}

export const ThemeToggle = ({ theme, onToggle }: ThemeToggleProps) => (
  <Button type="button" onClick={onToggle}>
    {theme === "dark" ? <Moon size={ICON_SIZE} /> : <Sun size={ICON_SIZE} />}
    {theme === "dark" ? "Dark" : "Light"}
  </Button>
);
