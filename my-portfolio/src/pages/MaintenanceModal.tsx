import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface MaintenanceModalProps {
    isOpen: boolean;
    onClose: () => void;
    onPeek: () => void;
    onPlayGame?: () => void;
    title?: string;
    message?: string;
}

const MaintenanceModal = ({
    isOpen,
    onClose,
    onPeek,
    onPlayGame = () => window.open('/game', '_blank'),
    title = "🚧 Under Maintenance 🚧",
    message = "This section is undergoing maintenance."
}: MaintenanceModalProps) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-sm mx-auto">
                <DialogHeader>
                    <DialogTitle className="text-xl text-center mb-2">
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            {title}
                        </motion.div>
                    </DialogTitle>
                    <motion.p 
                        className="text-sm text-center text-muted-foreground"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        {message}
                    </motion.p>
                </DialogHeader>
                <div className="space-y-3">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full p-3 rounded-lg border border-foreground text-foreground transition-colors focus:outline-none focus:ring-0 active:outline-none"
                        onClick={onPeek}
                    >
                        Take a Peek 👀
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full p-3 rounded-lg bg-primary/10 hover:bg-primary/20 text-foreground transition-colors focus:outline-none focus:ring-0"
                        onClick={onPlayGame}
                    >
                        Play a Game 🎮
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full p-3 rounded-lg bg-primary/10 hover:bg-primary/20 text-foreground transition-colors focus:outline-none focus:ring-0"
                        onClick={onClose}
                    >
                        Never mind 🚪
                    </motion.button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default MaintenanceModal;