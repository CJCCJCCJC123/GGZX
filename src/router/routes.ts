export const constroutes = [
  {
    path: "/",
    name: "layout",
    mate: "架子",
    icon: "Pointer",
    hidden: false,
    redirect: "/home",
    component: () => import("@/views/Layout/index.vue" as any),
    children: [
      {
        path: "/home",
        name: "Home",
        mate: "首页",
        icon: "House",
        hidden: false,
        component: () => import("@/views/Layout/components/Home.vue" as any),
      },
    ],
  },
  {
    path: "/screen",
    name: "screen",
    mate: "数据大屏",
    icon: "Monitor",
    hidden: false,
    component: () => import("@/views/Screen/index.vue"),
  },
  {
    //设置路径params
    path: "/login",
    name: "login",
    mate: "登录",
    hidden: true,
    icon: "DCaret",
    component: () => import("@/views/Login/index.vue" as any),
  },
  {
    path: "/404",
    name: "404",
    mate: "404",
    icon: "Cloudy",
    hidden: true,
    component: () => import("@/views/404/index.vue"),
  },
];

export const asyncRoutes = [
  {
    path: "/acl",
    component: () => import("@/views/Layout/index.vue" as any),
    name: "Acl",
    mate: "权限管理",
    icon: "Lock",
    hidden: false,
    redirect: "/acl/user",
    children: [
      {
        path: "/acl/user",
        name: "User",
        mate: "用户管理",
        icon: "User",
        hidden: false,
        component: () => import("@/views/Acl/user/index.vue"),
      },
      {
        path: "/acl/role",
        name: "Role",
        mate: "角色管理",
        icon: "UserFilled",
        hidden: false,
        component: () => import("@/views/Acl/role/index.vue"),
      },
      {
        path: "/acl/permission",
        name: "Permission",
        mate: "菜单管理",
        icon: "Memo",
        hidden: false,
        component: () => import("@/views/Acl/permission/index.vue"),
      },
    ],
  },
  {
    path: "/product",
    component: () => import("@/views/Layout/index.vue" as any),
    name: "Product",
    mate: "商品管理",
    icon: "Present",
    hidden: false,
    redirect: "/product/trademark",
    children: [
      {
        path: "/product/trademark",
        name: "Trademark",
        mate: "品牌管理",
        icon: "QuartzWatch",
        hidden: false,
        component: () => import("@/views/product/trademark/index.vue" as any),
      },
      {
        path: "/product/attr",
        name: "Attr",
        mate: "属性管理",
        icon: "Coin",
        hidden: false,
        component: () => import("@/views/product/attr/index.vue"),
      },
      {
        path: "/product/sku",
        name: "Sku",
        mate: "Sku管理",
        icon: "ShoppingBag",
        hidden: false,
        component: () => import("@/views/product/sku/index.vue"),
      },
      {
        path: "/product/spu",
        name: "Spu",
        mate: "Spu管理",
        icon: "StarFilled",
        hidden: false,
        component: () => import("@/views/product/spu/index.vue"),
      },
    ],
  },
];

export const anyRoutes = [
  {
    path: "/:pathMacth(.*)*",
    redirect: "/404",
    mate: "其他",
    name: "",
    icon: "MoonNight",
    hidden: true,
  },
];
