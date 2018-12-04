// format check /doc/formBuilderFormat.md

const getFileFormat = ({ fileType = 'document', multiple = false, ...props }) => ({
  ...props,
  "type":"file",
  "subtype":"file",
  "fileLimit": fileType,
  multiple
});

const getStepHeader = (label) => ({
  "type":"header",
  "subtype":"h1",
  "hType":"step",
  label
});

const getComplexTokenType = (label, name = 'token_type', isGita = true) => ({
  "type": "header",
  "subtype": "h3",
  "hType": "complexTokenType",
  label,
  name,
  isGitaStandard: isGita,
});


// Object-Group
const getLongTextAndUploadFile = ({ label, name, isGitaStandard = false }) => [
  {
    "type": "header",
    "subtype": "h2",
    "hType": "object",
    label,
    name,
    isGitaStandard,
  },
  {
    "type": "textarea",
    "subtype":"textarea",
    "label": "Label", // default value will hidden
    "hType": "object",
    "name": "textarea",
    "rows": 3

  },
  getFileFormat({
    "hType": "object",
    "label": "Label", // default value will hidden
    "name": "file",
  })
]

const getProjectMilestone = ({ label, name }) => [
  {
    "type": "header",
    "subtype": "h2",
    "hType": "object",
    label,
    name,
    isGitaStandard: true,
  },
  {
    "type": "textarea",
    "subtype":"textarea",
    "label": 'Description of Milestones and respective start and end date:',
    "hType": "object",
    "name": "brief",
    "rows": 3,
  },
  {
    "type": "textarea",
    "subtype":"textarea",
    "label": 'Technical details',
    "hType": "object",
    "name": "technical",
    "rows": 3
  },
  {
    "type": "textarea",
    "subtype":"textarea",
    "label": 'Business details',
    "hType": "object",
    "name": "business",
    "rows": 3
  },
  {
    "type": "textarea",
    "subtype":"textarea",
    "label": 'Other details',
    "hType": "object",
    "name": "other",
    "rows": 3
  },
]

const getTechUsed = ({ label, name }) => [
  {
    "type": "header",
    "subtype": "h2",
    "hType": "object",
    label,
    name,
    isGitaStandard: true,
  },
  {
    "type": "textarea",
    "subtype":"textarea",
    "label": 'Brief Description of above technologies functions in your project',
    "hType": "object",
    "name": "desc",
    "rows": 3,
    "maxlength": 500
  },
  {
    "type": "text",
    "subtype":"url",
    "label": 'Github/GitLab URL',
    "hType": "object",
    "name": "url",
  },
  getFileFormat({
    "hType": "object",
    "label": "Supplementary Document",
    "name": "file",
  })
]

const getTotalAllocationAvailable = ({ label, name }) => [
  {
    "type": "header",
    "subtype": "h2",
    "hType": "object",
    label,
    name,
    isGitaStandard: true,
  },
  // Team
  {
    "type": "number",
    "label": 'Team',
    "hType": "object",
    "name": "team_percent",
    "className": "percent-block",
    "min": 0,
  },
  {
    "type": "text",
    "subtype":"text",
    "label": 'Label',
    "hType": "object",
    "name": "team_txt",
  },
  // Advisor
  {
    "type": "number",
    "label": 'Advisor',
    "hType": "object",
    "name": "advisor_percent",
    "className": "percent-block",
    "min": 0,
  },
  {
    "type": "text",
    "subtype":"text",
    "label": 'Label',
    "hType": "object",
    "name": "advisor_txt",
  },
  // Marketing
  {
    "type": "number",
    "label": 'Marketing',
    "hType": "object",
    "name": "marketing_percent",
    "className": "percent-block",
    "min": 0,
  },
  {
    "type": "text",
    "subtype":"text",
    "label": 'Label',
    "hType": "object",
    "name": "marketing_txt",
  },
  // Legal
  {
    "type": "number",
    "label": 'Legal',
    "hType": "object",
    "name": "legal_percent",
    "className": "percent-block",
    "min": 0,
  },
  {
    "type": "text",
    "subtype":"text",
    "label": 'Label',
    "hType": "object",
    "name": "legal_txt",
  },
  // Development
  {
    "type": "number",
    "label": 'Development',
    "hType": "object",
    "name": "development_percent",
    "className": "percent-block",
    "min": 0,
  },
  {
    "type": "text",
    "subtype":"text",
    "label": 'Label',
    "hType": "object",
    "name": "development_txt",
  }
]

const getFinancedCrypto = ({ label, name }) => [
  {
    "type": "header",
    "subtype": "h2",
    "hType": "object",
    label,
    name,
    isGitaStandard: true,
  },
  {
    "type": "textarea",
    "subtype":"textarea",
    "label": 'Cryptocurrencies',
    "hType": "object",
    "name": "cryptocurrencies",
    "rows": 3,
  },
  {
    "type": "textarea",
    "subtype":"textarea",
    "label": 'Legal tender',
    "hType": "object",
    "name": "legal_tender",
    "rows": 3,
  }
]

const getTokenTransfer = ({ label, name }) => [
  {
    "type": "header",
    "subtype": "h2",
    "hType": "object",
    label,
    name,
    isGitaStandard: true,
  },
  {
    "type": "text",
    "subtype":"text",
    "label": 'Date',
    "hType": "object",
    "name": "date",
  },
  {
    "type": "text",
    "subtype":"text",
    "label": 'Issuer',
    "hType": "object",
    "name": "issuer",
  },
  {
    "type": "text",
    "subtype":"text",
    "label": 'Manner',
    "hType": "object",
    "name": "manner",
  },
  {
    "type": "text",
    "subtype":"text",
    "label": 'Others',
    "hType": "object",
    "name": "others",
  }
]

const getFeeDisclosure = ({ label, name }) => [
  {
    "type": "header",
    "subtype": "h2",
    "hType": "object",
    label,
    name,
    isGitaStandard: true,
  },
  {
    "type": "textarea",
    "subtype":"textarea",
    "label": 'Pre-ICO (each currency separately)',
    "hType": "object",
    "name": "pre",
    "rows": 3,
  },
  {
    "type": "textarea",
    "subtype":"textarea",
    "label": 'Actual ICO (each currency separately)',
    "hType": "object",
    "name": "actual",
    "rows": 3,
  }
]

// Array-Group
const getBiography = ({ label, name }) => [
  {
    "type": "header",
    "subtype": "h2",
    "hType": "array",
    label,
    name,
    isGitaStandard: true,
  },
  {
    "type": "text",
    "subtype":"text",
    "label": "Name",
    "hType": "array",
    "name": "name",
    "required": true,
  },
  {
    "type": "text",
    "subtype":"email",
    "label": 'Email',
    "hType": "array",
    "name": "email",
    "required": true,
  },
  {
    "type": "text",
    "subtype":"text",
    "label": "Title / Position",
    "hType": "array",
    "name": "title",
  },
  {
    "type": "textarea",
    "subtype":"textarea",
    "label": "Biography / Profile",
    "hType": "array",
    "name": "biography",
    "rows": 3
  },
  {
    "type": "text",
    "subtype":"url",
    "label": "Linkedin URL",
    "hType": "array",
    "name": "url",
  }
]

const getAdvisorRole = ({ label, name }) => [
  {
    "type": "header",
    "subtype": "h2",
    "hType": "array",
    label,
    name,
    isGitaStandard: true,
  },
  {
    "type": "text",
    "subtype":"text",
    "label": "Name",
    "hType": "array",
    "name": "name",
    "required": true,
  },
  {
    "type": "text",
    "subtype":"email",
    "label": 'Email',
    "hType": "array",
    "name": "email",
    "required": true,
  },
  {
    "type": "textarea",
    "subtype":"textarea",
    "label": "Biography / Profile",
    "hType": "array",
    "name": "biography",
    "rows": 3
  },
  {
    "type": "text",
    "subtype":"url",
    "label": "Linkedin URL",
    "hType": "array",
    "name": "url",
  }
]

const getMarketingPartnership = ({ label, name }) => [
  {
    "type": "header",
    "subtype": "h2",
    "hType": "array",
    label,
    name,
    isGitaStandard: false,
  },
  {
    "type": "text",
    "subtype":"text",
    "label": "Title",
    "hType": "array",
    "name": "title",
    "required": true,
  },
  {
    "type": "text",
    "subtype":"email",
    "label": 'Email',
    "hType": "array",
    "name": "email",
    "required": true,
  },
  {
    "type": "text",
    "subtype":"url",
    "label": "Website",
    "hType": "array",
    "name": "url",
  }
]


// Radio-Group
const getNoYesGroup = ({ label, name, isGita = false, isYes = true, text = 'Label', textType = 'text'}) => [
  {
    "type": "header",
    "subtype": "h2",
    "hType": "radio",
    label,
    name,
    isGitaStandard: isGita,
  },
  {
    "type": "radio-group",
    "hType": "radio",
    "className": "inline",
    label,
    name,
    isGitaStandard: isGita,
    "dataFrom": "mixin",
    "values": [{
        "label": "No",
        "value": "no"
    },{
        "label": "Yes",
        "value": "yes"
    }],
  }, {
    "hType": "radio",
    "type": textType,
    "subtype": textType,
    "label": text,
    "name": isYes ? 'yes_1' : 'no_1',
    "className": text === 'Label' && textType === 'text' ? 'inline' : '',
    "rows": 3
  }
];

const getSmartContract = (label, name = 'smart_contract', isGita = false) => [
  {
    "type": "header",
    "subtype": "h2",
    "hType": "radio",
    label,
    name,
    isGitaStandard: isGita,
  },
  {
    "type": "radio-group",
    "hType": "radio",
    label,
    name,
    isGitaStandard: isGita,
    "dataFrom": "mixin",
    "values": [{
        "label": "No",
        "value": "no"
    },{
        "label": "Yes",
        "value": "yes"
    }],
  }, {
    "hType": "radio",
    "type":"text",
    "subtype":"text",
    "label":"Who is the provider?",
    "name":"yes_provider",
  }, {
    "hType": "radio",
    "type":"text",
    "subtype":"text",
    "label":"Who audits the contracts?",
    "name":"yes_audits",
  }
];

const getICOType = (label, name = 'ico_type', isGita = false) => [
  {
    "type": "header",
    "subtype": "h2",
    "hType": "radio",
    label,
    name,
    isGitaStandard: isGita,
  },
  {
    "type": "radio-group",
    "hType": "radio",
    label,
    name,
    isGitaStandard: isGita,
    "dataFrom": "mixin",
    "values": [{
        "label": "Capped Sales",
        "value": "capped"
    },{
        "label": "Uncapped Sales",
        "value": "uncapped"
    },{
        "label": "Dutch Auction",
        "value": "dutch_auction"
    },{
        "label": "Other:",
        "value": "other"
    }],
  }, {
    "hType": "radio",
    "type":"text",
    "subtype":"text",
    "label":"Label",
    "name":"other_text",
    "className": "inline"
  }
];

const getRemainUnsoldResult = (label, name = 'remain_unsold_result', isGita = true) => [
  {
    "type": "header",
    "subtype": "h2",
    "hType": "radio",
    label,
    name,
    isGitaStandard: isGita,
  }, {
    "type": "radio-group",
    "hType": "radio",
    label,
    name,
    isGitaStandard: isGita,
    "dataFrom": "mixin",
    "values": [{
      "label": "No (Please specify how you manage those tokens)",
      "value": "no"
    },{
      "label": "Yes",
      "value": "yes"
    }],
  }, {
    "hType": "radio",
    "type":"textarea",
    "subtype":"textarea",
    "label":"Label",
    "name":"no_1",
    "row": 3
  }
];


const getLockUpPeriod = (label, name = 'lockup_period', isGita = true) => [
  {
    "type": "header",
    "subtype": "h2",
    "hType": "radio",
    label,
    name,
    isGitaStandard: isGita,
  }, {
    "type": "radio-group",
    "hType": "radio",
    label,
    name,
    isGitaStandard: isGita,
    "dataFrom": "mixin",
    "values": [{
      "label": "No",
      "value": "no"
    },{
      "label": "Yes (Please specify how the lockup will be stipulated)",
      "value": "yes"
    },{
      "label": "Other: Specify",
      "value": "other"
    }],
  }, {
    "type": "select",
    "label": "Label",
    "hType": "radio",
    "name": "yes_1",
    "isGitaStandard": true,
    "className": "inline",
    "values": [{
      "label": "an ICO smart contract",
      "value": "ico_smart_contract"
    },{
      "label": "in a separate vesting contract",
      "value": "vesting_contract"
    }, {
      "label": "in a physical option agreement with teammembers",
      "value": "physical_options"
    }]
  }, {
    "hType": "radio",
    "type":"text",
    "subtype":"text",
    "label":"Label",
    "name":"other_1",
    "className": "inline",
  }
];

const getICOEscrow = (label, name = 'ico_escrow', isGita = false) => [
  {
    "type": "header",
    "subtype": "h2",
    "hType": "radio",
    label,
    name,
    isGitaStandard: isGita,
  }, {
    "type": "radio-group",
    "hType": "radio",
    label,
    name,
    isGitaStandard: isGita,
    "dataFrom": "mixin",
    "values": [{
      "label": "No (What’s the measures of security you provided instead of creating an Escrow Wallet)",
      "value": "no"
    },{
      "label": "Yes",
      "value": "yes"
    }],
  }, {
    "hType": "radio",
    "type":"textarea",
    "subtype":"textarea",
    "label":"Label",
    "name":"no_1",
    "rows": 3,
  }, {
    "hType": "radio",
    "type":"textarea",
    "subtype":"textarea",
    "label":"Detailed description",
    "name":"yes_1",
    "rows": 3,
  }
];

const getOtherLegalDoc = (label, name = 'other_legal_doc', isGita = false) => [
  {
    "type": "header",
    "subtype": "h2",
    "hType": "radio",
    label,
    name,
    isGitaStandard: isGita,
  }, {
    "type": "radio-group",
    "hType": "radio",
    label,
    name,
    isGitaStandard: isGita,
    "dataFrom": "mixin",
    "values": [{
        "label": "No",
        "value": "no"
    },{
        "label": "Yes",
        "value": "yes"
    }],
  }, {
    "hType": "radio",
    "type":"textarea",
    "subtype":"textarea",
    "label":"If there is an exemption, please indicate which exemption the project is relying on, e.g., accredited investor, private placement, etc",
    "name":"no_1",
    "rows": 3,
  },
  getFileFormat({
    "hType": "radio",
    "label":"Please upload requested documents",
    "name":"yes_files",
    "multiple": true
  })
];

const getInvolvedWallet = (label, name = 'involved_wallet', isGita = false) => [
  {
    "type": "header",
    "subtype": "h2",
    "hType": "radio",
    label,
    name,
    isGitaStandard: isGita,
  }, {
    "type": "radio-group",
    "hType": "radio",
    label,
    name,
    isGitaStandard: isGita,
    "dataFrom": "options",
    "values": [{
        "label": "No",
        "value": "no"
    },{
        "label": "Yes",
        "value": "yes"
    }],
  }
];

const getSurplusHandle = (label, name = 'surplus_handle', isGita = true) => [
  {
    "type": "header",
    "subtype": "h2",
    "hType": "radio",
    label,
    name,
    isGitaStandard: isGita,
  }, {
    "type": "radio-group",
    "hType": "radio",
    label,
    name,
    isGitaStandard: isGita,
    "dataFrom": "mixin",
    "values": [{
        "label": "No surplus funds",
        "value": "no"
    },{
        "label": "The surplus is returned to the investors.",
        "value": "yes"
    }, {
        "label": "Use for other purpose",
        "value": "other"
    }],
  }, {
    "hType": "radio",
    "type":"textarea",
    "subtype":"textarea",
    "label":"Label",
    "name":"other_used",
    "rows": 3,
  }
];

const getCybersecurityAudit = (label, name = 'cybersecurity_audit', isGita = false) => [
  {
    "type": "header",
    "subtype": "h2",
    "hType": "radio",
    label,
    name,
    isGitaStandard: isGita,
  }, {
    "type": "radio-group",
    "hType": "radio",
    label,
    name,
    isGitaStandard: isGita,
    "dataFrom": "mixin",
    "values": [{
        "label": "No",
        "value": "no"
    },{
        "label": "Yes",
        "value": "yes"
    }],
  }, {
    "hType": "radio",
    "type":"text",
    "subtype":"text",
    "label":"Cybersecurity audit provider",
    "name":"yes_provider",
  },
  getFileFormat({
    "hType": "radio",
    "label":"Please upload the audit report.",
    "name":"yes_files",
  })
];

module.exports.formSchema = [
  getStepHeader("Project Description/Business Model"),
  getFileFormat({
    "label":"Project Icon",
    "name":"project_icon",
    "fileType": "image",
    "required": true,
  }),
  {
    "type":"text",
    "subtype":"text",
    "label":"Project Name",
    "name":"project_name",
    "required": true,
    "isGitaStandard": true,
  },
  {
    "type":"text",
    "subtype":"text",
    "label":"Digital asset full name (e.g., Ether)",
    "name":"digital_asset_name",
    "required": false,
    "isGitaStandard": false,
  },
  {
    "type":"text",
    "subtype":"text",
    "label":"Digital asset ticker (e.g., ETH)",
    "name":"digital_asset_ticker",
    "required": false,
    "isGitaStandard": false,
  },
  {
    "type":"text",
    "subtype":"url",
    "label":"Project URL (URL of project website)",
    "name":"project_url",
    "required": true,
    "isGitaStandard": false,
  },
  {
    "type":"textarea",
    "subtype":"textarea",
    "label":"Project Goals (Describe your project in a sentence.)",
    "name":"project_goal",
    "isGitaStandard": false,
    "rows": 3,
    "maxlength": 100,
  },
  ...getProjectMilestone({
    "label": "Project Roadmap/Project Plan/Milestones (detailed description of concrete project time frame) ",
    "name": "project_milestone",
    "isGitaStandard": true,
  }),
  getComplexTokenType('Type of Token to be issued (Multiple selections accepted)'),
  ...getNoYesGroup({
    label: "Is there a Minimum Viable Product on release of tokens?",
    name: "mvp_function",
    isGita: true,
    text: 'Link for reference'
  }),
  ...getBiography({
    "label":"Biographies and resumes of the management team",
    "name":"biography_team",
  }),
  ...getBiography({
    "label":"Biographies and resumes of advisors",
    "name":"biography_advisor",
  }),
  ...getBiography({
    "label":"Biographies and resumes of developers",
    "name":"biography_developer",
  }),
  ...getAdvisorRole({
    "label":"Roles of the Advisors and involvement in the project (Detailed description of terms and conditions under which advisors provide their services)",
    "name":"advisor_role",
  }),
  ...getTechUsed({
    "label":"Information about the technologies to be used (Including distributed ledger technology, ICO smart contract code and tech specs used; are new or existing technologies used; etc.)",
    "name":"tech_used",
    "isGitaStandard": true,
  }),
  ...getSmartContract('Are smart contracts used in the token sale?'),
  getStepHeader("ICO Information"),
  ...getNoYesGroup({
    label: "Will tokens be created before fundraising?",
    name: "token_creation",
    isGita: true,
    text: 'Please provide relevant links to token emission and crowdsale smart contracts for verification '
  }),
  {
    "type":"number",
    "label":"Total amount to be raised in USD (hardcap)",
    "name":"usd_raise",
    "className": "price-block",
    "isGitaStandard": true
  },
  {
    "type":"number",
    "label":"Amount of softcap in USD",
    "name":"softcap",
    "className": "price-block",
    "isGitaStandard": false
  },
  {
    "type":"number",
    "label":"What percentage of the tokens are being sold in the ICO?",
    "name":"sold_token_percentage",
    "className": "percent-block",
    "isGitaStandard": false
  },
  ...getICOType('Type of ICO'),
  {
    "type":"number",
    "label":"What is the price of the token at the launch of the ICO?",
    "name":"token_price_at_launch",
    "isGitaStandard": true,
    "className": "price-block",
  },
  ...getNoYesGroup({
    label: "Does the price of the token change during the ICO period?",
    name: "token_price_in_period",
    isGita: true,
    text: 'Please describe the method used to determine the prices changes.',
    textType: 'textarea'
  }),
  ...getLongTextAndUploadFile({
    "label":"Contribution audit report",
    "name":"contribution_audit",
    "isGitaStandard": true
  }),
  {
    "type":"textarea",
    "subtype":"textarea",
    "label":"Please describe the fundraising structure and stages of the ICO (e.g., seed round, private sale 1, private sale 2, pre-sale, and public sale).",
    "name":"raising_process",
    "isGitaStandard": true,
    "rows": 3
  },
  ...getTotalAllocationAvailable({
    "label":"Total Allocation Available",
    "name":"total_allocation",
  }),
  {
    "type":"text",
    "subtype":"text",
    "label":"Stages completed as of the date specified",
    "name":"stage_date",
    "isGitaStandard": true,
  },
  ...getRemainUnsoldResult("Will unsold tokens be burned?"),
  ...getFinancedCrypto({
    "label":"With which cryptocurrencies (or legal tender) will the ICO be financed and how?",
    "name":"financed_crypto",
  }),
  ...getLockUpPeriod("Is there a Lock-up Period?"),

  ...getNoYesGroup({
    label: "If there’s any discounts provided in the private sale?",
    name: "discounts_private_sale",
    isGita: true,
  }),
  ...getNoYesGroup({
    label: "Is the token pegged to forms of payment in the private sale?",
    name: "pegged_private_sale",
  }),
  ...getNoYesGroup({
    label: "Are there any restrictions or any investment conditions regarding investors? If so, please list below",
    name: "investor_restriction",
    textType: 'textarea',
  }),
  ...getNoYesGroup({
    label: "Is there any process of cryptocurrency proceeds restitution in case the ICO target amount is not reached",
    name: "restitution_process",
    isGita: true,
  }),
  ...getNoYesGroup({
    label: "Is there a ‘Wallet,’ which is real-time traceability of collected cryptocurrency (and Fiat currencies) for the ICO?",
    name: "wallet_traceability",
    text: "Links to all relevant wallets:",
    textType: "textarea"
  }),
  ...getTokenTransfer({
    "label":"At which point, by whom and in which manner will the token be transferred to the investors?",
    "name":"token_transfer",
  }),
  getStepHeader("General Whitepaper"),
  ...getNoYesGroup({
    label: "Are there any means for tracking the progress of key milestones indicated in white papers",
    name: "milestone_checking",
    text: "Please provide links or contact windows for investors tracking the progress of key milestones of the project at any time",
    textType: 'textarea',
    isGita: true,
  }),
  ...getNoYesGroup({
    label: "If there’s a standard procedure for any revision of whitepaper?",
    name: "revise_procedure",
    text: "Please provide the procedure",
    textType: "textarea"
  }),
  ...getLongTextAndUploadFile({
    "label":"Risk Disclosure",
    "name":"risk_disclosure",
    "isGitaStandard": true
  }),
  ...getLongTextAndUploadFile({
    "label":"Warning and Disclaimer",
    "name":"warning",
    "isGitaStandard": true
  }),
  ...getLongTextAndUploadFile({
    "label":"Governing law and jurisdiction for dispute resolution of the ICO",
    "name":"governing_law",
    "isGitaStandard": true
  }),
  getStepHeader("Company Information"),
  {
    "type":"text",
    "subtype":"text",
    "label":"Company Name",
    "name":"company_name",
    "isGitaStandard": true
  },
  {
    "type": "select",
    "label": "Jurisdiction",
    "name": "jurisdiction",
    "isGitaStandard": true,
    "dataFrom": "country",
    "values": []
  },
  {
    "type":"number",
    "label":"Company Registration Number",
    "name":"company_registration_number",
    "isGitaStandard": true
  },
  {
    "type": "radio-group",
    "label": "Industry",
    "name": "company_industry",
    "other": true,
    "dataFrom": "industry",
    "values": [],
    "isGitaStandard": true
  },
  {
    "type":"text",
    "subtype":"text",
    "label":"Email Address",
    "name":"company_email",
    "isGitaStandard": true,
  },
  ...getLongTextAndUploadFile({
    "label":"Recent Financial Report",
    "name":"financial_report"
  }),
  ...getLongTextAndUploadFile({
    "label":"Articles of Association",
    "name":"aoa"
  }),
  ...getLongTextAndUploadFile({
    "label":"Shareholders' Resolution Regarding the ICO",
    "name":"shareholder"
  }),
  ...getLongTextAndUploadFile({
    "label":"Director's Resolutions Regarding the ICO",
    "name":"director"
  }),
  ...getLongTextAndUploadFile({
    "label":"Other Registry Filings regarding ICO",
    "name":"other_filing"
  }),
  {
    "label":"Conflicts of Interests Disclosure",
    "name":"coi_disclosure",
    "type":"text",
    "subtype":"text",
    "descHtmlElm": "<div><p>Please provide links or contact windows for investors to track potential conflicts of interest, including:</p><ul> <li> The numbers of tokens held by the team members, advisors, employees and a major token holder by the fifteenth of each month</li>* A major token holder means an entity holding more than 10% of the total issued tokens <br/>* The aforementioned calculation of tokens shall include tokens held by their spouses and minor children, as well as those held under the names of other parties. <li> The token incentive schemes for employees and executives;</li><li>Self-dealing transactions; and </li><li> Others.</li></ul></div>"
  },
  ...getLongTextAndUploadFile({
    "label":"Licenses granted under the financial market law in any countries",
    "name":"license"
  }),
  ...getLongTextAndUploadFile({
    "label":"Privacy policy",
    "name":"privacy_policy"
  }),
  ...getLongTextAndUploadFile({
    "label":"Token sale agreement",
    "name":"sale_agreement"
  }),
  ...getLongTextAndUploadFile({
    "label":"Terms of use",
    "name":"used_terms"
  }),

  getStepHeader("Proceeds"),
  ...getFeeDisclosure({
    "label":"Disclosure of all fees (each currency separately) incurred for and during the process of the Pre-ICO and actual ICO",
    "name":"fee_disclosure",
  }),

  ...getSurplusHandle("How will surplus funds be handled, e.g., if the funds raised exceed what is necessary for the development of the project?"),

  getStepHeader("Exchange and Liquidity"),
  ...getNoYesGroup({
    label: "Is there a secondary platform for the tokens",
    name: "secondary_platform",
    text: "Please provide the information of other secondary trading participants, eg. ICO secondary platform"
  }),
  ...getNoYesGroup({
    label: "Can the token be utilized when the token is transferred to the purchaser?",
    name: "token_function_time",
    isGita: true,
    isYes: false,
    text: "When will the tokens be usable by the purchaser?"
  }),
  ...getNoYesGroup({
    label: "Are there plans for the project operator/issuer to buy back tokens?",
    name: "buyback_plan",
    isGita: true,
    text: "What’s the buyback conditions?",
    textType: "textarea"
  }),

  getStepHeader("Security"),
  ...getICOEscrow("Will an ICO/ITO Escrow wallet for cryptocurrencies be created?"),
  ...getInvolvedWallet("If a digital wallet is involved?"),
  ...getNoYesGroup({
    label: "Is there a procedure for the token holder to recover access to funds if the key is lost?",
    name: "lost_scenario",
    textType: "textarea"
  }),
  ...getCybersecurityAudit("Has an Independent cybersecurity audit report been obtained?"),
  ...getNoYesGroup({
    label: "Is an investor account or a smart contract is used for fundraising?",
    name: "safety_security",
    isGita: true,
    text: "Please provide the account characteristics and specify how that assure the ICO safety and security.",
    textType: "textarea"
  }),
  getStepHeader("Marketing Information"),
  ...getNoYesGroup({
    label: "Is there any bounty program terms?",
    name: "bounty",
    text: "Please provide relevant information",
    textType: "textarea"
  }),
  ...getLongTextAndUploadFile({
    "label":"Airdrop terms",
    "name":"airdrop_terms"
  }),
  ...getMarketingPartnership({
    "label": "Please provide the name of your marketing partnerships",
    "name":"marketing_partnership"
  }),
  getStepHeader("Self-Compliance with regulatory Requirements Assessment"),
  ...getLongTextAndUploadFile({
    "label":"Please provide the independent legal compliance review (legal rules & competent court in involved jurisdictions)",
    "name":"legal_compliance",
    "isGitaStandard": true
  }),
  ...getOtherLegalDoc("Any other legal documents required to be disclosed under securities regulations if the token is qualified as security by your legal counsel?"),
  ...getNoYesGroup({
    label: "Does your legal counsel consider that you are subject to AML regulation in your jurisdiction?",
    name: "kycaml_framework",
    isGita: true,
    text: "Please provide detailed information about the relevant processes.",
    textType: "textarea"
  }),
  {
    "type":"text",
    "subtype":"text",
    "label":"Who is the KYC Provider of the project?",
    "name":"kyc_provider",
  },
  ...getNoYesGroup({
    label: "Will the involved financial intermediary who is subject to AMLA in its jurisdiction be commissioned to meet the due diligence requirements under AML regulations?",
    name: "amla",
    text: "The compliance situation",
    textType: "textarea",
  }),
  {
    "type":"text",
    "subtype":"text",
    "label":"Who is the legal counsel of the project?",
    "name":"legal_counsel",
  },
  getStepHeader("Investor Protections"),
  ...getNoYesGroup({
    label: "Are there any legal protections available in the event of fraud, a hack, malware, or a downturn in business prospects?",
    name: "legal_protection",
    isGita: true,
    text: "Detailed description",
    textType: "textarea"
  }),
  {
    "type":"textarea",
    "subtype":"textarea",
    "label":"Who will be responsible for refunding investor’s investment if something goes wrong?",
    "name":"refund_party",
    "rows": 3
  },
  ...getNoYesGroup({
    label: "Will there be adequate funds to compensate the investors if their rights are violated?",
    name: "adequate_fund",
    text: "Detailed description",
    textType: "textarea"
  }),
]
