install:
	npm ci

lint:
	npm run lint

test:
	npx jest --watch

test-coverage:
	npm test -- --coverage