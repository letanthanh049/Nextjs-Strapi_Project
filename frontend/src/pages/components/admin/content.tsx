import React from 'react';
import { Table, Breadcrumb, Button } from 'flowbite-react';
import Link from 'next/link';

export const Content = () => {
  return (
    <>
      <div className='h-full w-full px-4 bg-gray-500'>
        <div className='p-4'>
          <Breadcrumb
            aria-label='Default breadcrumb example'
            className='bg-gray-50 py-3 px-5 dark:bg-gray-900'
          >
            <Breadcrumb.Item href='#'>Home</Breadcrumb.Item>
            <Breadcrumb.Item href='#'>Projects</Breadcrumb.Item>
            <Breadcrumb.Item>Flowbite React</Breadcrumb.Item>
          </Breadcrumb>
          <div className='flex justify-between mt-4 '>
            <div className='justify-items-start'>
              <form>
                <div className='w-64'>
                  <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                  </div>
                  <div className='relative w-full'>
                    <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                      <svg
                        aria-hidden='true'
                        className='w-5 h-5 text-gray-500 dark:text-gray-400'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          fill-rule='evenodd'
                          d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                          clip-rule='evenodd'
                        ></path>
                      </svg>
                    </div>
                    <input
                      type='text'
                      id='simple-search'
                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                      placeholder='Search'
                      required
                    />
                  </div>
                </div>
              </form>
            </div>
            <div className='justify-items-end'>
            <Link href='/admin/formproduct'><Button>Thêm sản phẩm mới </Button></Link>
            </div>
          </div>
        </div>
        <div className='px-4'>
          <Table striped={true}>
            <Table.Head>
              <Table.HeadCell>Tên Sản phẩm</Table.HeadCell>
              <Table.HeadCell>Thể loại</Table.HeadCell>
              <Table.HeadCell>Hình ảnh</Table.HeadCell>
              <Table.HeadCell>Mô tả</Table.HeadCell>
              <Table.HeadCell>Giá tiền</Table.HeadCell>
              <Table.HeadCell>
                <span className='sr-only'>Edit</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className='divide-y'>
              <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                  Samsung Galaxy A14'
                </Table.Cell>
                <Table.Cell>Điện thoại</Table.Cell>
                <Table.Cell></Table.Cell>
                <Table.Cell className='w-1/2'>
                  Diện mạo thời thượng và trẻ trung Samsung Galaxy A14 4G được
                  thiết kế với sự thừa hưởng vẻ đẹp tinh tế đến từ dòng sản phẩm
                  cao cấp Galaxy S23 series. Với vẻ đẹp hiện đại, màu sắc thanh
                  lịch và góc cạnh bo tròn tinh tế, những điều này đem đến cho
                  máy một cái nhìn cao cấp hơn về thiết kế để giúp bất kỳ ai khi
                  cầm nắm đều trở nên sang trọng.
                </Table.Cell>
                <Table.Cell>4.590.000₫</Table.Cell>
                <Table.Cell>
                  <a
                    href='/tables'
                    className='font-medium text-blue-600 hover:underline dark:text-blue-500'
                  >
                    Edit
                  </a>
                </Table.Cell>
              </Table.Row>
              <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                  Samsung Galaxy A14'
                </Table.Cell>
                <Table.Cell>Điện thoại</Table.Cell>
                <Table.Cell></Table.Cell>
                <Table.Cell className='w-1/2'>
                  Diện mạo thời thượng và trẻ trung Samsung Galaxy A14 4G được
                  thiết kế với sự thừa hưởng vẻ đẹp tinh tế đến từ dòng sản phẩm
                  cao cấp Galaxy S23 series. Với vẻ đẹp hiện đại, màu sắc thanh
                  lịch và góc cạnh bo tròn tinh tế, những điều này đem đến cho
                  máy một cái nhìn cao cấp hơn về thiết kế để giúp bất kỳ ai khi
                  cầm nắm đều trở nên sang trọng.
                </Table.Cell>
                <Table.Cell>4.590.000₫</Table.Cell>
                <Table.Cell>
                  <a
                    href='/tables'
                    className='font-medium text-blue-600 hover:underline dark:text-blue-500'
                  >
                    Edit
                  </a>
                </Table.Cell>
              </Table.Row>
              <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                  Samsung Galaxy A14
                </Table.Cell>
                <Table.Cell>Điện thoại</Table.Cell>
                <Table.Cell></Table.Cell>
                <Table.Cell className='w-1/2'>
                  Diện mạo thời thượng và trẻ trung Samsung Galaxy A14 4G được
                  thiết kế với sự thừa hưởng vẻ đẹp tinh tế đến từ dòng sản phẩm
                  cao cấp Galaxy S23 series. Với vẻ đẹp hiện đại, màu sắc thanh
                  lịch và góc cạnh bo tròn tinh tế, những điều này đem đến cho
                  máy một cái nhìn cao cấp hơn về thiết kế để giúp bất kỳ ai khi
                  cầm nắm đều trở nên sang trọng.
                </Table.Cell>
                <Table.Cell>4.590.000₫</Table.Cell>
                <Table.Cell>
                  <a
                    href='/tables'
                    className='font-medium text-blue-600 hover:underline dark:text-blue-500'
                  >
                    Edit
                  </a>
                </Table.Cell>
              </Table.Row>
              <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                  Samsung Galaxy A14'
                </Table.Cell>
                <Table.Cell>Điện thoại</Table.Cell>
                <Table.Cell></Table.Cell>
                <Table.Cell className='w-1/2'>
                  Diện mạo thời thượng và trẻ trung Samsung Galaxy A14 4G được
                  thiết kế với sự thừa hưởng vẻ đẹp tinh tế đến từ dòng sản phẩm
                  cao cấp Galaxy S23 series. Với vẻ đẹp hiện đại, màu sắc thanh
                  lịch và góc cạnh bo tròn tinh tế, những điều này đem đến cho
                  máy một cái nhìn cao cấp hơn về thiết kế để giúp bất kỳ ai khi
                  cầm nắm đều trở nên sang trọng.
                </Table.Cell>
                <Table.Cell>4.590.000₫</Table.Cell>
                <Table.Cell>
                  <a
                    href='/tables'
                    className='font-medium text-blue-600 hover:underline dark:text-blue-500'
                  >
                    Edit
                  </a>
                </Table.Cell>
              </Table.Row>
              <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                  Samsung Galaxy A14'
                </Table.Cell>
                <Table.Cell>Điện thoại</Table.Cell>
                <Table.Cell></Table.Cell>
                <Table.Cell className='w-1/2'>
                  Diện mạo thời thượng và trẻ trung Samsung Galaxy A14 4G được
                  thiết kế với sự thừa hưởng vẻ đẹp tinh tế đến từ dòng sản phẩm
                  cao cấp Galaxy S23 series. Với vẻ đẹp hiện đại, màu sắc thanh
                  lịch và góc cạnh bo tròn tinh tế, những điều này đem đến cho
                  máy một cái nhìn cao cấp hơn về thiết kế để giúp bất kỳ ai khi
                  cầm nắm đều trở nên sang trọng.
                </Table.Cell>
                <Table.Cell>4.590.000₫</Table.Cell>
                <Table.Cell>
                  <a
                    href='/tables'
                    className='font-medium text-blue-600 hover:underline dark:text-blue-500'
                  >
                    Edit
                  </a>
                </Table.Cell>
              </Table.Row>
              <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                  Samsung Galaxy A14'
                </Table.Cell>
                <Table.Cell>Điện thoại</Table.Cell>
                <Table.Cell></Table.Cell>
                <Table.Cell className='w-1/2'>
                  Diện mạo thời thượng và trẻ trung Samsung Galaxy A14 4G được
                  thiết kế với sự thừa hưởng vẻ đẹp tinh tế đến từ dòng sản phẩm
                  cao cấp Galaxy S23 series. Với vẻ đẹp hiện đại, màu sắc thanh
                  lịch và góc cạnh bo tròn tinh tế, những điều này đem đến cho
                  máy một cái nhìn cao cấp hơn về thiết kế để giúp bất kỳ ai khi
                  cầm nắm đều trở nên sang trọng.
                </Table.Cell>
                <Table.Cell>4.590.000₫</Table.Cell>
                <Table.Cell>
                  <a
                    href='/tables'
                    className='font-medium text-blue-600 hover:underline dark:text-blue-500'
                  >
                    Edit
                  </a>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>
      </div>
    </>
  );
};
