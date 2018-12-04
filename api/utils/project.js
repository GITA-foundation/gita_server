const GITA_STANDARD_FIELDS = [
  // Project Description/Business Model
  'project_name',
  'project_milestone',
  'token_type',
  'mvp_function',
  'biography_team',
  'biography_advisor',
  'biography_developer',
  'advisor_role',
  'tech_used',
  // ICO Information
  'token_creation',
  'usd_raise',
  'token_price_at_launch',
  'token_price_in_period',
  'contribution_audit',
  'raising_process',
  'total_allocation',
  'stage_date',
  'remain_unsold_result',
  'financed_crypto',
  'lockup_period',
  'discounts_private_sale',
  'restitution_process',
  'token_transfer',
  // General Whitepaper
  'milestone_checking',
  'risk_disclosure',
  'warning',
  'governing_law',
  // Company Information
  'company_name',
  'jurisdiction',
  'company_registration_number',
  'company_industry',
  'company_email',
  // Proceeds
  'fee_disclosure',
  'surplus_handle',
  // Exchange and Liquidity
  'token_function_time',
  'buyback_plan',
  // Security
  'safety_security',
  // Self-Compliance with ....
  'legal_compliance',
  'kycaml_framework',
  // Investor Protections
  'legal_protection',
];

const roleTypeMap = {
  biography_team: 'Management team',
  biography_advisor: 'advisor',
  biography_developer: 'developer',
  advisor_role: 'advisor',
  marketing_partnership: 'Marketing partnership'
};


const getTotalFinished = (content) => {
  return _.reduce(content, (result, val) => {
    if (_.isString(val)) {
      return _.isEmpty(val) ? result : result + 1;
    } else if (_.isArray(val) || _.isObject(val)) {
      const count = getTotalFinished(val);
      return count === 0 ? result : result + 1;
    } else if (_.isNumber(val)) {
      return val > 0 ? result + 1: result;
    }
    return result;
  }, 0);
}

const clearEmptyPersonData = (data, modelName, ProjectId) =>
  data[modelName] ? data[modelName].reduce((r, row) => {
    if (_.isEmpty(row.name) ||  _.isEmpty(row.email)) return r;
    return [...r, { ProjectId, modelName, ...row }]
  }, []) : []

module.exports = {
  clearEmptyPersonData,
  getTotalFinished,
  isProjectStandard: (models = {}) => {
    const gitaStandardFieldContent = GITA_STANDARD_FIELDS.reduce((r, column) => ({
      ...r,
      [column]: models[column]
    }), {});
    const finishedTotal = getTotalFinished(gitaStandardFieldContent);
    sails.log.verbose('isProjectStandard >>>', finishedTotal, GITA_STANDARD_FIELDS.length);
    sails.log.verbose('isProjectStandard content >>>', gitaStandardFieldContent);
    return finishedTotal === GITA_STANDARD_FIELDS.length;
  },
  sendMentionedPersonVerifiedLetter: async (identity, member, person, formData) => {
    try {
      const token = TokenAuth.issueToken({
        identity,
        name: person.name,
        email: person.email,
        modelName: person.modelName,
        date: sails.moment().format('YYYY-MM-DD'),
      });
      const data = {
        projectName: formData.project_name || "noname",
        personName:  person.name,
        personEmail: person.email,
        memberName:  member.username,
        memberEmail: member.email,
        token: formData.token || "token",
        website: formData.project_url || "NOT_SET",
        roleType: roleTypeMap[person.modelName],
        projectUrl: UrlHelper.resolveForApp(`project/${identity}`, true),
        activeLink: UrlHelper.resolveForApp(`project/verified?token=${token}`, true),
      };
      const messageConfig = await CustomMailerService.requestMentionedPersonToVerified(data);
      const message = await db.Message.create(messageConfig);
      await CustomMailerService.sendMail(message);
      return { error: false };
    } catch (e) {
      console.log('sendMentionedPersonVerifiedLetter', e);
      return { error: true, e }

    }
  }
};
