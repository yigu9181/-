import Taro from '@tarojs/taro';
import request, { get, post, put, del, loginRequest } from './request';

// API接口模板
// 示例：
// export const exampleApi = {
//   // 获取列表
//   getList: (params?: any) => {
//     return get('/example', params);
//   },
//   // 获取详情
//   getDetail: (id: number) => {
//     return get(`/example/${id}`);
//   },
//   // 添加
//   add: (data: any) => {
//     return post('/example', data);
//   },
//   // 更新
//   update: (id: number, data: any) => {
//     return put(`/example/${id}`, data);
//   },
//   // 删除
//   delete: (id: number) => {
//     return del(`/example/${id}`);
//   }
// };

// 登录相关API
export const authApi = {
  // 登录
  login: async (username: string, password: string) => {
    try {
      console.log('Login parameters:', { username, password })
      
      // 先获取所有用户，然后在客户端进行匹配
      // 这样可以避免 json-server 对数字开头用户名的特殊处理问题
      const allUsersRes = await request({
        url: '/users',
        method: 'GET'
      });
      
      console.log('All users:', allUsersRes.data)
      
      // 在客户端匹配用户名和密码
      const matchedUser = allUsersRes.data.find((user: any) => {
        console.log('Checking user:', { user, usernameMatch: user.username === username, passwordMatch: user.password === password })
        return user.username === username && user.password === password;
      });
      
      console.log('Matched user:', matchedUser)
      
      if (matchedUser) {
        console.log('登录成功:', matchedUser)
        
        // 保存用户信息（注意是大写的 ID 表示角色）
        const userInfo = {
          id: matchedUser.id,           // "1"
          username: matchedUser.username, // "admin"
          role: matchedUser.ID,          // "管理员"（大写 ID）
          token: `fake_token_${matchedUser.id}_${Date.now()}`
        }

        Taro.setStorageSync('token', userInfo.token)
        Taro.setStorageSync('userInfo', userInfo)

        Taro.showToast({ title: '登录成功', icon: 'success' })

        // 根据角色跳转到不同页面
        if (userInfo.role === '管理员') {
          Taro.switchTab({ url: '/pages/h5-manager/index' })
        } else {
          Taro.switchTab({ url: '/pages/h5-user/index' })
        }

        return userInfo;
      } else {
        console.log('登录失败，用户名或密码错误')
        Taro.showToast({ title: '用户名或密码错误', icon: 'none' })
        throw { code: 401, message: '用户名或密码错误' };
      }
    } catch (err) {
      console.log('登录失败:', err)
      throw err;
    }
  },

  // 注册
  register: async (username: string, password: string, role: string) => {
    try {
      console.log('Register parameters:', { username, password, role })
      // 检查用户名是否已存在，不考虑身份，只要用户名相同就视为已存在
      // 先获取所有用户，然后在客户端进行匹配
      const allUsersRes = await request({
        url: '/users',
        method: 'GET'
      });
      
      console.log('All users for registration check:', allUsersRes.data)
      
      // 在客户端检查用户名是否已存在
      const existingUser = allUsersRes.data.find((user: any) => {
        console.log('Checking existing user:', { user, usernameMatch: user.username === username })
        return user.username === username;
      });
      
      console.log('Existing user found:', existingUser)
      
      if (existingUser) {
        console.log('Username already exists:', username)
        Taro.showToast({ title: '用户名已存在', icon: 'none' });
        throw new Error('用户名已存在');
      }

      // 重用之前获取的用户数据来计算最大用户ID
      const maxId = Math.max(...allUsersRes.data.map((user: any) => parseInt(user.id)), 0);
      const newId = (maxId + 1).toString();

      // 创建新用户
      const newUser = {
        id: newId,
        username,
        password,
        ID: role
      };

      const res = await request({
        url: '/users',
        method: 'POST',
        data: newUser
      });

      Taro.showToast({ title: '注册成功', icon: 'success' });
      return res.data;
    } catch (err) {
      console.log('注册失败:', err);
      throw err;
    }
  }
};

// 酒店相关API
export const hotelApi = {
  // 获取酒店列表
  getHotelList: (params?: any) => {
    return get('/hotels', params);
  },
  // 获取酒店详情
  getHotelDetail: (id: number) => {
    return get(`/hotels/${id}`);
  }
};

