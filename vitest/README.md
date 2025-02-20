### commands To Run tests
```
npm run test
vitest
vitest test/api.test.js

ENV=prod vitest test/api.test.js

if you don't have vitest installed
npx vitest



to preview the results
npx vite preview --outDir reports/html/
http://localhost:4173/

https://github.com/pactumjs/pactum-swagger-coverage/blob/main/tests/testObjects/openapi3.yaml

https://www.ontestautomation.com/api-mocking-in-javascript-with-pactum/

https://github.com/basdijkstra/api-testing-js-pactum
```

### Vitest Observations
1) Excellent framework for front end unit and component testings (Especially Projects using React, Node, and other JavaScript frameworks)
2) Vitest runner performance is significant better than JEST
3) Pubish the vitest html reports are pretty easy with vite preview
4) Community support is less than JEST but community is growing
5) Must be extended with HTTP client libraries for API testings
    Options include: Axios, SuperTest, Pactum and etc
6) Has ability to selectively run tests using only, skip, --testNamePattern or grep
    eg: npx vitest run --testNamePattern="user"



**Jest** and **Vitest** are both popular JavaScript testing frameworks, but they have different strengths and use cases. Here’s a detailed comparison between **Jest** and **Vitest** to help you understand which one might be better for your needs.

### **Jest**
Jest is one of the most widely used JavaScript testing frameworks. It is known for its simplicity, rich feature set, and strong community support. It is used mainly for **unit testing** and **integration testing**.

#### Key Features of Jest:
1. **Complete Test Runner**: Jest comes with a built-in test runner, which automatically handles running tests in parallel, reporting results, and watching for changes.
2. **Mocking**: Jest has built-in mocking capabilities for functions, timers, and modules. This makes it very easy to test code that has dependencies on external libraries or services.
3. **Snapshot Testing**: Jest has built-in support for snapshot testing, which allows you to compare objects or component output over time.
4. **Code Coverage**: Jest includes built-in code coverage reporting, so you can easily see how much of your code is being tested.
5. **Zero Configuration**: Jest works out of the box with minimal setup, and it can be used with many popular JavaScript frameworks (React, Node, etc.).
6. **Large Ecosystem**: Jest has a large ecosystem with many plugins and integrations (like **Jest-Dom** for DOM testing, **React Testing Library**, etc.).
7. **Async/Await & Promises**: It has strong support for asynchronous tests using `async/await` or promises.
8. **Community Support**: Jest has a large user base and is maintained by Facebook, which makes it very reliable.

#### Best For:
- **Unit testing** JavaScript code
- **Integration testing** with external libraries
- **Snapshot testing** for UI components or data
- Projects using React, Node, and other JavaScript frameworks

### **Vitest**
Vitest is a relatively newer testing framework that is designed to be a fast, modern alternative to Jest. It is built on top of **Vite**, a next-generation bundler for JavaScript applications, which gives it a significant performance advantage.

#### Key Features of Vitest:
1. **Fast Execution**: Vitest is built on top of **Vite**, which provides extremely fast bundling and test execution. It’s optimized for speed and is great for large codebases.
2. **Jest-Compatible API**: Vitest is largely **API-compatible** with Jest, meaning that it can use most Jest APIs, which makes migration from Jest easier. It supports similar features, like mocking, snapshots, and code coverage.
3. **Native TypeScript Support**: Vitest is natively built to support TypeScript out of the box, making it an ideal choice for modern TypeScript-based applications.
4. **Built-in Mocking and Spying**: Like Jest, Vitest supports powerful mocking capabilities, such as mocking functions and modules.
5. **Snapshot Testing**: It also supports snapshot testing, allowing you to capture and compare test outputs over time.
6. **Vite Ecosystem**: Vitest integrates well with Vite, which is great for projects built with **Vite**, **Vue**, or **React** and provides faster builds for those who already use Vite as a bundler.
7. **Parallel Testing**: It supports running tests in parallel for faster test execution, reducing the overall test suite runtime.

#### Best For:
- Projects using **Vite** (React, Vue, etc.) for bundling
- **Modern, fast testing** for JavaScript/TypeScript codebases
- Developers looking for a **Jest alternative** with faster performance
- Projects that require **TypeScript** support out of the box

### Comparison:

| Feature                     | **Jest**                                  | **Vitest**                               |
|-----------------------------|-------------------------------------------|------------------------------------------|
| **Performance**              | Slower compared to Vitest, but good for most cases | Very fast, especially in large codebases due to Vite's optimizations |
| **Integration with Vite**    | No direct Vite integration                | Built natively on top of Vite, perfect for Vite-based projects |
| **API Compatibility**        | Well-established, stable API              | Jest-compatible API (easy migration)     |
| **Mocking**                  | Excellent mocking support                 | Great mocking and spying capabilities    |
| **Snapshot Testing**         | Full snapshot support                     | Full snapshot support                    |
| **Code Coverage**            | Built-in code coverage reporting          | Built-in code coverage, with more focus on performance |
| **Async Testing**            | Strong async testing (async/await support) | Strong async testing support             |
| **TypeScript Support**       | TypeScript support via configuration      | Native TypeScript support out of the box |
| **Community Support**        | Large community, extensive resources      | Growing community, smaller but rapidly expanding |
| **Configuration**            | Minimal setup, but can require Babel for ESModules | Minimal setup, easy for Vite projects    |

### When to Use **Jest**:
- If you are working on a **React**, **Node.js**, or **Express** project and need a stable, well-supported framework.
- If you prefer a framework with **widespread community support** and resources.
- If you're working in a **non-Vite** environment and don’t require the optimizations Vitest provides.

### When to Use **Vitest**:
- If you are working with **Vite** for bundling your JavaScript/TypeScript project, as Vitest is optimized for such projects.
- If you need **faster test execution** for large projects.
- If you're looking for a **modern Jest alternative** with out-of-the-box TypeScript support.
- If you value **speed** and **performance** in testing.

### Conclusion:
- **Jest** is the go-to choice if you need a stable, feature-rich testing framework with broad community support and you're working in a more traditional JavaScript project.
- **Vitest** shines when you are working with **Vite-based projects** and need a fast, modern alternative with excellent performance, especially for TypeScript-heavy codebases.

In summary, **choose Jest** if you need a tried-and-true solution for general JavaScript testing, and **go with Vitest** if you prioritize speed, TypeScript support, and work in the Vite ecosystem.