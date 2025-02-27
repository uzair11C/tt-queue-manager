import { useEffect, useState } from "react";
import { Box, createTheme, ThemeProvider } from "@mui/material";
import TeamRegistration from "./components/TeamRegistration";
import MatchSection from "./components/MatchSection";
import "./App.css";
import { supabase } from "./supabaseClient";

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

    const GetQueue = async () => {
        let { data } = await supabase.from("Queue").select("*");

        console.log("Queue: ", data);

        setQueue(data);
        setCurrentMatch(data.length >= 2 ? [data[0], data[1]] : []);
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
                    flexDirection: { xs: "column", md: "row" },
                }}
            >
                <TeamRegistration
                    queue={queue}
                    setQueue={setQueue}
                    currentMatch={currentMatch}
                    setCurrentMatch={setCurrentMatch}
                    supabase={supabase}
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
