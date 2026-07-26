import { Moon, Sun } from "lucide-react";
import { Button } from "./Button";
import type { Theme } from "../hooks/useTheme";

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
