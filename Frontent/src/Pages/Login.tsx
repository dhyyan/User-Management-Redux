// import { useState, type FormEvent } from 'react'
// import { api } from '../Axios/axios'
// import { useNavigate } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux'
// import { addUser } from '../Store/Slice/user/authSlice'
// import type { RootState } from '../Store/store'
// import { storeToken } from '../Store/Slice/user/tokenSlice'

// const Login = () => {
//     const [email, setEmail] = useState("")
//     const [password, setPassword] = useState("")

//     const navigate = useNavigate()
//     const dispatch = useDispatch()
//     const user = useSelector((state: RootState) => state.auth.user) 
//     const handlesubmit = async (e: FormEvent<HTMLFormElement>) => {
//         e.preventDefault()
//         if (!email || !password) {
//             return console.log("must fill all fields")
//         }
//         try {
//             const response = await api.post('login', {
//                 email,
//                 password
//             })
//             console.log("Login success", response.data.user)
//             dispatch(addUser(response.data.user))
//             dispatch(storeToken(response.data.token))

//             navigate('/home')
//         } catch (error) {
//         console.log(error)
//         }
//     }



//     return (
//         <div>
//             <h1>Login</h1>
//             <form onSubmit={(e) => handlesubmit(e)} >
//                 <label htmlFor="">Name</label>
//                 <input type="email" placeholder='eneter email' onChange={(e) => setEmail(e.target.value)} />

//                 <label htmlFor="">Password</label>
//                 <input type="password" placeholder='*********' onChange={(e) => setPassword(e.target.value)} />
//                 <button type='submit'>Login</button>
//             </form>
//         </div>
//     )
// }

// export default Login




import { useState, type FormEvent } from 'react'
import { api } from '../Axios/axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../Store/Slice/user/authSlice'
import type { RootState } from '../Store/store'
import { storeToken } from '../Store/Slice/user/tokenSlice'

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector((state: RootState) => state.auth.user) 
    
    const handlesubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError("")
        
        if (!email || !password) {
            setError("Please fill in all fields")
            return
        }
        
        setIsLoading(true)
        
        try {
            const response = await api.post('login', {
                email,
                password
            })
            console.log("Login success", response.data.user)
            dispatch(addUser(response.data.user))
            dispatch(storeToken(response.data.token))

            navigate('/home')
        } catch (error: any) {
            console.log(error)
            setError(error.response?.data?.message || "Login failed. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="bg-white rounded-xl shadow-lg p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
                        <p className="text-gray-600">Sign in to your account</p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-red-600 text-sm">{error}</p>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handlesubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>
                            <input 
                                id="email"
                                type="email" 
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors placeholder-gray-400"
                                disabled={isLoading}
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <input 
                                id="password"
                                type="password" 
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors placeholder-gray-400"
                                disabled={isLoading}
                            />
                        </div>

                        <button 
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Signing in...
                                </span>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="mt-8 text-center">
                        <p className="text-sm text-gray-600">
                            Don't have an account?{' '}
                            <button 
                                onClick={() => navigate('/signup')}
                                className="text-indigo-600 hover:text-indigo-500 font-medium"
                            >
                                Sign up
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login