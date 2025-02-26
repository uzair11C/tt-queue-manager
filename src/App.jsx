import { useState } from "react";
import { Box, createTheme, ThemeProvider } from "@mui/material";
import TeamRegistration from "./components/TeamRegistration";
import MatchSection from "./components/MatchSection";
import "./App.css";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
        background: { default: "#121212" },
        text: { primary: "#ffffff" },
    },
});

function App() {
    const [queue, setQueue] = useState(
        JSON.parse(localStorage.getItem("queue")) || []
    );
    const [currentMatch, setCurrentMatch] = useState(
        queue.length >= 2 ? [queue[0], queue[1]] : []
    );

    return (
        <ThemeProvider theme={darkTheme}>
            <Box
                height="100vh"
                bgcolor="background.default"
                color="text.primary"
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                }}
            >
                <TeamRegistration
                    queue={queue}
                    setQueue={setQueue}
                    currentMatch={currentMatch}
                    setCurrentMatch={setCurrentMatch}
                />
                <MatchSection
                    queue={queue}
                    setQueue={setQueue}
                    currentMatch={currentMatch}
                    setCurrentMatch={setCurrentMatch}
                />
            </Box>
        </ThemeProvider>
    );
}

export default App;
