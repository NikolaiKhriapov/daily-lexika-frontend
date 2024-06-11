export const resourcesEn = {
  database: {
    wordPacks: {
      category: {
        OTHER: 'Categories',
        CUSTOM: 'Custom',
      },
      name: {
        Lifestyle: 'Lifestyle',
        Relationships: 'Relationships',
        Travel: 'Travel',
        Health: 'Health',
        Sports: 'Sports',
        Education: 'Education',
        'Business & Finance': 'Business & Finance',
        'Science & Tech': 'Science & Tech',
      },
    },
  },

  UpcomingUpdatesTableData: {
    shortTerms: {
      title: 'Short-Terms (1 month)',
      features: {
        english: {
          one: { name: 'Custom combined word packs', progress: 0 },
          two: { name: 'Interface languages: RU, CN', progress: 100 },
          three: { name: 'UI improvements', progress: 0 },
        },
        chinese: {
          one: { name: 'Custom combined word packs', progress: 0 },
          two: { name: 'Interface languages: RU, CN', progress: 100 },
          three: { name: 'UI improvements', progress: 0 },
        },
      },
    },
    longTerms: {
      title: 'Long-Terms (3 months)',
      features: {
        english: {
          one: { name: 'Daily reminders', progress: 0 },
          two: { name: 'Section \'Reading\'', progress: 0 },
          three: { name: 'Section \'Grammar\'', progress: 0 },
        },
        chinese: {
          one: { name: 'Daily reminders', progress: 0 },
          two: { name: 'Updated translations for HSK 6-9', progress: 0 },
          three: { name: 'Example sentences for HSK 1-9', progress: 0 },
          // extra: { name: 'Section \'Reading\'', progress: 0 },
          // extra: { name: 'Section \'Grammar\'', progress: 0 },
          // extra: { name: 'Custom word packs by character', progress: 0 },
        },
      },
    },
  },

  validation: {
    minLength: 'Must be at least {0} characters',
    maxLength: 'Must be {0} characters or less',
    email: 'Invalid email address',
    passwordsMatch: 'Passwords must match',
    minNumber: 'Must be at least {0}',
    maxNumber: 'Must be less than {0}',
  },

  buttonText: {
    create: 'Create',
    update: 'Update',
    change: 'Change',
    cancel: 'Cancel',
    remove: 'Remove',
    delete: 'Delete',
    start: 'Start',
    completed: 'Completed',
    added: 'Added',
    createDailyReview: 'Create Daily Review',
  },

  pages: {
    reviews: {
      title: 'Reviews',
      description: 'Reviews',
    },
    search: {
      title: 'Search',
      description: 'Search',
    },
    statistics: {
      title: 'Statistics',
      description: 'Statistics',
    },
    wordPacks: {
      title: 'Word Packs',
      description: 'Word Packs',
    },
  },

  AppSidebar: {
    Dailies: {
      mobile: 'Dailies',
      tabletAndDesktop: 'Daily Reviews',
    },
    WordPacks: 'Word Packs',
    Grammar: 'Grammar',
    Reading: 'Reading',
    Search: 'Search',
    Statistics: 'Statistics',
  },

  ReviewsPage: {
    noReviews: {
      heading: 'You do not have any daily reviews',
      text: {
        base: 'Get started by creating a daily review by clicking the button below',
        md: 'Get started by creating a daily review in the \'Word Packs\' section',
      },
    },
  },

  CreateOrUpdateReviewWindow: {
    reviewUpdated: 'Review updated',
    reviewSaved: 'Review saved',
    maxNewWordsPerDay: 'Max New Words Per Day',
    maxReviewWordsPerDay: 'Max Review Words Per Day',
    hint: 'These settings can be edited at any time. Stick with the defaults if you\'re not sure.',
  },

  ReviewCard: {
    reviewRefreshed: 'Review refreshed successfully',
    reviewRemoved: 'Review removed successfully',
    newWords: 'New Words',
    reviewWords: 'Review words',
    AlertDialog: {
      header: 'Remove this daily review?',
      body: 'Your known words and review progress will be saved if you choose to add this review again later.',
    },
  },

  SpeechRecognitionComponent: {
    listening: 'Listening',
  },

  StartReviewWindow: {
    answerYes: {
      title: '\'{0}\' is a known word',
      description: 'This word will still be shown occasionally during reviews',
    },
    answerNo: {
      title: 'Keep reviewing \'{0}\'.',
      description: 'This word will be shown more frequently so that you can relearn it',
    },
    buttonText: {
      know: 'Know',
      dontKnow: 'Don\'t know',
      remembered: 'Remembered',
      forgot: 'Forgot',
    },
  },

  StatisticsPage: {
    dailyStreak: {
      heading: 'Daily Streak',
      currentStreak: 'Current Streak',
      recordStreak: 'Record Streak',
    },
    vocabulary: {
      heading: 'Vocabulary',
      wordsKnown: 'Words Known',
      charactersKnown: 'Characters Known',
    },
    dailyReviews: {
      heading: 'Daily Reviews',
      noReviews: 'You do not have any daily reviews',
    },
  },

  StatsReviewCard: {
    known: 'known',
  },

  StatsReviewWindow: {
    packProgress: {
      title: 'Pack Progress',
      known: 'known',
    },
    reviewStatus: {
      title: 'Review Status',
      inReview: 'In Review',
      wordsInReview: 'Words In Review',
      unseenWords: 'Unseen Words',
    },
  },

  StatsWordsKnownWindow: {
    header: 'Words Known',
  },

  UserPreferencesWindow: {
    header: 'Preferences',
    colorScheme: {
      label: 'Color scheme',
      light: 'Light',
      dark: 'Dark',
    },
    interfaceLanguage: 'Interface language',
    translationLanguage: 'Translation language',
    language: {
      english: 'English',
      russian: 'Russian',
      chinese: 'Chinese',
    },
    updateInfoSuccessMessage: 'Information updated successfully',
  },

  UserProfileWindow: {
    header: 'Account',
    successMessage: {
      updateInfo: 'Information updated successfully',
      updatePassword: 'Password updated successfully',
      deleteAccount: 'Account deleted successfully',
    },
    name: 'Name',
    email: 'Email',
    password: {
      current: {
        label: 'Password',
        placeholder: 'Current password',
      },
      new: {
        header: 'New Password',
        label: 'Password',
        placeholder: 'New password',
      },
      repeat: {
        label: 'Repeat Password',
        placeholder: 'Repeat password',
      },
    },
    deleteAccountButton: 'Delete Account',
    AlertDialog: {
      header: 'Delete Account',
      body: 'Are you sure you want to delete account? You can\'t undo this action.',
    },
  },

  CreateWordPackWindow: {
    header: 'Create Word Pack',
    name: 'Name',
    description: {
      label: 'Description',
      initValue: 'Custom word pack',
    },
    hint: 'These settings can be edited at any time. Stick with the defaults if you\'re not sure.',
  },

  FloatingPlusButton: {
    addWordPack: 'Add\u00a0new\u00a0word\u00a0pack',
  },

  SearchWindow: {
    header: 'Add or remove words',
    successMessage: {
      addWord: 'Word added successfully',
      removeWord: 'Word removed successfully',
    },
    addAllWordsFromWordPackButton: 'Add all words from',
  },

  WordPackCard: {
    underDevelopmentMessage: 'We are still improving the translations for this pack, but you can already use it',
    AlertDialog: {
      header: 'Delete this word pack?',
      body: 'If you have a review for this word pack, it will also be removed.',
      successMessage: 'Word Pack deleted successfully',
    },
  },

  WordPackPage: {
    noWordPacks: 'No Word Packs available',
  },

  WordDetailedInfo: {
    tabGeneral: 'General',
    tabExamples: 'Examples',
  },

  TranslationLanguageSelectionWindow: {
    header: 'Please select your primary language',
    messageLineOne: 'Selected language will be used for word translations.',
    messageLineTwo: 'You can change it later in the settings.',
  },

  AppInstallComponent: {
    buttonText: 'Install app',
    header: 'Install app',
    message: 'Install the app on your device. It\'s the same as downloading from the store!',
    stepOne: '1. Tap on',
    stepTwo: {
      textOne: '2. Select',
      buttonOne: 'Add to Home Screen',
      textTwo: 'or',
      buttonTwo: 'Add to Dock',
    },
  },

  NotificationsComponent: {
    noNewNotifications: 'No new notifications',
    showAllButton: 'Show all notifications',
  },

  NotificationsWindow: {
    header: 'Notifications',
  },

  ProfileComponent: {
    profile: 'Profile',
    preferences: 'Preferences',
    support: 'Contact support',
    feedback: 'Leave feedback',
    privacy: 'Privacy policy',
    logout: 'Log out',
  },

  WordOfTheDayComponent: {
    title: 'Word of the Day',
  },

  UpcomingUpdatesComponent: {
    header: 'Coming Soon',
    version: 'App version',
  },

  ComingSoon: {
    text: 'Coming Soon',
    badge: 'Soon',
  },

  ErrorComponent: 'Oops, something went wrong...',

  Search: {
    input: 'Start typing a word...',
    message: 'When searching for a word, please keep in mind that Daily Lexika is primarily designed to help you prepare for exams like {0}, it is not a dictionary app. Our database contains around {1} officially recommended words.',
  },
};
