import { motion } from "framer-motion";
import { useState, useRef } from "react";
import Navigation from "../components/Navigation";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { ExternalLink, GanttChart } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ThemeToggle } from "@/components/ThemeToggle";

import commands from "@/data/commands.json";
import quotes from "@/data/quotes.json";
import jokes from "@/data/jokes.json";

import experiences from "@/data/experiences.json";
import skills from "@/data/skills.json";
import interests from "@/data/interests.json";
import projects from "@/data/projects.json";

import MaintenanceModal from "./MaintenanceModal";


const Index = () => {
    const [activeTab, setActiveTab] = useState("home");
    const [terminalInput, setTerminalInput] = useState("");
    const [selectedJob, setSelectedJob] = useState<number | null>(null);

    const terminalRef = useRef<HTMLInputElement>(null);
    const experienceRef = useRef<HTMLDivElement>(null);

    const [terminalOutput, setTerminalOutput] = useState<string[]>([]);

    const [showMaintenanceModal, setShowMaintenanceModal] = useState(false);
    const [showAboutContent, setShowAboutContent] = useState(false);

    const handleTerminalSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            const command = terminalInput.trim().toLowerCase();
            let outputMessage = "";

            // Check if the command is clear first
            if (command === "/clear") {
                setTerminalOutput([]); // Clear terminal output
                setTerminalInput("");   // Reset the terminal input
                return; // Exit early to prevent processing the "clear" command further
            }

            // Handle special cases like /joke and /quote outside of the commands.json processing
            if (command === "/joke") {
                // Get a random joke from jokes.json
                if (jokes && jokes.length > 0) {
                    const randomJoke = jokes[Math.floor(Math.random() * jokes.length)].joke;
                    outputMessage = randomJoke || "Oops! Could not find a joke.";
                } else {
                    outputMessage = "No jokes available.";
                }
            } else if (command === "/quote") {
                // Get a random quote from quotes.json
                if (quotes && quotes.length > 0) {
                    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)].quote;
                    outputMessage = randomQuote || "Oops! Could not find a quote.";
                } else {
                    outputMessage = "No quotes available.";
                }
            } else {
                // Find the command object from the imported commands.json
                const commandObject = commands.find((cmd) => cmd.command === command);

                if (commandObject) {
                    // If the command is found in commands.json
                    outputMessage = commandObject.output;

                    // Handle other commands like navigation
                    if (command === "/work") {
                        setActiveTab("projects");
                    } else if (command === "/about") {
                        setActiveTab("about");
                    } else if (command === "/home") {
                        setActiveTab("home");
                    } else if (command === "/experience") {
                        setActiveTab("about");
                        setTimeout(() => {
                            experienceRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                        }, 500);
                    }
                } else {
                    // Command not found in commands.json
                    outputMessage = `Error: Command "${command}" not found. Type "/help" for available commands.`;
                }
            }

            // Append the user input and output message to the terminal output
            setTerminalOutput((prev) => [...prev, `> ${command}`, outputMessage]);

            // Clear the terminal input after command is processed
            setTerminalInput("");
        }
    };
    const focusTerminal = () => {
        terminalRef.current?.focus();
    };

    const handleTabChange = (value: string) => {
        // Reset showAboutContent when switching away from "about" tab
        if (value !== "about") {
            setShowAboutContent(false);
        }
        
        if (value === "about" && !showAboutContent) {
            setShowMaintenanceModal(true);
            return;
        }
        setActiveTab(value);
    };

    return (
        <div className="min-h-screen bg-background">
            <Navigation activeTab={activeTab} setActiveTab={handleTabChange} />

            <div className="absolute top-4 right-4 z-50">
                <ThemeToggle />
            </div>

            <main className="container mx-auto px-3 min-h-[calc(100vh-4rem)] flex items-center justify-center">
                <div className="w-full max-w-sm">
                    <Tabs value={activeTab} onValueChange={handleTabChange}>
                        <TabsContent value="home" className="mt-0">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="bg-card rounded-xl p-3 shadow-md space-y-3"
                            >
                                <div className="text-center space-y-2">
                                    <motion.h1 className="text-xl font-bold">
                                        Norsyazwani
                                    </motion.h1>
                                    <motion.p className="text-xs text-muted-foreground">
                                        Building conversations through code.
                                    </motion.p>
                                    <motion.a
                                        href="https://www.linkedin.com/in/syazwanisubri/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M4.98 3C3.88 3 3 3.88 3 4.98v14.04C3 20.12 3.88 21 4.98 21h14.04c1.1 0 1.98-.88 1.98-1.98V4.98C21 3.88 20.12 3 19.02 3H4.98zM8.48 17.1H5.9V10.3h2.58v6.8zm-1.29-7.6c-.83 0-1.5-.68-1.5-1.5 0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5c0 .82-.67 1.5-1.5 1.5zm10.3 7.6h-2.58v-3.3c0-.8-.02-1.8-1.1-1.8-1.1 0-1.27.86-1.27 1.75v3.35H10V10.3h2.48v.93h.03c.34-.64 1.18-1.3 2.42-1.3 2.58 0 3.05 1.7 3.05 3.91v3.27z" />
                                        </svg>
                                        <span>Let's connect!</span>
                                    </motion.a>
                                </div>

                                {/* <motion.div
                                    className="bg-black/90 rounded-lg p-2 font-mono text-green-400 cursor-text h-28 overflow-y-auto text-xs"
                                    onClick={focusTerminal}
                                >
                                    <div className="mb-1 opacity-70 text-xs">Type /help to see all commands</div>
                                    <div className="flex flex-col space-y-1 text-xs">
                                        {terminalOutput.map((line, index) => (
                                            <div key={index}>{line}</div>
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <span>→</span>
                                        <input
                                            ref={terminalRef}
                                            type="text"
                                            value={terminalInput}
                                            onChange={(e) => setTerminalInput(e.target.value)}
                                            onKeyDown={handleTerminalSubmit}
                                            className="bg-transparent border-none outline-none flex-1 text-green-400 text-xs"
                                            placeholder="Type a command..."
                                        />
                                    </div>
                                </motion.div> */}

                                <motion.div
                                    className="bg-black/90 rounded-lg p-2 font-mono text-green-400 cursor-text h-48 min-h-[7rem] max-h-[24rem] overflow-y-auto text-xs resize-y"
                                    onClick={focusTerminal}
                                    style={{ resize: 'vertical' }}
                                >
                                    <div className="mb-1 opacity-70 text-xs select-none">Type /help to see all commands</div>
                                    <div className="flex flex-col space-y-1 text-xs">
                                        {terminalOutput.map((line, index) => (
                                            <div key={index}>{line}</div>
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-1 sticky bottom-0 bg-black/90 pt-1">
                                        <span>→</span>
                                        <input
                                            ref={terminalRef}
                                            type="text"
                                            value={terminalInput}
                                            onChange={(e) => setTerminalInput(e.target.value)}
                                            onKeyDown={handleTerminalSubmit}
                                            className="bg-transparent border-none outline-none flex-1 text-green-400 text-xs"
                                            placeholder="Type a command..."
                                        />
                                    </div>
                                </motion.div>

                            </motion.div>
                        </TabsContent>

                        <TabsContent value="about" className="mt-0">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="bg-card rounded-xl p-3 shadow-md"
                            >
                                <section className="mb-3">
                                    <h2 className="text-base font-bold mb-1.5">About Me</h2>
                                    <p className="text-xs text-foreground leading-tight">
                                        I push the boundaries of AI, AR, and full-stack development to build seamless, human-centric experiences. With a background in interactive solutions and backend optimization, I craft technology that feels intuitive and engaging. To me, every challenge is an opportunity to innovate - blending creativity with technical excellence to bridge technology and human experience.
                                    </p>
                                </section>

                                <section className="mb-3" ref={experienceRef}>
                                    <h2 className="text-base font-bold mb-1.5">Experiences</h2>
                                    <div className="space-y-1.5 pr-1">
                                        {experiences.map((exp, index) => (
                                            <motion.button
                                                key={index}
                                                onClick={() => setSelectedJob(selectedJob === index ? null : index)}
                                                className="w-full text-left p-1.5 rounded-lg hover:bg-muted/50 transition-colors border border-border/30 text-xs"
                                            >
                                                <div className="flex justify-between items-center">
                                                    <span className="font-medium">{exp.position}</span>
                                                    <span className="text-[10px] text-muted-foreground">{exp.year}</span>
                                                </div>
                                                <p className="text-[10px] text-muted-foreground">{exp.company}</p>
                                            </motion.button>
                                        ))}
                                    </div>
                                </section>

                                <section className="mb-3">
                                    <h2 className="text-base font-bold mb-1.5">Skills</h2>
                                    <div className="flex flex-wrap gap-1">
                                        {skills.map((skill, index) => (
                                            <span
                                                key={index}
                                                className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </section>

                                <section>
                                    <h2 className="text-base font-bold mb-1.5">Exploration Interest</h2>
                                    <div className="flex flex-wrap gap-1">
                                        {interests.map((interest, index) => (
                                            <span
                                                key={index}
                                                className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary border border-accent/20"
                                            >
                                                {interest}
                                            </span>
                                        ))}
                                    </div>
                                </section>
                            </motion.div>
                        </TabsContent>

                        <TabsContent value="projects" className="mt-0">
                            <div className="space-y-3">
                                {projects.map((project, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.1 }}
                                        className="bg-card rounded-xl overflow-hidden shadow-md"
                                    >
                                        <div
                                            className="h-24 bg-cover bg-center"
                                            style={{ backgroundImage: `url(${project.image})` }}
                                        />
                                        <div className="p-2.5">
                                            <h3 className="text-sm font-semibold mb-1">{project.title}</h3>
                                            <p className="text-[10px] text-muted-foreground mb-2">{project.description}</p>
                                            <div className="flex gap-2">
                                                <a
                                                    href={project.liveLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-0.5 text-[10px] text-primary hover:text-primary/80 transition-colors"
                                                >
                                                    <ExternalLink size={12} /> Live Demo
                                                </a>
                                                <a
                                                    href={project.githubLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-0.5 text-[10px] text-muted-foreground hover:text-primary transition-colors"
                                                >
                                                    <GanttChart size={12} /> GitHub
                                                </a>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </main>

            <MaintenanceModal
                isOpen={showMaintenanceModal}
                onClose={() => setShowMaintenanceModal(false)}
                onPeek={() => {
                    setShowAboutContent(true);
                    setShowMaintenanceModal(false);
                    setActiveTab("about");
                }}
                onPlayGame={() => window.open('/game', '_blank')}
            />

            <Dialog open={selectedJob !== null} onOpenChange={() => setSelectedJob(null)}>
                <DialogContent className="max-w-xs mx-auto">
                    <DialogHeader>
                        <DialogTitle className="text-base">
                            {selectedJob !== null && experiences[selectedJob].position}
                        </DialogTitle>
                    </DialogHeader>
                    <motion.div className="space-y-2">
                        <div className="text-xs text-muted-foreground">
                            {selectedJob !== null && experiences[selectedJob].company}
                        </div>
                        <div className="text-[10px] text-muted-foreground">
                            {selectedJob !== null && experiences[selectedJob].year}
                        </div>
                        <div className="space-y-1.5">
                            {selectedJob !== null && experiences[selectedJob].points.map((point, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-start gap-1.5 text-xs"
                                >
                                    <span className="text-primary mt-0.5">•</span>
                                    <span>{point}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Index;
