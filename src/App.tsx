
import React from 'react';
import { useRoutes } from 'react-router-dom';
import routes from "./routes"
import './App.css'
import { useRef } from "react";
import { motion } from "framer-motion";
import { useFollowPointer } from "./components/useFollowPointer";

const App: React.FC = () => {
  const ref = useRef(null);
  const { x, y } = useFollowPointer(ref);
  const element = useRoutes(routes);

  return (
    <div>
      {element}
      <motion.div
        ref={ref}
        className="fixed rounded-full w-[50px] h-[50px] bg-dark-100 opacity-50 z-50 pointer-events-none"
        animate={{ x, y }}
        transition={{
          ease: "linear",
          type: "spring",
          // damping: 3,
          stiffness: 30,
          // restDelta: 0.1
        }}
      />
    </div>
  );
}

export default App;