import React, { useEffect } from 'react'
import { Layout } from '../layout'
import { useState } from 'react'
import { Slider } from '@mui/material'
import axios from 'axios'
import Checkbox from './Checkbox'
import { Button } from 'flowbite-react'
import { ProductCard } from '../product_card'



const Search = () => {
  const marks = [
    {
      value: 0,
      label: '0 VND'
    },
    {
      value: 50000000,
      label: '50 triệu VND'
    },
    {
      value: 100000000,
      label: '100 triệu VND'
    }

  ]
  function valuetext(value: number) {
    return `${value} VND`
  }
  const [value, setValue] = useState([0, 100000000])
  const [listchecked, setListchecked] = useState([])
  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  const handleReset = () => {
    setValue([0, 100000000])
  }
  console.log(listchecked)


  return (
    <>
      <Layout title={'Tìm kiếm'} maxwidth='max-w-screen-xl'>
        <div className='grid grid-cols-4 gap-4 '>
          <div className='col-span-1 pr-14 border-r-[1px] border-black  relative'>
            <div className="relative hidden md:block w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 cursor-pointer">
                <svg className="w-5 h-5  text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                <span className="sr-only ">Search icon</span>
              </div>
              <input type="text" id="search-navbar" className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Tìm kiếm..." />
            </div>
            <div className='py-4'>
              <p className=' text-black'>Tìm kiếm trong khoảng:</p>
              <Slider
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                min={0}
                max={100000000}
                getAriaValueText={valuetext}
                marks={marks}
              />
            </div>
            <Checkbox />
            <div className='flex flex-row-reverse gap-4 mt-4 right-0'>
              <Button>Tìm kiếm</Button>
              <Button className='flex bg-red-600' onClick={handleReset}>Reset</Button>
            </div>
            {/* <Category /> */}


          </div>
          <div className='col-span-3'>
            {<p className="text-black">Không có sản phẩm nào để hiển thị</p> && <div className='w-full'>
              <div className='w-full flex flex-wrap'>
                <ProductCard discount={false} href="/sanpham/AppleWatch" image="3ConChimNon" title="3 con chim non" price="1300000" />
                <ProductCard discount={false} href="/sanpham/AppleWatch" image="ab150" title="AB150 ABS T4/2022" price="54000000" />
                <ProductCard discount={true} href="/sanpham/AppleWatch" image="AppWatch" title="Apple Watch" price="7300000" dprice="6400000" />
                <ProductCard discount={false} href="/sanpham/AppleWatch" image="nissanalmera" title="Nissan Almera" price="505000000" />
                <ProductCard discount={true} href="/sanpham/AppleWatch" image="SH125" title="Hona SH 125" price="78000000" dprice="77990000" />
                <ProductCard discount={false} href="/sanpham/AppleWatch" image="Sony Wh-xb700" title="Tai nghe Sony Wh-xb700" price="750000" />
                <ProductCard discount={true} href="/sanpham/AppleWatch" image="ultrawatch" title="Đồng hồ Ultrawatch" price="23990000" dprice="19990000" />
                <ProductCard discount={false} href="/sanpham/AppleWatch" image="vongtaythongminh" title="Vòng tay thông minh" price="6800000" />
              </div>
            </div>}
          </div>
        </div>
      </Layout>
    </>
  )
}

export default Search