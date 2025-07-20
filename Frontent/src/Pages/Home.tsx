import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from "../Store/store"
import { useNavigate, Link } from 'react-router-dom'
import { removeUser } from '../Store/Slice/user/authSlice'

const Home = () => {
    const user = useSelector((state: RootState) => state.auth.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const handlesubmit = () => {
        navigate('/profile')
    }

    const logout = () => {
        navigate('/login')
        dispatch(removeUser())
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            
            <div className="flex justify-between items-center p-6">
                <div className="flex items-center">
                    <h1 className="text-3xl font-bold text-gray-800">User Dashboard</h1>
                </div>
                
                {user && (
                    <div className="flex items-center bg-blue-500 rounded-2xl p-2 shadow-lg">
                        
                        <button 
                            onClick={handlesubmit}
                            className="flex items-center space-x-3 bg-transparent hover:bg-blue-600 text-white px-4 py-2 rounded-xl transition-colors duration-200"
                        >
                            <img 
                                src={user?.profile || 'https://t3.ftcdn.net/jpg/07/95/95/14/360_F_795951406_h17eywwIo36DU2L8jXtsUcEXqPeScBUq.jpg'} 
                                alt="Profile" 
                                className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                            />
                            <span className="font-medium">Profile</span>
                        </button>
                        
                        
                        <button 
                            onClick={logout}
                            className="bg-red-500 hover:bg-red-600 text-white font-medium px-6 py-2 rounded-xl ml-2 transition-colors duration-200 shadow-md"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>

            <div className="px-6">
                {user ? (
                    <div className="max-w-4xl mx-auto">
                        
                        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                            <div className="text-center">
                                <div className="mb-6">
                                    <img 
                                        src={user?.profile || 'https://t3.ftcdn.net/jpg/07/95/95/14/360_F_795951406_h17eywwIo36DU2L8jXtsUcEXqPeScBUq.jpg'} 
                                        alt="Profile" 
                                        className="w-24 h-24 rounded-full object-cover mx-auto border-4 border-blue-200 shadow-lg"
                                    />
                                </div>
                                <h2 className="text-4xl font-bold text-gray-800 mb-4">
                                    Welcome back, {user?.name}! 👋
                                </h2>
                                <p className="text-gray-600 text-lg">
                                    Great to see you again. Hope you're having a wonderful day!
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center">
                        <p className="text-gray-600">Please log in to access your dashboard.</p>
                        <button 
                            onClick={logout}
                            className="bg-red-500 hover:bg-red-600 text-white font-medium px-6 py-2 rounded-xl ml-2 transition-colors duration-200 shadow-md"
                        >
                            Login
                        </button>
                    </div>
                    
                )}
            </div>
        </div>
    )
}

export default Home