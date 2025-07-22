import axios from 'axios'
import type { RootState } from '../../Store/store'
import React, { useEffect, useState } from 'react'

import { api } from '../../Axios/AdminAxios'
import { useParams } from 'react-router-dom'
import type User from '../../types/User'


const EditUser = () => {
    const [user, setUser] = useState<User | null>(null)
    const { id } = useParams();
    const [ImageUrl, setImageUrl] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [isUploading, setIsUploading] = useState(false)
    const [isUpdating, setIsUpdating] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    console.log("nameeee", name)



    useEffect(() => {
        const fetchUser = async () => {
            if (!id) return;
            console.log("idddd", id);

            try {
                const result = await api.get(`/admin/updateUser/${id}`);
                console.log("fetched user data", result?.data?.userData);
                setUser(result?.data?.userData);
            } catch (error) {
                console.error("API fetch failed", error);
            }
        };

        fetchUser();
    }, [id]);
    useEffect(() => {
        if (user) {
            setName(user?.name);
            setEmail(user?.email);
            setPhone(user?.phone!);
            setImageUrl(user.profile!);
        }
    }, [user]);
    console.log("stasttete", user?.name)

    const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) {
            return
        }

        setIsUploading(true)
        setError('')

        console.log("not file", file)
        const data = new FormData()
        data.append("file", file)
        data.append("upload_preset", "Urer_Management_redux")
        data.append("cloud_name", "dzrms0g2j")

        const url = "https://api.cloudinary.com/v1_1/dzrms0g2j/image/upload";
        try {
            const response = await axios.post(url, data);
            console.log("Uploaded Image URL:", response.data.secure_url);
            const imgurl = response.data.secure_url
            setImageUrl(imgurl)
            setSuccess('Profile picture uploaded successfully!')
        } catch (err) {
            console.error("Cloudinary upload error:", err);
            setError('Failed to upload image. Please try again.')
        } finally {
            setIsUploading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError('')
        setSuccess('')

        if (!name || !email || !phone || !ImageUrl) {
            setError("All fields are required including profile picture")
            return
        }

        setIsUpdating(true)

        const userData = { name, profile: ImageUrl, phone, email }
        try {
            const res = await api.patch('updateProfile', { userData })
            console.log("aaaaaaaaaa", res.data.user)
            setSuccess('Profile updated successfully!')
        } catch (error) {
            setError('Failed to update profile. Please try again.')
        } finally {
            setIsUpdating(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-6">
                        <h1 className="text-3xl font-bold text-white">Edit User Profile</h1>
                        <p className="text-purple-100 mt-2">Update User personal information</p>
                    </div>

                    <div className="px-8 py-8">
                        {/* Success/Error Messages */}
                        {success && (
                            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                                <p className="text-green-600 text-sm">{success}</p>
                            </div>
                        )}

                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                                <p className="text-red-600 text-sm">{error}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Profile Picture Section */}
                            <div className="flex flex-col items-center space-y-4">
                                <div className="relative">
                                    <img
                                        src={ImageUrl || "https://t3.ftcdn.net/jpg/07/95/95/14/360_F_795951406_h17eywwIo36DU2L8jXtsUcEXqPeScBUq.jpg"}
                                        alt="Profile"
                                        className="w-32 h-32 rounded-full object-cover border-4 border-purple-200 shadow-lg"
                                    />
                                    {isUploading && (
                                        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                                        </div>
                                    )}
                                </div>

                                <div className="relative">
                                    <input
                                        type="file"
                                        onChange={handleUpload}
                                        disabled={isUploading || isUpdating}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                                        accept="image/*"
                                    />
                                    <button
                                        type="button"
                                        disabled={isUploading || isUpdating}
                                        className="bg-purple-100 hover:bg-purple-200 disabled:bg-gray-100 text-purple-700 disabled:text-gray-400 px-6 py-2 rounded-lg transition-colors duration-200 font-medium"
                                    >
                                        {isUploading ? 'Uploading...' : 'Change Photo'}
                                    </button>
                                </div>
                            </div>

                            {/* Form Fields */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                        Full Name
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        value={name || ''}
                                        onChange={(e) => setName(e.target.value)}
                                        disabled={isUpdating}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors disabled:bg-gray-50 disabled:text-gray-500"
                                        placeholder="Enter full name"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                        Phone Number
                                    </label>
                                    <input
                                        id="phone"
                                        type="tel"
                                        value={phone || ''}
                                        onChange={(e) => setPhone(e.target.value)}
                                        disabled={isUpdating}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors disabled:bg-gray-50 disabled:text-gray-500"
                                        placeholder="Enter phone number"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={email || ''}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={isUpdating}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors disabled:bg-gray-50 disabled:text-gray-500"
                                    placeholder="Enter email address"
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-center pt-6">
                                <button
                                    type="submit"
                                    disabled={isUpdating || isUploading}
                                    className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:cursor-not-allowed"
                                >
                                    {isUpdating ? (
                                        <span className="flex items-center">
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Updating Profile...
                                        </span>
                                    ) : (
                                        'Update Profile'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditUser