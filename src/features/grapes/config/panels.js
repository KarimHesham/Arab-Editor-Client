const panels = {
  defaults: [
    {
      id: "options",
      el: "#panel__basic-actions",
      buttons: [
        {
          id: "sw-visibility",
          active: true,
          className: "fa fa-square-o",
          command: "sw-visibility",
          context: "sw-visibility",
        },
        {
          id: "redo",
          className: "fa fa-repeat",
          command: "redo",
          attributes: { title: "Redo" },
        },
        {
          id: "undo",
          className: "fa fa-undo",
          command: "undo",
          attributes: { title: "Undo" },
        },
        {
          id: "export-template",
          className: "fa fa-code",
          command: "export-template",
        },
      ],
    },
    {
      id: "devices",
      el: "#panel__devices",
      buttons: [
        {
          id: "desktop",
          className: "fa fa-television",
          command: "desktop",
          active: true,
          togglable: false,
          attributes: { title: "شاشة كمبيوتر" },
        },
        {
          id: "tablet",
          className: "fa fa-tablet",
          command: "tablet",
          attributes: { title: "شاشة تابلت" },
        },
        {
          id: "mobilePortrait",
          className: "fa fa-mobile",
          command: "mobilePortrait",
          attributes: { title: "شاشة موبيل" },
        },
      ],
    },
  ],
};

export default panels;
