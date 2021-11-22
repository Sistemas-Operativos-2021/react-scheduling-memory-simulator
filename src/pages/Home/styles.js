import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginTop: "5rem",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    height: "25%",
  },
  stepLabel: {
    "& .MuiStepLabel-label.Mui-active": {
      color: "rgba(0, 0, 0, 0.87)",
    },
    "& .MuiStepLabel-label.Mui-disabled": {
      color: "rgba(0, 0, 0, 0.87)",
      opacity: 0.7,
    },
    "& .MuiStepLabel-label.Mui-alternativeLabel": {
      color: "rgba(0, 0, 0, 0.87)",
    },
    "& .MuiStepLabel-label.Mui-completed": {
      color: "rgba(0, 0, 0, 0.87)",
    },
  },
});

export default useStyles;
