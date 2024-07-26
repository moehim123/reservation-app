const seededRandom = function (seed) {
    var m = 2**35 - 31;
    var a = 185852;
    var s = seed % m;
    return function () {
        return (s = s * a % m) / m;
    };
}

export const fetchAPI = function(date) {
    let result = [];
    let random = seededRandom(date.getDate());

    for(let i = 17; i <= 23; i++) {
        if(random() < 0.5) {
            result.push(i + ':00');
        }
        if(random() < 0.5) {
            result.push(i + ':30');
        }
    }
    return result;
};

export const submitAPI = async function(formData) {
    try {
        // Simulate a network request with a delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Simulate success or failure
        const success = Math.random() > 0.2; // 80% chance of success
        if (!success) {
            throw new Error('Simulated API failure');
        }

        return true;
    } catch (error) {
        console.error('Error submitting API:', error);
        return false;
    }
};