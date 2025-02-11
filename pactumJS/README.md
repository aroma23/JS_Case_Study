### commands
```
npm run test
ENV=prod npm run test

ENV=prod npx mocha

ENV=prod npx mocha -g "response success"

ENV=prod npx mocha -g "response success" --colors 2>&1 | tee -a report/tests.log

ENV=prod npx mocha -g "Example API Custom hook"

npx mocha -g "SOAP Service Testing"

docker build -t qa-node-img:v1 .

docker run -it qa-node-img:v1 npx mocha -g "Example API Custom hook"

docker run -e VARIABLE=value image_name

docker run -it -v .:/workspace -e ENV=qa qa-node-img:v1 npx mocha -g "response success"

docker run -it -v .:/workspace -e ENV=prod qa-node-img:v1 npx mocha -g "response success"

docker run -it -v .:/workspace qa-node-img:v1 npx mocha -g "SOAP Service Testing"
```

## Sources:
https://medium.com/@joaovitorcoelho10/pactumjs-a-next-gen-rest-api-testing-tool-ae88a9e51916
https://pactumjs.github.io/guides/api-testing.html
https://pactumjs.github.io/api/assertions/expectStatus.html
https://github.com/pactumjs/pactum
https://www.chaijs.com/plugins/chai-xml/
