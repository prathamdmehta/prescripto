import React, { useContext, useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import gsap from 'gsap';

const Navbar = () => {
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);
  const { token, setToken, userData } = useContext(AppContext);

  const logout = () => {
    localStorage.removeItem('token');
    setToken(false);
    navigate('/login');
  };

  useEffect(() => {
    // GSAP Timeline for staggered animation
    const tl = gsap.timeline();
    tl.fromTo(
      '.nav-item', // Target nav links and button
      { opacity: 0, y: -30 }, // Initial state
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.2, // Delay between items
      }
    );
  }, []); // Empty dependency array ensures it runs on mount

  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-[#ADADAD]'>
      <img
        onClick={() => navigate('/')}
        className='w-44 cursor-pointer'
        src={assets.logo}
        alt=""
      />
      <ul className='md:flex items-start gap-5 font-medium hidden'>
        <NavLink to='/' >
          <li className='nav-item py-1'>HOME</li>
        </NavLink>
        <NavLink to='/doctors' >
          <li className='nav-item py-1'>ALL DOCTORS</li>
        </NavLink>
        <NavLink to='/about' >
          <li className='nav-item py-1'>ABOUT</li>
        </NavLink>
        <NavLink to='/contact' >
          <li className='nav-item py-1'>CONTACT</li>
        </NavLink>
        <a target="_blank" href="http://prescriptobypm-admin.onrender.com/" className="border px-5 text-xs py-1.5 rounded-full">Admin Panel</a>
      </ul>

      <div className='flex items-center gap-4 '>
        {token && userData ? (
          <div className='flex items-center gap-2 cursor-pointer group relative'>
            <img className='w-8 rounded-full' src={userData.image} alt="" />
            <img className='w-2.5' src={assets.dropdown_icon} alt="" />
            <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
              <div className='min-w-48 bg-gray-50 rounded flex flex-col gap-4 p-4'>
                <p onClick={() => navigate('/my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                <p onClick={() => navigate('/my-appointments')} className='hover:text-black cursor-pointer'>My Appointments</p>
                <p onClick={logout} className='hover:text-black cursor-pointer'>Logout</p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className='nav-item bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block'
          >
            Create account
          </button>
        )}
        <img
          onClick={() => setShowMenu(true)}
          className='w-6 md:hidden'
          src={assets.menu_icon}
          alt=""
        />

        {/* ---- Mobile Menu ---- */}
        <div
          className={`md:hidden ${
            showMenu ? 'fixed w-full' : 'h-0 w-0'
          } right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}
        >
          <div className='flex items-center justify-between px-5 py-6'>
            <img src={assets.logo} className='w-36' alt="" />
            <img
              onClick={() => setShowMenu(false)}
              src={assets.cross_icon}
              className='w-7'
              alt=""
            />
          </div>
          <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
            <NavLink
              onClick={() => setShowMenu(false)}
              to='/'
            >
              <p className='px-4 py-2 rounded full inline-block'>HOME</p>
            </NavLink>
            <NavLink
              onClick={() => setShowMenu(false)}
              to='/doctors'
            >
              <p className='px-4 py-2 rounded full inline-block'>ALL DOCTORS</p>
            </NavLink>
            <NavLink
              onClick={() => setShowMenu(false)}
              to='/about'
            >
              <p className='px-4 py-2 rounded full inline-block'>ABOUT</p>
            </NavLink>
            <NavLink
              onClick={() => setShowMenu(false)}
              to='/contact'
            >
              <p className='px-4 py-2 rounded full inline-block'>CONTACT</p>
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
// updated
