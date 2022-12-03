const styleManager = {
  appendTo: "#style-container",
  sectors: [
    {
      name: "عام",
      open: false,
      buildProps: [
        "float",
        "display",
        "position",
        "top",
        "right",
        "left",
        "bottom",
      ],
      properties: [
        {
          type: "radio",
          label: "نوع صندوق العرض الذي سيستخدم مع العنصر",
          property: "display",
        },
        {
          type: "radio",
          label: "طفو العناصر",
          property: "float",
          default: "none",
          options: [
            { id: "none", className: "fa fa-times" },
            { id: "left", className: "fa fa-align-left" },
            { id: "right", className: "fa fa-align-right" },
          ],
        },
        {
          label: "تموضع العنصر في المستند",
          property: "position",
        },
        {
          label: "فوق",
          property: "top",
        },
        {
          label: "يمين",
          property: "right",
        },
        {
          label: "يسار",
          property: "left",
        },
        {
          label: "تحت",
          property: "bottom",
        },
      ],
    },
    // {
    //     name: 'فليكس',
    //     open: false,
    //     buildProps: ['flex-direction', 'flex-wrap', 'justify-content', 'align-items', 'align-content', 'order', 'flex-basis', 'flex-grow', 'flex-shrink', 'align-self'],
    //     properties: [
    //         {
    //             label: 'اتجاه الفليكس',
    //             property: 'flex-direction'
    //         }, {
    //             label: 'الترتيب',
    //             property: 'order'
    //         }
    //     ]
    // },
    {
      name: "الأبعاد",
      open: false,
      buildProps: [
        "width",
        "min-width",
        "max-width",
        "height",
        "min-height",
        "max-height",
        "padding",
        "margin",
      ],
      properties: [
        {
          label: "العرض",
          property: "width",
        },
        {
          label: "أقل عرض",
          property: "min-width",
        },
        {
          label: "أكبر عرض",
          property: "max-width",
        },
        {
          label: "الارتفاع",
          property: "height",
        },
        {
          label: "أقل ارتفاع",
          property: "min-height",
        },
        {
          label: "أكبر ارتفاع",
          property: "max-height",
        },
        {
          type: "composite",
          label: "الهامش الداخلي",
          property: "padding",
          properties: [
            {
              type: "number",
              units: ["px"],
              default: "0",
              property: "padding-top",
              label: "الأعلى",
            },
            {
              type: "number",
              units: ["px"],
              default: "0",
              property: "padding-right",
              label: "اليمين",
            },
            {
              type: "number",
              units: ["px"],
              default: "0",
              property: "padding-bottom",
              label: "الأسفل",
            },
            {
              type: "number",
              units: ["px"],
              default: "0",
              property: "padding-left",
              label: "اليمين",
            },
          ],
        },
        {
          type: "composite",
          label: "الهامش الخارجي",
          property: "margin",
          properties: [
            {
              type: "number",
              units: ["px"],
              default: "0",
              property: "margin-top",
              label: "الأعلى",
            },
            {
              type: "number",
              units: ["px"],
              default: "0",
              property: "margin-right",
              label: "اليمين",
            },
            {
              type: "number",
              units: ["px"],
              default: "0",
              property: "margin-bottom",
              label: "الأسفل",
            },
            {
              type: "number",
              units: ["px"],
              default: "0",
              property: "margin-left",
              label: "اليمين",
            },
          ],
        },
      ],
    },
    {
      name: "أسلوب الطباعة",
      open: false,
      buildProps: [
        "font-family",
        "font-size",
        "font-weight",
        "letter-spacing",
        "color",
        "line-height",
        "text-align",
        "text-shadow",
      ],
      properties: [
        {
          label: "القيمة اللونية للأمامية",
          property: "color",
        },
        {
          label: "وزن الخط",
          property: "font-weight",
        },
        {
          label: "نوغ الخط",
          property: "font-family",
        },
        {
          label: "حجم الخط",
          property: "font-size",
        },
        {
          label: "المسافة بين الحروف",
          property: "letter-spacing",
        },
        {
          label: "محاذاة الكلام",
          property: "text-align",
          type: "radio",
          defaults: "left",
          options: [
            { id: "left", className: "fa fa-align-left" },
            { id: "center", className: "fa fa-align-center" },
            { id: "right", className: "fa fa-align-right" },
            { id: "justify", className: "fa fa-align-justify" },
          ],
        },
        {
          label: "ارتفاع السطر",
          property: "line-height",
        },
        {
          label: "ظل الكلمات",
          property: "text-shadow",
        },
      ],
    },
    {
      name: "التزيين",
      open: false,
      buildProps: [
        "background-color",
        "border-radius",
        "border",
        "box-shadow",
        "background",
      ],
      properties: [
        {
          label: "لون الخلفية",
          property: "background-color",
        },
        {
          label: "دوران الإطار",
          property: "border-radius",
        },
        {
          label: "الإطار",
          property: "border",
        },
        {
          label: "وصف تأثير الظلال على العنصر",
          property: "box-shadow",
        },
        {
          label: "الخلفية",
          property: "background",
        },
      ],
    },
    {
      name: "أخرى",
      open: false,
      buildProps: ["opacity", "transition", "transform"],
      properties: [
        {
          label: "درجة شفافية",
          property: "opacity",
        },
        {
          label: "لصناعة تأثيرات ناعمة",
          property: "transition",
        },
        {
          label: "تحويل الأشكال",
          property: "transform",
        },
      ],
    },
  ],
};

export default styleManager;
