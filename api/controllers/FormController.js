import { inputSets, customAttrs } from '../services/FormBuilderHelper';

var FormController = {
    showView: async (req, res) => {
        let result = await db.FormSchema.findOne({
            order: [ [ 'createdAt', 'DESC' ]]
        });
        let data = result.dataValues;

        res.view("admin/formBuilder", {
            data,
            inputSets,
            customAttrs,
        });
    },
    apiGetSchema: async (req, res) => {
        try {
            let schema = await db.FormSchema.findOne({
                order: [ [ 'createdAt', 'DESC' ]]
            });
            res.json(schema.dataValues);
        } catch (err) {
            console.error(err.stack);
            res.status(500);
            res.json({
                message: 'Server Error'
            });
        }
    },
    apiUpdate: async (req, res) => {
        try {
            let formData = req.body.formData;
            console.log(formData);
            let schema = await db.FormSchema.create({ schema: formData });
            res.json(schema.dataValues);
        } catch (err) {
            console.error(err.stack);
            res.status(500);
            res.json({
                message: 'Server Error'
            });
        }

    }
};

module.exports = FormController;
