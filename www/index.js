import * as wasm from "wasm-pack";

const sumInput = document.getElementById("sum-input");
const productInput = document.getElementById("product-input");
const fibonacciInput = document.getElementById("fibonacci-input");

const sumButton = document.getElementById("btn-sum");
const productButton = document.getElementById("btn-product");
const fibonacciButton = document.getElementById("btn-fibonacci");

const rustSumOutput = document.getElementById("rust-sum-result");
const jsSumOutput = document.getElementById("js-sum-result");

const rustProductOutput = document.getElementById("rust-product-result");
const jsProductOutput = document.getElementById("js-product-result");

const rustFibonacciOutput = document.getElementById("rust-fibonacci-result");
const jsFibonacciOutput = document.getElementById("js-fibonacci-result");

const jsSum = (n) => {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
};

const jsProduct = (n) => {
  let product = 1;
  for (let i = 1; i <= n; i++) {
    product *= i;
  }
  return product;
};

const jsFibonacci = (n) => {
  if (n <= 1) {
    return n;
  }
  return jsFibonacci(n - 1) + jsFibonacci(n - 2);
};

sumButton.addEventListener("click", () => {
  const n = parseInt(sumInput.value, 10);
  if (isNaN(n)) {
    jsSumOutput.textContent = "유효하지 않은 입력입니다.";
    rustSumOutput.textContent = "";
    return;
  }

  let start = performance.now();
  const jsSumResult = jsSum(n);
  let end = performance.now();
  jsSumOutput.textContent = `JS Sum: ${jsSumResult} in ${(end - start).toFixed(
    2
  )} ms`;

  start = performance.now();
  const rustSumResult = wasm.par_sum(n);
  end = performance.now();
  rustSumOutput.textContent = `Rust Sum: ${rustSumResult} in ${(
    end - start
  ).toFixed(2)} ms`;
});

productButton.addEventListener("click", () => {
  const n = parseInt(productInput.value, 10);
  if (isNaN(n)) {
    jsProductOutput.textContent = "유효하지 않은 입력입니다.";
    rustProductOutput.textContent = "";
    return;
  }

  let start = performance.now();
  const jsProductResult = jsProduct(n);
  let end = performance.now();
  jsProductOutput.textContent = `JS Product: ${jsProductResult} in ${(
    end - start
  ).toFixed(2)} ms`;

  start = performance.now();
  const rustProductResult = wasm.par_product(n);
  end = performance.now();
  rustProductOutput.textContent = `Rust Product: ${rustProductResult} in ${(
    end - start
  ).toFixed(2)} ms`;
});

fibonacciButton.addEventListener("click", () => {
  const n = parseInt(fibonacciInput.value, 10);
  if (isNaN(n)) {
    jsFibonacciOutput.textContent = "유효하지 않은 입력입니다.";
    rustFibonacciOutput.textContent = "";
    return;
  }

  let start = performance.now();
  const jsFibonacciResult = jsFibonacci(n);
  let end = performance.now();
  jsFibonacciOutput.textContent = `JS Fibonacci: ${jsFibonacciResult} in ${(
    end - start
  ).toFixed(2)} ms`;

  start = performance.now();
  const rustFibonacciResult = wasm.fibo(n);
  end = performance.now();
  rustFibonacciOutput.textContent = `Rust Fibonacci: ${rustFibonacciResult} in ${(
    end - start
  ).toFixed(2)} ms`;
});
