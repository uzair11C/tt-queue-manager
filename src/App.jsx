import { useEffect, useState } from "react";
import {
    Box,
    createTheme,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Stack,
    ThemeProvider,
    Typography,
} from "@mui/material";
import TeamRegistration from "./components/TeamRegistration";
// import MatchSection from "./components/MatchSection";
import "./App.css";
import { supabase } from "./supabaseClient";
import LoadingDialog from "./components/Dialogs/LoadingDialog";
import MessageDialog from "./components/Dialogs/MessageDialog";
import { ErrorRounded } from "@mui/icons-material";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
        background: { default: "#121212" },
        text: { primary: "#ffffff" },
    },
});

function App() {
    const [queue, setQueue] = useState([]);
    const [loading, setLoading] = useState(false);

    const [messageDialogOpen, setMessageDialogOpen] = useState(false);
    const [messageTitle, setMessageTitle] = useState("");
    const [messageContent, setMessageContent] = useState("");

    const GetQueue = async () => {
        try {
            setLoading(true);
            let { data } = await supabase.from("Queue").select("*");

            console.log("Queue: ", data);

            setQueue(data);
            // setCurrentMatch(data.length >= 2 ? [data[0], data[1]] : []);
        } catch (error) {
            console.log("error in refresh queue: ", error);
        } finally {
            setLoading(false);
        }
    };

    const showRules = () => {
        const queueRules = (
            <Stack width="100%" direction="column">
                <List sx={{ listStyle: "decimal", pl: 4 }}>
                    <ListItem sx={{ display: "list-item" }}>
                        <ListItemText
                            primary={
                                <Typography variant="body1">
                                    A team must have at least 2 members to be
                                    entered into the queue.
                                </Typography>
                            }
                        />
                    </ListItem>
                    <ListItem sx={{ display: "list-item" }}>
                        <ListItemText
                            primary={
                                <Typography variant="body1">
                                    No teams can be entered into the queue
                                    before 1:50 PM (noon) and 4:50 PM (evening).
                                </Typography>
                            }
                        />
                    </ListItem>
                    <ListItem sx={{ display: "list-item" }}>
                        <ListItemText
                            primary={
                                <Typography variant="body1">
                                    The queue follows a circular queue pattern,
                                    the losing team will be pushed to the end of
                                    the queue.
                                </Typography>
                            }
                        />
                    </ListItem>
                    <ListItem sx={{ display: "list-item" }}>
                        <ListItemText
                            primary={
                                <Typography variant="body1">
                                    Teams who leave the office will be removed
                                    from the queue.
                                </Typography>
                            }
                        />
                    </ListItem>
                    <ListItem sx={{ display: "list-item" }}>
                        <ListItemText
                            primary={
                                <Typography variant="body1">
                                    Teams must have at least one partner in the
                                    playing area, if the other partner does not
                                    arrive on time, his partner will have the
                                    right to play with a new member, and the
                                    faulty member will be removed.
                                </Typography>
                            }
                        />
                    </ListItem>
                    <ListItem sx={{ display: "list-item" }}>
                        <ListItemText
                            primary={
                                <Typography variant="body1">
                                    If the member does not find another
                                    teammate, he will be pushed to end of queue.
                                </Typography>
                            }
                        />
                    </ListItem>
                </List>
                <Typography variant="body1" textAlign="left" color="warning">
                    These rules are in place to ensure fairness for all
                    participants. By entering the queue, you acknowledge that
                    you have read and agree to these rules.
                </Typography>
            </Stack>
        );

        setMessageTitle("Queue Rules");
        setMessageContent(queueRules);
        setMessageDialogOpen(true);
    };

    useEffect(() => {
        GetQueue();
    }, []);

    return (
        <ThemeProvider theme={darkTheme}>
            <Box
                height="100vh"
                bgcolor="background.default"
                color="text.primary"
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                }}
            >
                <TeamRegistration
                    queue={queue}
                    setQueue={setQueue}
                    supabase={supabase}
                />
                {/* <MatchSection
                    queue={queue}
                    setQueue={setQueue}
                    currentMatch={currentMatch}
                    setCurrentMatch={setCurrentMatch}
                    supabase={supabase}
                /> */}
                <IconButton
                    sx={{ position: "absolute", top: 10, right: 10 }}
                    onClick={showRules}
                >
                    <ErrorRounded
                        color="warning"
                        sx={{
                            fontSize: "4rem",
                        }}
                    />
                </IconButton>
            </Box>
            <MessageDialog
                open={messageDialogOpen}
                handleClose={() => setMessageDialogOpen(false)}
                title={messageTitle}
                message={messageContent}
            />
            <LoadingDialog open={loading} message="Refreshing queue....." />
        </ThemeProvider>
    );
}

export default App;
