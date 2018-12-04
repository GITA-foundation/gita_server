const FAQController = {
  adminFormList: async (req, res) => {
    let where = {};
    let query = req.query;

    if (query.name) {
      where.name =  { $like: `%${query.name}%` }
    }

    if (query.content) {
      where.content = { $like: `%${query.content}%`}
    }

    let forms = await db.FAQForm.findAll({
      order: [ [ 'createdAt', 'DESC' ]]
    });

    forms = _.map(forms, (form) => {
      return {
        time: sails.moment(form.createdAt).format('YYYY-MM-DD'),
        id: form.id,
        name: form.name,
        email: form.email,
        content: form.content,
        memo: form.memo,
        finished: form.finished,
        type: (form.FAQType && form.FAQType.name) ? form.FAQType.name : "",
      };
    });

    return res.view('admin/faqFormList', {
      forms,
      query
    });
  },

  apiCreateForm: async (req, res) => {
    if (!req.body.email) {
      res.status(400);
      return res.json({
        message: 'Invalid Parameter',
      });
    }

    let form = await db.FAQForm.create(req.body);

    res.created({
      id: form.id,
    });
  }
};
module.exports = FAQController;
