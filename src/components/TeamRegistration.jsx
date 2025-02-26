import {
    Button,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    Paper,
    TextField,
    Typography,
} from "@mui/material";
import { Delete, DragIndicator } from "@mui/icons-material";
import { useState } from "react";
import PropTypes from "prop-types";

const TeamRegistration = ({
    queue,
    setQueue,
    currentMatch,
    setCurrentMatch,
}) => {
    const [player1, setPlayer1] = useState("");
    const [player2, setPlayer2] = useState("");

    const addTeam = () => {
        if (player1.trim() !== "" && player2.trim() !== "") {
            setQueue([...queue, `${player1} / ${player2}`]);
            setPlayer1("");
            setPlayer2("");
        } else {
            window.alert("Please enter the team members");
        }
    };

    const removeTeam = (index) => {
        setQueue((prevQueue) => {
            const updatedQueue = prevQueue.filter((_, i) => i !== index);

            // If a team in the current match is removed, update the match
            if (currentMatch.includes(prevQueue[index])) {
                setCurrentMatch(
                    updatedQueue.length >= 2
                        ? [updatedQueue[0], updatedQueue[1]]
                        : []
                );
            }

            return updatedQueue;
        });
    };

    const handleDragStart = (e, index) => {
        e.dataTransfer.setData("text/plain", index);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e, index) => {
        e.preventDefault();
        const draggedIndex = parseInt(e.dataTransfer.getData("text/plain"), 10);
        if (draggedIndex !== index) {
            const updatedQueue = [...queue];
            const [draggedItem] = updatedQueue.splice(draggedIndex, 1);
            updatedQueue.splice(index, 0, draggedItem);
            setQueue(updatedQueue);

            if (updatedQueue.length >= 2) {
                setCurrentMatch([updatedQueue[0], updatedQueue[1]]);
            } else {
                setCurrentMatch([]);
            }
        }
    };

    return (
        <Drawer
            variant="permanent"
            anchor="left"
            sx={{
                width: { xs: "100%", md: "25%" },
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                    width: { xs: "100%", md: "25%" },
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
                sx={{ mt: "5px" }}
            >
                Add Team
            </Button>
            <Typography
                variant="subtitle1"
                fontWeight={700}
                mt={2}
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    pb: 1,
                }}
            >
                Queue
                <IconButton
                    sx={{ border: "1px solid red" }}
                    onClick={() => {
                        setQueue([]);
                        setCurrentMatch([]);
                    }}
                >
                    <Delete fontSize="small" color="error" />
                </IconButton>
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
                            draggable
                            onDragStart={(e) => handleDragStart(e, index)}
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, index)}
                            secondaryAction={
                                <IconButton
                                    edge="end"
                                    onClick={() => removeTeam(index)}
                                >
                                    <Delete fontSize="small" color="error" />
                                </IconButton>
                            }
                            divider={<Divider flexItem />}
                            sx={{
                                cursor: "move",
                                color: "#ffffff",
                                display: "flex",
                                justifyContent: "flex-start",
                                alignItems: "center",
                            }}
                        >
                            <ListItemIcon>
                                <DragIndicator
                                    fontSize="small"
                                    // sx={{
                                    //     mr: "10px",
                                    // }}
                                />
                            </ListItemIcon>
                            {index + 1}. &nbsp;
                            {team}
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </Drawer>
    );
};

export default TeamRegistration;

TeamRegistration.propTypes = {
    queue: PropTypes.arrayOf(PropTypes.string).isRequired,
    setQueue: PropTypes.func.isRequired,
    currentMatch: PropTypes.arrayOf(PropTypes.string).isRequired,
    setCurrentMatch: PropTypes.func.isRequired,
};
