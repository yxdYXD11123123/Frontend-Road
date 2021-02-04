function getjie(n) {
    if (n === 1) {
        return 1;
    }
    return getjie(n - 1) * n
}

console.log(getjie(3));