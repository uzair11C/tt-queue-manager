import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";
import MessageDialog from "./Dialogs/MessageDialog";
import { useState } from "react";
import LoadingDialog from "./Dialogs/LoadingDialog";

const MatchSection = ({
    queue,
    setQueue,
    currentMatch,
    setCurrentMatch,
    supabase,
}) => {
    const [messageDialogOpen, setMessageDialogOpen] = useState(false);
    const [messageTitle, setMessageTitle] = useState("");
    const [messageContent, setMessageContent] = useState("");

    const [loader, setLoader] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState("");

    const startMatch = () => {
        if (queue.length >= 2) {
            setCurrentMatch([queue[0], queue[1]]);
        } else {
            setMessageTitle("Error");
            setMessageContent(
                "There are not enough teams in the queue to start a match."
            );
            setMessageDialogOpen(true);
        }
    };

    const handleWin = async (winnerIndex) => {
        const winner = currentMatch[winnerIndex];
        const loser = currentMatch[1 - winnerIndex];

        setLoader(true);
        setLoadingMessage("Updating queue positions...");

        setQueue((prevQueue) => {
            const updatedQueue = [winner, ...prevQueue.slice(2), loser];

            if (updatedQueue.length >= 2) {
                setCurrentMatch([updatedQueue[0], updatedQueue[1]]);
            } else {
                setCurrentMatch([]);
            }

            // Update Supabase after state update
            updatePositionsInSupabase(updatedQueue);

            return updatedQueue;
        });
    };

    const updatePositionsInSupabase = async (updatedQueue) => {
        setLoadingMessage("Updating queue positions...");
        setLoader(true);
        try {
            const updates = updatedQueue.map((item, index) => ({
                id: item.id,
                position: index, // Assign new position based on new order
                team_name: item.team_name,
            }));

            console.log("Updating Supabase with:", updates);

            const { error } = await supabase
                .from("Queue")
                .upsert(updates, { onConflict: "id" });

            if (error) throw error;

            console.log("Queue positions updated successfully!");
        } catch (error) {
            console.error("Error updating positions:", error);
        } finally {
            setLoader(false);
        }
    };

    return (
        <Box
            flexGrow={1}
            display="flex"
            justifyContent="center"
            alignItems="center"
        >
            <Box width="50%" textAlign="center">
                <Typography variant="h3" fontWeight={700} mb={2}>
                    Current Match
                </Typography>
                {currentMatch.length === 2 ? (
                    <Paper
                        variant="outlined"
                        sx={{
                            p: 5,
                            bgcolor: "#2c2c2c",
                            color: "#ffffff",
                            borderRadius: "12px",
                        }}
                    >
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            spacing={2}
                            width="100%"
                        >
                            <Typography variant="h4" fontWeight={600}>
                                {currentMatch[0].team_name}
                            </Typography>
                            <Typography variant="h4">vs</Typography>
                            <Typography variant="h4" fontWeight={600}>
                                {currentMatch[1].team_name}
                            </Typography>
                        </Stack>
                        <Stack
                            direction="row"
                            justifyContent="center"
                            spacing={3}
                            mt={3}
                        >
                            <Button
                                onClick={() => handleWin(0)}
                                variant="contained"
                            >
                                {currentMatch[0].team_name} Win
                            </Button>
                            <Button
                                onClick={() => handleWin(1)}
                                variant="contained"
                                color="secondary"
                            >
                                {currentMatch[1].team_name} Win
                            </Button>
                        </Stack>
                        {queue[2] && (
                            <Typography variant="h6" mt={3}>
                                <b style={{ fontSize: "larger" }}>Next Team:</b>{" "}
                                {queue[2].team_name}
                            </Typography>
                        )}
                    </Paper>
                ) : (
                    <Button
                        onClick={startMatch}
                        variant="contained"
                        color="success"
                        sx={{ mt: 2 }}
                    >
                        Start Match
                    </Button>
                )}
            </Box>
            <MessageDialog
                open={messageDialogOpen}
                handleClose={() => setMessageDialogOpen(false)}
                title={messageTitle}
                message={messageContent}
            />
            <LoadingDialog open={loader} message={loadingMessage} />
        </Box>
    );
};

export default MatchSection;

MatchSection.propTypes = {
    queue: PropTypes.arrayOf(PropTypes.string),
    setQueue: PropTypes.func,
    currentMatch: PropTypes.arrayOf(PropTypes.string),
    setCurrentMatch: PropTypes.func,
    supabase: PropTypes.object,
};
