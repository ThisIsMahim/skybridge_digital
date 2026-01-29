
export const bookingConfig = {
  admin: {
    name: "Mahim",
    handle: "@skybridge_digital",
    avatar: "/lovable-uploads/avatar.png", // Placeholder, will need a real one or generic
  },
  meetingTypes: [
    {
      id: "intro",
      title: "Intro Call",
      duration: "5m",
      description: "Generally, intro calls take around 5 mins. Book a call if your interested for a short knock!",
    },
    {
      id: "discovery-15",
      title: "Discovery Meeting",
      duration: "15m",
      description: "Hey! 15 minutes is plenty of time. Let's dive into your project \uD83E\uDD29",
    },
    {
      id: "discovery-30",
      title: "Discovery Meeting",
      duration: "30m",
      description: "Hey! 30 minutes is plenty of time. Let's dive into your project \uD83E\uDD29",
    }
  ],
  // Default fallback for types
  meeting: {
    title: "Discovery Meeting", 
    description: "Hey! 30 minutes is plenty of time. Let's dive into your project \uD83E\uDD29",
    duration: "30m",
    platform: "Google Meet",
  },
  availableSlots: [
    "10:00am", "10:30am", "11:00am", "11:30am", 
    "12:00pm", "12:30pm", "1:00pm", "1:30pm",
    "2:00pm", "2:30pm", "3:00pm", "3:30pm"
  ]
};
