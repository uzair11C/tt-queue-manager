import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
} from "@mui/material";
import PropTypes from "prop-types";

const MessageDialog = ({ open, handleClose, title, message }) => {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            sx={{
                ".MuiPaper-root": {
                    color: "#FFFFFF",
                    borderRadius: "5px",
                    boxSizing: "border-box",
                    width: "30%",
                    p: "1%",
                },
            }}
        >
            <DialogTitle textAlign={"center"} fontWeight={700} variant="h4">
                {title}
            </DialogTitle>
            <DialogContent>
                <Typography variant="h6" textAlign={"center"}>
                    {message}
                </Typography>
            </DialogContent>
            <DialogActions
                sx={{
                    display: "flex",
                    justifyContent: "center",

                    alignItems: "center",
                }}
            >
                <Button variant="contained" color="info" onClick={handleClose}>
                    Okay
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default MessageDialog;

MessageDialog.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    title: PropTypes.string,
    message: PropTypes.string,
};
