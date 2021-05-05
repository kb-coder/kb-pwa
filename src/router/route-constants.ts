export const routeConstants = {
  home: {
    name: 'home',
    path: '/',
    sectionKey: 0
  },
  about: {
    name: 'about',
    path: '/about',
    sectionKey: 1
  }
}

// For children routes in a section, use the section key from its parent if you want it grouped together
export const routeNavConfig = {
  home: {
    show: true,
    displayText: 'Home',
    icon: 'fas fa-user',
    sectionKey: routeConstants.home.sectionKey
  },
  about: {
    show: true,
    displayText: 'About',
    icon: 'far fa-question-circle',
    sectionKey: routeConstants.about.sectionKey
  }
}
