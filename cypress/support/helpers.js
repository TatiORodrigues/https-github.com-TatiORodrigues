export const getRandomNumber = () => {
    //return new Date().getTime();
    return Math.floor(1000000000 + Math.random() * 9000000000).toString();
};
export const getRandomEmail = () => {
    return `qa-tester-${getRandomNumber()}@test.com`;
};
