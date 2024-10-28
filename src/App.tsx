import './App.css';
import '@rjsf/core';
import { Theme } from '@rjsf/antd';
import { withTheme } from '@rjsf/core';
import type { RJSFSchema, UiSchema as _UiSchema } from '@rjsf/utils';
import validator from '@rjsf/validator-ajv8';
import type { JSONSchema7 } from 'json-schema';
import { useState } from 'react';
import formJson from './generated/jsonschema/model.json';
import type { お問い合わせForm } from './model';

// ts が json を import する時に、jsonschema の anyOf 部分の型がおかしくなる
const schema: RJSFSchema = formJson as unknown as JSONSchema7;

const Form = withTheme<お問い合わせForm, typeof schema>(Theme);

type UISchema = _UiSchema<お問い合わせForm, typeof schema>;
const uiSchema: UISchema = {
  // jsonschema で property の順番は保証されない (RJSFはpropertyOrderに対応していない)
  'ui:order': ['氏名', 'お問い合わせの種類', 'お問い合わせ内容', '日中の連絡先', '備考'],

  日中の連絡先: {
    anyOf: [
      {
        // type は固定なので表示しない
        type: { 'ui:widget': 'hidden' },
        address: { 'ui:options': { label: false } },
      },
      {
        type: { 'ui:widget': 'hidden' },
        number: { 'ui:options': { label: false } },
      },
    ],
  },
};

function App() {
  const [data, setData] = useState<お問い合わせForm | null>(null);

  if (!formJson || typeof formJson === 'string') return null;

  return (
    <>
      <Form //
        schema={schema}
        uiSchema={uiSchema}
        validator={validator}
        onChange={(e) => e.formData && setData(e.formData)}
        onSubmit={(e) => e.formData && setData(e.formData)}
      />
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
}

export default App;
