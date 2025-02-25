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
    const [queue, setQueue] = useState([]);
    const [currentMatch, setCurrentMatch] = useState([]);

    return (
        <ThemeProvider theme={darkTheme}>
            <Box
                display="flex"
                height="100vh"
                bgcolor="background.default"
                color="text.primary"
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
