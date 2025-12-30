// Spacer.tsx
import { Box } from "@mui/material";

type Props = {
  width?: number | string;
  height?: number | string;
};

export const Spacer: React.FC<Props> = ({ width = 0, height = 0 }) => (
  <Box sx={{ width, height, flexShrink: 0 }} />
);

export default Spacer; 