install:
	npm ci

lint:
	npm eslint .

test:
	npx jest --watch

test-coverage:
	npm test -- --coverage