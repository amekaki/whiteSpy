/*=========================================================================================
  File Name: sidebarItems.js
  Description: Sidebar Items list. Add / Remove menu items from here.
  Strucutre:
          url     => router path
          name    => name to display in sidebar
          slug    => router path name
          icon    => Feather Icon component/icon name
          tag     => text to display on badge
          tagColor  => class to apply on badge element
          i18n    => Internationalization
          submenu   => submenu of current item (current item will become dropdown )
                NOTE: Submenu don't have any icon(you can add icon if u want to display)
          isDisabled  => disable sidebar item/group
  ----------------------------------------------------------------------------------------
  Item Name: Vuesax Admin - VueJS Dashboard Admin Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


export default [
   {
    url: null,
    name: "统计数据",
    slug: "统计数据",
    icon: "InstagramIcon",
    i18n: "统计数据",
    submenu: [
       {
    url: "/statistic/allData",
    name: "总览",
    slug: "knowledgeGraph",
    icon: "BoxIcon",
    MaterialIcon:"poll",
    i18n: "总览",
    urlList:["/statistic/allData"],
  },
      {
    url: "/analyze/knowledgeGraph",
    name: "黑卡交易情报知识图谱",
    slug: "knowledgeGraph",
    icon: "BoxIcon",
    MaterialIcon:"scatter_plot",
    i18n: "黑卡交易情报知识图谱",
    urlList:["/analyze/knowledgeGraph"],
  },
    ]
  },
 {
    url: null,
    name: "群组管理",
    slug: "群组管理",
    icon: "InboxIcon",
    i18n: "群组管理",
    submenu: [
     {
    url: "/list/groupList",
    name: "接入群组管理",
    slug: "knowledgeGraph",
    icon: "BoxIcon",
    MaterialIcon:"groups",
    i18n: "接入群组管理",
    urlList:["/list/groupList"],
  },

  {
    url: "/group/GroupIndex",
    name: "群组索引",
    slug: "knowledgeGraph",
    icon: "BoxIcon",
    MaterialIcon:"list",
    i18n: "群组索引",
    urlList:["/group/GroupIndex"],
  },
      {
    url: "/group/GroupMonitorIndex",
    name: "群组监控",
    slug: "knowledgeGraph",
    icon: "BoxIcon",
    MaterialIcon:"assignment",
    i18n: "群组监控",
    urlList:["/group/GroupMonitorIndex","/group/GroupMonitor"],
  },
    ]
  },
 {
    url: null,
    name: "卡商人员分析",
    slug: "卡商人员分析",
    icon: "ItalicIcon",
    i18n: "卡商人员分析",
    submenu: [
        {
    url: "/chattask/currentChatTask",
    name: "对话任务管理",
    slug: "knowledgeGraph",
    icon: "BoxIcon",
    MaterialIcon:"badge",
    i18n: "对话任务管理",
    urlList:["/chattask/currentChatTask"],
  },
     {
    url: "/group/userViewIndex",
    name: "卡商用户画像",
    slug: "knowledgeGraph",
    icon: "BoxIcon",
    MaterialIcon:"person",
    i18n: "卡商用户画像",
   urlList:["/group/userViewIndex","/group/userView"],
  },
  {
    url: "/group/analyse",
    name: "关联分析",
    slug: "knowledgeGraph",
    icon: "BoxIcon",
    MaterialIcon:"account_tree",
    i18n: "关联分析",
   urlList:["/group/analyse"],
  },

    ]
  },
  {
    url: null,
    name: "设置",
    slug: "设置",
    icon: "KeyIcon",
    i18n: "设置",
    submenu: [
        {
    url: "/setting/botSetting",
    name: "机器人账号设置",
    slug: "knowledgeGraph",
    icon: "BoxIcon",
    MaterialIcon:"tune",
    i18n: "机器人账号设置",
    urlList:["/setting/botSetting"],
  },
  {
    url: "/setting/userSetting",
    name: "用户设置",
    slug: "knowledgeGraph",
    icon: "BoxIcon",
    MaterialIcon:"settings",
    i18n: "用户设置",
   urlList:["/setting/userSetting"],
  },
    ]
  },
  // {
  //   url: null,
  //   name: "对话任务管理",
  //   slug: "对话任务管理",
  //   icon: "ItalicIcon",
  //   i18n: "对话任务管理",
  //   submenu: [
  //    {
  //   url: "/chattask/currentChatTask",
  //   name: "当前任务",
  //   slug: "knowledgeGraph",
  //   icon: "BoxIcon",
  //   MaterialIcon:"badge",
  //   i18n: "当前任务",
  // },
  //
  // {
  //   url: "/group/userRelationShip",
  //   name: "已完成任务",
  //   slug: "knowledgeGraph",
  //   icon: "BoxIcon",
  //   MaterialIcon:"settings_ethernet",
  //   i18n: "已完成任务",
  // },
  //   ]
  // },
  // {
  //   header: "Apps",
  //   i18n: "Apps",
  // },
  // {
  //   url: "/apps/email",
  //   name: "Email",
  //   slug: "email",
  //   icon: "MailIcon",
  //   MaterialIcon:"language",
  //   i18n: "Email",
  // },
  // {
  //   url: "/apps/chat",
  //   name: "Chat",
  //   slug: "chat",
  //   icon: "MessageSquareIcon",
  //   MaterialIcon:"language",
  //   i18n: "Chat",
  // },
  // {
  //   url: "/apps/todo",
  //   name: "Todo",
  //   slug: "todo",
  //   icon: "CheckSquareIcon",
  //   MaterialIcon:"language",
  //   i18n: "Todo",
  // },
  // {
  //   url: "/apps/calendar/vue-simple-calendar",
  //   // url: null,
  //   name: "Calendar",
  //   slug: "calendar",
  //   icon: "CalendarIcon",
  //   tag: "new",
  //   tagColor: "success",
  //   i18n: "Calendar",
  //   // submenu: [
  //   //   {
  //   //     url: '/apps/calendar/vue-simple-calendar',
  //   //     name: "Simple Calendar",
  //   //     slug: "calendarSimpleCalendar",
  //   //     i18n: "SimpleCalendar",
  //   //   },
  //   //   {
  //   //     url: '/apps/calendar/vue-fullcalendar',
  //   //     name: "Full Calendar",
  //   //     slug: "calendarFullCalendar",
  //   //     i18n: "FullCalendar",
  //   //   }
  //   // ]
  // },
  // {
  //   url: null,
  //   name: "eCommerce",
  //   slug: "eCommerce",
  //   icon: "ShoppingCartIcon",
  //   i18n: "eCommerce",
  //   submenu: [
  //     {
  //       url: '/apps/eCommerce/shop',
  //       name: "Shop",
  //       slug: "eCommerceShop",
  //       MaterialIcon:"language",
  //       i18n: "Shop",
  //     },
  //     {
  //         url: '/apps/eCommerce/wish-list',
  //         name: "Wish List",
  //         slug: "eCommerceWishList",
  //
  //         i18n: "WishList",
  //     },
  //     {
  //       url: '/apps/eCommerce/checkout',
  //       name: "Checkout",
  //       slug: "eCommerceCheckout",
  //       i18n: "Checkout",
  //     },
  //   ]
  // },
  // {
  //   header: "UI Elements",
  //   i18n: "UIElements",
  // },
  // {
  //   url: null,
  //   name: "Data List",
  //   slug: "dataList",
  //   tag: "new",
  //   tagColor: "primary",
  //   icon: "ListIcon",
  //   i18n: "DataList",
  //   submenu: [
  //     {
  //       url: '/ui-elements/data-list/list-view',
  //       name: "List View",
  //       slug: "dataListListView",
  //       i18n: "ListView",
  //     },
  //     {
  //       url: '/ui-elements/data-list/thumb-view',
  //       name: "Thumb View",
  //       slug: "dataListThumbView",
  //       i18n: "ThumbView",
  //     },
  //   ]
  // },
  // {
  //   url: null,
  //   name: "Grid",
  //   slug: "grid",
  //   icon: "LayoutIcon",
  //   i18n: "Grid",
  //   submenu: [
  //     {
  //       url: '/ui-elements/grid/vuesax',
  //       name: "Vuesax",
  //       slug: "gridVuesax",
  //       i18n: "Vuesax",
  //     },
  //     {
  //       url: '/ui-elements/grid/tailwind',
  //       name: "Tailwind",
  //       slug: "gridTailwind",
  //       i18n: "Tailwind",
  //     },
  //   ]
  // },
  // {
  //   url: "/ui-elements/colors",
  //   name: "Colors",
  //   slug: "colors",
  //   icon: "DropletIcon",
  //   MaterialIcon:"language",
  //   i18n: "Colors",
  // },
  // {
  //   url: null,
  //   name: "Card",
  //   slug: "card",
  //   icon: "CreditCardIcon",
  //   MaterialIcon:"language",
  //   i18n: "Card",
  //   submenu: [
  //     {
  //       url: '/ui-elements/card/basic',
  //       name: "Basic",
  //       slug: "basicCards",
  //       i18n: "Basic",
  //     },
  //     {
  //       url: '/ui-elements/card/statistics',
  //       name: "Statistics",
  //       slug: "statisticsCards",
  //       i18n: "Statistics",
  //     },
  //     {
  //       url: '/ui-elements/card/analytics',
  //       name: "Analytics",
  //       slug: "analyticsCards",
  //       i18n: "Analytics",
  //     },
  //     {
  //       url: '/ui-elements/card/card-actions',
  //       name: "Card Actions",
  //       slug: "cardActions",
  //       i18n: "CardActions",
  //     },
  //     {
  //       url: '/ui-elements/card/card-colors',
  //       name: "Card Colors",
  //       slug: "cardColors",
  //       i18n: "CardColors",
  //     }
  //   ]
  // },
  // {
  //   url: null,
  //   name: "Components",
  //   icon: "ArchiveIcon",
  //   slug: 'components',
  //   i18n: "Components",
  //   submenu: [
  //     {
  //       url: '/components/alert',
  //       name: "Alert",
  //       slug: "componentAlert",
  //       i18n: "Alert",
  //     },
  //     {
  //       url: '/components/avatar',
  //       name: "Avatar",
  //       slug: "componentAvatar",
  //       i18n: "Avatar",
  //     },
  //     {
  //       url: '/components/breadcrumb',
  //       name: "Breadcrumb",
  //       slug: "componentBreadcrumb",
  //       i18n: "Breadcrumb",
  //     },
  //     {
  //       url: '/components/button',
  //       name: "Button",
  //       slug: "componentButton",
  //       i18n: "Button",
  //     },
  //     {
  //       url: '/components/button-group',
  //       name: "Button Group",
  //       slug: "componentButtonGroup",
  //       i18n: "ButtonGroup",
  //     },
  //     {
  //       url: '/components/chip',
  //       name: "Chip",
  //       slug: "componentChip",
  //       i18n: "Chip",
  //     },
  //     {
  //       url: '/components/collapse',
  //       name: "Collapse",
  //       slug: "componentCollapse",
  //       i18n: "Collapse",
  //     },
  //     {
  //       url: '/components/dialogs',
  //       name: "Dialogs",
  //       slug: "componentDialog",
  //       i18n: "Dialogs",
  //     },
  //     {
  //       url: '/components/divider',
  //       name: "Divider",
  //       slug: "componentDivider",
  //       i18n: "Divider",
  //     },
  //     {
  //       url: '/components/dropdown',
  //       name: "DropDown",
  //       slug: "componentDropDown",
  //       i18n: "DropDown",
  //     },
  //     {
  //       url: '/components/list',
  //       name: "List",
  //       slug: "componentList",
  //       i18n: "List",
  //     },
  //     {
  //       url: '/components/loading',
  //       name: "Loading",
  //       slug: "componentLoading",
  //       i18n: "Loading",
  //     },
  //     {
  //       url: '/components/navbar',
  //       name: "Navbar",
  //       slug: "componentNavbar",
  //       i18n: "Navbar",
  //     },
  //     {
  //       url: '/components/notifications',
  //       name: "Notifications",
  //       slug: "componentNotifications",
  //       i18n: "Notifications",
  //     },
  //     {
  //       url: '/components/pagination',
  //       name: "Pagination",
  //       slug: "componentPagination",
  //       i18n: "Pagination",
  //     },
  //     {
  //       url: '/components/popup',
  //       name: "Popup",
  //       slug: "componentPopup",
  //       i18n: "Popup",
  //     },
  //     {
  //       url: '/components/progress',
  //       name: "Progress",
  //       slug: "componentProgress",
  //       i18n: "Progress",
  //     },
  //     {
  //       url: '/components/sidebar',
  //       name: "Sidebar",
  //       slug: "componentSidebar",
  //       i18n: "Sidebar",
  //     },
  //     {
  //       url: '/components/slider',
  //       name: "Slider",
  //       slug: "componentSlider",
  //       i18n: "Slider",
  //     },
  //     {
  //       url: '/components/tabs',
  //       name: "Tabs",
  //       slug: "componentTabs",
  //       i18n: "Tabs",
  //     },
  //     {
  //       url: '/components/tooltip',
  //       name: "Tooltip",
  //       slug: "componentTooltip",
  //       i18n: "Tooltip",
  //     },
  //     {
  //       url: '/components/upload',
  //       name: "Upload",
  //       slug: "componentUpload",
  //       i18n: "Upload",
  //     },
  //   ]
  // },
  // {
  //   header: "Forms & Table",
  //   i18n: "FormsAndTable",
  // },
  // {
  //   url: null,
  //   name: "Form Elements",
  //   icon: "CopyIcon",
  //   i18n: "FormElements",
  //   submenu: [
  //     // {
  //     //  url: '/forms/form-elements/select',
  //     //  name: "Select",
  //     //  slug: "formElementSelect",
  //     //  i18n: "Select",
  //     // },
  //     {
  //       url: '/forms/form-elements/switch',
  //       name: "Switch",
  //       slug: "formElementSwitch",
  //       i18n: "Switch",
  //     },
  //     {
  //       url: '/forms/form-elements/checkbox',
  //       name: "Checkbox",
  //       slug: "formElementCheckbox",
  //       i18n: "Checkbox",
  //     },
  //     {
  //       url: '/forms/form-elements/radio',
  //       name: "Radio",
  //       slug: "formElementRadio",
  //       i18n: "Radio",
  //     },
  //     {
  //       url: '/forms/form-elements/input',
  //       name: "Input",
  //       slug: "formElementInput",
  //       i18n: "Input",
  //     },
  //     {
  //       url: '/forms/form-elements/number-input',
  //       name: "Number Input",
  //       slug: "formElementNumberInput",
  //       i18n: "NumberInput",
  //     },
  //     {
  //       url: '/forms/form-elements/textarea',
  //       name: "Textarea",
  //       slug: "formElementTextarea",
  //       i18n: "Textarea",
  //     },
  //   ]
  // },
  // {
  //   url: '/forms/form-layouts',
  //   name: "Form Layouts",
  //   icon: "PackageIcon",
  //   slug: "formsFormLayouts",
  //   i18n: "FormLayouts",
  // },
  // {
  //   url: '/forms/form-wizard',
  //   name: "Form Wizard",
  //   icon: "PackageIcon",
  //   slug: "extraComponentFormWizard",
  //   i18n: "FormWizard",
  // },
  // {
  //   url: '/forms/form-validation',
  //   name: "Form Validation",
  //   icon: "CheckCircleIcon",
  //   slug: "extraComponentFormValidation",
  //   i18n: "FormValidation",
  // },
  // {
  //   url: '/forms/form-input-group',
  //   name: "Form Input Group",
  //   icon: "MenuIcon",
  //   slug: "extraComponentFormInputGroup",
  //   i18n: "FormInputGroup",
  // },
  // {
  //   url: "/ui-elements/table",
  //   name: "Table",
  //   slug: "table",
  //   icon: "GridIcon",
  //   i18n: "Table",
  // },
  // {
  //   url: "/ui-elements/ag-grid-table",
  //   name: "agGrid Table",
  //   slug: "ag-grid-table",
  //   tag: "new",
  //   tagColor: "primary",
  //   icon: "GridIcon",
  //   i18n: "agGridTable",
  // },
  // {
  //   header: "Pages",
  //   i18n: "Pages",
  // },
  // {
  //   url: '/pages/profile',
  //   name: "Profile",
  //   icon: "UserIcon",
  //   i18n: "Profile",
  // },
  // {
  //   url: '/pages/faq',
  //   name: "FAQ",
  //   icon: "HelpCircleIcon",
  //   i18n: "FAQ",
  // },
  // {
  //   url: '/pages/knowledge-base',
  //   name: "Knowledge Base",
  //   icon: "InfoIcon",
  //   i18n: "KnowledgeBase",
  // },
  // {
  //   url: '/pages/search',
  //   name: "Search",
  //   icon: "SearchIcon",
  //   i18n: "Search",
  // },
  // {
  //   url: '/pages/invoice',
  //   name: "Invoice",
  //   icon: "InfoIcon",
  //   i18n: "Invoice",
  // },
  // {
  //   url: null,
  //   name: "Authentication",
  //   icon: "PieChartIcon",
  //   i18n: "Authentication",
  //   submenu: [
  //     {
  //       url: '/pages/login',
  //       name: "Login",
  //       slug: "pagesLogin",
  //       i18n: "Login",
  //       target: '_blank',
  //     },
  //     {
  //       url: '/pages/register',
  //       name: "Register",
  //       slug: "pagesRegister",
  //       i18n: "Register",
  //       target: '_blank',
  //     },
  //     {
  //       url: '/pages/forgot-password',
  //       name: "Forgot Password",
  //       slug: "pagesForgotPassword",
  //       i18n: "ForgotPassword",
  //       target: '_blank',
  //     },
  //     {
  //       url: '/pages/reset-password',
  //       name: "Reset Password",
  //       slug: "pagesResetPassword",
  //       i18n: "ResetPassword",
  //       target: '_blank',
  //     },
  //     {
  //       url: '/pages/lock-screen',
  //       name: "Lock Screen",
  //       slug: "pagesLockScreen",
  //       i18n: "LockScreen",
  //       target: '_blank',
  //     },
  //   ]
  // },
  // {
  //   url: null,
  //   name: "Miscellaneous",
  //   icon: "CoffeeIcon",
  //   i18n: "Miscellaneous",
  //   submenu: [
  //       {
  //         url: '/pages/not-authorized',
  //         name: "Not Authorized",
  //         slug: "pageNotAuthorized",
  //         icon: "XCircleIcon",
  //         i18n: "NotAuthorized",
  //         target: '_blank',
  //       },
  //       {
  //         url: '/pages/maintenance',
  //         name: "Maintenance",
  //         slug: "pageMaintenance",
  //         icon: "AnchorIcon",
  //         i18n: "Maintenance",
  //         target: '_blank',
  //       },
  //       {
  //         url: '/pages/comingsoon',
  //         name: "Coming Soon",
  //         icon: "ClockIcon",
  //         i18n: "ComingSoon",
  //         target: '_blank',
  //       },
  //       {
  //         url: '/pages/error-404',
  //         name: "404",
  //         slug: "pageError404",
  //         i18n: "404",
  //         target: '_blank',
  //       },
  //       {
  //         url: '/pages/error-500',
  //         name: "500",
  //         slug: "pageError500",
  //         i18n: "500",
  //         target: '_blank',
  //       }
  //   ]
  // },
  // {
  //   header: "Charts & Maps",
  //   i18n: "ChartsAndMaps",
  // },
  // {
  //   url: null,
  //   name: "Charts",
  //   icon: "PieChartIcon",
  //   tag: '3',
  //   tagColor: 'success',
  //   i18n: "Charts",
  //   submenu: [
  //     {
  //       url: '/charts-and-maps/charts/apex-charts',
  //       name: "Apex Charts",
  //       slug: "extraComponentChartsApexCharts",
  //       i18n: "ApexCharts",
  //     },
  //     {
  //       url: '/charts-and-maps/charts/chartjs',
  //       name: "chartjs",
  //       slug: "extraComponentChartsChartjs",
  //       i18n: "chartjs",
  //     },
  //     {
  //       url: '/charts-and-maps/charts/echarts',
  //       name: "echarts",
  //       slug: "extraComponentChartsEcharts",
  //       i18n: "echarts",
  //     },
  //   ]
  // },
  // {
  //   url: '/charts-and-maps/maps/google-map',
  //   name: "Google Map",
  //   icon: "MapIcon",
  //   slug: "extraComponentMapsGoogleMap",
  //   i18n: "GoogleMap",
  // },
  // {
  //   header: "Extensions",
  //   i18n: "Extensions",
  // },
  // {
  //   url: '/extensions/select',
  //   name: "Select",
  //   icon: "PocketIcon",
  //   slug: "extraComponentSelect",
  //   i18n: "Select",
  // },
  // {
  //   url: '/extensions/quill-editor',
  //   name: "Quill Editor",
  //   icon: "EditIcon",
  //   slug: "extraComponentQuillEditor",
  //   i18n: "QuillEditor",
  // },
  // {
  //   url: '/extensions/drag-and-drop',
  //   name: "Drag & Drop",
  //   icon: "DropletIcon",
  //   slug: "extraComponentDragAndDrop",
  //   i18n: "DragAndDrop",
  // },
  // {
  //   url: '/extensions/datepicker',
  //   name: "Datepicker",
  //   icon: "CalendarIcon",
  //   slug: "extraComponentDatepicker",
  //   i18n: "Datepicker",
  // },
  // {
  //   url: '/extensions/datetime-picker',
  //   name: "Datetime Picker",
  //   icon: "ClockIcon",
  //   slug: "extraComponentDatetimePicker",
  //   i18n: "DatetimePicker",
  // },
  // {
  //   url: null,
  //   name: 'Access Control',
  //   icon: 'LockIcon',
  //   i18n: 'AccessControl',
  //   submenu: [
  //     {
  //       url: '/extensions/access-control-editor',
  //       name: "Editor View",
  //       slug: "extraComponentAccessControlEditor",
  //       i18n: "EditorView",
  //     },
  //     {
  //       url: '/extensions/access-control-admin',
  //       name: "Admin View",
  //       slug: "extraComponentAccessControlAdmin",
  //       i18n: "AdminView",
  //     },
  //   ]
  // },
  // {
  //   url: '/extensions/i18n',
  //   name: "I18n",
  //   icon: "GlobeIcon",
  //   slug: "extraComponentI18n",
  //   i18n: "I18n",
  // },
  // {
  //   url: '/extensions/carousel',
  //   name: "Carousel",
  //   icon: "LayersIcon",
  //   slug: "extraComponentCarousel",
  //   i18n: "Carousel",
  // },
  // {
  //   url: '/extensions/clipboard',
  //   name: "Clipboard",
  //   icon: "CopyIcon",
  //   slug: "extraComponentClipboard",
  //   i18n: "Clipboard",
  // },
  // {
  //   url: '/extensions/context-menu',
  //   name: "Context Menu",
  //   icon: "MoreHorizontalIcon",
  //   slug: "extraComponentContextMenu",
  //   i18n: "ContextMenu",
  // },
  // {
  //   url: '/extensions/star-ratings',
  //   name: "Star Ratings",
  //   icon: "StarIcon",
  //   slug: "extraComponentStarRatings",
  //   i18n: "StarRatings",
  // },
  // {
  //   url: '/extensions/autocomplete',
  //   name: "Autocomplete",
  //   icon: "Edit3Icon",
  //   slug: "extraComponentAutocomplete",
  //   i18n: "Autocomplete",
  // },
  // {
  //   url: '/extensions/tree',
  //   name: "Tree",
  //   icon: "GitPullRequestIcon",
  //   slug: "extraComponentTree",
  //   i18n: "Tree",
  // },
  // {
  //   header: "Others",
  //   i18n: "Others",
  // },
  // {
  //   url: null,
  //   name: "Menu Levels",
  //   icon: "MenuIcon",
  //   i18n: "MenuLevels",
  //   submenu: [
  //     {
  //       url: null,
  //       name: "Menu Level 2.1",
  //       i18n: "MenuLevel2p1",
  //     },
  //     {
  //       url: null,
  //       name: "Menu Level 2.2",
  //       i18n: "MenuLevel2p2",
  //       submenu: [
  //         {
  //           url: null,
  //           name: "Menu Level 3.1",
  //           i18n: "MenuLevel3p1",
  //         },
  //         {
  //           url: null,
  //           name: "Menu Level 3.2",
  //           i18n: "MenuLevel3p2",
  //         },
  //       ]
  //     },
  //   ]
  // },
  // {
  //   url: null,
  //   name: "Disabled Menu",
  //   icon: "EyeOffIcon",
  //   i18n: "DisabledMenu",
  //   isDisabled: true,
  // },
  //
  // {
  //   header: "Support",
  //   i18n: "Support",
  // },
  // {
  //   url: 'https://pixinvent.com/demo/vuesax-vuejs-admin-dashboard-template/documentation/',
  //   name: "Documentation",
  //   icon: "BookOpenIcon",
  //   slug: "external",
  //   i18n: "Documentation",
  //   target: "_blank"
  // },
  // {
  //   url: 'https://pixinvent.ticksy.com/',
  //   name: "Raise Support",
  //   icon: "LifeBuoyIcon",
  //   slug: "external",
  //   i18n: "RaiseSupport",
  //   target: "_blank"
  // },
]
