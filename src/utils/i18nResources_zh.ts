export const resourcesZh = {
  database: {
    wordPacks: {
      category: {
        OTHER: '类别',
        CUSTOM: '自定义',
      },
      name: {
        Lifestyle: '生活方式',
        Relationships: '人际关系',
        Travel: '旅行',
        Health: '健康',
        Sports: '体育',
        Education: '教育',
        'Business & Finance': '商业与金融',
        'Science & Tech': '科学与技术',
      },
    },
  },

  UpcomingUpdatesTableData: {
    shortTerms: {
      title: '短期更新 (1个月)',
      features: {
        english: {
          one: { name: '自定义组合词包', progress: 0 },
          two: { name: '界面语言: 俄语, 汉语', progress: 100 },
          three: { name: 'UI改进', progress: 0 },
        },
        chinese: {
          one: { name: '自定义组合词包', progress: 0 },
          two: { name: '界面语言: 俄语, 汉语', progress: 100 },
          three: { name: 'UI改进', progress: 0 },
        },
      },
    },
    longTerms: {
      title: '长期更新 (3个月)',
      features: {
        english: {
          one: { name: '每日提醒', progress: 0 },
          two: { name: '部分 \'阅读\'', progress: 0 },
          three: { name: '部分 \'语法\'', progress: 0 },
        },
        chinese: {
          one: { name: '每日提醒', progress: 0 },
          two: { name: '更新HSK 6-9的翻译', progress: 0 },
          three: { name: 'HSK 1-9的例句', progress: 0 },
          // extra: { name: '部分 \'阅读\'', progress: 0 },
          // extra: { name: '部分 \'语法\'', progress: 0 },
          // extra: { name: '汉字词包', progress: 0 },
        },
      },
    },
  },

  validation: {
    minLength: '必须至少为{0}个字',
    maxLength: '必须为{0}个字或更少',
    email: '无效的电子邮件地址',
    passwordsMatch: '密码必须匹配',
    minNumber: '必须至少为{0}',
    maxNumber: '必须小于{0}',
  },

  buttonText: {
    create: '创建',
    update: '更改',
    change: '更改',
    cancel: '取消',
    remove: '删除',
    delete: '删除',
    start: '开始',
    completed: '完成',
    added: '已添加',
    createDailyReview: '创建每日复习',
  },

  pages: {
    reviews: {
      title: '每日复习',
      description: '每日复习',
    },
    search: {
      title: '搜索',
      description: '搜索',
    },
    statistics: {
      title: '统计',
      description: '统计',
    },
    wordPacks: {
      title: '词包',
      description: '词包',
    },
  },

  AppSidebar: {
    Dailies: {
      mobile: '每日复习',
      tabletAndDesktop: '每日复习',
    },
    WordPacks: '词包',
    Grammar: '语法',
    Reading: '阅读',
    Search: '搜索',
    Statistics: '统计',
  },

  ReviewsPage: {
    noReviews: {
      heading: '您没有任何每日复习',
      text: {
        base: '通过点击下面的按钮开始创建每日复习',
        md: '通过在\'词包\'部分创建每日复习开始',
      },
    },
  },

  CreateOrUpdateReviewWindow: {
    reviewUpdated: '每日复习已更改',
    reviewSaved: '每日复习已保存',
    maxNewWordsPerDay: '每天最多新词数',
    maxReviewWordsPerDay: '每天最多复习词数',
    hint: '这些设置随时可编辑。如果不确定，请使用默认设置。',
  },

  ReviewCard: {
    reviewRefreshed: '每日复习已成功刷新',
    reviewRemoved: '每日复习已成功删除',
    newWords: '新词',
    reviewWords: '复习词',
    AlertDialog: {
      header: '删除此每日复习？',
      body: '如果您选择稍后再次添加此每日复习，您的已知单词和复习进度将会保存。',
    },
  },

  SpeechRecognitionComponent: {
    listening: '正在听取',
  },

  StartReviewWindow: {
    answerYes: {
      title: '\'{0}\'是一个已知词',
      description: '此单词仍将偶尔显示在每日复习中',
    },
    answerNo: {
      title: '继续复习\'{0}\'.',
      description: '此单词将更频繁地显示，以便您可以重新学习它',
    },
    buttonText: {
      know: '知道',
      dontKnow: '不知道',
      remembered: '记住',
      forgot: '忘记',
    },
  },

  StatisticsPage: {
    dailyStreak: {
      heading: '每日连续',
      currentStreak: '当前连续',
      recordStreak: '最高连续',
    },
    vocabulary: {
      heading: '词汇量',
      wordsKnown: '已知词数',
      charactersKnown: '已知字数',
    },
    dailyReviews: {
      heading: '每日复习',
      noReviews: '您没有任何每日复习',
    },
  },

  StatsReviewCard: {
    known: '已知',
  },

  StatsReviewWindow: {
    packProgress: {
      title: '词包进度',
      known: '已知',
    },
    reviewStatus: {
      title: '每日复习状态',
      inReview: '正在复习',
      wordsInReview: '复习中的词',
      unseenWords: '未见过的词',
    },
  },

  StatsWordsKnownWindow: {
    header: '已知词',
  },

  UserPreferencesWindow: {
    header: '设置',
    colorScheme: {
      label: '颜色模式',
      light: '亮色',
      dark: '暗色',
    },
    interfaceLanguage: '界面语言',
    translationLanguage: '翻译语言',
    language: {
      english: '英语',
      russian: '俄语',
      chinese: '汉语',
    },
    updateInfoSuccessMessage: '设置已成功更改',
  },

  UserProfileWindow: {
    header: '账户',
    successMessage: {
      updateInfo: '信息已成功更改',
      updatePassword: '密码已成功更改',
      deleteAccount: '账户已成功删除',
    },
    name: '姓名',
    email: '电子邮件',
    password: {
      current: {
        label: '密码',
        placeholder: '当前密码',
      },
      new: {
        header: '新密码',
        label: '密码',
        placeholder: '新密码',
      },
      repeat: {
        label: '重复密码',
        placeholder: '重复密码',
      },
    },
    deleteAccountButton: '删除账户',
    AlertDialog: {
      header: '删除账户',
      body: '您确定要删除账户吗？此操作无法撤销。',
    },
  },

  CreateWordPackWindow: {
    header: '创建词包',
    name: '名称',
    description: {
      label: '描述',
      initValue: '个人词包',
    },
    hint: '您可以随时更改这些设置。如果不确定，请使用默认值。',
  },

  FloatingPlusButton: {
    addWordPack: '创建词包',
  },

  SearchWindow: {
    header: '添加或删除单词',
    successMessage: {
      addWord: '单词已成功添加',
      removeWord: '单词已成功删除',
    },
    addAllWordsFromWordPackButton: '添加所有单词来自',
  },

  WordPackCard: {
    underDevelopmentMessage: '我们仍在改进此词包的翻译质量，但您已经可以使用它了',
    AlertDialog: {
      header: '删除词包？',
      body: '如果您有此词包的每日复习，它也将被删除。',
      successMessage: '词包已成功删除',
    },
  },

  WordPackPage: {
    noWordPacks: '找不到单词包',
  },

  WordDetailedInfo: {
    tabGeneral: '概要',
    tabExamples: '例句',
  },

  TranslationLanguageSelectionWindow: {
    header: '请选择翻译语言',
    messageLineOne: '所选语言将用于单词翻译。',
    messageLineTwo: '您可以随时在设置中更改翻译语言。',
  },

  AppInstallComponent: {
    buttonText: '安装应用',
    header: '安装应用',
    message: '网络应用与从商店安装的应用具有相同的功能！',
    stepOne: '1. 点击',
    stepTwo: {
      textOne: '2. 选择',
      buttonOne: '添加到主屏幕',
      textTwo: '或',
      buttonTwo: '添加到 Dock',
    },
  },

  NotificationsComponent: {
    noNewNotifications: '找不到新通知',
    showAllButton: '显示所有通知',
  },

  NotificationsWindow: {
    header: '通知',
  },

  ProfileComponent: {
    profile: '账户',
    preferences: '设置',
    support: '联系技术支持',
    feedback: '留下反馈',
    privacy: '隐私政策',
    logout: '登出',
  },

  WordOfTheDayComponent: {
    title: '每日单词',
  },

  UpcomingUpdatesComponent: {
    header: '即将推出的更新',
    version: '版本',
  },

  ComingSoon: {
    text: '即将推出',
    badge: '即将',
  },

  ErrorComponent: '糟糕，出了些问题...',

  Search: {
    input: '开始输入单词...',
    message: '在搜索单词时，请注意，Daily Lexika 应用主要用于备考，如{0}，而不是作为词典使用。我们的数据库包含约{1}个官方推荐的单词。',
  },
};
