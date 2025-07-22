import React, { useState, type FormEvent  } from 'react'
import { api } from '../../Axios/AdminAxios'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../../Store/store'
import { addAdmin } from '../../Store/Slice/admin/adminSlice'
import { storeAdminToken } from '../../Store/Slice/admin/tokenSlice'
import { useNavigate } from 'react-router-dom'

const AdminLogin = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState('')
    const admin = useSelector((state: RootState) => state.adminAuth.admin)
    const adminToken = useSelector((state: RootState) => state.adminToken.token)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!email || !password) {
            console.log("email and password are required")
            return
        }
        try {
            const adminData = { email, password }
            const response = await api.post("admin/login", { adminData })
            console.log("response.data", response.data)
            dispatch(addAdmin(response.data?.admin))
            dispatch(storeAdminToken(response.data?.token))
            console.log("geeee", adminToken)
            navigate('/admin/users')
        } catch (error) {
            
        }
    }
    
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Admin Login
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={(e) => handleLogin(e)}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email-address" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Enter your Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Enter your Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AdminLogin