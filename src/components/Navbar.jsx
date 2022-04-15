import React, {useState} from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useHistory } from 'react-router-dom'
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoCloseOutline } from 'react-icons/io5'

const Navbar = () => {
  const { currentUser, logout} = useAuth()
  const [error, setError] = useState('')
  const [toggleMenu, setToggleMenu] = useState(false)
  const history = useHistory()

  async function handleLogout(){
    setError('');

    try{
            await logout()
            history.pushState('/login')
    } catch{
        setError('Failed to log out')
    }
}



  return (
          <div>
            {!currentUser && (
                 <div>
                 <nav className='app__navbar'>
                       
                       <ul className='app__navbar-links'>
                           <li><a href='/registration'>Register</a></li>
                           <li><a href="/login">Login</a></li>
                       </ul>
                   </nav>
                 </div>
            )}
           
          {currentUser && (

          <div>
                <nav className='app__navbar'>
                  
                    <ul className='app__navbar-links'>
                        <li>Signed In as: {currentUser.email}</li>
                        <li onClick={handleLogout}>Logout</li>
                    </ul>
                </nav>

                
              </div>
          )}
          <div className='app__navbar-smallscreen'>
            <div className='app__navbar-smallscreen-logo'>
              <GiHamburgerMenu color="#FFFFFF" onClick={() => setToggleMenu(true)} />
            </div>

            {toggleMenu && (
              <div className='app__navbar-smallscreen-overlay flex-center slide-bottom'>
                  <IoCloseOutline color='#FFFFFF' className='overlay_close' onClick={() =>setToggleMenu(false)} />
                  {!currentUser && (
                 <div>
                 <nav>
                       
                       <ul className='app__navbar-smallscreen_links'>
                           <li><a href='/registration'>Register</a></li>
                           <li><a href="/login">Login</a></li>
                       </ul>
                   </nav>
                 </div>
            )}
                  {currentUser && (
                     <div>
                     <nav>
                       
                         <ul className='app__navbar-smallscreen_links'>
                             <li><a href=''>Signed In as: {currentUser.email}</a></li>
                             <li onClick={handleLogout}><a href="">Logout</a></li>
                         </ul>
                     </nav>
     
                     
                   </div>
                  )}
              </div>
            )}
          </div>
                
          </div>
      
          
      )
    

  
   

    
  
}

export default Navbar
