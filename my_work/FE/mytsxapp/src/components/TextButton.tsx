import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

type Props = {
  title?: string; // "输入内容:"
  textFieldLabel?: string; // "请输入"
  buttonText?: string; // "保存到数据库"

  inputText: string;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
};

export default function TextButton({
  title = "输入内容:",
  textFieldLabel = "请输入",
  buttonText = "保存",
  inputText,
  onInputChange,
  onSubmit,
}: Props): React.ReactElement {
  return (
    <Box
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 2,
        marginLeft: 3,
      }}
    >
      <Typography variant="body1" gutterBottom sx={{ mb: 0 }}>
        {title}
      </Typography>

      <TextField
        label={textFieldLabel}
        variant="outlined"
        value={inputText}
        onChange={onInputChange}
      />

      <Button type="submit" variant="contained">
        {buttonText}
      </Button>
    </Box>
  );
}
