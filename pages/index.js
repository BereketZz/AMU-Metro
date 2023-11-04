import { Footer, Navbar } from '../components';
import { useContext } from 'react';
import { About, Explore, Feedback, GetStarted, Hero, Insights, WhatsNew, World } from '../sections';
import { AuthContext } from '../Context/AuthContext';

const Page = () =>{
  const {toggleTheme,isDarkMode}= useContext(AuthContext)
  return(
    <div className={`${isDarkMode?"bg-primary-black":"bg-white"} overflow-hidden`}>
      <Navbar />
      <Hero />
      <About />
      <Explore />
      <GetStarted />
      <Footer />
    </div>
  );
} 

export default Page;
