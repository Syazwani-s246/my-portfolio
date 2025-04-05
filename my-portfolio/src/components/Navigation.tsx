
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface NavigationProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const Navigation = ({ activeTab, setActiveTab }: NavigationProps) => {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b"
    >
      <nav className="container mx-auto h-14">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
          <TabsList className="grid w-full grid-cols-3 h-full rounded-none bg-transparent">
            <TabsTrigger value="home" className="data-[state=active]:bg-background text-xs">
              Home
            </TabsTrigger>
            <TabsTrigger value="about" className="data-[state=active]:bg-background text-xs">
              About
            </TabsTrigger>
            <TabsTrigger value="projects" className="data-[state=active]:bg-background text-xs">
              Projects
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </nav>
    </motion.header>
  );
};

export default Navigation;
