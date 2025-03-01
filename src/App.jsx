import { useEffect, useState } from "react";
import { Box, createTheme, ThemeProvider } from "@mui/material";
import TeamRegistration from "./components/TeamRegistration";
import MatchSection from "./components/MatchSection";
import "./App.css";
import { supabase } from "./supabaseClient";
import LoadingDialog from "./components/Dialogs/LoadingDialog";

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
    const [loading, setLoading] = useState(false);

    const GetQueue = async () => {
        try {
            setLoading(true);
            let { data } = await supabase.from("Queue").select("*");

            console.log("Queue: ", data);

            setQueue(data);
            setCurrentMatch(data.length >= 2 ? [data[0], data[1]] : []);
        } catch (error) {
            console.log("error in refresh queue: ", error);
        } finally {
            setLoading(false);
        }
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
                    // currentMatch={currentMatch}
                    // setCurrentMatch={setCurrentMatch}
                    supabase={supabase}
                />
                <MatchSection
                    queue={queue}
                    setQueue={setQueue}
                    currentMatch={currentMatch}
                    setCurrentMatch={setCurrentMatch}
                    supabase={supabase}
                />
            </Box>
            <LoadingDialog open={loading} message="Refreshing queue....." />
        </ThemeProvider>
    );
}

export default App;
