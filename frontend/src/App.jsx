import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Chatbot from './components/Chatbot';
import ScrollProgressBar from './components/ScrollProgressBar';
import Home from './pages/Home';
import Doctors from './pages/Doctors';
import Login from './pages/Login';
import About from './pages/About';
import Contact from './pages/Contact';
import Appointment from './pages/Appointment';
import MyAppointments from './pages/MyAppointments';
import MyProfile from './pages/MyProfile';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify';
import ClickSpark from "./components/ClickSpark";

// blur transition variants
const pageVariants = {
  initial: { filter: "blur(10px)", opacity: 0 },
  animate: { filter: "blur(0px)", opacity: 1, transition: { duration: 0.5 } },
  exit: { filter: "blur(10px)", opacity: 0, transition: { duration: 0.3 } }
};

//Rotate transition
// const pageVariants = {
//   initial: { rotateY: 90, opacity: 0 },
//   animate: { rotateY: 0, opacity: 1, transition: { duration: 0.6 } },
//   exit: { rotateY: -90, opacity: 0, transition: { duration: 0.4 } }
// };

//Scale in and Scale out transition
// const pageVariants = {
//   initial: { scale: 0.9, opacity: 0 },
//   animate: { scale: 1, opacity: 1, transition: { duration: 0.5 } },
//   exit: { scale: 0.9, opacity: 0, transition: { duration: 0.3 } }
// };

//fade in and fade out transition
// const pageVariants = {
//   initial: { opacity: 0 },
//   animate: { opacity: 1, transition: { duration: 0.5 } },
//   exit: { opacity: 0, transition: { duration: 0.3 } }
// };


const App = () => {
  const location = useLocation(); // Track route changes

  return (
    <div className='mx-4 sm:mx-[10%]'>
      <ClickSpark />
      <ToastContainer />
      <Navbar />

      {/* AnimatePresence for route transitions */}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {[
            { path: '/', Component: Home },
            { path: '/doctors', Component: Doctors },
            { path: '/doctors/:speciality', Component: Doctors },
            { path: '/login', Component: Login },
            { path: '/about', Component: About },
            { path: '/contact', Component: Contact },
            { path: '/appointment/:docId', Component: Appointment },
            { path: '/my-appointments', Component: MyAppointments },
            { path: '/my-profile', Component: MyProfile },
            { path: '/verify', Component: Verify }
          ].map(({ path, Component }) => (
            <Route
              key={path}
              path={path}
              element={
                <motion.div
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <Component />
                </motion.div>
              }
            />
          ))}
        </Routes>
      </AnimatePresence>
      <ScrollProgressBar />
      <Footer />
      <Chatbot />
      

    </div>
  );
};

export default App;
