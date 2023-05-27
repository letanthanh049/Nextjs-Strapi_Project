import {
  Button,
  FileInput,
  Label,
  Select,
  TextInput,
  Textarea,
} from "flowbite-react";
import React,{useState} from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { NumericFormat } from "react-number-format";

const FormProduct = () => {
    const [value, setValue] = useState(0);

  // format the value as Vietnamese dong with 4 decimal places
  const formattedValue = value.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 4
  });
  return (
    <div className="w-full ">
      <div className="bg-gray-400 h-full ">
        <div className="flex flex-col gap-4 p-8 ml-35">
          <div className="bg-yellow-300 ml-10 w-11/12 h-5/6 p-8 rounded-lg">
            <div  className="text-lg">
              <Label style={{ fontSize: '18px' }}>Tên sản phẩm</Label>
              <TextInput
                id="small"
                className=" w-7/12"
                type="text"
                sizing="sm"
              />
            </div>
            <div>
              <div className="mb-2 block pt-4">
                <Label style={{ fontSize: '18px' }}>Thể loại</Label>
              </div>
              <Select className=" w-7/12" id="countries" required={true}>
                <option>Điện thoại</option>
                <option>Laptop</option>
                <option>Bàn ghế</option>
                <option>Quần áo</option>
                <option>Giày dép</option>
                <option>Túi xách</option>
                <option>Nhạc cụ</option>
                <option>Kem đánh răng</option>
              </Select>
            </div>
            <div>
              <div className="mb-2 pt-4 block ">
                <Label style={{ fontSize: '18px' }}>Số lượng</Label>
              </div>
              <NumericFormat
                className="w-full text-3xl font-bold text-gray-900"
                displayType="text"
                thousandSeparator={true}
                suffix="₫"
              />
             <TextInput
                id="number"
                className=" w-7/12"
                type="number"
                sizing="sm"
              />
            </div>
            <div>
              <div className="mb-2 block pt-4">
                <Label style={{ fontSize: '18px' }}>Giá tiền</Label>
              </div>
              <TextInput
                id="small"
                className=" w-7/12"
                type="number"
                sizing="sm"
              />
            </div>
            <div>
              <div className="mb-2 block pt-4">
                <Label style={{ fontSize: '18px' }}>Đường dẫn website</Label>
              </div>
              <TextInput
                id="small"
                className=" w-7/12"
                type="url"
                sizing="sm"
              />
            </div>
            <div>
              <div className="mb-2 block pt-4">
                <Label style={{ fontSize: '18px' }}>Hình ảnh</Label>
              </div>
              <FileInput
                className=" w-7/12"
                id="FileInput"
              />
            </div>
            <div>
              <div className="mb-2 block pt-4">
                <Label style={{ fontSize: '18px' }}>Mô tả sản phẩm</Label>
              </div>
              <div className="w-7/12 border-4 bg-gray-600 h-56">
                <Editor
                     toolbarClassName="toolbarClassName"
                     wrapperClassName="wrapperClassName"
                     editorClassName="editorClassName"
                />
                </div>
            </div>
            <Button className="mt-10 w-7/12">Tạo sản phẩm</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FormProduct;
