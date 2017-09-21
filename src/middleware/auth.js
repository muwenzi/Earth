/**
 * @fileoverview 权限控制中间件，根据用户是否登录进行权限控制
 * @author mrgaonju@gmail.com
 */
import renderService from '../service/renderService'

export default {
  // 当用户信息（req.session.user）不存在，即认为用户没有登录，则跳转到登录页
  isLogin (req, res, next) {
    // 用户未登录
    if (!req.session.user) {
      return res.status(200).send(renderService(req.url))
    }
    // 用户已登录
    next()
  },

  // 当用户信息（req.session.user）存在，即认为用户已经登录，则跳转到之前的页面
  // 同时显示 已登录 的通知，如登录、注册页面及登录、注册的接口
  isNotLogin (req, res, next) {
    // 用户已登录
    if (req.session.user) {
      return res.json({
        'code': 0,
        'message': '已登录'
      })
    }
    // 用户未登录
    next()
  }
}
