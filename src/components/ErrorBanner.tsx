import { styled } from "@linaria/react";
import { colors, radius, spacing } from "../tokens";

const Banner = styled.div`
  padding: ${spacing.md};
  background: ${colors.surface};
  border: 1px solid ${colors.negative};
  border-radius: ${radius.lg};
  color: ${colors.negative};
`;

interface ErrorBannerProps {
  message: string;
}

export const ErrorBanner = ({ message }: ErrorBannerProps) => <Banner>{message}</Banner>;
