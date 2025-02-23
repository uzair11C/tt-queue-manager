import { useState } from "react";
import {
    Button,
    TextField,
    Box,
    Typography,
    List,
    ListItem,
    Paper,
    Drawer,
    IconButton,
} from "@mui/material";

function App() {
    const [players, setPlayers] = useState("");
    const [queue, setQueue] = useState([]);
    const [currentMatch, setCurrentMatch] = useState([]);

    const addTeams = () => {
        const teamList = players
            .split("\n")
            .filter((team) => team.trim() !== "");
        setQueue([...queue, ...teamList]);
        setPlayers("");
    };

    const startMatch = () => {
        if (queue.length >= 2) {
            setCurrentMatch([queue[0], queue[1]]);
        }
    };

    const handleWin = (winnerIndex) => {
        const winner = currentMatch[winnerIndex];
        const loser = currentMatch[1 - winnerIndex];
        // Remove first two teams and add winner back at front and loser at end
        setQueue((prevQueue) => [winner, ...prevQueue.slice(2), loser]);
        setCurrentMatch([]);
        setTimeout(startMatch, 0);
    };

    const removeTeam = (index) => {
        setQueue((prevQueue) => prevQueue.filter((_, i) => i !== index));
    };

    return (
        <Box display="flex" height="100vh">
            <Drawer
                variant="permanent"
                anchor="left"
                sx={{
                    width: 300,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {
                        width: 300,
                        boxSizing: "border-box",
                        padding: 2,
                    },
                }}
            >
                <Typography variant="h6">Enter Teams</Typography>
                <TextField
                    multiline
                    rows={4}
                    fullWidth
                    variant="outlined"
                    value={players}
                    onChange={(e) => setPlayers(e.target.value)}
                    placeholder="Enter teams, one per line"
                    margin="normal"
                />
                <Button onClick={addTeams} fullWidth variant="contained">
                    Add Teams
                </Button>
                <Typography variant="subtitle1" mt={2}>
                    Queue
                </Typography>
                <Paper
                    variant="outlined"
                    sx={{ p: 2, height: 400, overflowY: "auto" }}
                >
                    <List>
                        {queue.map((team, index) => (
                            <ListItem
                                key={index}
                                secondaryAction={
                                    <IconButton
                                        edge="end"
                                        onClick={() => removeTeam(index)}
                                    >
                                        x
                                    </IconButton>
                                }
                            >
                                {team}
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            </Drawer>

            <Box
                flexGrow={1}
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <Box width="50%" textAlign="center">
                    <Typography variant="h4" mb={2}>
                        Current Match
                    </Typography>
                    {currentMatch.length === 2 ? (
                        <Paper
                            variant="outlined"
                            sx={{
                                p: 4,
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <Typography variant="h6">
                                {currentMatch[0]}
                            </Typography>
                            <Box>
                                <Button
                                    onClick={() => handleWin(0)}
                                    variant="contained"
                                    sx={{ mr: 2 }}
                                >
                                    Win
                                </Button>
                                <Button
                                    onClick={() => handleWin(1)}
                                    variant="contained"
                                >
                                    Win
                                </Button>
                            </Box>
                            <Typography variant="h6">
                                {currentMatch[1]}
                            </Typography>
                        </Paper>
                    ) : (
                        <Button
                            onClick={startMatch}
                            variant="contained"
                            sx={{ mt: 2 }}
                        >
                            Start Next Match
                        </Button>
                    )}
                </Box>
            </Box>
        </Box>
    );
}

export default App;
