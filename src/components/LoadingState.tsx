import { styled } from "@linaria/react";
import { Card } from "./Card";
import { colors, radius, sizes } from "../tokens";

const SkeletonCard = styled(Card)`
  height: ${sizes.cardHeight};
`;

const Bar = styled.div`
  background: ${colors.border};
  border-radius: ${radius.sm};
  animation: pulse 1.4s ease-in-out infinite;

  @keyframes pulse {
    0%, 100% { opacity: 0.4; }
    50% { opacity: 0.8; }
  }
`;

const TitleBar = styled(Bar)`
  height: 1rem;
  width: 40%;
`;

const ChartBar = styled(Bar)`
  flex: 1;
`;

const FooterBar = styled(Bar)`
  height: 0.75rem;
  width: 60%;
`;

export const LoadingState = () => (
  <SkeletonCard>
    <TitleBar />
    <ChartBar />
    <FooterBar />
  </SkeletonCard>
);
