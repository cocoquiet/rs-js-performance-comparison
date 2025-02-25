mod utils;

use wasm_bindgen::prelude::*;
use rayon::prelude::*;

#[wasm_bindgen]
pub fn par_sum(n: usize) -> usize {
    return (1..=n).into_par_iter().sum();
}

#[wasm_bindgen]
pub fn par_product(n: usize) -> usize {
    return (1..=n).into_par_iter().product();
}

fn run(n: usize) -> usize {
    match n {
        0 => 0,
        1 => 1,
        _ => run(n - 1) + run(n - 2),
        
    }
}

#[wasm_bindgen]
pub fn fibo(n: usize) -> usize {
    return run(n);
}