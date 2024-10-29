import { Link, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { close, menu, logo } from '../assets';
import { AuthContext } from '../components/AuthContext';

function Navbar() {
  const { isAuthenticated, role, logout } = useContext(AuthContext);
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();

  const logoutClick = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="w-full flex py-6 justify-between items-center navbar z-[30]">
      <img src={logo} alt="name" className='w-[170px] h-[50px]' />
      <ul className="list-none sm:flex hidden justify-end items-center flex-1">
        <li className={`font-poppins font-normal cursor-pointer text-[16px] text-white mr-10`}>
          <Link to="/" className='hover:text-blue-400 transition-all duration-300'>Home</Link>
        </li>

        {!isAuthenticated ? (
          <>
            <li className={`font-poppins font-normal cursor-pointer text-[16px] text-white mr-10`}>
              <Link to="/login" className='hover:text-blue-400 transition-all duration-300'>Login</Link>
            </li>
            <li className={`font-poppins font-normal cursor-pointer text-[16px] text-white mr-10`}>
              <Link to="/register" className='hover:text-blue-400 transition-all duration-300'>Register</Link>
            </li>
          </>
        ) : (
          <>
            {role === 'Customer' && (
              <>
                <li className={`font-poppins font-normal cursor-pointer text-[16px] text-white mr-10`}>
                  <Link to="/create" className='hover:text-blue-400 transition-all duration-300'>Create Transaction</Link>
                </li>
                <li className={`font-poppins font-normal cursor-pointer text-[16px] text-white mr-10`}>
                  <Link to="/read" className='hover:text-blue-400 transition-all duration-300'>View Transactions</Link>
                </li>
              </>
            )}
            {role === 'Employee' && (
              <li className={`font-poppins font-normal cursor-pointer text-[16px] text-white mr-10`}>
                <Link to="/view" className='hover:text-blue-400 transition-all duration-300'>View All Transactions</Link>
              </li>
            )}
            <button
              className="font-poppins font-normal cursor-pointer text-[16px] text-white mr-10 hover:text-blue-400 transition-all duration-300"
              onClick={logoutClick}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  logoutClick();
                }
              }}
              aria-label="Logout"
            >
              Logout
            </button>
          </>
        )}
      </ul>

      {/* Mobile menu */}
      <div className='sm:hidden flex flex-1 justify-end items-center'>
        <button
          type="button"
          onClick={() => setToggle((prev) => !prev)}
          className="cursor-pointer"
          aria-label="Toggle menu"
        >
          {toggle ? <img src={close} alt="Close menu" /> : <img src={menu} alt="Open menu" />}
        </button>

        <div className={`${toggle ? 'flex' : 'hidden'} p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}>
          <ul className="list-none flex justify-end items-center flex-1 flex-col">
            <li className={`font-poppins font-normal cursor-pointer text-[16px] text-white mb-4`}>
              <Link to="/">Home</Link>
            </li>
            {!isAuthenticated ? (
              <>
                <li className={`font-poppins font-normal cursor-pointer text-[16px] text-white mb-4`}>
                  <Link to="/login">Login</Link>
                </li>
                <li className={`font-poppins font-normal cursor-pointer text-[16px] text-white mb-4`}>
                  <Link to="/register">Register</Link>
                </li>
              </>
            ) : (
              <>
                {role === 'Customer' && (
                  <>
                    <li className={`font-poppins font-normal cursor-pointer text-[16px] text-white mb-4`}>
                      <Link to="/create">Create</Link>
                    </li>
                    <li className={`font-poppins font-normal cursor-pointer text-[16px] text-white mb-0`}>
                      <Link to="/read">Read</Link>
                    </li>
                  </>
                )}
                {role === 'Employee' && (
                  <li className={`font-poppins font-normal cursor-pointer text-[16px] text-white mb-0`}>
                    <Link to="/view">View All Transactions</Link>
                  </li>
                )}
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
