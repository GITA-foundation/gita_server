module.exports = function(sequelize, DataTypes) {
  const FormSchema = sequelize.define('FormSchema', {
    schema: {
      type: DataTypes.TEXT,
      get: function() {
          return JSON.parse(this.schema);
      },
      set: function(newContent) {
          let content;
          try {
              content = JSON.stringify(newContent);
          } catch (e) {}
          content = content || null
          this.setDataValue("schema", content);
      },
      comment: "Supernode defined form schema"
    }
  });
  return FormSchema;
};

