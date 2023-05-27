import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Checkbox = () => {
  const [listchecked, setListchecked] = useState([])

  const handleCheckboxChange = (id) => {
    if (listchecked.includes(id)) {
      setListchecked(listchecked.filter(item => item !== id))
    } else {
      const data = [...listchecked, id]
      setListchecked(data);
    }

  };
  console.log(listchecked)
  const [categories, setCategory] = useState([])
  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(`http://localhost:1337/api/danhmucs?fields[0]=TenDM&populate[Theloai][fields][0]=TenTL`,
        {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 44e1c4adc864717c17b7fc4c0d884aaf8cffbc57c1b937a36d168acd9bdbe535e56d1adbd934ef9355fc6462f8309dbad3606ca31b392c5191d2bd00f78a22edb58c5d46b71849cbc50b8fa8b8bb36c330ae69afe7ca86feff04cc31057ef726d0087b4e9ff748f88cb8977de146c1349133ca86d8d7698db77da8fc9a7d8e24'
          }
        })
      console.log(res.data.data)
      setCategory(res.data.data)
    }
    fetchData()
  }, [])
  return (
    <>
      <div className='flex flex-col'>
        <p className='text-black mb-2'>Tìm kiếm theo danh mục:</p>
        {categories.map((item) => (
          <div key={item.id}>
            <label className='text-black px-2'>
              <input
                className='mr-2'
                type='checkbox'
                checked={listchecked.includes(item.id)}
                onChange={() => handleCheckboxChange(item.id)}
              />
              {item.attributes.TenDM}
            </label>
            <div className='flex flex-col m-2'>
              {!listchecked.includes(item.id) ||
                item.attributes.Theloai.data.map((child) => (
                  <label key={child.id} className='text-black px-2'>
                    <input
                      type='radio'
                      className='mr-2'
                      name={`child-${item.id}`}
                      value={child.id}
                    />
                    {child.attributes.TenTL}
                  </label>
                ))
              }

            </div>

          </div>

        ))

        }



      </div>

    </>
  )
}

export default Checkbox