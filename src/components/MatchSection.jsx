import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";

const MatchSection = ({ queue, setQueue, currentMatch, setCurrentMatch }) => {
    const startMatch = () => {
        if (queue.length >= 2) {
            setCurrentMatch([queue[0], queue[1]]);
        }
    };

    const handleWin = (winnerIndex) => {
        const winner = currentMatch[winnerIndex];
        const loser = currentMatch[1 - winnerIndex];
        setQueue((prevQueue) => [winner, ...prevQueue.slice(2), loser]);
        setCurrentMatch([]);
    };
    return (
        <Box
            flexGrow={1}
            display="flex"
            justifyContent="center"
            alignItems="center"
        >
            <Box width="50%" textAlign="center">
                <Typography variant="h3" fontWeight={800} mb={1}>
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
                            width="100%"
                        >
                            <Typography variant="h5">
                                {currentMatch[0]}
                            </Typography>
                            <Typography variant="h4" fontWeight={800}>
                                vs
                            </Typography>
                            <Typography variant="h5">
                                {currentMatch[1]}
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
                                {currentMatch[0]} Win
                            </Button>
                            <Button
                                onClick={() => handleWin(1)}
                                variant="contained"
                                color="secondary"
                            >
                                {currentMatch[1]} Win
                            </Button>
                        </Stack>
                    </Paper>
                ) : (
                    <Button
                        onClick={startMatch}
                        variant="contained"
                        color="success"
                        sx={{ mt: 2 }}
                    >
                        Start Next Match
                    </Button>
                )}
            </Box>
        </Box>
    );
};

export default MatchSection;

MatchSection.propTypes = {
    queue: PropTypes.arrayOf(PropTypes.string).isRequired,
    setQueue: PropTypes.func.isRequired,
    currentMatch: PropTypes.arrayOf(PropTypes.string).isRequired,
    setCurrentMatch: PropTypes.func.isRequired,
};
