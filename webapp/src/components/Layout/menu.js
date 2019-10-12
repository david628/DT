//import { isUrl } from '../utils/utils';

const menuData = [
  {
    name: 'Home',
    text: '首页',
    icon: 'home',
    path: 'Home'
  }, {
    name: 'Workspace',
    text: '工作空间',
    icon: 'home',
    path: 'Workspace',
    children: [{
        name: 'Dashboard',
        text: '仪表板',
        path: 'Dashboard'
      },{
        name: 'DataSource',
        text: '数据源',
        path: 'DataSource'
      },{
        name: 'Schema',
        text: '数据集',
        path: 'Schema'
      }
    ]
  },
  {
    name: '组件页',
    text: '组件页',
    icon: 'home',
    path: 'component',
    children: [
      {
        name: 'menu',
        text: 'Menu',
        path: 'menu'
      },
      {
        name: 'button',
        text: 'Button',
        path: 'button'
      },
      {
        name: 'input',
        text: 'Input',
        path: 'input'
      },
      {
        name: 'checkbox',
        text: 'Checkbox',
        path: 'checkbox'
      },
      {
        name: 'form',
        text: 'Form',
        path: 'form'
      },
      {
        name: 'select',
        text: 'Select',
        path: 'select'
      },
      {
        name: 'dropdown',
        text: 'Dropdown',
        path: 'dropdown'
      }
    ]
  }
];

function formatter(data, parentPath = '/', parentAuthority) {
  return data.map(item => {
    let { path } = item;
    if (!/(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g.test(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
