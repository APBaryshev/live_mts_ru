# Project variables
PROJECT_DIR := $(shell pwd)
DOCKER_IMAGE := mts-live-tests
DOCKER_TAG := latest
ALLURE_RESULTS := $(PROJECT_DIR)/allure-results
ALLURE_REPORT := $(PROJECT_DIR)/allure-report
PLAYWRIGHT_REPORT := $(PROJECT_DIR)/playwright-report

.PHONY: help build test test-smoke test-features test-api test-headed test-ui test-watch \
        allure-report allure-serve serve clean shell full setup benchmark

# Default target
help:
	@echo "Available commands:"
	@echo "  build         - Build Docker image"
	@echo "  test          - Run all tests"
	@echo "  test-smoke    - Run only smoke tests"
	@echo "  test-features - Run only features tests"
	@echo "  test-api      - Run only API tests"
	@echo "  test-headed   - Run tests with visible browser"
	@echo "  test-ui       - Run tests in UI mode"
	@echo "  test-watch    - Live watch mode (UI)"
	@echo "  test-debug    - Run tests in debug mode"
	@echo "  allure-report - Generate Allure report"
	@echo "  allure-serve  - Serve Allure report"
	@echo "  benchmark     - Run performance benchmark"
	@echo "  clean         - Clean reports and cache"
	@echo "  full          - Full cycle: tests -> report -> serve"

# Build Docker image
build:
	@echo "Building Docker image..."
	docker build -t $(DOCKER_IMAGE):$(DOCKER_TAG) .

# Run all tests
test:
	@echo "Running all tests..."
	docker run --rm \
		-v $(PROJECT_DIR)/allure-results:/app/allure-results \
		-v $(PROJECT_DIR)/playwright-report:/app/playwright-report \
		$(DOCKER_IMAGE):$(DOCKER_TAG) \
		npx playwright test --reporter=line,allure-playwright,html

# Run smoke tests only
test-smoke:
	@echo "Running smoke tests..."
	docker run --rm \
		-v $(PROJECT_DIR)/allure-results:/app/allure-results \
		-v $(PROJECT_DIR)/playwright-report:/app/playwright-report \
		$(DOCKER_IMAGE):$(DOCKER_TAG) \
		npx playwright test tests/smoke/ --reporter=line,allure-playwright,html

# Run features tests only
test-features:
	@echo "Running features tests..."
	docker run --rm \
		-v $(PROJECT_DIR)/allure-results:/app/allure-results \
		-v $(PROJECT_DIR)/playwright-report:/app/playwright-report \
		$(DOCKER_IMAGE):$(DOCKER_TAG) \
		npx playwright test tests/features/ --reporter=line,allure-playwright,html

# Run API tests only
test-api:
	@echo "Running API tests..."
	docker run --rm \
		-v $(PROJECT_DIR)/allure-results:/app/allure-results \
		-v $(PROJECT_DIR)/playwright-report:/app/playwright-report \
		$(DOCKER_IMAGE):$(DOCKER_TAG) \
		npx playwright test tests/api/ --reporter=line,allure-playwright,html

# Run tests in headed mode (with browser UI)
test-headed:
	@echo "Running tests in headed mode..."
	docker run --rm \
		--ipc=host \
		-v $(PROJECT_DIR)/allure-results:/app/allure-results \
		-v $(PROJECT_DIR)/playwright-report:/app/playwright-report \
		$(DOCKER_IMAGE):$(DOCKER_TAG) \
		npx playwright test --headed --reporter=line,allure-playwright,html

# Run tests in UI mode
test-ui:
	@echo "Running tests in UI mode..."
	docker run --rm \
		-p 9323:9323 \
		-v $(PROJECT_DIR)/allure-results:/app/allure-results \
		-v $(PROJECT_DIR)/playwright-report:/app/playwright-report \
		$(DOCKER_IMAGE):$(DOCKER_TAG) \
		npx playwright test --ui

# Run tests in watch mode (live UI)
test-watch:
	@echo "Starting test watch mode..."
	docker run --rm \
		-p 9323:9323 \
		-v $(PROJECT_DIR):/app \
		-w /app \
		$(DOCKER_IMAGE):$(DOCKER_TAG) \
		npx playwright test --ui

# Run tests in debug mode
test-debug:
	@echo "Running tests in debug mode..."
	docker run --rm \
		-p 9229:9229 \
		-v $(PROJECT_DIR)/allure-results:/app/allure-results \
		-v $(PROJECT_DIR)/playwright-report:/app/playwright-report \
		$(DOCKER_IMAGE):$(DOCKER_TAG) \
		npx playwright test --debug

# Generate Allure report
allure-report:
	@echo "Generating Allure report..."
	docker run --rm \
		-v $(ALLURE_RESULTS):/app/allure-results \
		-v $(ALLURE_REPORT):/app/allure-report \
		$(DOCKER_IMAGE):$(DOCKER_TAG) \
		allure generate allure-results -o allure-report --clean
	@echo "Allure report generated: file://$(ALLURE_REPORT)/index.html"

# Serve Allure report locally
allure-serve:
	@echo "Serving Allure report on http://localhost:8050"
	docker run --rm \
		-p 8050:8050 \
		-v $(ALLURE_RESULTS):/app/allure-results \
		$(DOCKER_IMAGE):$(DOCKER_TAG) \
		allure serve allure-results -p 8050

# Performance benchmark
benchmark:
	@echo "🔄 Running performance benchmark..."
	@mkdir -p test-results/benchmarks
	@docker run --rm \
		-v $(PROJECT_DIR):/app \
		$(DOCKER_IMAGE):$(DOCKER_TAG) \
		npx playwright test --reporter=json > test-results/benchmarks/benchmark-$(shell date +%Y%m%d-%H%M%S).json
	@echo "✅ Benchmark saved"
	@echo "📊 Analyzing results..."
	@node scripts/analyze-benchmark.js

# Compare last 2 benchmarks
compare-benchmarks:
	@echo "📈 Comparing last 2 benchmarks..."
	@node scripts/compare-benchmarks.js

# Clean reports and cache
clean:
	@echo "Cleaning reports and cache..."
	rm -rf allure-results allure-report playwright-report test-results
	docker system prune -f

# Full cycle: tests -> report -> serve
full: test allure-report serve
	@echo "Full test cycle completed!"