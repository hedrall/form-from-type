
generate:
	npx typescript-json-schema \
      --titles \
      --required \
      tsconfig.app.json お問い合わせForm \
      > src/generated/jsonschema/model.json
