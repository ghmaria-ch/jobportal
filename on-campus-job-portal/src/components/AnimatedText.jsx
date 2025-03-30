import { motion } from "framer-motion";

const AnimatedText = () => {
  return (
      <motion.h1
      initial={{ scale: 1, opacity: 0.7 }}
      animate={{ scale: 1.2, opacity: 1 }}
      transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
      className="text-5xl bg-white  md:text-5xl font-extrabold text-blue-700 text-center mt-6  "
        >
      Find Your Dream Job on Campus!
        </motion.h1>
);
};

export default AnimatedText;
