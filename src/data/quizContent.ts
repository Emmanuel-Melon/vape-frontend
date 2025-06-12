// Initial experience level options for the first quiz step
export const initialExperienceOptions = [
  { 
    value: 'novice', 
    label: 'Complete Beginner', 
    description: 'New to vaporizers, want something simple and easy to use',
    emoji: '🌱'
  },
  { 
    value: 'some-experience', 
    label: 'Some Experience', 
    description: 'Used a few devices, comfortable with basic features',
    emoji: '🌿'
  },
  { 
    value: 'experienced', 
    label: 'Experienced User', 
    description: 'Know what I like, want advanced features and customization',
    emoji: '🌳'
  }
];

// Follow-up questions based on experience level (for future use)
export const followUpExperienceQuestions = {
  novice: [
    {
      id: 'simplicity',
      title: 'How simple do you want your device to be?',
      description: 'Consider your comfort level with technology',
      emoji: '🎛️',
      options: [
        { value: 'very-simple', label: 'Very Simple', description: 'Just turn on and use - minimal settings', emoji: '🔘' },
        { value: 'some-features', label: 'Some Features', description: 'A few settings to customize my experience', emoji: '⚙️' }
      ]
    },
    {
      id: 'discretion',
      title: 'How important is discretion to you?',
      description: 'Consider where and when you plan to use your device',
      emoji: '🤫',
      options: [
        { value: 'very-important', label: 'Very Important', description: 'Need something very discreet and stealthy', emoji: '🤐' },
        { value: 'somewhat', label: 'Somewhat Important', description: 'Prefer discrete but not critical', emoji: '😐' },
        { value: 'not-important', label: 'Not Important', description: 'Mainly using at home or private spaces', emoji: '🏠' }
      ]
    }
  ],
  experienced: [
    {
      id: 'heating-method',
      title: 'What heating method do you prefer?',
      description: 'Based on your experience, what works best for you?',
      emoji: '🔥',
      options: [
        { value: 'convection', label: 'Convection', description: 'Hot air circulation - pure flavor', emoji: '🌪️' },
        { value: 'conduction', label: 'Conduction', description: 'Direct contact heating - dense vapor', emoji: '🔥' },
        { value: 'hybrid', label: 'Hybrid', description: 'Best of both worlds', emoji: '⚡' },
        { value: 'no-preference', label: 'No Preference', description: 'I\'m open to any method', emoji: '🤷‍♂️' }
      ]
    }
  ]
};

// Common questions for usage and portability
export const commonQuestions = [
  {
    id: 'usage',
    title: 'How often do you plan to use it?',
    description: 'Usage frequency affects battery life and durability needs',
    emoji: '📅',
    options: [
      { value: 'casual', label: 'Casual Use', description: 'Weekends, social situations, few times a month', emoji: '🎉' },
      { value: 'daily', label: 'Daily User', description: 'Regular daily use, 1-3 sessions per day', emoji: '📱' },
      { value: 'heavy', label: 'Heavy Use', description: 'Multiple sessions daily, group sessions', emoji: '👥' }
    ]
  },
  {
    id: 'portability',
    title: 'Where will you primarily use it?',
    description: 'Location determines whether you need portable or desktop power',
    emoji: '📏',
    options: [
      { value: 'portable', label: 'On the Go', description: 'Need something portable for travel and outdoor use', emoji: '🎒' },
      { value: 'desktop', label: 'At Home', description: 'Mainly at home, prefer power over portability', emoji: '🏠' },
      { value: 'no-preference', label: 'Both', description: 'Want versatility for home and travel', emoji: '🔄' }
    ]
  }
];

export const educationalContent = {
  experience: {
    'novice': "Beginner-friendly vaporizers focus on simplicity and ease of use. Look for devices with preset temperatures, clear instructions, and reliable performance.",
    'some-experience': "With some experience, you can handle devices with more features like temperature control and different heating methods.",
    'experienced': "Experienced users can take advantage of advanced features like precise temperature control, different heating methods, and customizable settings."
  },
  usage: {
    'casual': "For casual use, focus on devices that are easy to maintain and don't require frequent charging. Battery life per session is more important than overall capacity.",
    'daily': "Daily users need reliable devices with good battery life, easy cleaning, and durable construction. Consider devices with replaceable batteries.",
    'heavy': "For heavy use, look for devices with excellent vapor production, robust construction, and session-style heating that works well for frequent use."
  },
  portability: {
    'portable': "Portable vaporizers prioritize size, battery life, and discretion. They're perfect for travel and outdoor use but may sacrifice some power.",
    'desktop': "Desktop vaporizers offer the best performance and vapor quality. They're perfect for home use where power and vapor quality are priorities.",
    'no-preference': "Hybrid users might want a portable for travel and a desktop for home, or look for versatile devices that work well in both scenarios."
  }
};