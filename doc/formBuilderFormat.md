# Form Builder

## 相關文件
- 官方文件：https://formbuilder.online/
- 自定義屬性(customAttrs) ：`gita_server/api/services/FormBuilderHelper.js`
  - ex: `hType`, `isGitaStandard`, `dataFrom` ... etc.
- schema套用範例： `/gita_server/config/init/formSchema.js`

## Note
- label 必填，預設為 `Label`，若不想顯示設定為 `Label` 在前端就會隱藏

### step group
- 一定是 h1
- 可參考 `getStepHeader`
```
  {
    "type":"header",
    "subtype":"h1",
    "hType":"step",
    "label":"Project Description/Business Model"
  }
```

### input-text
```
   {
      "type":"text",
      "subtype":"text",
      "required":true,
      "label":"Text Field",
      "isGitaStandard": "true",
      "name": "xxx",
      "hType": array | object | normal,
   }
```

### input-number
```
   {
      "type":"number",
      "required":true,
      "label":"Number",
      "isGitaStandard": "true",
      "name":"number-1533832379510",
      "min":"1",
      "max":"10",
      "step":"90"
   }
```

### input-textarea
```
   {
      "type":"textarea",
      "subtype":"textarea",
      "required":true,
      "label":"Text Area",
      "name":"textarea-1533832397051",
      "maxlength":"30",
      "rows":"4"
   },
```

### input-file
- 可參考 `getFileFormat`
- fileLimit
  - document: 文件檔案
  - image: 圖片檔案
```
   {
      "type":"file",
      "subtype":"file"
      "fileLimit": "document" || "image",
      "label":"File Upload",
      "name":"file-1533832414145",
      "isGitaStandard": "true",
   }
```

### object
- 可參考 `getLongTextAndUploadFile`
- header type 為 h2
- hType 都為 `object`

```
 [
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
    "rows": 4
  },
  {
    "type":"file",
    "subtype":"file",
    "className": "object",
    "label": "File Upload",
    "name": "file",
  }
]
```

### array
- 可參考 `getBiography`
- header type 為 h2
- hType 都為 `array`

```
[
  {
    "type": "header",
    "subtype": "h2",
    "hType": "array",
    label,
    name,
    isGitaStandard: "true",
  },
  {
    "type": "text",
    "subtype":"text",
    "label": "Name",
    "hType": "array",
    "name": "name",
  },
  {
    "type": "text",
    "subtype":"email",
    "label": 'Email',
    "hType": "array",
    "name": "email",
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
    "rows": 4
  },
  {
    "type": "text",
    "subtype":"url",
    "label": "Linkedin URL",
    "hType": "array",
    "name": "url",
  }
]
```
