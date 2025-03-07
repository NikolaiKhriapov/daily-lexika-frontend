export const resourcesRu = {
  database: {
    wordPacks: {
      category: {
        OTHER: 'Категории',
        CUSTOM: 'Индивидуальные',
      },
      name: {
        Lifestyle: 'Образ жизни',
        Relationships: 'Отношения',
        Travel: 'Путешествия',
        Health: 'Здоровье',
        Sports: 'Спорт',
        Education: 'Образование',
        'Business & Finance': 'Бизнес и финансы',
        'Science & Tech': 'Наука и технологии',
      },
    },
  },

  UpcomingUpdatesTableData: {
    shortTerms: {
      title: 'Краткосрочные цели (1 месяц)',
      features: {
        english: {
          one: { name: 'Индивидуальные коллекции', progress: 0 },
          two: { name: 'Языки интерфейса: RU, CN', progress: 100 },
          three: { name: 'Улучшения дизайна', progress: 0 },
        },
        chinese: {
          one: { name: 'Индивидуальные коллекции', progress: 0 },
          two: { name: 'Языки интерфейса: RU, CN', progress: 100 },
          three: { name: 'Улучшения дизайна', progress: 0 },
        },
      },
    },
    longTerms: {
      title: 'Долгосрочные цели (3 месяца)',
      features: {
        english: {
          one: { name: 'Регулярные уведомления', progress: 0 },
          two: { name: 'Раздел «Чтение»', progress: 0 },
          three: { name: 'Раздел «Грамматика»', progress: 0 },
        },
        chinese: {
          one: { name: 'Регулярные уведомления', progress: 0 },
          two: { name: 'Повышение качества перевода для слов HSK 6-9', progress: 0 },
          three: { name: 'Примеры (предложения) для слов HSK 1-9', progress: 0 },
          // extra: { name: 'Раздел «Чтение»', progress: 0 },
          // extra: { name: 'Раздел «Грамматика»', progress: 0 },
          // extra: { name: 'Коллекции по иероглифам', progress: 0 },
        },
      },
    },
  },

  validation: {
    minLength: 'Минимальное допустимое количество символов: {0}',
    maxLength: 'Максимальное допустимое количество символов: {0}',
    email: 'Неверный адрес электронной почты',
    passwordsMatch: 'Пароли не совпадают',
    minNumber: 'Минимальное количество: {0}',
    maxNumber: 'Максимальное количество: {0}',
  },

  buttonText: {
    create: 'Создать',
    update: 'Обновить',
    change: 'Изменить',
    cancel: 'Отменить',
    remove: 'Удалить',
    delete: 'Удалить',
    start: 'Начать',
    completed: 'Завершено',
    added: 'Добавлено',
    createDailyReview: 'Создать подборку',
  },

  pages: {
    reviews: {
      title: 'Подборки',
      description: 'Подборки',
    },
    search: {
      title: 'Поиск',
      description: 'Поиск',
    },
    statistics: {
      title: 'Статистика',
      description: 'Статистика',
    },
    wordPacks: {
      title: 'Коллекции',
      description: 'Коллекции',
    },
  },

  AppSidebar: {
    Dailies: {
      mobile: 'Подборки',
      tabletAndDesktop: 'Подборки',
    },
    WordPacks: 'Коллекции',
    Grammar: 'Грамматика',
    Reading: 'Чтение',
    Search: 'Поиск',
    Statistics: 'Статистика',
  },

  ReviewsPage: {
    noReviews: {
      heading: 'Подборок не найдено',
      text: {
        base: 'Создать ежедневную подборку можно нажав на кнопку ниже',
        md: 'Создать ежедневную подборку можно в разделе «Коллекции»',
      },
    },
  },

  CreateOrUpdateReviewWindow: {
    reviewUpdated: 'Подборка успешно обновлена',
    reviewSaved: 'Подборка успешно сохранена',
    maxNewWordsPerDay: {
      label: 'Количество новых слов в день',
      hint: 'Количество дней для изучения всей коллекции слов: {0} ({1})',
    },
    maxReviewWordsPerDay: 'Количество слов на повторение в день',
    hint: 'Эти настройки можно изменить в любое время. Если не уверены, используйте значения по умолчанию.',
  },

  ReviewCard: {
    reviewRefreshed: 'Подборка успешно обновлена',
    reviewRemoved: 'Подборка успешно удалена',
    newWords: 'новых',
    reviewWords: 'на повторение',
    AlertDialog: {
      header: 'Удалить подборку?',
      body: 'Если вы захотите снова добавить эту подборку, ваши слова и прогресс будут сохранены.',
    },
  },

  SpeechRecognitionComponent: {
    listening: 'Прослушивание',
  },

  StartReviewWindow: {
    answerYes: {
      title: 'Слово «{0}» выучено',
      description: 'Это слово все также периодически будет появляться в подборках',
    },
    answerNo: {
      title: 'Продолжайте изучать слово «{0}»',
      description: 'Это слово будет появляться чаще, чтобы вы могли запомнить его быстрее',
    },
    buttonText: {
      know: 'Знаю',
      dontKnow: 'Не знаю',
      remembered: 'Помню',
      forgot: 'Не помню',
    },
  },

  StatisticsPage: {
    dailyStreak: {
      heading: 'Ежедневная серия',
      currentStreak: 'Текущий рекорд',
      recordStreak: 'Общий рекорд',
    },
    vocabulary: {
      heading: 'Словарный запас',
      wordsKnown: 'Слов',
      charactersKnown: 'Иероглифов',
    },
    dailyReviews: {
      heading: 'Ежедневные подборки',
      noReviews: 'Подборок не найдено',
    },
  },

  StatsReviewCard: {
    known: 'выучено',
  },

  StatsReviewWindow: {
    packProgress: {
      title: 'Прогресс',
      known: 'выучено',
    },
    reviewStatus: {
      title: 'Статистика',
      inReview: 'на повто-рении',
      wordsInReview: 'на повторении',
      unseenWords: 'неизвестных',
    },
  },

  StatsWordsKnownWindow: {
    header: 'Выученные слова',
  },

  UserPreferencesWindow: {
    header: 'Настройки',
    colorScheme: {
      label: 'Тема',
      light: 'Светлая',
      dark: 'Тёмная',
    },
    interfaceLanguage: 'Язык интерфейса',
    translationLanguage: 'Язык перевода',
    language: {
      english: 'Английский',
      russian: 'Русский',
      chinese: 'Китайский',
    },
    updateInfoSuccessMessage: 'Информация успешно обновлена',
  },

  UserProfileWindow: {
    header: 'Аккаунт',
    successMessage: {
      updateInfo: 'Информация успешно обновлена',
      updatePassword: 'Пароль успешно изменен',
      deleteAccount: 'Аккаунт успешно удален',
    },
    name: 'Имя',
    email: 'Эл. почта',
    password: {
      current: {
        label: 'Пароль',
        placeholder: 'Текущий пароль',
      },
      new: {
        header: 'Новый пароль',
        label: 'Пароль',
        placeholder: 'Новый пароль',
      },
      repeat: {
        label: 'Повторите пароль',
        placeholder: 'Повторите пароль',
      },
    },
    deleteAccountButton: 'Удалить аккаунт',
    AlertDialog: {
      header: 'Удалить аккаунт',
      body: 'Вы уверены, что хотите удалить аккаунт? Это действие невозможно будет отменить.',
    },
  },

  CreateWordPackWindow: {
    header: 'Создать коллекцию',
    name: 'Название',
    description: {
      label: 'Описание',
      initValue: 'Индивидуальная коллекция',
    },
    hint: 'Эти настройки можно изменить в любое время. Если не уверены, используйте значения по умолчанию.',
  },

  FloatingPlusButton: {
    addWordPack: 'Создать\u00a0коллекцию',
  },

  SearchWindow: {
    header: 'Добавить или удалить слова',
    successMessage: {
      addWord: 'Слово успешно добавлено',
      removeWord: 'Слово успешно удалено',
    },
    addAllWordsFromWordPackButton: 'Добавить все слова из',
  },

  WordPackCard: {
    underDevelopmentMessage: 'Мы все еще улучшаем качество перевода для этой коллекции, но Вы уже можете ей пользоваться',
    AlertDialog: {
      header: 'Удалить коллекцию?',
      body: 'Если у Вас есть подборка для этой коллекции, она также будет удалена.',
      successMessage: 'Коллекция успешно удалена',
    },
  },

  WordPackPage: {
    noWordPacks: 'Коллекций не найдено',
  },

  WordDetailedInfo: {
    tabGeneral: 'Сведения',
    tabExamples: 'Примеры',
  },

  TranslationLanguageSelectionWindow: {
    header: 'Пожалуйста, выберите язык перевода',
    messageLineOne: 'Выбранный язык будет использоваться для перевода слов.',
    messageLineTwo: 'Язык перевода можно изменить в настройках в любое время.',
  },

  AppInstallComponent: {
    buttonText: 'Приложение',
    header: 'Веб-приложение',
    message: 'Веб-приложение имеет точно такой же функционал, как и приложение, установленное из магазина!',
    stepOne: '1. Нажмите на',
    stepTwo: {
      textOne: '2. Выберите',
      buttonOne: 'На экран «Домой»',
      textTwo: 'или',
      buttonTwo: 'Добавить в Dock',
    },
  },

  NotificationsComponent: {
    noNewNotifications: 'Новых уведомлений не найдено',
    showAllButton: 'Показать все уведомления',
  },

  NotificationsWindow: {
    header: 'Уведомления',
  },

  ProfileComponent: {
    profile: 'Профиль',
    preferences: 'Настройки',
    support: 'Связаться с поддержкой',
    feedback: 'Оставить отзыв',
    privacy: 'Политика конфиденциальности',
    logout: 'Выйти',
  },

  WordOfTheDayComponent: {
    title: 'Слово дня',
  },

  UpcomingUpdatesComponent: {
    header: 'Ближайшие обновления',
    version: 'Версия',
  },

  ComingSoon: {
    text: 'Будет доступно в ближайшем обновлении',
    badge: 'Скоро',
  },

  ErrorComponent: 'Упс, что-то пошло не так...',

  Search: {
    input: 'Начните вводить слово...',
    message: 'При поиске слова имейте в виду, что приложение Daily Lexika в первую очередь предназначено для подготовки к экзаменам, таким как {0}, а не для использования в качестве словаря. Наша база данных содержит около {1} официально рекомендованных слов.',
  },

  ButtonsPronunciation: {
    header: 'Китайская озвучка недоступна на Вашем устройстве',
    text: 'Похоже, у вас не установлена поддержка озвучивания китайского языка. Пожалуйста, выполните следующие шаги:',
    step1: '1. Откройте настройки Вашего устройства, найдите раздел «Синтез речи».',
    step2: '2. Нажмите на значок шестерёнки рядом с пунктом «Синтезатор по умолчанию».',
    step3: '3. Выберите «Китайский (упрощённый)» или «cmn (China)».',
    step4: '4. Нажмите «Установить голосовые данные» и выберите предпочитаемый голос.',
    step5: '5. Перезапустите приложение.',
  },
};
