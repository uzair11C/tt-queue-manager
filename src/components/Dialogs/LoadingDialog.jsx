import {
    CircularProgress,
    Dialog,
    DialogContent,
    Stack,
    Typography,
} from "@mui/material";
import PropTypes from "prop-types";

const LoadingDialog = ({ message, open }) => {
    return (
        <Dialog
            open={open}
            sx={{
                ".MuiPaper-root": {
                    color: "#FFFFFF",
                    borderRadius: "5px",
                    boxSizing: "border-box",
                    minWidth: "20%",
                    p: "2%",
                },
            }}
        >
            <DialogContent>
                <Stack
                    direction="row"
                    spacing={2}
                    justifyContent="center"
                    alignItems="center"
                >
                    <CircularProgress color="info" size={70} thickness={3} />
                    <Typography variant="h4">{message}</Typography>
                </Stack>
            </DialogContent>
        </Dialog>
    );
};

export default LoadingDialog;

LoadingDialog.propTypes = {
    message: PropTypes.string,
    open: PropTypes.bool,
};
