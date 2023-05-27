
import React, { useState, useEffect, PropsWithChildren } from 'react'
import Link from 'next/link'
import Image from 'next/image'
// import THieuSleeper from '../../../images/THieuSleeper.jpg'
import { Dropdown, Avatar } from 'flowbite-react'
import * as localStorage from 'local-storage';

const Navbar = (props:PropsWithChildren)=>{
    // const [loginstatus, setLoginstatus] = useState(true);
    // const [username, setUsername] =  useState();
    // const [email, setEmail] =  useState();

    // const login = () => setLoginstatus(true)
    // const logout = () => {
    //     setLoginstatus(false);
    //     localStorage.clear()
    // }

    // const myCheckProfile = () => { 
    //     if (localStorage.get("Profile") === null) useEffect(() => {logout()},[]);
    //     else {
    //         useEffect(() => {
    //             login()
    //             setUsername(localStorage.get('Profile')['user']['username']);
    //             setEmail(localStorage.get('Profile')['user']['email'])
    //         },[]);
    //     }
    // }
    // myCheckProfile()
    // return(
    //     <div className="w-full"> 
    //         {/* Custom o trang https://flowbite.com/docs/components/navbar/ */}
    //         <nav className="bg-white border-gray-200 dark:bg-gray-900">
    //             <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl px-4 md:px-6 py-2.5">
    //                 <a href="#" className="flex items-center">
    //                     <img src="https://flowbite.com/docs/images/logo.svg" className="h-6 mr-3 sm:h-9" alt="Flowbite Logo" />
    //                     <span className="self-center text-xl text-black font-semibold whitespace-nowrap dark:text-white">HTTC Store</span>
    //                 </a>
    //                 <div className="flex md w-96">
    //                     <div className="relative hidden md:block w-full">
    //                         <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
    //                             <svg className="w-5 h-5 text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
    //                             <span className="sr-only">Search icon</span>
    //                         </div>
    //                         <input type="text" id="search-navbar" className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Tìm kiếm..." />
    //                     </div>
    //                 </div>
    //                 <div className="flex items-center">
    //                     {loginstatus
    //                         ? <>
    //                             <Dropdown label={<>
    //                                 <Avatar img="/THieuSleeper.jpg" rounded bordered size="sm" />
    //                                 <span className='text-black font-medium text-sm ml-2'>{username}</span>
    //                             </>}
    //                                 pill
    //                                 outline
    //                                 color="blue"
    //                                 size=""
    //                             >
    //                                 <Dropdown.Header>
    //                                     <span className="block text-sm font-medium">
    //                                         {username}
    //                                     </span>
    //                                     <span className="block truncate text-sm">
    //                                         {email}
    //                                     </span>
    //                                 </Dropdown.Header>
    //                                 <Dropdown.Item>
    //                                     <Link href="/user/profileshop">Tạo Profile Shop</Link>
    //                                 </Dropdown.Item>
    //                                 <Dropdown.Item>
    //                                     <Link href="/user/quanlytaikhoan">Quản lý tài khoản</Link>
    //                                 </Dropdown.Item>
    //                                 <Dropdown.Divider />
    //                                 <Dropdown.Item onClick={() => logout()}>
    //                                     Đăng xuất
    //                                 </Dropdown.Item>
    //                             </Dropdown>
    //                         </>
    //                         : <>
    //                             <button type="button" className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-3.5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"><Link href='../../account/SignIn'>Đăng nhập</Link></button>
    //                             <button type="button" className="text-white ml-2 bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-full text-sm px-3.5 py-2.5 text-center mr-3 md:mr-0 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"><Link href='../../account/SignUp'>Đăng ký</Link></button>
    //                         </>
    //                     }

    //                 </div>
    //             </div>
    //         </nav>
    //         <nav className="bg-gray-50 dark:bg-gray-700 flex items-center">
    //             <div className="max-w-screen-xl px-4 py-3 mx-auto md:px-6">
    //                 <div className="flex items-center">
    //                     <ul className="flex flex-row mt-0 mr-6 space-x-8 text-sm font-medium">
    //                         <li>
    //                             <Link href="/" className="text-base text-gray-900 dark:text-white hover:underline" aria-current="page">Trang chủ</Link>
    //                         </li>
    //                         <li>
    //                             <Link href="/sanpham" className="text-base text-gray-900 dark:text-white hover:underline">Sản phẩm</Link>
    //                         </li>
    //                         <li>
    //                             <a href="#" className="text-base text-gray-900 dark:text-white hover:underline">Danh mục</a>
    //                         </li>
    //                         <li>
    //                             <a href="#" className="text-base text-gray-900 dark:text-white hover:underline">Thương hiệu</a>
    //                         </li>
    //                     </ul>
    //                 </div>
    //             </div>
    //         </nav>
    //     </div>
    // )
}
export default Navbar;