# Prerequisites 

- Install latest version of Nodejs [Download | Node.js (nodejs.org)](https://nodejs.org/en/download) 
- Install VSCode [Download Visual Studio Code - Mac, Linux, Windows](https://code.visualstudio.com/download) 


# Step 1: Create a new Project Directory 

Open a new terminal window and type the following commands 

```bash 
mkdir playwright-typescript-pom
cd playwright-typescript-pom
```

# Step 2: Initialize a Node.js Project 

in the same terminal run the following command to create Node.js project, the output will be a `package.json` file in the root of the playwright-typescript-pom folder 

```bash
npm init -y
```
# Step 3: Install Playwright,, TypeScript and Jest (For Testing) 

Installing necessary dependencies : 

```bash 
npm install playwright typescript @types/node jest ts-jest @types/jest --save-dev
```
- `playwright`: Playwright library.
- `typescript`: TypeScript for type-checking and transpiling TypeScript files.
- `jest`: Testing framework.
- `ts-jest`: TypeScript support for Jest.
- `@types/jest`: TypeScript definitions for Jest.
# Step 4: Set up typescript configuration 

create `tsconfig.json` file in the root folder of your project and copy the following content:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true
  }
}
```

# Step 5: Create a Directory structure 

Create the following directory structure inside your project: 

```arduino
playwright-typescript-pom/
├── src/
│   ├── pages/
│   │   ├── BasePage.ts
│   │   ├── HomePage.ts
│   ├── tests/
│   │   ├── homePage.test.ts
├── jest.config.js
```

you can do it thru the explorer interface or copy the following commands in the open terminal 

```bash 
mkdir src
cd src
mkdir pages
mkdir tests
type nul > jest.config.js 


```

### Configure jest

```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js'],
  testMatch: ['**/*.test.ts'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
};

```
# Step 6: Define Page Objects 

In the `pages` directory, create TypeScript files page objects. Here's an example for `BasePage.ts` and `HomePage.ts`

### BasePage.ts

```typescript
import { Page } from 'playwright';

export default class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(url: string) {
    await this.page.goto(url);
  }
}

```

### HomePage.ts

```typescript
import { Page } from 'playwright';
import BasePage from './BasePage';

export default class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async getTitle() {
    return await this.page.title();
  }
}

```

# Step 7: Write Jest Tests 

In the `tests` directory, create a test, e.g., `HomePage.test.ts` to test the `HomePage`: 

```typescript
import { chromium, Browser, Page } from 'playwright';
import HomePage from '../pages/HomePage';

describe('Home Page Test', () => {
  let browser: Browser;
  let page: Page;
  let homePage: HomePage;

  beforeAll(async () => {
    browser = await chromium.launch();
    page = await browser.newPage();
    homePage = new HomePage(page);
  });

  afterAll(async () => {
    await browser.close();
  });

  it('should navigate to example.com', async () => {
    await homePage.navigateTo('https://example.com');
    const title = await homePage.getTitle();
    expect(title).toBe('Example Domain');
  });
});

```

# Step 8: Run Tests 

Now, you can run your jest test by running the following command in the command line: 

```bash
npx jest
```
