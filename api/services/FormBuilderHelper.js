module.exports.inputSets = [
  {
    label: 'Object Group',
    name: 'textarea_and_file', // optional - one will be generated from the label if name not supplied
    hType: 'object',
    showHeader: true, // optional - Use the label as the header for this set of inputs
    fields: [
      {
        type:'textarea',
        subtype:'textarea',
        label:'Long Text',
        className: 'object',
        name:'textarea',
        maxlength:'30',
        rows:4
      }, {
        type:'file',
        subtype:'file',
        label:'File Upload',
        className: 'object',
        name:'file'
      }
    ]
  },
  {
    label: 'Array Group',
    name: 'array_group', // optional - one will be generated from the label if name not supplied
    hType: 'array',
    showHeader: true, // optional - Use the label as the header for this set of inputs
    fields: [
      {
        type:'text',
        subtype:'text',
        label:'Field 1 - text',
        className: 'array',
        name:'text'
      },
      {
        type:'textarea',
        subtype:'textarea',
        label:'Field 2 - textarea',
        className: 'array',
        name:'textarea',
        maxlength:'30',
        rows:4
      }
    ]
  }
];

const isGitaStandard = {
  typeof: 'checkbox',
  label: 'Gita Standard',
  value: true
}

const hType = {
  label: 'Header Type',
  options: {
    'normal': 'Normal',
    'step': 'Step',
    'array': 'Array Group',
    'object': 'Object Group',
    'radio': 'Radio Group',
    'complexTokenType': 'ComplexTokenType'
  }
}

const dataFrom = {
  label: 'Data From',
  options: {
    'options': 'Options',
    'country': 'Country',
    'industry': 'Industry',
    'mixin': 'Mixin',
  }
}

module.exports.customAttrs = {
  header: {
    isGitaStandard,
    hType,
    name: {
      label: 'Name',
      placeholder: 'If Header Type is Array or Group, must to set ...'
    },
  },
  file: {
    hType,
    isGitaStandard,
    fileLimit: {
      label: "File Limit",
      options: {
        'document': 'Document',
        'image': 'Image'
      }
    },
    descHtmlElm: {
      label: "Desc Elm",
      type: "textarea"
    }
  },
  text: {
    hType,
    isGitaStandard,
    subtype: {
      label: "Type",
      options: {
        'text': 'Text',
        'url': 'Url',
        'email': 'Email',
        'range': 'Range',
      }
    }
  },
  select: {
    hType,
    isGitaStandard,
    dataFrom,
  },
  number: { hType, isGitaStandard },
  textarea: { hType, isGitaStandard },
  'radio-group': { dataFrom, hType, isGitaStandard },
};
