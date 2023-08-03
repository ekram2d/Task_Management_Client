import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import Navbar from '../pages/Navbar';
import Footer from '../pages/Footer';

const Main = () => {
      return (
            <div className='w-[80%]  mx-auto'>

                  <Navbar className="mb-7"></Navbar>

                  <Outlet></Outlet>
                  <Footer className="mt-6"></Footer>

            </div>
      );
};

export default Main;