import {
    Button,
    Divider,
    List,
    ListItem,
    Paper,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { useState } from "react";
import PropTypes from "prop-types";
import MessageDialog from "./Dialogs/MessageDialog";
import LoadingDialog from "./Dialogs/LoadingDialog";

const TeamRegistration = ({ queue, setQueue, supabase }) => {
    const [player1, setPlayer1] = useState("");
    const [player2, setPlayer2] = useState("");

    const [messageTitle, setMessageTitle] = useState("");
    const [messageContent, setMessageContent] = useState("");
    const [messageDialogOpen, setMessageDialogOpen] = useState(false);

    const [loadingDialogOpen, setLoadingDialogOpen] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState("");

    const addTeam = async () => {
        if (player1.trim() !== "" && player2.trim() !== "") {
            const now = new Date();
            const hours = now.getHours();
            const minutes = now.getMinutes();

            // Convert current time to minutes for easier comparison
            const currentTime = hours * 60 + minutes;
            const noonQueueStart = 12 * 60 + 50; // 12:50 PM
            const noonQueueEnd = 14 * 60; // 2:00 PM
            const eveningQueueStart = 16 * 60 + 50; // 4:50 PM
            const eveningQueueEnd = 18 * 60; // 6:00 PM

            // Queue is open only between 12:50-2:00 PM for noon matches, or 4:50-6:00 PM for evening matches
            const isQueueOpen =
                (currentTime >= noonQueueStart &&
                    currentTime <= noonQueueEnd) ||
                (currentTime >= eveningQueueStart &&
                    currentTime <= eveningQueueEnd);

            if (!isQueueOpen) {
                setMessageTitle("Queue Closed ❌");
                setMessageContent(
                    "Queue opens at 12:50 PM for break matches and 4:50 PM for off-time matches."
                );
                setMessageDialogOpen(true);
                setPlayer1("");
                setPlayer2("");

                return;
            }

            try {
                setLoadingMessage("Adding to queue.....");
                setLoadingDialogOpen(true);

                setPlayer1("");
                setPlayer2("");
                const { data, error } = await supabase
                    .from("Queue")
                    .insert({
                        team_name: `${player1} / ${player2}`,
                        position: queue.length,
                    })
                    .select();
                setQueue([...queue, data[0]]);

                console.log("now: ", data);
                console.log("errror: ", error);
            } catch (error) {
                console.log(
                    "something went wrong in requesting approval: ",
                    error
                );
                setMessageTitle("Error");
                setMessageContent(
                    "Could not join queue, please check your internet connection and try again."
                );
                setMessageDialogOpen(true);
            } finally {
                setLoadingDialogOpen(false);
            }
        } else {
            setMessageTitle("Error");
            setMessageContent("Please enter both player names.");
            setMessageDialogOpen(true);
        }
    };

    return (
        <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
            sx={{
                width: { xs: "85%", md: "25%" },
                height: "85%",
                boxSizing: "border-box",
                padding: 3,
                bgcolor: "#1e1e1e",
                color: "#ffffff",
                borderRadius: "8px",
            }}
        >
            <Typography variant="h5" fontWeight={700}>
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
                Join Queue
            </Button>
            <Typography
                variant="subtitle1"
                fontWeight={700}
                mt={2}
                width="100%"
                textAlign="left"
            >
                Queue
            </Typography>
            <Paper
                variant="outlined"
                sx={{
                    p: 1,
                    height: "100%",
                    width: "100%",
                    boxSizing: "border-box",
                    overflowY: "auto",
                    bgcolor: "#2c2c2c",
                }}
            >
                <List>
                    {queue.map((team, index) => (
                        <ListItem
                            key={index}
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
        </Stack>
    );
};

export default TeamRegistration;

TeamRegistration.propTypes = {
    queue: PropTypes.arrayOf(PropTypes.string),
    setQueue: PropTypes.func,
    supabase: PropTypes.object,
};
