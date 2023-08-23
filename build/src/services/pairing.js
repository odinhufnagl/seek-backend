"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUserPairs = void 0;
//TODO. only temporary
function getRandomPairs(objects) {
    const pairs = [];
    const shuffled = objects.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    while (shuffled.length >= 2) {
        pairs.push([shuffled.pop(), shuffled.pop()]);
    }
    if (shuffled.length === 1) {
        shuffled.pop(); // Discard the remaining uneven element
    }
    return pairs;
}
//this is the logic for pairing users by location and other things if we want that
const generateUserPairs = (users) => {
    return getRandomPairs(users);
};
exports.generateUserPairs = generateUserPairs;
