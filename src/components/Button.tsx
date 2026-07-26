import { styled } from "@linaria/react";
import { colors, font, radius, spacing } from "../tokens";

export const Button = styled.button`
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
