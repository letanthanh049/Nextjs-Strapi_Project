import React from "react";
import { Button, FileInput, Label, Select, TextInput, Textarea } from "flowbite-react";
import { NumericFormat } from "react-number-format";
export const FormProduct = () => {
  return (
      <div className="flex flex-col gap-4 p-8 ml-35">
        <div className="ml-10 w-11/12 h-5/6 p-8 rounded-lg">
          <label>THêm quản lý sản phẩm</label>
          <div className="text-lg">
            <Label style={{ fontSize: "18px" }}>Tên sản phẩm</Label>
            <TextInput id="small"
                        color='white' 
                        style={{backgroundColor:'#FFFFFF', width:'58.333333%'}} 
                         type="text" 
                         sizing="sm" />
          </div>
          <div>
            <div className="mb-2 block pt-4">
              <Label style={{ fontSize: "18px" }}>Thể loại</Label>
            </div>
            <Select style={{backgroundColor:'#FFFFFF'}} className=" w-7/12"  id="countries" required={true}>
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
            <div className="mb-2 pt-4  block">
              <Label style={{ fontSize: "18px" }}>Số lượng</Label>
              <TextInput id="small"
                          type="number"
                          min="0"
                          max="10"
                          style={{backgroundColor:'#FFFFFF', width:'58.333333%'}}
              />
            </div>
          </div>
          <div>
            <div className="mb-2 block pt-4">
              <Label style={{ fontSize: "18px"}}>Giá tiền</Label>
            </div>
            <NumericFormat  
              className="text-2xl font-bold text-gray-900 rounded-lg w-7/12"
              thousandSeparator={true}
              suffix="₫"
            />
          </div>
          <div>
            <div className="mb-2 block pt-4">
              <Label style={{ fontSize: "18px" }}>Đường dẫn website</Label>
            </div>
            <TextInput id="small" className=" w-7/12" type="url" sizing="sm" />
          </div>
          <div>
            <div className="mb-2 block pt-4">
              <Label style={{ fontSize: "18px" }}>Hình ảnh</Label>
            </div>
            <FileInput className=" w-7/12" id="FileInput" multiple />
          </div>
          <div>
            <div className="mb-2 block pt-4">
              <Label style={{ fontSize: "18px" }}>Mô tả sản phẩm</Label>
            </div>
            <Textarea 
                          id="comment"
                          placeholder="Leave a comment..."
                          required={true}
                          rows={6}
                          style={{backgroundColor:'#FFFFFF', width:'58.333333%'}}
              />
          </div>
          <Button className="mt-10 w-7/12">Tạo sản phẩm</Button>
        </div>
      </div>
  );
};
