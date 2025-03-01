import {
    Button,
    Divider,
    Drawer,
    // IconButton,
    List,
    ListItem,
    Paper,
    TextField,
    Typography,
} from "@mui/material";
// import { Delete } from "@mui/icons-material";
import { useState } from "react";
import PropTypes from "prop-types";
import MessageDialog from "./Dialogs/MessageDialog";
import LoadingDialog from "./Dialogs/LoadingDialog";

const TeamRegistration = ({
    queue,
    setQueue,
    // currentMatch,
    // setCurrentMatch,
    supabase,
}) => {
    const [player1, setPlayer1] = useState("");
    const [player2, setPlayer2] = useState("");

    const [messageTitle, setMessageTitle] = useState("");
    const [messageContent, setMessageContent] = useState("");
    const [messageDialogOpen, setMessageDialogOpen] = useState(false);

    const [loadingDialogOpen, setLoadingDialogOpen] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState("");

    const addTeam = async () => {
        if (player1.trim() !== "" && player2.trim() !== "") {
            try {
                setLoadingMessage("Requesting approval.....");
                setLoadingDialogOpen(true);

                setQueue([...queue, `${player1} / ${player2}`]);
                setPlayer1("");
                setPlayer2("");
                const { data, error } = await supabase
                    .from("Approvals")
                    .insert({ team_name: `${player1} / ${player2}` })
                    .select();

                console.log("now: ", data);
                console.log("errror: ", error);
                setMessageTitle("Success");
                setMessageContent(
                    "Your request has been submitted successfully and is awaiting admin approval. When approved, it will appear in the queue."
                );
                setMessageDialogOpen(true);
            } catch (error) {
                console.log(
                    "something went wrong in requesting approval: ",
                    error
                );
            } finally {
                setLoadingDialogOpen(false);
            }
        } else {
            setMessageTitle("Error");
            setMessageContent("Please enter both player names.");
            setMessageDialogOpen(true);
        }
    };

    // const removeTeam = (index) => {
    //     setQueue((prevQueue) => {
    //         const updatedQueue = prevQueue.filter((_, i) => i !== index);

    //         // If a team in the current match is removed, update the match
    //         if (currentMatch.includes(prevQueue[index])) {
    //             setCurrentMatch(
    //                 updatedQueue.length >= 2
    //                     ? [updatedQueue[0], updatedQueue[1]]
    //                     : []
    //             );
    //         }

    //         return updatedQueue;
    //     });
    // };

    return (
        <Drawer
            variant="permanent"
            anchor="left"
            sx={{
                width: { xs: "100%", md: "22%" },
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                    width: { xs: "100%", md: "22%" },
                    boxSizing: "border-box",
                    padding: 2,
                    bgcolor: "#1e1e1e",
                    color: "#ffffff",
                },
            }}
        >
            <Typography variant="h6" fontWeight={700}>
                Enter Team Members
            </Typography>
            <TextField
                fullWidth
                variant="outlined"
                value={player1}
                onChange={(e) => setPlayer1(e.target.value)}
                placeholder="Enter first player"
                margin="dense"
                size="small"
                slotProps={{ input: { style: { color: "#ffffff" } } }}
            />
            <TextField
                fullWidth
                variant="outlined"
                value={player2}
                onChange={(e) => setPlayer2(e.target.value)}
                placeholder="Enter second player"
                margin="dense"
                size="small"
                slotProps={{ input: { style: { color: "#ffffff" } } }}
            />
            <Button
                fullWidth
                variant="contained"
                color="info"
                onClick={addTeam}
                sx={{ mt: 1 }}
            >
                Request Approval
            </Button>
            <Typography variant="subtitle1" fontWeight={700} mt={2}>
                Queue
            </Typography>
            <Paper
                variant="outlined"
                sx={{
                    p: 1,
                    height: "100%",
                    overflowY: "auto",
                    bgcolor: "#2c2c2c",
                }}
            >
                <List>
                    {queue.map((team, index) => (
                        <ListItem
                            key={index}
                            // secondaryAction={
                            //     <IconButton
                            //         edge="end"
                            //         onClick={() => removeTeam(index)}
                            //     >
                            //         <Delete fontSize="small" color="error" />
                            //     </IconButton>
                            // }
                            divider={<Divider flexItem />}
                            sx={{
                                color: "#ffffff",
                                display: "flex",
                                justifyContent: "flex-start",
                                alignItems: "center",
                            }}
                        >
                            {index + 1}. &nbsp;
                            {team.team_name}
                        </ListItem>
                    ))}
                </List>
            </Paper>
            <MessageDialog
                open={messageDialogOpen}
                handleClose={() => setMessageDialogOpen(false)}
                title={messageTitle}
                message={messageContent}
            />
            <LoadingDialog open={loadingDialogOpen} message={loadingMessage} />
        </Drawer>
    );
};

export default TeamRegistration;

TeamRegistration.propTypes = {
    queue: PropTypes.arrayOf(PropTypes.string),
    setQueue: PropTypes.func,
    currentMatch: PropTypes.arrayOf(PropTypes.string),
    setCurrentMatch: PropTypes.func,
    supabase: PropTypes.object,
};
