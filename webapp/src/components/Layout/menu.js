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
    path: 'Component',
    children: [
      {
        name: 'Menu',
        text: 'Menu',
        path: 'Menu'
      },
      {
        name: 'Button',
        text: 'Button',
        path: 'Button'
      },
      {
        name: 'Input',
        text: 'Input',
        path: 'Input'
      },
      {
        name: 'Checkbox',
        text: 'Checkbox',
        path: 'Checkbox'
      },
      {
        name: 'Form',
        text: 'Form',
        path: 'Form'
      },
      {
        name: 'Select',
        text: 'Select',
        path: 'Select'
      },
      {
        name: 'Tree',
        text: 'Tree',
        path: 'Tree'
      },
      {
        name: 'DatePicker',
        text: 'DatePicker',
        path: 'DatePicker'
      },
      {
        name: 'ColorPicker',
        text: 'ColorPicker',
        path: 'ColorPicker'
      },
      {
        name: 'Number',
        text: 'Number',
        path: 'Number'
      },
      {
        name: 'Dropdown',
        text: 'Dropdown',
        path: 'Dropdown'
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
