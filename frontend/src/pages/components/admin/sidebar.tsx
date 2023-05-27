import { Link, MenuItem } from "@mui/material";
import { Sidebar } from "flowbite-react";
import React, { PropsWithChildren } from "react";
import { AiOutlineDashboard,AiOutlineProfile,AiFillCustomerService } from "react-icons/ai";
import { GrProductHunt } from "react-icons/gr";

const SidebarAd = (props: PropsWithChildren) => {
  return (
    <div>
      {/* sidebar */}
      <div className="w-fit h-full">
        <Sidebar>
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item href="/" icon={AiOutlineDashboard}>
                Dashboard
              </Sidebar.Item>
              <Sidebar.Item href="/admin" icon={GrProductHunt}>
                Sản phẩm
              </Sidebar.Item>
              <Sidebar.Item href="#" icon={AiOutlineProfile}>
                Profile
              </Sidebar.Item>
              <Sidebar.Item href="#"  icon={AiFillCustomerService }>
                Customize
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      </div>
    </div>
  );
};
export default SidebarAd;
