import ExpoMixpanelAnalytics from '@benawad/expo-mixpanel-analytics';
const mixpanel = new ExpoMixpanelAnalytics('8eabe446e6cfaaa5174cca38df0685f2');

let actions = {
  identify: (id) => {
    mixpanel.identify(id);
  },
  alias: (id) => {
    mixpanel.alias(id);
  },
  track: (name, props) => {
    mixpanel.track(name, props);
  },
  people: {
    set: (props) => {
      mixpanel.people.set(props);
    },
  },
};

export let analytics = actions;