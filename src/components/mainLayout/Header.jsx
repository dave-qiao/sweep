import React from "react";
import { Menu, Icon, Dropdown } from 'antd';
import style from "./Header.less"

function Header({quit}) {

  const menu = (
    <Menu>
      <Menu.Item>
        <a  rel="quite" onClick={quit}>退出</a>
      </Menu.Item>
    </Menu>
  );
  return(
    <div className={style.header}>
        <Dropdown overlay={menu} trigger={['click']}>
          <a className={style.ant_dropdown_link} >
            <Icon type="user" />{localStorage.getItem("account_name")}<Icon type="down" />
          </a>
        </Dropdown>
    </div>)
}

export default Header;
